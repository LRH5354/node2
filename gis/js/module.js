/**
 *作者  15879 -  LRH
 *创建时间 2018  2018/4/24  12:56
 **/
require(["esri/map",

    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/dijit/BasemapGallery",
    "esri/dijit/Bookmarks",
    "esri/arcgis/utils",
    "esri/dijit/Geocoder",
    "esri/dijit/Search",
    "esri/toolbars/draw",
    "esri/InfoTemplate",
    "../js/point.js",
    "dojo/dom",
    "dojo/domReady!",
    ],function(Map,
               ArcGISDynamicMapServiceLayer,
               FeatureLayer,
               BasemapGallery,
               Bookmarks,
               arcgisUtils,
               Geocoder,
               Search,
                Draw,
               InfoTemplate,
               gl,
               dom
                ) {
    var map=new Map('map',{
    basemap:"osm"
    });
    // var myDynamicLayer=new ArcGISDynamicMapServiceLayer('http://localhost:6080/arcgis/rest/services/map/gis_job/MapServer');
    // map.addLayer(myDynamicLayer);

    var myfeatureLayer=new FeatureLayer('http://localhost:6080/arcgis/rest/services/map/gis_job/MapServer/0',{
        mode:FeatureLayer.MODE_SNAPSHOT,
        outFields:['*'],
        infoTemplate:new InfoTemplate('属性：',"${*}")
    })
    map.addLayer(myfeatureLayer);


    var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true,
        map: map
    }, "basemapGallery");


    basemapGallery.startup();

    basemapGallery.on("error", function(msg) {
        console.log("basemap gallery error:  ", msg);
    });

    var s = new Search({
        map: map
    },"search");
    s.startup();

   var gl=new gl();
    map.on("click",
        function(e) {
        console.log(e.mapPoint)  
            console.log(e.mapPoint.getLongitude() + "," + e.mapPoint.getLatitude());
            gl.getLocation({
                point: e.mapPoint,
                domId: "description"
            });

        });

});
