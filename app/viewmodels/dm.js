define(['viewmodels/utils', 'viewmodels/customer'], function (utils, Customer) {

  bancs.dm = bancs.dm || {
    System: {
      BranchNo: '', //机构号
      SupperOrg: '', //上级机构号
      BranchName: '', //机构名称
      WorkstationNo: '', //工作站号,3位
      ProvinceBranchNo: '', //省行机构号
      CityCode: '', //城市代码
      ROCNo: '', //人行机构号
      CardProdCode1: '', //发卡箱1卡产品码
      CardProdCode2: '', //发卡箱2卡产品码
      CardProdCode3: '', //发卡箱3卡产品码
      BranchAddress: '',
      ProvBranchNOEHR: '',
      ProvPrefixNumEHR: ''
    },
    Teller: {
      TellerNo: '', //柜员号
      Name: '李大然', //柜员姓名
      Level: '', //柜员级别
    },
    Customers: [],
    Customer: null,

    refreshCustomer: function () {
      //  this.Customers = [];
      return new Promise(function (resolve, reject) {
        this.Customer = new Customer(this.Customers[0]);
        resolve(this.Customer)

      }.bind(this));

      // var that = this;
      // return new Promise(function (resolve, reject) {
      //   utils.loadCustomer().then(function (res) {
      //     // alert(JSON.stringify(cus))
      //     var cus = new Customer(res);
      //     that.Customers.push(cus);
      //     resolve(cus);
      //   })
      // })
    }
  }

  return bancs.dm;
})