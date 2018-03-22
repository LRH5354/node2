var util = require('util');
function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('hello' + this.name);
    }
}
Base.prototype.showName = function(){
    console.log(this.name);
}
function Sub(){
    this.name = 'sub';
}
util.inherits(Sub,Base);   //定义一个基础对象Base和一个继承自Base的Sub，有三个在构造
//函数内定义的属性和一个原型中定义的函数，通过uril.inherits实现继承。
var objBase = new Base();
objBase.showName();
objBase.sayHello();

console.log(objBase);
console.log('=====================================');

var objSub = new Sub();
//结果显示：sub仅仅继承利Base在原型中定义的函数，而在构造函数内部创造的base属性和sayHello函数都没有被Sub继承
//同时：在原型中的属性不会被console.log作为对象的属性输出。
objSub.showName();
console.log('objSub.name='+objSub.name);
console.log('objSub.base='+objSub.base);
objSub.sayHello();  //不能执行
console.log(objSub);