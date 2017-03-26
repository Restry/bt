

var requirePromise = function(objs) {
  return new Promise((resolve, reject) => {
      require(objs,function(){
        Promise.all(arguments).then((res)=>{
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
      Address: ""
    },
    methods: {
      addage: function(a) {
        // console.log(this);
        this.Age += a;
        this.show();
        requirePromise(['city', 'customer']).then((res) => {
          console.log(res);
        })
      }
    },
    dependencies: ["shirt", "district"],
    context: {
      pm: {
        api: "127.0.0.1"
      }
    }
  });
})