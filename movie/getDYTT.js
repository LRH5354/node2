var DYTT=require('./DYTT');
var async=require('async');

var url2='http://www.btbtdy.com/screen/0-----hit-';
var url3='http://www.btbtdy.com/btdy/dy11579.html';

var list=DYTT.create_su(url2,2);
console.log(list)
async.mapLimit(list,1,function (url,callback) {

    DYTT.getmovie_url(url,callback);
    console.log(url);

},function (err,result) {
    if(err){
    console.log(err.message)
    }
    console.log(result)
    DYTT.close_con();
    //关闭数据库连接
})
