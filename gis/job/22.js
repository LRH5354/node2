/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/5/12  19:24
 **/
var request = require('request')

request({
    url: 'http://www.bubuko.com/infodetail-2090520.html',
      proxy: 'http://140.143.134.248:3128'
}, function(err, resp, body) {
    if(err){
        console.log("sdfjsjl")
    }
    console.log(body)
})