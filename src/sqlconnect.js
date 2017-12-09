/**
 * Created by 15879 on 2017/12/1.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'test'
});

connection.connect();

var  sql = 'SELECT * FROM student';
var  addSql = 'INSERT INTO student(SNO,SNAME,SEX) VALUES ?';
var  addSqlParams = [['2015878', '朱丹','女'],['2015878', '朱丹','女'],['2015878', '朱丹','女']];
//插入记录

    connection.query(addSql,[addSqlParams],function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }
    console.log('--------------------------INSERT----------------------------');
    console.log('INSERT ID:',result);
    console.log('-----------------------------------------------------------------\n\n');
});


//读取表内容

// connection.query(sql, function (err, results) {
//     if(err){
//         console.log('[SELECT ERROR] - ',err.message);
//         return;
//     }
//
//     console.log('--------------------------SELECT----------------------------');
//     console.log(results);
//     console.log('------------------------------------------------------------\n\n');
//
// });
connection.end();