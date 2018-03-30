var express = require('express');
var init=require('../tool/core/init_mysql');
var op=require('../tool/mysql/sqlop');
var router = express.Router();


var connection=init.createConnection('movie_info');
connection.connect();

router.get('/', function(req, res, next) {
    var sql;
// if(req.query.type===''){
//     sql ='SELECT  * FROM doubanmovie_info where id<=10';
// }else
if(req.query.type==='电影'){
    sql='SELECT  * FROM doubanmovie_info  where tags=\'电影\'  LIMIT 10';
}else if(req.query.type==='动画'){
    sql='SELECT  * FROM doubanmovie_info where tags=\'动漫\'  LIMIT 10';
}else if(req.query.type==='电视剧') {
    sql='SELECT  * FROM doubanmovie_info  where  tags=\'电视剧\'  LIMIT 10';
    }else{
    sql ='SELECT  * FROM doubanmovie_info LIMIT 10';
}


    op.query(sql,connection,function (err,result) {
        var temp={
            result:result,
            type: req.query.type
        };
      //  console.log(temp)

        if(err){
            console.log(err.message);
            res.render('index',{info:[]})
        }

        res.render('index',{info:temp})

    })

});

module.exports = router;
