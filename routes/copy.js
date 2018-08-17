/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/30  10:58
 **/
var readline=require('readline');
var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var filePath = "E:\\百度云下载\\时间\\时间\\E03+E04.mkv";

//创建readline接口实例
var  rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('file.mkv');

var stat = fs.statSync(filePath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data', function(chunk) {

    passedLength += chunk.length;

    if (writeStream.write(chunk) === false) {
        readStream.pause();
    }
});

readStream.on('end', function() {
    writeStream.end();
});

writeStream.on('drain', function() {
    readStream.resume();
});

setTimeout(function show() {
    var percent = Math.ceil((passedLength / totalSize) * 100);
    var size = Math.ceil(passedLength /(1024*1024));
    var diff = size - lastSize;
    lastSize = size;

    readline.clearLine();

    out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
    }
}, 500);


