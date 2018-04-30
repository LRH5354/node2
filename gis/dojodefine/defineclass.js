/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/22  10:48
 **/
define(["dojo/_base/declare"],function (declare) {
    /**
     * @author  15879
     * @create  2018/4/22 10:52
     * 参数1 继承的父类
     * 参数2 对象散列值  定义类的属性方法 构造函数
     **/
    var myclass=declare(null,{
            id:'fd',
            attr1:'属性',
            constructor:function(name){
            this.id=name;
        },
            showattr:function () {
               //逻辑操作
                return {
                    id:this.id,
                    attr:this.attr1
                }
        }
    })
    
    return myclass;
})