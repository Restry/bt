define(function() {


  return new Promise(function(resolve, reject)  {
    setTimeout(function() {
      resolve([
        '湖北',
        '河南',
        '河北',
        '陕西'
      ])
    }, Math.random() * 1000)
  })
});