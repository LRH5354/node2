/**
 * Created by 15879 on 2017/12/4.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
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

router.get('/', function(req, res, next) {
    ShowServerStaticFile(res,'../public/html/POI.html','text/html')
});

module.exports = router;
