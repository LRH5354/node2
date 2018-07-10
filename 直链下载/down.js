var request = require('request');
var path = require('path');
var fs = require('fs');
var downLoad=require('./downPart');

var url = 'https://www.baidupcs.com/rest/2.0/pcs/file?method=batchdownload&app_id=250528&zipcontent=%7B%22fs_id%22%3A%5B810459590459985%5D%7D&sign=DCb740ccc5511e5e8fedcff06b081203:SVcpuAVIwgjwhgjPAn0CBzG84Gg%3D&uid=3007448498&time=1531303251&dp-logid=4424044764840546883&dp-callid=0&vuk=3007448498';

// url from to dir index 分别是文件地址 起始位置  终止位置 存放位置 分块文件索引

downLoad.getFileInfo(url).then((info)=>{
	var form={
		length:info.length,
	}
	console.log('获取文件信息成功',form)
	return form;
 })
.then((form)=>{
       var promise=[];
       var jianGe= Math.ceil(form.length/48);
       for (var i = 0; i <=47; i++) {
             promise.push(new Promise((resolve,reject)=>{
             	downLoad.downFile(url,i*jianGe,(i+1)*jianGe,'data',i,resolve)
             }))
       	}

       	Promise.all(promise)
       	.then(()=>{
       		console.log('完成下载')
       	})
       	.catch((err)=>{
           throw err;
       	})
       	 	
 })
  
