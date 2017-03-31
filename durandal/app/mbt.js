define(['knockout'],function(ko) {
  return function(opt) {
    var local = function(ctx) {
      for (var d in opt.data) {
        this[d] = opt.data[d] instanceof Array ? ko.observableArray(opt.data[d]) : ko.observable(opt.data[d]);
      }

      for (var a in opt.methods) {
        this[a] = opt.methods[a].bind(Object.assign(this, ctx));
      }

      return new Promise(function(resolve, reject) {
        require(opt.dependencies, function() {
          this.dependencies =arguments;// {};
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