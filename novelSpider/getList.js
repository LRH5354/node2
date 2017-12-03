/**
 * Created by 15879 on 2017/12/3.
 */
var fs=require('fs');
var cheerio=require('cheerio');
var iconv= require('iconv-lite');
var url='https://www.xxbiquge.com/0_142';
var request=require('request');
var syncrequest = require('sync-request');
var index=1;
var  links=[];
function getHtmlByUrl(href) {
    request(href, function(err, response, body) {
      console.log(response.statusCode)
        if (!err && response.statusCode == 200) {

             var $ =cheerio.load(body);
             links=[];
             var info=new Object();
             info.作者=$("#info p").eq(0).text().split("：")[1];
             info.书名=$("#info h1").text();
             //存入小说信息
             links.push(info);
            //存入章节网址 供以后访问
             $("#list a").each(function (i,elem) {
                 var link=new Object();
                 link.title=$(this).text();
                 var temp=$(this).attr('href').split("/");
                 link.link=url+"/"+temp[2];
                links.push(link);
             })


         if(index<links.length){
             getContent(links[index]);
         }



           // fs.writeFile("list.json",JSON.stringify(links),function(err){
           //       if(!err){
           //           console.log("写入章节网址成功！！")
           //      }
           //   })

        } else {
            console.log('get page error url => ' + href);
        }
    });
}

function getContent(chapter){
    console.log(chapter.title+" 正在请求.......")
  //   var html= syncrequest('get',chapter.link).getBody().toString();
     request(chapter.link, function(err, response, body) {
         if(err){
             console.log(err.message)
         }

         getToc(body)
    });
  //  getToc(html);
}

//解析请求到的章节成文本 写入txt文件
function getToc(html){

    var $ =cheerio.load(html);
    var info=$("title").text().split('-');
      console.log(info[0]+" 解析中.....")
      var content=$("#content").text().replace(/\&nbsp;/g, '').split('    ');

      if(fs.existsSync(info[1]+".txt")){
          fs.appendFileSync(info[1]+".txt","###"+info[0]);

          for(var i=0;i<content.length;i++){
              fs.appendFileSync(info[1]+".txt",content[i]);
          }
          console.log(info[0]+" 章节写入txt完成")
          index++;
          if(index<links.length){
              getContent(links[index]);
          }
      }else {
          fs.writeFileSync(info[1]+".txt","###"+info[0]);
          for(var i=0;i<content.length;i++){
              fs.appendFileSync(info[1]+".txt",content[i]);
          }
          console.log(info[0]+"章节写入完成");
          index++;
          if(index<links.length){
              getContent(links[index]);
          }
      }
}

getHtmlByUrl(url);
