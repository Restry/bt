define(function() {
  //Do setup work here
  return new Promise(function(resolve, reject)  {
    setTimeout(function()  {
      resolve({
        name: "dora",
        card: '1000999983434',
        CityCode:'BJ',
        Age:38,
        Address:'北京市海淀区永丰路299号'
      })
    }, Math.random()*1000)
  })
});