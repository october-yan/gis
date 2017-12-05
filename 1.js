webpackJsonp([1],{613:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar {\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 10px;\r\n\t\t\t;\r\n\t\t\tleft: 10px;\r\n\t\t\tright: 10px;\r\n\t\t\twidth: 100%;\r\n\t\t\tline-height: 1;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar a {\r\n\t\t\tfont-size: 14px;\r\n\t\t\tbackground: #fff;\r\n\t\t\tcursor: pointer;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\twidth: auto;\r\n\t\t\tpadding: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<div class="drawingToolbar">\r\n\t\t<a onclick="setCursorType()">设置鼠标样式 +</a>\r\n\t</div>\r\n\t<div id="map" style="width:100%;height:100%;"></div>\r\n</body>\r\n\r\n</html>\r\n<script type="text/javascript">\r\n\tvar map;\r\n\t//创建和初始化地图函数\r\n\tfunction initMap() {\r\n\t\tmap = new BMap.Map("map");\r\n\t\tmap.centerAndZoom(new BMap.Point(120.137323, 30.232054), 12);\r\n\t\tmap.enableScrollWheelZoom();\r\n\t};\r\n\tinitMap();\r\n\r\n\tfunction getCursor(icon) {\r\n\t\treturn \'url(\' + icon + \'), crosshair\';\r\n\t}\r\n\r\n\tfunction setCursor(type) {\r\n\t\tif (!this.map) {\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tthis.map.setDefaultCursor(type);\r\n\t}\r\n\tfunction setCursorType() {\r\n\t\tvar icon = \'https://api0.map.bdimg.com/images/pointer.cur\';\r\n\t\tsetCursor(getCursor(icon));\r\n\t}\r\n<\/script>'}});