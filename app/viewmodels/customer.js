/*
 客户信息类
*/
define(['knockout'], function(ko) {
  var Customer = function(cus) {
    //克隆客户实例
    Object.assign(this, cus);

    //客户的操作事件
    this.isLoading = ko.observable(false);
    this.currentTrans = ko.observable();
    this.selectTrans = function(no) {
      return function(ctx, e) {
        this.currentTrans(no);
      }.bind(this);
    }
    this.Trancations = ko.observableArray();
    this.currentViewModel = ko.computed(function() {
      var ct = this.currentTrans();
      var currentModel = this.Trancations().filter(function(d) {
        return d.tno == ct;
      });
      return currentModel.length > 0 ? currentModel[0] : null;
    }, this)
  }
  // Customer.prototype.Trancations = ko.observableArray();

  return Customer;
})