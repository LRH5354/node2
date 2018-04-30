/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/25  17:35
 **/
var request=require("request");
var cheerio=require("cheerio");
var iconv=require('iconv-lite');
var async=require('async');


var con_init=require('../../tool/core/init_mysql');

var url1='https://search.51job.com/list/000000,000000,0000,00,9,99,GIS,2,';
var url2='https://search.51job.com/jobsearch/bmap/map.php?jobid=';
var url3='https://jobs.51job.com/wuhan/';

var job_insert=[];
var conn=con_init.createConnection('movie_info');

con_init.connect();

var listpage=creatlist('listpage',112,null)

async.mapLimit(listpage,1,function (url,callback) {
    getlist(url,callback);
},function (err,result) {
    console.log(result);
    con_init.connEnd();
    console.warn('全部爬取完,关闭数据库连接！！')
})



function creatlist(type,num,list) {
    var  arr=[];
    if(type==='listdetial'){
        //每个工作的详情 网页
        for(var i=0;i<list.length;i++){
            arr.push(url3+list[i]+'.html')
        }
    }else if(type==='listpage')
      for(var i=1;i<=num;i++){
        //初始页面list构建
        arr.push(url1+i+'.html');
    }
    return arr;
}

var  addSql = 'INSERT INTO gis_job(gcname,lat,lng,address,city,jobid,jobname,gongzi) VALUES ?';

function getlist(url,callback) {
    //请求每页列表的工作
    request(url,{encoding : null},function (err,res,body){
        if(err){
            console.error(err.message)  ;
            return ;
        }
        var $=cheerio.load(iconv.decode(body, 'gb2312'));

        var listId=$('input[name=\'jobid_list\']')[0].attribs.value.split('~');
         //删除多余id
         listId.splice(49,150);
       //   console.log(listId)
        var list=creatlist('listdetial',null,listId);

         async.mapLimit(list,50,function (url,callback2) {
             getdetail(url,callback,callback2);
         },function (err,result) {
             if(err){
                 console.error(err.message);
                 return ;
             }

             conn.query(addSql,[job_insert],function (err,statu) {
                 if(err){
                     console.error(err.message);
                 }
                 job_insert.slice(0,job_insert.length);
                 console.error(job_insert.length)
                 result[0]();  //每页爬完 回调函数 触发爬取下一页
                 //清空数组
                 job_insert.length=0;
                 console.error(job_insert.length)
                 console.warn(url,'一页爬取完毕') ;
             })
         });
    });
}


function getdetail(url,callback,callback2) {
//请求每个工作的详情
    request(url,{encoding:null},function (err,res,body) {
        if(err){
            console.log(err.message)  
            return ;
        }
        var content=iconv.decode(body, 'gb2312');
        
        var $=cheerio.load(content);
        var opts={};
        opts.jobname= $('.cn h1').text();
        opts.gongzi=  $('.cn strong').text();
        opts.id= $('#hidJobID').val();
        getlocation(url2+opts.id,opts,callback,callback2);
    })
}

//获取每个工作的地址等信息
function getlocation(url,opts,callback,callback2) {
    request(url,{encoding : null},function (err,res,body) {
        if(err){
            console.log(err.message)  ;
            return ;
        }
        var reg=/{.*?}/;

        var content=iconv.decode(body, 'gb2312');

        var $=cheerio.load(content);

        var Jobinfo= new Function("return " + reg.exec($('script[type]').text())[0])();
        var  arr=[]
           delete Jobinfo.name;
           Jobinfo.id=opts.id;
           Jobinfo.jobname=opts.jobname;
           Jobinfo.gongzi=opts.gongzi;
           for(var i in Jobinfo){
               arr.push(Jobinfo[i]);
           }

           job_insert.push(arr);
           console.log(Jobinfo.jobname+'  id:  '+Jobinfo.id+' 工资 ：'+Jobinfo.gongzi+' 公司：' +Jobinfo.tips)
           callback2(null,callback);
    })
}



