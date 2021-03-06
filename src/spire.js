/**
 * Created by 15879 on 2017/12/9.
 */
/**
 * Created by 15879 on 2017/12/9.
 */
/**
 * 包引入
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
//var sleep = require('sleep');
var syncrequest = require('sync-request');
/**
 * 定义变量
 */
var i= 0;
var url =  "http://api.map.baidu.com/place/v2/search?query=美食&page_size=50&page_num=0&scope=1&bounds=39.915,116.404,39.975,116.414&output=json&ak=Hmv50bRYfqK7lGvHQEk4bj4cI6nbdbGS";


function fetchPage(x) {
    startRequest(x);

}

function startRequest(x) {
    // 采用http模块向服务器发起一次get求请

    http.get(x, function (res) {
        var html = '';          // 用来存储请求网页的整个html内容
        var titles = [];

        res.setEncoding('utf-8');       // 防止中文乱码
        // 监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });

        // 监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
           console.log(html)
           // console.log(res.buffer)
            // var $ = cheerio.load(html);         // 采用cheerio模块解析html
            // var time = $('.article-info a:first-child').next().text().trim();
            //
            // var news_item = {
            //     // 获取文章的标题
            //     title: $('div.article-title a').text().trim(),
            //     // 获取文章发布的时间
            //     Time: time,
            //     // 获取文章当前的url
            //     link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
            //     // 获取供稿单位
            //     author: $('[title=供稿]').text().trim(),
            //     // i是用来判断获取了多少篇文章
            //     i: i = i + 1,
            // };

            // console.log(news_item);     // 打印新闻信息
            // var news_title = news_item.title;

           // savedContent($, news_title);        // 存储每篇文章的内容及文章标题
           // savedImg($, news_title);            // 存储每篇文章的图片及文章标题

            // 下一篇文章的url
            // var nextLink = "http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            // str1 = nextLink.split('-');         // 去除掉url后面的中文
            // str = encodeURI(str1[0]);

            // 这是亮点之一，中国控制I，可以控制爬取多少篇文章
            // if (i <= 500) {
            //     fetchPage(str);
            // }
        });
    }).on('error', function (err) {
        console.log(err);
    });
}

/**
 * 在本地存储所爬取的新闻内容资源
 *
 * @param $
 * @param news_title
 */
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();
        var y = x.substring(0, 2).trim();

        if (y == '') {
            x = x + '\n';
            // 将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.writeFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }
    });
}

/**
 * 在本地存储所爬取到的图片资源
 *
 * @param $
 * @param news_title
 */
function savedImg($, news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();      // 获取图片的标题
        if (img_title.length > 35 || img_title == "") {
            img_title = "Null";
        }

        var img_filename = img_title + '.jpg';
        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src');     // 获取图片的url

        // 采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src, function (err, res, body) {
            if (err) {
                console.log(err);
            }

            // 通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
            request(img_src).pipe(fs.createWriteStream('./image/' + news_title + '---' + img_filename));
        });
    });
}

fetchPage(url);     // 主程序开始运行