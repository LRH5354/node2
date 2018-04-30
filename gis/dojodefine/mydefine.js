/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/22  9:47
 **/
/**
 * @author  15879
 * @create  2018/4/22 10:36
 * @desc  自定义模块
 **/
define(["dojo/_base/declare"],function (declare) {
    var myfunction=function () {
        console.log('自定义模块')
    }
    return {
        myfunction:myfunction,
        attr:'5555'
    };

})