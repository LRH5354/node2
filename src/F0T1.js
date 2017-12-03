/**
 * Created by 15879 on 2017/12/2.
 */
var http=require("http");
var querystring = require('querystring');
var util = require('util');
var fs=require('fs');


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
                post = querystring.parse(post);
              //  console.log(post.length)
                 for(var index in post) {
                     var arr = post[index].split(', ');
                     addSqlParams = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9]];
                     connection.query(addSql, addSqlParams, function (err, result) {
                         if (err) {
                             console.log('[INSERT ERROR] - ', err.message);
                             return;
                         }
                         res.writeHead(200, {'content-Type': 'text/plain'});
                     });
                 }
                console.log('state: success');
                res.writeHead(200,{'content-Type':'text/plain'});
                res.end("成功");
            })

            break;
        default:
            ShowServerStaticFile(res,'../public/html/notFound.html','text/html',404);
            break;
    }

}).listen(3000);

console.log("server stared on 127.0.0.1:3000");

