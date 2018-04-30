/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/29  15:44
 **/
var  fs=require('fs')
var icon=require('iconv-lite')
var bf=new Buffer([13]);
var stream=fs.createReadStream('test.txt');
var  streamwrite=fs.createWriteStream('write.txt');

//bf[0]=10

// console.log(bf.toString())
// console.log(bf.toJSON())
// console.log(stream)
var str='';
// var bf=new Buffer(0);

stream.on('data',function (e) {
    //console.log(icon.decode(e, 'gbk'))
})
stream.on('end',function (e) {
    console.log('end事件')
})
console.log(stream)

// stream.pipe(streamwrite)
// stream.on('open',function (e) {
//     console.log('open事件')
// })
//
// stream.on('close',function (e) {
//     console.log('close')
// })