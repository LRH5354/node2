var mysql = require('mysql');
var config=require('../config/sql.js');
var connection;
module.exports.createConnection=function (basename) {
      connection = mysql.createConnection({
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : basename
    });
    return connection;
}