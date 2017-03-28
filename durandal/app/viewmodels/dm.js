define(function() {

  bancs.dm = bancs.dm || {
    system: {
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
    teller: {
      TellerNo: '', //柜员号
      Name: '', //柜员姓名
      Level: '', //柜员级别
    },
    customers: [{
      name: '',
      card: '33345667657',
      trans: [{
        id: '',
        amount: 0
      }]
    }],
    customer: function(){
      return this.customers[0];
    },
    refreshCustomer: function() {
      this.customer = [];
    },
    init: function() {
      this.system.BranchName = '北京分行';
      this.teller.Name = "李然";
    }
  }

  return bancs.dm;
})