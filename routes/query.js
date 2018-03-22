// 截取http语句含有query的请求  用作执行数据库查询操作
var express = require('express');
var router = express.Router();

/* GET welcome listing. */
router.get('/', function(req, res, next) {
   res.end('query')
});

module.exports = router;