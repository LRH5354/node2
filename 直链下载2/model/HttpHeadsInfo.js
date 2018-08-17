function HttpHeadsInfo() {
    this.headers = {};
};


// 添加请求头信息 存在覆盖
HttpHeadsInfo.prototype.add = function(name, value) {
    this.headers[name] = value;
    return this;
};

HttpHeadsInfo.prototype.getHeaders = function() {
    return this.headers;
};

HttpHeadsInfo.prototype.clear = function() {
    for (key in this.headers) {
        delete this.headers[key];
    }
    return this;
};

HttpHeadsInfo.prototype.remove = function(name) {
    delete this.headers[name];
    return this;
};


module.exports = HttpHeadsInfo;


