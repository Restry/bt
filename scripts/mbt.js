define(function() {

  return function(opt) {
    var local = function(ctx) {
      for (var d in opt.data) {
        this[d] = opt.data[d];
      }

      for (var a in opt.methods) {
        this[a] = opt.methods[a].bind(Object.assign(this, ctx));
      }

      return new Promise((resolve, reject) => {
        require(opt.dependencies, function() {
          this.dependencies={};
          opt.dependencies.forEach((d, i) => {
            this.dependencies[d] = arguments[i];
          })
          resolve(this);
        }.bind(this));
      });

    }

    local.prototype = opt.context;
    return local;
  };


})