define(function() {
  return {
    /*
     * 传入参数：是系统和柜员的结构，到C#端获取数据，然后返回JS的dm
     * 调用C#接口，接口中通过传入的结构去UserInfo及Env中获取相关字段的数据，并生成C#端数据层
     * JS -> C# -> JS
     */
    loadSystemAndTeller: function(obj) {
      obj.System.BranchNo = "NO1111";
      obj.System.SupperOrg = "NO1001";
      obj.System.BranchName = "NO0101";
      obj.System.ProvinceBranchNo = "NO0001";
      obj.System.CityCode = "BJ";

      obj.Teller.Name = "李然";
      obj.Teller.Level = "001";
      obj.Teller.TellerNo = "8966987";

      return obj;
    },

    loadCustomer: function() {
      var inputType = prompt("[演示]通过什么方式获取客户信息？1：刷卡、2：刷身份证、3：手动输入", "");

      var returnPromise = null;

      switch (inputType) { // 每一种类型都做不同的事情，可能是调用API或其它
        case "1":
          returnPromise = requirePromise(['viewmodels/depends/customer' + inputType + '.js']);
          break;
        case "2":
          returnPromise = requirePromise(['viewmodels/depends/customer' + inputType + '.js']);
          break;
        case "3":
          returnPromise = requirePromise(['viewmodels/depends/customer' + inputType + '.js']);
          break;
        default:
          alert('输入错误')
          break;
      }
      return returnPromise;
    }
  }
});