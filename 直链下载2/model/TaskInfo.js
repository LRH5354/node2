var ChunkInfo = require('./ChunkInfo');

function TaskInfo() {
    this._id;
    this._url;
    this._filePath;
    this._connections=32;
    this._totalSize;
    this._supportRange;
    this._downSize;
    this._startTine = 0;
    this._lastTime = 0;
    this._pauseTime = 0;
    this._status;
    this._chunkInfoList;
}

TaskInfo.prototype = {
    get url(){
        return this._url;
    },
    set url(value){
        this._url=value;
    },
    get id() {
        return this._id;
    },
    set id(value) {
        this._id = value;

    },
    get filePath() {
        return this._filePath;
    },
    set filePath(value) {
        this._filePath = value;

    },

    get connections() {
        return this._connections;
    },
    set connections(value) {
        this._connections = value;

    },

    get totalSize() {
        return this._totalSize;
    },
    set totalSize(value) {
        this._totalSize = value;

    },


    get supportRange() {
        return _supportRange;
    },
    set supportRange(value) {
        this._supportRange = value;

    },

    get downSize() {
        return _downSize;
    },
    set downSize(value) {
        this._downSize = value;

    },
    get startTime() {
        return _startTime;
    },
    set startTime(value) {
        this._startTime = value;
    
    },
    get lastTime() {
        return _lastTime;
    },
    set lastTime(value) {
        this._lastTime = value;
    
    },
    get pauseTime() {
        return _pauseTime;
    },
    set pauseTime(value) {
        this._pauseTime = value;
    
    },
    get status() {
        return _status;
    },
    set status(value) {
        this._status = value;

    },

    get chunkInfoList(){
        return this._chunkInfoList;
    },
    set chunkInfoList(value){
       this._chunkInfoList=value;
    },


};

TaskInfo.prototype.buildTaskFilePath = function() {
};

TaskInfo.prototype.buildTaskRecordFilePath = function() {
};

TaskInfo.prototype.buildTaskRecordBakFilePath = function() {
};

TaskInfo.prototype.buildChunkInfoList = function() {
    this.chunkInfoList = new Array();
    for (var i = 0; i < this.connections; i++) {

        var chunkInfo = new ChunkInfo();
        chunkInfo.index = i;
        var chunkSize = Math.floor(this.totalSize / (this.connections - 1));

        chunkInfo.oriStartPosition = i * chunkSize;
        chunkInfo.nowStartPosition = chunkInfo.oriStartPosition;

        if (i === this.connections - 1) {
            chunkSize += this.totalSize % this.connections;
        }

        chunkInfo.endPosition = chunkInfo.oriStartPosition + chunkSize - 1;
        chunkInfo.totalSize = chunkSize;
        this.chunkInfoList.push(chunkInfo);
    }

    return this.chunkInfoList;
};

TaskInfo.prototype.reset = function() {
    this.startTime = this.lastTime = this.pauseTime = this.downSize = 0;
    chunkInfoList.forEach((chunkInfo) => {
        chunkInfo.startTime = 0;
        chunkInfo.lastTime = 0;
        chunkInfo.pauseTime = 0;
        chunkInfo.downSize = 0;
        chunkInfo.errorCount = 0
    })

};

TaskInfo.prototype.refresh = function(chunkInfo) {
    this.lastTime = new Date().getTime();
    chunkInfo.lastTime = this.lastTime;

};

module.exports=TaskInfo;