var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();  //实例化一个eventEmitter对象
ee.setMaxListeners(20);
ee.on("someEvent", function () { console.log("event 1"); });
ee.on("someEvent", function () { console.log("event 2"); });
ee.on("someEvent", function () { console.log("event 3"); });
ee.on("someEvent", function () { console.log("event 4"); });
ee.on("someEvent", function () { console.log("event 5"); });
ee.on("someEvent", function () { console.log("event 6"); });
ee.on("someEvent", function () { console.log("event 7"); });
ee.on("someEvent", function () { console.log("event 8"); });
ee.on("someEvent", function () { console.log("event 9"); });
ee.on("someEvent", function () { console.log("event 10"); });
ee.on("someEvent", function () { console.log("event 11"); });

//以上的是给特定的触发器提供 处理函数

ee.emit("someEvent");//触发函数  这个是定制事件的人写好
