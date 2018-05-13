var request=require('request');
var insert=require('./sql_insert');
var stringify=require('querystring');
module.exports=function (url,callback) {

    request(url,{},function (err,res,body) {
        if(err){
            console.log('错误出现！！')
            return ;
        }
  // console.log(body)
       var data=JSON.parse(body).data;
        var sql=[];

        if(data.length!==0){
            for(var i=0;i<data.length;i++){
                var temp=[];
                temp.push(data[i].id);
                temp.push(data[i].title);
                temp.push(data[i].casts.join('-'));
                temp.push(data[i].cover);
                temp.push(data[i].directors.join('-'));
                temp.push(data[i].rate);
                temp.push(data[i].url);
                temp.push(stringify.parse(url).tags);
                sql.push(temp)
            }
            insert(sql,callback)
        }else{
            setTimeout(function () {
                callback(null,'data为空!');
            },5000)

        }
    });
}

