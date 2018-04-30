/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/27  14:01
 **/
var multipart = require('connect-multiparty');
var util=require('util');
var express = require('express');
var router = express.Router();
var path=require('path');
var fs=require('fs');
var formidable=require('formidable')
var mault=require('./parse.js')
var t;
/* GET welcome listing. */
router.post('/',function(req, res, next) {
    t=res;
   // console.log(req.body,req.files.file[0]);
   //  var chunk='';
   //
   //  req.on('data',function (e) {
   //      chunk=chunk+e;
   //  })
   //  req.on('end',function () {
   //    //console.log(chunk)
   //  })
   //  //next(req,res)
   // form.parse(req);
    mault.init(req,res)
    
});


var form = new formidable.IncomingForm();
var post = {},
    file = {};
form.uploadDir = './temp';  //文件上传 临时文件存放路径

form.on('error', function(err) {
    console.log(err); //各种错误
})
//POST 普通数据 不包含文件 field 表单name value 表单value
    .on('field', function(field, value) {
    //    console.log(field)
        if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
            if (field in post) { //同名表单 checkbox 返回array 同get处理
                if (util.isArray(post[field]) === false) {
                    post[field] = [post[field]];
                }
                 post[field].push(value);
                return;
            }
        }
        post[field] = value;
    })
    .on('file', function(field, file) { //上传文件
          console.log(file)
        file[field] = file;
        console.log(file.path,file.name)
        fs.rename(file.path, 'F:/gitload/node2/bin/temp' + '/' + file.name,function (err) {
            if(err){
                console.log(err)
                return ;
            }
        });

    })
    .on('end', function() {
        console.log('完毕')  ; //解析完毕 做其他work
        t.end();
    });




module.exports = router;