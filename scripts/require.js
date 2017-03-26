define([], {
  load: function(name, req, load) {
    if (!/^require\$promised\$/.test(name)) {
      load.error(new Error("I can only promisize 'require', not '" + name.split('$')[0] + "'. Use 'promised!require' as module name."));
      return;
    }
    if (typeof Promise !== "function" || !Promise.prototype.then) {
      load.error(new Error("Promise not present or has not Promise API."));
      return;
    }
    var fn = function(deps, callback, errback) {
      if (typeof deps === "string") {
        return req.apply(this, arguments);
      }
      var promise = new Promise(function(resolve, reject) {
        req(deps, function() {
          resolve(Array.prototype.slice.call(arguments));
        }, reject);
      });
      if (callback) promise = promise.then(function(modules) {
        callback.apply(null, modules);
      });
      if (errback) promise = promise.then(null, errback);
      return promise;
    };
    Object.keys(req).forEach(function(k) {
      fn[k] = req[k];
    });
    load(fn);
  },
  normalize: function(name, normalize) {
    return normalize(name) + "$promised$" + Date.now().toString(36) + Math.random().toString(32).slice(1);
  }
});