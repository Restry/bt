define(['viewmodels/utils'],function(utils) {
 
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
      Name: '', //柜员姓名
      Level: '', //柜员级别
    },
    Customers: [{
      name: '',
      card: '',
      Trancations: [{
        id: '',
        amount: 0
      }]
    }],
    
    Customer: function(){
      return this.Customers[0];
    },
    refreshCustomer: function() {
      this.Customers = [];
      utils.loadCustomer().then(function(res){ 
        this.Customers.push(new Customer(res));
      }.bind(this));
    }
  }

  return bancs.dm;
})