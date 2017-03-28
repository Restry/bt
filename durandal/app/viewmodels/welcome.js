define(['durandal/app', 'knockout'], function(app, ko) {
  var ctor = function() {
    this.displayName = '交易页面';
    this.description = 'MBT是基础，通过MBT初始化交易函数。再通过交易函数附加上下文得到交易的实例， 加载依赖信息';

    this.transViewModel = ko.observable();
    this.isLoading = ko.observable(false);

    this.goTrans = function(ctx, event) {
      this.isLoading(true);
      var that = this;
      require(['viewmodels/trans/cd001'], function(CD0001) {
        // 初始化CD0001交易
        var cd1 = new CD0001({
          instansID: 45345,
          show: function() {
            console.log(this.Age);
          },
          pm: {
            api: "127.0.0.2"
          }
        })

        cd1.then((viewModel) => {
          ctx.transViewModel({
            model: viewModel,
            view: 'viewmodels/trans/cd001.html'
          })
          window.res = viewModel;
          that.isLoading(false);

        })
      })
    }
  };

  //Note: This module exports a function. That means that you, the developer, can create multiple instances.
  //This pattern is also recognized by Durandal so that it can create instances on demand.
  //If you wish to create a singleton, you should export an object instead of a function.
  //See the "flickr" module for an example of object export.

  return ctor;
});