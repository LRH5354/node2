/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/10  16:12
 **/
require([
    "esri/map",
    "esri/toolbars/draw",
    "esri/geometry/Point",

    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/PictureFillSymbol",
    "esri/symbols/CartographicLineSymbol",

    "esri/graphic",
    "esri/InfoTemplate",

    "esri/renderers/SimpleRenderer",

    "esri/layers/FeatureLayer",

    "dojo/query",
    "dojo/_base/Color",
    "dojo/dom",
    "dojo/on",
    "esri/dijit/InfoWindow",
    "esri/dijit/Popup",
    "dojo/dom-construct",

    "dojo/domReady!"
], function( Map,
             Draw,
             Point,
             SimpleMarkerSymbol,
             SimpleFillSymbol,
             SimpleLineSymbol,
             PictureMarkerSymbol,
             PictureFillSymbol,
             CartographicLineSymbol,
             Graphic,
             InfoTemplate,
             SimpleRenderer,
             FeatureLayer,
             query,
             Color,
             dom,
             on,
          InfoWindow,
             Popup,
             domConstruct) {
    console.log(window.location.host)

    var myMap = Map("map");
    var myTiledMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/map/Map_SCAU/MapServer/");
        // myTiledMapServiceLayer.setVisibleLayers([24]);
         myMap.addLayer(myTiledMapServiceLayer);
      var myfeatureLayer=new FeatureLayer('http://localhost:6080/arcgis/rest/services/map/Map_SCAU/MapServer/24',{
          mode:FeatureLayer.MODE_SNAPSHOT,
          outFields:["*"],
         // infoTemplate:new InfoTemplate('属性：',"${*}")
      });

      var  defaultsymbol=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,255,255,0.35]),1),
          new Color([125,125,125,0.35]));
     //  myfeatureLayer.setRenderer(new SimpleRenderer(defaultsymbol));

      var  hightSymbol=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), new Color([255,125,125,0.35])));

       myfeatureLayer.setRenderer(new SimpleRenderer(defaultsymbol));

    //  myMap.addLayer(myfeatureLayer);

      myfeatureLayer.on('mouse-over',function (evt) {
          myMap.graphics.clear()
          evt.graphic.setInfoTemplate(new InfoTemplate('属性','${*}'));
          myMap.infoWindow.setTitle(evt.graphic.getTitle());
          myMap.infoWindow.setContent(evt.graphic.getContent());
         var graphic=new Graphic(evt.graphic.geometry,hightSymbol)
          myMap.infoWindow.show(evt.mapPoint);
          myMap.graphics.add(graphic);

      });

    myTiledMapServiceLayer.on('click',function (e) {
        console.log(e)
    })

         myMap.on('load',function () {
         var toolbar = new Draw(myMap);

            //toolbar.activate(Draw.POINT);
            myMap.graphics.on("mouse-over",function (e) {
            })
            // myMap.on('click',function (e) {
            //    var pt = new Point(e.mapPoint.x,e.mapPoint.y,myMap.spatialReference)
            //    var sms = new SimpleMarkerSymbol().setColor(new Color([250,0,0,0.5])).setSize(12);
            //    var attr={'x':e.mapPoint.x,'y':e.mapPoint.y,'name':'测试'};
            //    var info=new InfoTemplate('属性','${x}')
            //    var graphic = new Graphic(pt,sms,attr,info);
            //    myMap.graphics.add(graphic);
            //
            // });


            myMap.on('dbl-click',function (e) {

                var sfs = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([111, 0, 255]),
                        2
                    ),
                    new Color([111, 0, 255, 0.15])
                );
                var iw = new Popup({
                    fillSymbol: sfs
                },domConstruct.create('div'));
                var emailLink = domConstruct.create("a", {
                    "class": "action",
                    "innerHTML": "Email Map",
                    "href": "javascript:void(0);"
                }, query(".actionList", iw.domNode)[0]);

                iw.setMap(myMap);
                iw.setTitle('test');
                iw.setContent('cjjfjskd')
                iw.show(e.mapPoint);
                console.log(iw);
                console.log(myMap.infoWindow)

            });

            toolbar.on('draw-end',function (e){

                var pfs = new PictureMarkerSymbol('https://p.upyun.com/docs/cloud/demo.jpg', 100, 100);
                var attr={'x':2,'y':5,'name':'测试'};
                var info=new InfoTemplate('属性')
                var graphic=new Graphic(e.geometry,pfs,attr).setInfoTemplate(info);
                myMap.graphics.add(graphic);

                toolbar.deactivate();
            });

    })


});


function getcookie(name) {
    var cookies=document.cookie.split(';');
    for(var i=0;i<cookies.length;i++){
        var cookiename=cookies[i].split('=')[0];
        var value=cookies[i].split('=')[1];
        if(name==cookiename){
            return value;
        }
    }
    return false;
}