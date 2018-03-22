// 截取http语句含有query的请求  用作执行数据库查询操作
var express = require('express');
var router = express.Router();
var init=require('../tool/core/init_mysql');

/* 创建连接 */

var connection=init.createConnection('movie_info');
connection.connect();

/* 根据请求query值进行数据库查询 */
//测试查询全部条数
router.get('/', function(req, res, next) {
    var sql=req.query.where;
 connection.query(sql,function (err,result) {
     if(err){
         console.log(err.message);
         return ;
         res.end(JSON.stringify({}))
     }
     res.end(JSON.stringify(result))
 })
});

module.exports = router;