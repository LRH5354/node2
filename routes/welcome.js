/**
 * Created by 15879 on 2017/12/1.
 */
var express = require('express');
var router = express.Router();

/* GET welcome listing. */
router.get('/', function(req, res, next) {
    res.send('欢迎来到博客');
});

module.exports = router;