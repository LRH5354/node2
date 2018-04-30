
/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/24  16:13
 **/
define(["dojo/_base/declare","dojo/request/script","dojo/json","dojo/dom"],function(declare,script,JSON,dom){
    return declare(null, {

        ak: null,

        constructor: function(){
            this.ak="WtSZiDjE0KEgfSMsxGY7pxng";
        },

        getLocation: function(opt){

            var point=opt.point;
            var domID=opt.domId;
            var detailed=("detailed" in opt)?opt.detailed:true;              //默认为false，不显示详细地址信息

            var result={};

            script.get("http://api.map.baidu.com/geocoder/v2/?coordtype=wgs84ll&location="+opt.point.getLatitude()+","+opt.point.getLongitude()+"&output=json&pois=1&ak="+this.ak, {
                jsonp: "callback"
              }).then(function(data){

                result["description"]=data.result.sematic_description;
                result["address"]=data.result.formatted_address;

                console.log(result)

                if(detailed){
                    dom.byId(opt.domId).innerHTML=result.address+","+result.description;
                }else{
                    dom.byId(opt.domId).innerHTML=result.description;
                }
            })

        }
    })
})