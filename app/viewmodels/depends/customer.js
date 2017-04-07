define(function() {
  //Do setup work here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "dora",
        card: '1000999983434',
        CityCode:'BJ',
        Age:38,
        Address:'Knockout tracks dependencies'
      })
    }, Math.random()*1000)
  })
});