var util = require('./util/HttpDownUtil');
url = 'https://www.baidupcs.com/rest/2.0/pcs/file?method=batchdownload&app_id=250528&zipcontent=%7B%22fs_id%22%3A%5B683922095022805%5D%7D&sign=DCb740ccc5511e5e8fedcff06b081203:2YRe%2B1on6OFzqCiLnQdEE363ryc%3D&uid=3007448498&time=1534575130&dp-logid=5302333297471240382&dp-callid=0&vuk=3007448498';

var start = async() => {
    try {
        var task = await util.getTaskInfo(url);
        console.log(task)
        var  chunkInfoList = task.buildChunkInfoList();
     
        util.getAllChunkRes(task).then((arr)=>{
        	console.log(arr)
        })

    } catch (e) {
        throw e;
    }

}


start()