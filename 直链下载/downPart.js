var request = require('request');
var path = require('path');
var fs = require('fs');

var i = 0
module.exports = {
    downFile: function(url, from, to, dir, index, callback) {

        var opt = {
            url: `${url}`,
            headers: {
                Range: `bytes=${from}-${to-1}`
            }
        }

        var dir = `/${dir}`;

        var stream = fs.createWriteStream(path.join(checkFilePath(dir), `pack.zip`), { start: from })

        request(opt)
            .on('response', (res) => {
                console.log(res.statusCode)
                // res.on('data', (data) => {
                //        stream.write(data)
                //    })

            })
            .pipe(stream)
            .on('close', () => {
                console.log('close', i++);
                callback === 'undefined' ? null : callback();
            })
            .on('error', () => {
                throw new error('出错！！！')
            })
    },

    getFileInfo: function(url) {

        var opt = {
            url: `${url}`,
            headers: {
                Range: 'bytes=0-1'
            }
        }
        return new Promise((resolve, reject) => {
            request(opt, (err, res, body) => {
                if (err) {
                    console.log(err.message)
                }
                var fileInfo = {
                    length: res.headers['content-length'], //文件的字节长度
                }

                resolve(fileInfo)
            })
        })


    }
}



function checkFilePath(p) {
    var dirPath = path.join(__dirname, p);
    try {
        fs.accessSync(dirPath, fs.F_OK);
    } catch (e) {
        fs.mkdirSync(dirPath)
    }

    return dirPath;
}