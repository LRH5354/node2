/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/30  15:01
 **/
/*

函数
 函数也是对象的一种 是比较特殊的一种（存在一个被称为[[Call]]的内部属性）
 */

var obj={
    name:'lirunhua'
};
var myFunction=function (a,v,d) {
    this.name=a;
    this.type
}

// console.log(obj);
// console.log(myFunction)
// console.log(Function)
obj['[[Call]]']=undefined

myFunction.prototype.add='fdfdf';

test=new myFunction('dfs');



