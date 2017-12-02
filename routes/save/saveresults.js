/**
 * Created by 15879 on 2017/12/1.
 */
var express = require('express');
var router = express.Router();

/* GET welcome page. */
router.get('/', function(req, res, next) {
    console.log(req.query)
    res.render('index', { title: 'save' });;
});

module.exports = router;