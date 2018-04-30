/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/30  11:35
 **/
/*
原始类型  bool number string null undefined
引用类型  各种对象
类型判断  typeof
鉴别引用类型 instanceof
 */

/**
 * 原始类型
 * @type {string}
 */
//string
var name='RunHuaLi';
var char='a'

//numbers
var count=25;
var cost=1.25

//bool
var flag=true;

//null

var obj=null;

//undefined

var ref=undefined


//类型判断
console.log(typeof name)
console.log(typeof flag)
console.log(typeof ref)
console.log(typeof obj)
console.log(typeof count)

//备注 typeof操作符对number bool string undefined 可以识别 但是对于null对象 会返回object
//所以用下面的===判定是否空引用
console.log(obj===null)

/**
 * 引用类型
 */

/*
引用类型创建
第一种 用new操作符和构造函数  任何函数都可以是构造函数
第二种 字面形式

对象引用解除
将引用赋值为null后 obj=null;
js引擎会自动回收内存中的对象实例

鉴别引用类型 instanceof
 */

var obj= {};
var myFunction=function () {}
var arr=[];
console.log(obj instanceof Array)
console.log(myFunction instanceof Function)
console.log(Array.isArray(arr))

/*
原始封装类型
Number
String
Bool

为了使用方便 js引擎对数字 字符串 布尔类型执行自动化的打包封装
使用完后解除引用
 */
