/**
 * Created by 15879 on 2017/12/2.
 *
 * 这是一个js 的服务器  请求poi  接受请求
 */
var http=require("http");
var querystring = require('querystring');
var util = require('util');
var fs=require('fs');
var mysql = require('mysql');
var request = require('request');
var syncrequest = require('sync-request');



var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});
var  sql = 'SELECT * FROM rs';
var  addSql = 'INSERT INTO rs(province,city,title,lng,lat,address,phoneNumber,tags,keyword) VALUES(?,?,?,?,?,?,?,?,?)';

connection.connect();


function ShowServerStaticFile(res,path,contentType,responseCode){
    if(!responseCode) responseCode=200;
    fs.readFile(path,function(err,data){
        if(err) {

            res.writeHead(500,{'content-Type':'text/plain'});
            res.end('500-internal Error')
        }else{

            res.writeHead(responseCode,{'content-Type':'contentType'});
            res.end(data);
        }
    });
}


function getPoidata(kw) {
    //组装url 关键字 和矩形位置（格式 sw lat，lng ne lat,lng）
    var url="http://api.map.baidu.com/place/v2/search?query=美食&page_size=50&page_num=0&scope=1&bounds=39.915,116.404,39.975,116.414&output=json&ak=Hmv50bRYfqK7lGvHQEk4bj4cI6nbdbGS"
   // var res = request('GET', url);
    request(url, function(err, response, body) {
        if(err){
          console.log(err.message)
        }
    //    console.log(response);
        console.log(response.json())
    });
}


function getbound(bound) {

   x1=parseFloat(bound.x1);
   y1=parseFloat(bound.y1);
   x2=parseFloat(bound.x2);
   y2=parseFloat(bound.y2);
   console.log(x1,y1,x2,y2)
    var bounds = [];

    for (var y = y1; y <y2; y += 0.01) {
        for (var x = x1; x < x2; x += 0.01) {

           var temp={
                "x1":x,
                "y1":y,
                "x2":x+0.01,
                "y2":y+0.01
            }
          // console.log(temp)
           bounds.push(temp);

        }
    }
    return bounds;
}

http.createServer(function(req,res){
    var  addSqlParams ;
    var path=req.url.replace(/\/?(?:\?.*)?$/, '');
    console.log(path);
    switch(path){
        case '':ShowServerStaticFile(res,'../public/images/logo.jpg','text/jpeg');
        break;
        case '/about':ShowServerStaticFile(res,'../public/images/p3.jpg','text/jpeg');
            break;
        case '/index':ShowServerStaticFile(res,'../public/images/p2.jpg','text/jpeg');
            break;
        case '/POI':ShowServerStaticFile(res,'../public/html/POI.html','text/html');
        break;
        case '/testSave':
            var post = '';
            req.on('data', function(chunk){
                post += chunk;
            });
            req.on('end', function(){
             var  data= querystring.parse(post);


                 // for(var index in data) {
                 //     var arr = data[index].split(', ');
                 //     addSqlParams = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9]];
                 //     connection.query(addSql, addSqlParams, function (err, result) {
                 //         if (err) {test
                 //             console.log('[INSERT ERROR] - ', err.message);
                 //             return;
                 //         }
                 //
                 //     });
                 // }
                var dt= getbound(data);
                getPoidata("美食");
                //console.log(dt);
                console.log('接受数据成功');
                res.writeHead(200,{'content-Type':'text/plain'});
               res.end("成功");


            })



            break;
        default:
            ShowServerStaticFile(res,'../public/html/notFound.html','text/html',404);
            break;
    }

}).listen(8000);

console.log("server stared on 127.0.0.1:8000");

