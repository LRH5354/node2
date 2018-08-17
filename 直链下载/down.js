var request = require('request');
var path = require('path');
var fs = require('fs');
var downLoad = require('./downPart');
var readline = require('readline');

var url = 'https://www.baidupcs.com/rest/2.0/pcs/file?method=batchdownload&app_id=250528&zipcontent=%7B%22fs_id%22%3A%5B580096494365883%5D%7D&sign=DCb740ccc5511e5e8fedcff06b081203:mKZkzySMKNOugdEZwvjJ6BAVjL0%3D&uid=3007448498&time=1533967701&dp-logid=5139277735581894537&dp-callid=0&vuk=3007448498'
// url from to dir index 分别是文件地址 起始位置  终止位置 存放位置 分块文件索引

var dir = `/${'百度云'}`;

downLoad.getFileInfo(url).then((info) => {
        var form = {
            url: url,
            length: info.length,
        }
        console.log('获取文件信息成功', form.length)
        return form;
    })
    .then((form) => {
        if (fs.existsSync(path.join(dir, `pack.zip`))) {
            fs.unlinkSync(path.join(dir, `pack.zip`))
        }
      //  return downLoad.asyncDown(form, 32)
    })
    .then(() => {
        console.log('完成')
    })