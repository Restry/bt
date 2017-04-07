define(['mbt', 'knockout', 'viewmodels/dm', 'viewmodels/utils'], function (mbt, ko, dm, utils) {
  return new mbt({
    name: "",
    data: {
      Teller: dm.Teller,
      CityCode: {
        value: 'BJ',
        metadata: {
          role: {
            required: true
          }
        }
      },
      Age: {
        value: 18,
        metadata: {
          role: {
            required: true
          },
          format: function (value) {
            toks = parseInt(value).toFixed(2).replace('-', '').split('.');
            var display = '$' + $.map(toks[0].split('').reverse(), function (elm, i) {
              return [(i % 3 === 0 && i > 0 ? ',' : ''), elm];
            }).reverse().join('') + '.' + toks[1];
            return value < 0 ? '-' + display : display;
          }
        }
      },
      Address: {
        value: "点击下面按钮加载客户信息"
      },


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
    mounted: function () {
      this.District(this.dependencies[0]);
    },
    methods: {
      loadInfo: function () {
        // console.log(this);
        this.show();
        this.isCustomerLoading(true);
        utils.requirePromise(['viewmodels/depends/customer']).then(function (res) {
          this.Age(res.Age);
          this.CityCode(res.CityCode);
          this.Address(res.Address);
          this.isCustomerLoading(false);
        }.bind(this))


      },
      loadProvinceAndCity: function () {
        this.isLoading(true);
        utils.requirePromise(['viewmodels/depends/province', 'viewmodels/depends/city']).then(function (res) {
          console.log(res);
          this.Province(res[0]);
          this.City(res[1]);
          this.isLoading(false);
        }.bind(this))
      },
      look: function () {
        if (this.errors().length === 0) {
          alert(ko.toJSON(this));
        }
        else {
          alert('Please check your submission.');
          this.errors.showAllMessages();
        }
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