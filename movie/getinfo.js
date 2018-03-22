var get=require('./request_movie_api');
var async=require('async');
var tag='短片'
var url="https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags="+ tag+"&start=";
var set=[];
for(start=0;start<10000;start=start+20){
    set.push(encodeURI(url+start));
}

async.mapLimit(set,5,function(url,callback) {
    get(url,callback);
},function (err,result) {
    if(err){
        console.log('出错')
    }
    console.log(result)
    console.log('完成')
})

