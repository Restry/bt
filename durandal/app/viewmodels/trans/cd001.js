define(['mbt', 'knockout','viewmodels/dm','viewmodels/utils'], function(mbt, ko,dm,utils) {
  return new mbt({
    name: "",
    data: {
      CityCode: "",
      Age: 18,
      Address: "点击下面按钮加载客户信息",
      
      District: [],
      Province: [],
      City: [],
      isLoading: false,
      isCustomerLoading: false
    },
    validation: [{
      field: 'Age',
      role: {
        required: true
      }
    }],
    mounted: function() {
      this.District(this.dependencies[0]);
    },
    methods: {
      loadCustomer: function() {
        // console.log(this);
        this.show();
        this.isCustomerLoading(true);
        utils.requirePromise(['viewmodels/depends/customer']).then((res) => {
          this.Age(res[0].Age);
          this.CityCode(res[0].CityCode);
          this.Address(res[0].Address);
          this.isCustomerLoading(false);
        })


      },
      loadProvinceAndCity: function() {
        this.isLoading(true);
        utils.requirePromise(['viewmodels/depends/province', 'viewmodels/depends/city']).then((res) => {
          console.log(res);
          this.Province(res[0]);
          this.City(res[1]);
          this.isLoading(false);
        })
      },
      look: function() {
        alert(ko.toJSON(this));
      }
    },
    dependencies: ["viewmodels/depends/district"],
    context: {
      pm: {
        api: "127.0.0.1"
      }
    }
  });
})