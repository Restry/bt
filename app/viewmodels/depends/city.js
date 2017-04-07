define(function() {
  //Do setup work here
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(['BJ','SH','SZ'])
    }, Math.random()*1000)
  })
});