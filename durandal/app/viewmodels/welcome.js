define(['durandal/app', 'knockout'], function(app, ko) {
  var ctor = function() {
    this.displayName = '交易页面';
    this.description = 'MBT是基础，通过MBT初始化交易函数。再通过交易函数附加上下文得到交易的实例， 加载依赖信息';

    this.transViewModel = ko.observable();
    this.isLoading = ko.observable(false);
    this.rollTrans = ko.observableArray();

    this.currentTrans = ko.observable();

    this.selectTrans = function(no) {
      return function(ctx, e) {
        this.currentTrans(no);
      }.bind(this);
    }

    
    
    this.currentViewModel = ko.computed(function() {
      var ct = this.currentTrans();
      var currentModel = this.rollTrans().filter(function(d) {
        return d.tno == ct;
      });
      return currentModel.length > 0 ? currentModel[0] : null;
    }, this)

    
    this.goTrans = function(transNO) {

      return function(ctx, e) {
        this.isLoading(true);
        var that = this;
        require(['viewmodels/trans/' + transNO], function(trans) {
          // 初始化CD0001交易
          var cd1 = new trans({
            instansID: 45345,
            show: function() {
              console.log(this.Age);
            },
            pm: {
              api: "127.0.0.2"
            }
          })

          cd1.then((viewModel) => {

            ctx.rollTrans.push({
              tno: transNO,
              model: viewModel,
              view: 'viewmodels/trans/' + transNO + '.html'
            })
            ctx.isLoading(false);
            ctx.currentTrans(transNO);

          })
        })

      }.bind(this);

    }
  };

  //Note: This module exports a function. That means that you, the developer, can create multiple instances.
  //This pattern is also recognized by Durandal so that it can create instances on demand.
  //If you wish to create a singleton, you should export an object instead of a function.
  //See the "flickr" module for an example of object export.

  return ctor;
});