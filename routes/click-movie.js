/**
 * Created by 15879 on 2017/12/1.
 */
var express = require('express');
var router = express.Router();
var cheerio=require('cheerio');
var request=require('request');

/* GET welcome listing. */

router.get('/', function(req, res, next) {
    gethtml(req, res,encodeURI('http://www.btbtdy.com/search/'+req.query.title+'.html'));
});

function gethtml(req, resp,url) {
    request(url,function (err,res,body) {
        if(err){
            console.log(err.message)
        }
        var $=cheerio.load(body);
        var results=[];

        $('body dl').each(function () {
            var info={};

            var $p= $(this).find('p');

            info.cover=$($(this).find('img')).attr('data-src');
            info.tag=$($(this).find('dd span')).text();
            info.url='http://www.btbtdy.com/'+ $($(this).find('.so_pic')).attr('href');
            info.name=$($($p[0]).find('a')).attr('title');
            info.ra=$($p[1]).text();
            info.cast=$($p[2]).text();
            info.about=$($p[3]).text();
            results.push(info);
        })
        if(results.length===0){
            resp.render('seach-results',{info:results,
                                         title:req.query.title,
                                         status :'none'})
        }else{
            resp.render('seach-results',{info:results,
                title:req.query.title,
                status:'ok'})
        }
    })
}

module.exports = router;