var TaskInfo = require('../model/TaskInfo');
var UUID = require('../util/UUID');
var HttpHeadsInfo = require('../model/HttpHeadsInfo');
var request = require('request');
var URL = require('url');

module.exports = {
    //获取TaskInfo 对象
    getTaskInfo: function(url) {
        var taskInfo = new TaskInfo();
        return this.getResponse(url, 0, 0, 'task')
            .then((res) => {
                return new Promise((resolve, reject) => {
                    taskInfo.url = url;
                    taskInfo.id = UUID(13, 16);
                    taskInfo.filename = this.getDownFileName(res.headers);
                    taskInfo.totalSize = this.getDownFileSize(res.headers);
                    if (res.statusCode === '206') {
                        taskInfo.supportRange = true;
                    }
                    resolve(taskInfo);
                })
            })
    },

    getAllChunkRes: function(TaskInfo) {
        var chunkInfoList = TaskInfo.chunkInfoList;
        var promiseAll = [];
        for (var i = 0; i < chunkInfoList.length; i++) {
            promiseAll.push(this.getResponse(TaskInfo.url, chunkInfoList[i].nowStartPosition, chunkInfoList[i].endPosition), 'chunk')
        }
        return Promise.all(promiseAll);
    },

    getResponse: function(url, start, end, type) {
        var u = new URL.URL(url)
        var headsInfo = new HttpHeadsInfo();
        headsInfo.add("Host", u.host);
        headsInfo.add("Connection", "keep-alive");
        headsInfo.add("Upgrade-Insecure-Requests", "1");
        headsInfo.add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36");
        headsInfo.add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        headsInfo.add("Referer", u.host);
        headsInfo.add("Accept-Encoding", "gzip, deflate, br");
        headsInfo.add("Accept-Language", "zh-CN,zh;q=0.9");
        headsInfo.add('Range', `bytes=${start}-${end}`);
       
        var opt = {
            url: url,
            encoding: null,
            headers: headsInfo.getHeaders()
        }
      
        if (type === 'task') {
            return new Promise((resolve, reject) => {
              console.log('task 请求')
              request(opt).on('response',(res)=>{
                resolve(res);
             })
         })
         } else if (type === 'chunk') {
            return new Promise((resolve, reject) => {
                 console.log('chunk 请求')
                 request(opt).on('response',(res)=>{
                    resolve(res)
                 })
            })
        }

    },

    getDownFileName: function(resheaders) {
        var disposition = resheaders['content-disposition']
        var Regx = /^.*filename\\*?=\"?(?:.*'')?([^\"]*)\"?$/;
        var filename = disposition.match(Regx)[1];
        return filename === undefined ? "未知文件.xxx" : filename;
    },

    getDownContentSize: function(resheaders) {
        var contentRange = resheaders['content-range'];
        if (contentRange !== undefined) {
            var regx = /^[^\\d]*(\\d+)-(\\d+)/;
            var match = contentRange.match(regx);
            return parseInt(match[2] - match[1] + 1);
        } else {
            var contentlength = resheaders['content-length'];
            if (contentlength !== undefined) {
                return parseInt(contentlength);
            }
        }
        return 0;
    },

    getDownFileSize: function(resheaders) {
        var contentlength = resheaders['content-length'];
        if (contentlength !== undefined) {
            return parseInt(contentlength);
        }
        return 0;
    },

}