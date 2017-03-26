var requirePromise = function(objs) {
  return new Promise((resolve, reject) => {
    require(objs, function() {
      Promise.all(arguments).then((res) => {
        resolve(res);
      });
    })
  });
}

define(['mbt'], function(Mbt) {
  return new Mbt({
    data: {
      CityCode: "",
      Age: 18,
      Address: "",
      District: [],
      Province: [],
      City: [],
      isLoading: false,
      isCustomerLoading: false
    },
    mounted: function() {
      this.District(this.dependencies.district);
    },
    methods: {
      loadCustomer: function() {
        // console.log(this);
        this.show();
        this.isCustomerLoading(true);
        requirePromise(['customer']).then((res) => {
          this.Age(res[0].Age);
          this.CityCode(res[0].CityCode);
          this.Address(res[0].Address);
          this.isCustomerLoading(false);
        })


      },
      loadProvinceAndCity: function() {
        this.isLoading(true);
        requirePromise(['province', 'city']).then((res) => {
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
    dependencies: ["district"],
    context: {
      pm: {
        api: "127.0.0.1"
      }
    }
  });
})