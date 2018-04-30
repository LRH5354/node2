/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/30  10:58
 **/
var readline=require('readline');
var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var filePath = 'F:\\迅雷下载\\The.Cell.2000.Blu-ray.720p.DTS.x264-CHD\\The.Cell.2000.Blu-ray.720p.DTS.x264-CHD.mkv';

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
    var size = Math.ceil(passedLength / 1000000);
    var diff = size - lastSize;
    lastSize = size;

    //process.stdout.write('\u001B[2J\u001B[0;0f');
    readline.clearLine();
    // rl.cursorTo(0);
    out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log();
        console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
    }
}, 500);


//
// var readline=require('readline');
// var out = process.stdout;
// var numOfLinesToClear = 0;
// out.write("1\n");   // prints `1` and new line
// ++numOfLinesToClear;
// out.write("2\n");
// ++numOfLinesToClear;
// readline.moveCursor(0); //move the cursor to first line
// setTimeout(function () {
//     readline.clearLine();
//     readline.cursorTo(0);            // moves the cursor at the beginning of line
//     out.write("3");             // prints `3`
//     out.write("\n4");           // prints new line and `4`
//     console.log();
// }, 1000);
//console.log(readline)
