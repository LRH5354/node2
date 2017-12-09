var express = require('express');
var router = express.Router();
var request=require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res.json())
    var url="http://api.map.baidu.com/place/v2/search?query=美食&page_size=50&page_num=0&scope=1&bounds=39.915,116.404,39.975,116.414&output=json&ak=Hmv50bRYfqK7lGvHQEk4bj4cI6nbdbGS";
    request(url, function(err, response, body) {
        console.log(response.statusCode)
        console.log(response.json())
        if (!err && response.statusCode == 200) {
            console.log(response)
        } else {
            console.log(response.json())
            console.log('get page error url => ' + href);
        }
    });
  res.send('user');
});

module.exports = router;
