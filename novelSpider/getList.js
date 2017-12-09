/**
 * Created by 15879 on 2017/12/3.
 */
var fs=require('fs');
var cheerio=require('cheerio');
var iconv= require('iconv-lite');
var url='https://www.xxbiquge.com/10_10929';
var request=require('request');
var syncrequest = require('sync-request');

  function crawnovel(_url){
    var index=1;
  console.log("hdjfhjs")
    getHtmlByUrl(_url);

    function getHtmlByUrl(href) {
        var  links=[];
        console.log(href)
        request(href, function(err, response, body) {
            console.log(response.statusCode)
            if (!err && response.statusCode == 200) {

                var $ =cheerio.load(body);
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
                    link.link=href+"/"+temp[2];
                    links.push(link);
                })
                // fs.writeFile(links[0].书名+" "+links[0].作者+"-list.json",JSON.stringify(links),function(err){
                //     if(!err){
                //         console.log("写入章节网址成功！！")
                //     }
                // })
                getContent(links[index],links);

            } else {
                console.log('get page error url => ' + href);
            }
        });
    }
//
//根据链接请求每页的html
//
    var count=0;
    function getContent(chapter,links){
        var temp=links;
        console.log(chapter.title+" 正在请求.......");
        //   var html= syncrequest('get',chapter.link).getBody().toString();
        request(chapter.link, function(err, response, body) {
            if(err){
                count++;
                console.log(err.message)
                console.log("q请求"+chapter.link+"错误了 正在尝试第"+count+"/7次请求");
                if(count<8&&temp!==undefined){
                    getContent(temp[index]);
                }else {
                    console.log("q请求"+chapter.link+"错误了7次请求后均失败，跳过该章节");
                    index++;
                    getContent(temp[index]);
                }
            }else {
                getToc(body,temp);
            }
        });
        //  getToc(html);
    }

//解析请求到的章节html成文本 写入txt文件
    function getToc(html,links){
        var temp=links;
        if(html===undefined){
            console.log("7次请求均失败，跳过该章节");
            index++;
            if(index<temp.length){
                getContent(temp[index]);
            }

        }else {
            var $ =cheerio.load(html);
            var info=$("title").text().split('-');
            console.log(info)
            console.log(info[0]+" 解析中.....")
            var content=$("#content").text().replace(/\&nbsp;/g, '').split('    ');

            if(fs.existsSync(info[1]+".txt")){
                fs.appendFileSync(info[1]+".txt"," ### "+ info[0]+"\r\n\r\n");

                for(var i=0;i<content.length;i++){
                    fs.appendFileSync(info[1]+".txt","  "+content[i]+"\r\n");
                }
                console.log(info[1]+" 章节写入txt完成");
                fs.appendFileSync(info[1]+".txt","\r\n\r\n");
                index++;
                if(index<links.length){
                    getContent(temp[index],temp);
                }
            }else {
                fs.writeFileSync(info[1]+".txt"," ### "+info[0]+"\r\n\r\n");
                for(var i=0;i<content.length;i++){
                    fs.appendFileSync(info[1]+".txt","  "+content[i]+"\r\n");
                }
                console.log(info[1]+" 章节写入txt完成");
                fs.appendFileSync(info[1]+".txt","\r\n\r\n");
                index++;
                if(index<links.length){
                    getContent(links[index],temp);
                }
            }
        }
    }

    function getNovelUrl(kw){
        var seachUrl="http://zhannei.baidu.com/cse/search?q="+kw+"&p=0&s=5199337987683747968";
        console.log(seachUrl)
        request(seachUrl,function(err, response, body) {
            if(err){
                console.log("错误搜搜",err.message);
                getNovelUrl("武动乾坤");
            }
            if(body===undefined){
                getNovelUrl("武动乾坤");
            }else {

                var $ = cheerio.load(body);
                console.log(body);
                // console.log($("#center .result-list .result-game-item-pic").find("a"))
            }
        });

    }
}

//getNovelUrl("大主宰");

crawnovel(url);
crawnovel('https://www.xxbiquge.com/65_65378');
crawnovel('https://www.xxbiquge.com/77_77665');
crawnovel('https://www.xxbiquge.com/76_76187');
crawnovel('https://www.xxbiquge.com/0_494');
crawnovel('https://www.xxbiquge.com/65_65836');
crawnovel('https://www.xxbiquge.com/10_10156');
crawnovel('https://www.xxbiquge.com/0_576');
crawnovel('https://www.xxbiquge.com/66_66175');
crawnovel('https://www.xxbiquge.com/3_3519');

