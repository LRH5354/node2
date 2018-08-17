var request = require('request');
var path = require('path');
var fs = require('fs');
var ProgressBar = require('progress');
const readline = require('readline');
// 引入工具模块
var ProgressBar2 = require('./progress-bar');
var pb = new ProgressBar2('下载进度', 50);
var loaded = 0;
var lianJieShu = 0;
var lianJieShu_OK = 0;
var i = 0
var download = {
    downFile: function(url, from, to, dir, index, jiange, duanshu) {

        return new Promise((resolve, reject) => {
            var opt = {
                url: `${url}`,
                encoding: null,
                headers: {
                    Range: `bytes=${from}-${to-1}`,
                    Connection: 'keep-alive'
                }
            }

            var dir = `${'百度云'}`;


            var stream = fs.createWriteStream(path.join(checkFilePath(dir), `pack.zip`), { start: from })

            var req = request(opt);

            req.on('response', (res) => {
                var len = res.headers['content-range']
                if (res.statusCode == '206') {
                    lianJieShu++;
                    lianJieShu_OK++;
                    console.log(len);
                    console.log('\n');

                    res.on('data', (data) => {
                            stream.write(data)
                            loaded = loaded + data.length;
                            pb.render({ completed: loaded, total: res.headers['content-length'] });

                            console.log('\n')
                            console.log('链接情况 (连接数：' + duanshu + '）（现有链接/链接成功）：' + lianJieShu + '/' + lianJieShu_OK)
                        })
                        .on('end', () => {
                            console.log('end');
                            lianJieShu--;
                            resolve();
                        })
                        .on('error', () => {
                            throw new error('出错！！！')
                        })
                } else {
                    console.warn('链接不成功 状态码：', res.statusCode);
                    console.log('重新尝试下载。。。。。');
                    download.downFile(url, from, to, dir, index, jiange, duanshu)
                }


            })

        })

    },

    getFileInfo: function(url) {

        var opt = {
            url: `${url}`,
            encoding: null,
            headers:{
                Range: 'bytes=11-12'
            }
        }
        return new Promise((resolve, reject) => {
          var req=  request(opt, (err, res, body) => {
                if (err) {
                    console.log(err.message)
                }
                var fileInfo = {
                    length: res.headers['content-length'], //文件的字节长度
                }
                resolve(fileInfo)
                console.log(body)
            })
            req.on('response',(res)=>{
                console.log(res.headers)
            })
        })

    },

    //队列循环执行操作
    queueDown: function(form, duanShu) {
        var promise = Promise.resolve('初始化')
        var jianGe = Math.ceil(form.length / duanShu);

        for (var i = 0; i <= (duanShu - 1); i++) {
            (function u(i) {
                promise = promise.then(() => {
                    return download.downFile(form.url, i * jianGe, (i + 1) * jianGe, 'data', i, jianGe);
                })

            })(i)
        }

        return promise;
    },
    //根据段数同时进行下载
    asyncDown: function(form, duanShu) {
        var promise = [];
        var jianGe = Math.ceil(form.length / duanShu);
        for (var i = 0; i <= (duanShu - 1); i++) {
            promise.push(download.downFile(form.url, i * jianGe, (i + 1) * jianGe, '百度云', i, jianGe, duanShu))
        }

        return Promise.all(promise)

    }
}

module.exports = download;

function checkFilePath(p) {
    var dirPath = path.join(__dirname, p);
    try {
        fs.accessSync(dirPath, fs.F_OK);
    } catch (e) {
        fs.mkdirSync(dirPath)
    }

    return dirPath;
}