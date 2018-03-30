var express = require('express');
var router = express.Router();
var string =require('querystring')
var init=require('../tool/core/init_mysql');
var op=require('../tool/mysql/sqlop');
var connection=init.createConnection('movie_info');
/* 拦截翻页的请求 */

router.get('/', function(req, res, next) {
    if(req.query.start==='pre'){
        var sql='SELECT * FROM doubanmovie_info where id<=10'
        op.query(sql,connection,function (err,result) {
            if(err){
                console.log(err.message);
                res.render('index',{info:[]})
                return;
            }
            res.render('index',{info:result})
        })
    }else if(req.query.start==='next'){
        var sql='SELECT * FROM doubanmovie_info where id<=10'
        op.query(sql,connection,function (err,result) {
            if(err){
                console.log(err.message);
                res.render('index',{info:[]})
                return;
            }
            res.render('index',{info:result})
        })
    }else{
        var count=req.query.start;
        var sql="SELECT * FROM doubanmovie_info limit "+(count-1)*10 + ' , '+10
        ;

        op.query(sql,connection,function (err,result) {
           var  temp={
               type:'排行',
               result:result
           }
            if(err){
                console.log(err.message);
                res.render('index',{info:[]})
                return;
            }
            res.render('index',{info:temp})
        })

    }

});

module.exports = router;