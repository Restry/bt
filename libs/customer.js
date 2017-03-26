define(function() {
  //Do setup work here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "dora",
        card: '1000999983434'
      })
    }, Math.random()*1000)
  })
});