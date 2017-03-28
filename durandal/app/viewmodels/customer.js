/*
 客户信息类
*/
define(['knockout'], function(ko) {
  var Customer = function(cus) {
    //克隆客户实例
    Object.assign(this, cus);

    //客户的操作事件
    this.currentTrans = ko.observable();
    this.selectTrans = function(no) {
      return function(ctx, e) {
        this.currentTrans(no);
      }.bind(this);
    }
    this.currentViewModel = ko.computed(function() {
      var ct = this.currentTrans();
      var currentModel = this.Trancations().filter(function(d) {
        return d.tno == ct;
      });
      return currentModel.length > 0 ? currentModel[0] : null;
    }, this)
  }
  Customer.prototype.Trancations = ko.observableArray();

  // 初始化交易
  Customer.prototype.goTrans = function(transNO) {
    return function(ctx, e) {
      ctx.isLoading(true);

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

          ctx.Trancations.push({
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

  return Customer;
})