webpackJsonp([8],{634:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody, html {    \r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\t\t.drawingToolbar{\r\n\t\t\tcolor: #666;\r\n\t\t\tbackground: #fff;\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\twidth: auto;\r\n\t\t\ttop: 10px;\r\n\t\t\tleft:10px;\r\n\t\t\tline-height: 1;\r\n\t\t\theight: auto;\r\n\t\t\tpadding: 15px;\r\n\t\t}\r\n\t\tlabel{\r\n\t\t\tdisplay: block;\r\n\t\t\tmargin-bottom: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n<body>\r\n\t<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"><\/script>\r\n\t<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<div id="map" style="width:100%;height:100%;"></div>\r\n\t<div class="drawingToolbar">\r\n\t\t<div class="getCity">\r\n\t\t\t<label>左击获取城市信息：</label>\r\n\t\t\t<textarea rows="3" cols="50" class="cityBox"></textarea>\r\n\t\t</div>\r\n\t</div>\r\n</body>\r\n</html>\r\n<script type="text/javascript">\r\n\tvar map;\r\n\tvar cityBox = $(\'.cityBox\');\r\n\t//创建和初始化地图函数：\r\n    function initMap(){\r\n      createMap();//创建地图\r\n\t  setMapEvent();//设置地图事件\r\n    };\r\n    function createMap(){ \r\n      map = new BMap.Map("map"); \r\n      map.centerAndZoom(new BMap.Point(120.137323,30.232054),12);\r\n    };\r\n\tfunction setMapEvent(){\r\n\t\tmap.addEventListener(\'click\',clickFun);\r\n\t};\r\n\tfunction clickFun(e){\r\n\t\tvar point = new BMap.Point(e.point.lng,e.point.lat);\r\n\t\tvar gc = new BMap.Geocoder();\r\n\t\tgc.getLocation(point, function(rs) {\r\n\t\t\tcityBox.val(JSON.stringify(rs));\r\n\t\t})\r\n\t}\r\n    initMap();\r\n\r\n<\/script>'}});