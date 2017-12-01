var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('来看看扩扩扩扩');
});

module.exports = router;
