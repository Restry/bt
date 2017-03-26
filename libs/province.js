define(function() {


  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        '湖北',
        '河南',
        '河北',
        '陕西'
      ])
    }, Math.random() * 1000)
  })
});