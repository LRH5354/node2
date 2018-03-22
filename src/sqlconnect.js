/**
 * Created by 15879 on 2017/12/1.
 */
var mysql = require('mysql');
var config=require('./config.js');
var connection = mysql.createConnection(config.mysql);
connection.connect();
connection.query('select * from `mytable`', function(err, rows, fields) {
    if (err) throw err;
    console.log('查询结果为: ', rows);
});
connection.end();