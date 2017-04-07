define(['knockout', 'knockout.validation'], function (ko) {

  ko.validation.rules.pattern.message = 'Invalid.';

  ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
  }, true);

  ko.extenders.logChange = function (target, option) {
    target.subscribe(function (newValue) {
      console.log(option + ": " + newValue);
      // utils.j2c(option, newValue);  后端操作接口 TODO
    });
    return target;
  };
  ko.subscribable.fn.cusFormat = function (format) {
    var target = this;
    var writeTarget = function (value) {
      var stripped = value.replace(/[^0-9.-]/g, '');
      target(parseFloat(stripped));
    };
    var result = ko.computed({
      read: function () {
        return target();
      },
      write: writeTarget
    });
    result.formatted = ko.computed({
      read: function () {
        return format(target());
      },
      write: writeTarget
    });
    result.isNegative = ko.computed(function () {
      return target() < 0;
    });
    return result;
  };


  return function (opt) {
    var local = function (ctx) {
      for (var d in opt.data) {
        var field = opt.data[d];
        this[d] = field instanceof Array ? ko.observableArray(field) : ko.observable(field).extend({ logChange: d });

        if (field instanceof Object) {
          if (field.metadata && field.metadata.role) {
            this[d].extend(field.metadata.role); //验证加载
          }
          if (field.metadata && field.metadata.format) {
            this[d].cusFormat(field.metadata.format); //验证加载
          }
          field.value && this[d](field.value);
        }
      }
      for (var a in opt.methods) {
        this[a] = opt.methods[a].bind(Object.assign(this, ctx));
      }

      this.errors = ko.validation.group(this);

      return new Promise(function (resolve, reject) {
        require(opt.dependencies, function () {
          this.dependencies = arguments;// {};
          //           opt.dependencies.forEach((d, i) => {
          //             this.dependencies[d] = arguments[i];
          //           })
          opt.mounted.apply(this);
          resolve(this);
        }.bind(this));
      }.bind(this));

    }

    local.prototype = opt.context;
    return local;
  };
})