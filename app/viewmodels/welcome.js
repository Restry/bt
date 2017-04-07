define(['durandal/app', 'knockout',
  'viewmodels/dm',
  'viewmodels/utils',
  'viewmodels/customer'
], function (app, ko, dm, utils, Customer) {
  var ctor = function () {

    this.displayName = '交易页面';
    this.description = 'MBT是基础，通过MBT初始化交易函数。再通过交易函数附加上下文得到交易的实例， 加载依赖信息';

    this.Command = ko.observable();
    this.OnExec = function () {
      alert(eval(this.Command()));
    }

    this.isLoading = ko.observable(true);
    this.trancationView = ko.observable();
    this.goTrans = utils.goTrans;
    this.loadCustomer = function () {

    }
    // load System & Teller
    var res = cpie.LoadSystemAndTeller();


    cpie.OnExternalEvent = function (field, value) {
      bancs.dm.Customer.Trancations()[0].model[field](value);
    };

    Object.assign(bancs.dm, JSON.parse(res));
    // load Customer
    dm.refreshCustomer().then(function (res) {
      // alert(JSON.stringify(res));
      this.trancationView({
        model: res,
        view: 'views/trans'
      });
      this.isLoading(false);
    }.bind(this));
  };

  //Note: This module exports a function. That means that you, the developer, can create multiple instances.
  //This pattern is also recognized by Durandal so that it can create instances on demand.
  //If you wish to create a singleton, you should export an object instead of a function.
  //See the "flickr" module for an example of object export.

  return ctor;
});