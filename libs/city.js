define(function() {
  //Do setup work here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['BJ','SH','SZ'])
    }, Math.random()*1000)
  })
});