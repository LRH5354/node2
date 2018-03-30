var request=require('request');
var cheerio=require('cheerio');
var async=require('async');
var con_init=require('../tool/core/init_mysql');
//下拉电影天堂的数据
var connection=con_init.createConnection('movie_info');
    connection.connect();

var  addSql = 'INSERT INTO DYTT_INFO(title,time,qinxidu,tag,place,yuyan,fanhao,cast,_id,about,cili) VALUES ?';

var temp={};
temp.close_con=function () {
    connection.end();
}

temp.getmovie_url=function(url,callbck) {

    request(url,function (err,res,body) {
        if(err){
            console.log('请求列表信息出错',err.message);
           // console.log('重新请求列表信息：',url);
            callbck(null,'列表信息失败');
        }else{
            var $=cheerio.load(body);
            var temp=[];
            $('.list_su .cts_ms a').each(function () {
                var url='http://www.btbtdy.com/'+$(this).attr('href')
                temp.push(url);
            })

            async.mapLimit(temp,12,function(url,callback2) {
                getmovie_info(url,callback2,callbck);
            },function (err,result) {
                if(err){
                    console.log(err.message);
                    return ;
                }
                console.log(result);
                connection.query(addSql,[result],function (err,result) {
                    if(err){
                        console.log('插入数据库失败 :',err.message)
                        return;
                    }
                    console.log('插入数据成功',result)
                })
            })

        }

    })
}

//创建 连接列表

/**
 * @param url 基础url
 * @param num  返回url数组的长度
 */
temp.create_su= function(url,num) {
    var temp=[];
    for(var i=1;i<=num;i++){
        temp.push(url+i+'.html')
    }
    return temp;
}


var cili='http://www.btbtdy.com/vidlist/';

function getmovie_info(url,callback2,callback) {
    var reg=/[0-9]+/;
    var id=reg.exec(url)[0]
     request(url,function (err,res,body) {
         if(err){
             console.log('请求电影页面出错：',err.message);
             console.log('重新请求电影页面',url);
             getmovie_info(url,callback2,callback)
         }else{
             var movie_info=[];
             var $=cheerio.load(body);

             movie_info[0]=$('.vod_intro h1').text();

             $('.vod_intro dl dd').each(function () {
                 movie_info.push($(this).text())
             });
             movie_info.push(id);
             movie_info.push($('.c05').text())
             getmovie_cili(cili+id+'.html',movie_info,callback2,callback);
         }

     })

}
var count=0;
function getmovie_cili(url,movie_info,callback2,callback) {
    var movie_cili={};
    request(url,function (err,res,body) {
        if(err){
            console.log('请求磁力页面失败：',err.message);
            console.log('--------重新请求磁力页面---------:',url)
            getmovie_cili(url,movie_info,callback2,callback)
        }else{
            var $=cheerio.load(body);

            var tag_ci=$('.d1');
            //var tag_na= $('.bt').parents('a[title]');
            var tag_na= $('.ico_1')
            for(var i=0;i<tag_na.length;i++){
                movie_cili[$(tag_na[i]).attr('title')]=$(tag_ci[i]).attr('href');
            }
            movie_info.push(JSON.stringify(movie_cili));

            console.log(url+'解析完毕')


            if(count<=34){
                console.log('----------------------------------------数目：',count);
                // setTimeout(function () {
                callback2(null,movie_info)
                count++;
                // },0)
            }else {
                console.log('----------------------------------------数目：',count);
                callback2(null,movie_info)
                callback(null,'一页完成');
                count=0;
            }
        }
    })
}

temp.getinfo=function (url,callback) {
    getmovie_info(url,callback)
}

module.exports=temp;
