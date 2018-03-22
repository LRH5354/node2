var mysql = require('mysql');
var count=0;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'movie_info'
});
var  addSql = 'INSERT INTO doubanmovie_info(_id,_title,_casts,_cover,_director,_rate,_url,tags) VALUES ?';
connection.connect();

module.exports=function (addSqlParams,callback) {
    connection.query(addSql,[addSqlParams], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
        }
        count=count+20;
        console.log('数据成功插入条数：',count);
        setTimeout(function () {
            callback(null,'successful!');
        },5000)

    });
}
