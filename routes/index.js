var express = require('express');
var init=require('../tool/core/init_mysql');
var op=require('../tool/mysql/sqlop');
var router = express.Router();


var connection=init.createConnection('movie_info');
connection.connect();

router.get('/', function(req, res, next) {

    var sql='SELECT  * FROM doubanmovie_info where id<=10'
    op.query(sql,connection,function (err,result) {
        if(err){
            console.log(err.message);
            res.render('index',{info:[]})
        }
          console.log(result);
        res.render('index',{info:result})

    })

});

module.exports = router;
