var util=require('util')
function a() {
    this.name='li',
    this.sayho=function () {
        console.log('a say hi')
    }
}
a.prototype.sayhi=function () {
    console.log('hi')
}
function b() {
this.name='run',
    this.sayhellow=function () {
        console.log('hellow')
    }
}

function c() {

}
util.inherits(c,a);

var d=new c();
console.log(d.sayhi())