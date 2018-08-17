function ChunkInfo() {
    this._index;
    this._oriStartPosition;
    this._nowStartPosition;
    this._endPosition;
    this._downSize;
    this._totalSize;
    this._startTime;
    this._lastTime;
    this._pauseTime;
    this._status;
    this._errorCount;
    this._lastDownTime;
}


ChunkInfo.prototype = {

    get index() {
        return this._index;
    },
    set index(value) {
        this._index = value;
    },
    get oriStartPosition() {
        return this._oriStartPosition;
    },
    set oriStartPosition(value) {
        this._oriStartPosition = value;
    },
    get nowStartPosition() {
        return this._nowStartPosition;
    },
    set nowStartPosition(value) {
        this._nowStartPosition = value;
    },
    get endPosition() {
        return this._endPosition;
    },
    set endPosition(value) {
        this._endPosition = value;
    },

    get downSize() {
        return this._downSize;
    },
    set downSize(value) {
        this._downSize = value;
    },

    get totalSize() {
        return this._totalSize;
    },
    set totalSize(value) {
        this._totalSize = value;
    },


    get startTime() {
        return this._startTime;
    },
    set startTime(value) {
        this._startTime = value;
    },

    get lastTime() {
        return this._lastTime;
    },
    set lastTime(value) {
        this._lastTime = value;

    },

    get pauseTime() {
        return this._pauseTime;
    },
    set pauseTime(value) {
        this._pauseTime = value;
    },

    get status() {
        return this._status;
    },
    set status(value) {
        this._status = value;
    },

    get errorCount() {
        return this._errorCount;
    },
    set errorCount(value) {
        this._errorCount = value;
    },

    get lastDownTime() {
        return this._lastDownTime;
    },
    set lastDownTime(value) {
        this._lastDownTime = value;
    },

};

module.exports = ChunkInfo;

