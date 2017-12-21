webpackJsonp([27],{589:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\r\n\t\t/**\r\n\t\t*修改地图infowindow样式\r\n\t\t*/\r\n\r\n\t\t.BMap_pop div:nth-child(1) div:nth-child(1) {\r\n\t\t\tborder-radius: 7px 0 0 0;\r\n\t\t}\r\n\r\n\t\t.BMap_pop div:nth-child(3) div:nth-child(1) {\r\n\t\t\tborder-radius: 0 7px 0 0;\r\n\t\t}\r\n\r\n\t\t.BMap_pop div:nth-child(5) div:nth-child(1) {\r\n\t\t\tborder-radius: 0 0 0 7px;\r\n\t\t}\r\n\r\n\t\t.BMap_pop div:nth-child(7) div:nth-child(1) {\r\n\t\t\tborder-radius: 0 0 7px 0;\r\n\t\t}\r\n\r\n\t\t.BMap_pop div:nth-child(8) img {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\r\n\t\t.BMap_pop div:nth-child(8) {\r\n\t\t\tmax-height: 40px;\r\n\t\t\theight: 40px!important;\r\n\t\t\tbackground: url(\'http://image.tf56.com/dfs/group1/M00/41/7C/CiFBClokrmSAEtPXAABZohwMOmY448.png\') -204px -691px;\r\n\t\t}\r\n\r\n\t\t.BMap_shadow {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\r\n\t\t.BMap_pop>img {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<script src="https://libs.baidu.com/jquery/1.9.0/jquery.js"><\/script>\r\n\t<div id="map"></div>\r\n</body>\r\n\r\n</html>\r\n<script>\r\n\tvar map;\r\n\tvar icon = \'http://image.tf56.com/dfs/group1/M00/39/80/CiFBClnlv4qAFihjAAACvsfc7-g019.png\';\r\n\tvar points = [{\r\n\t\t"name": "北京天安门",\r\n\t\t"lng": 116.403694,\r\n\t\t"lat": 39.916042,\r\n\t\t"address": "北京市东城区东长安街",\r\n\t\t"desc": "天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门..."\r\n\t}];\r\n\t//创建和初始化地图函数：\r\n\tfunction initMap() {\r\n\t\tmap = new BMap.Map("map", { enableMapClick: false });\r\n\t\tmap.centerAndZoom(new BMap.Point(116.404125, 39.91488), 13);\r\n\t\tmap.enableScrollWheelZoom();\r\n\r\n\t\taddMarker();\r\n\t};\r\n\tinitMap();\r\n\r\n\t//添加覆盖物\r\n\tfunction addMarker() {\r\n\t\tpoints.forEach(function (v, i) {\r\n\t\t\tvar marker;\r\n\t\t\tmarker = addNewMarker(v, icon);\r\n\t\t\tmap.addOverlay(marker);\r\n\t\t});\r\n\t};\r\n\r\n\tfunction addNewMarker(data, icon) {\r\n\t\tvar point = new BMap.Point(data.lng, data.lat);\r\n\t\tvar icon = new BMap.Icon(icon, new BMap.Size(22, 32), {\r\n\t\t\tanchor: new BMap.Size(10, 30),\r\n\t\t\timageOffset: new BMap.Size(0, 0)\r\n\t\t});\r\n\t\tvar mkr = new BMap.Marker(point, { icon: icon });\r\n\t\tmkr.data = data;\r\n\t\tmkr.addEventListener("click", addClickHandler);\r\n\t\treturn mkr;\r\n\t}\r\n\r\n\tfunction addClickHandler(e) {\r\n\t\tvar mkr = e;\r\n\t\tif (e.currentTarget) {\r\n\t\t\tmkr = e.currentTarget;\r\n\t\t}\r\n\t\tmkr.setTop(true);\r\n\t\tvar pt = mkr.getPosition();\r\n\t\topenInfo(mkr);\r\n\t}\r\n\tfunction openInfo(mkr) {\r\n\t\tvar data = mkr.data;\r\n\t\tvar infoWindow = createInfoWindow(data);\r\n\t\tmkr.openInfoWindow(infoWindow);\r\n\t}\r\n\tfunction createInfoWindow(data) {\r\n\t\tvar content =\r\n\t\t\t"<div>" +\r\n\t\t\t"<p>地&emsp;址：" +\r\n\t\t\tdata.address +\r\n\t\t\t"</p>" +\r\n\t\t\t"</div>";\r\n\t\tvar opts = {\r\n\t\t\twidth: 300,\r\n\t\t\theight: 0,\r\n\t\t\toffset: {\r\n\t\t\t\twidth: -16,\r\n\t\t\t\theight: -20\r\n\t\t\t},\r\n\t\t\ttitle: data.name\r\n\t\t};\r\n\t\tvar infoWindow = new BMap.InfoWindow(content, opts);\r\n\t\treturn infoWindow;\r\n\t}\r\n\t//清除覆盖物\r\n\tfunction remove_overlay() {\r\n\t\tmap.clearOverlays();\r\n\t}\r\n\r\n<\/script>'}});