/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/10  16:12
 **/

require([
    "esri/map", "esri/geometry/Extent",
    "esri/layers/FeatureLayer", "esri/InfoTemplate",
    "esri/renderers/SimpleRenderer", "dojo/_base/Color",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
    "dojo/domReady!"
], function(dojo,Point, SimpleMarkerSymbol, Color,
            InfoTemplate, Graphic,SimpleFillSymbol,
            SimpleLineSymbol,Draw ) {
    var myMap = new esri.Map("map");
    var myTiledMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/map/Map_SCAU/MapServer/");
    myMap.addLayer(myTiledMapServiceLayer);


myMap.on('load',function () {

    var toolbar = new esri.toolbars.Draw(myMap);
   var ev= toolbar.on('draw-end',function (e) {

        var sfs = new SimpleFillSymbol();
        var graphic=new Graphic(e.geometry,sfs);
        myMap.graphics.add(graphic);

       toolbar.deactivate();
    })
    myMap.on('click',function (e) {
        toolbar.activate(esri.toolbars.Draw.EXTENT);
       var pt = new Point(e.mapPoint.x,e.mapPoint.y,myMap.spatialReference)
       var sms = new SimpleMarkerSymbol().setStyle(
           SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
           new Color([255,0,0,0.5]));
            sms.setSize(12);
       var graphic = new Graphic(pt,sms);
       myMap.graphics.add(graphic);

    })
    myMap.on('mouse-down',function () {

    })


})

});