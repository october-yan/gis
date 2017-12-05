webpackJsonp([15],{599:function(t,n){t.exports="<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n\t<meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\" />\r\n\t<title>地图展示</title>\r\n\t<style type=\"text/css\">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar {\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 10px;\r\n\t\t\t;\r\n\t\t\tleft: 10px;\r\n\t\t\tright: 10px;\r\n\t\t\tline-height: 1;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar a {\r\n\t\t\tfont-size: 14px;\r\n\t\t\tbackground: #fff;\r\n\t\t\tcursor: pointer;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\twidth: auto;\r\n\t\t\tpadding: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type=\"text/javascript\" src=\"https://api.map.baidu.com/api?v=2.0&ak=您的密钥\"><\/script>\r\n\t<script type=\"text/javascript\" src=\"https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.js\"><\/script>\r\n\t<div class=\"drawingToolbar\">\r\n\t\t<a onclick=\"setDrawingPolygon()\">绘制多边形</a>\r\n\t\t<a onclick=\"setDrawingCircle()\">绘制圆形</a>\r\n\t</div>\r\n\t<div class=\"list\">\r\n\t\t<div class=\"listBox\"></div>\r\n\t\t<ul>\r\n\t\t\t<li></li>\r\n\t\t</ul>\r\n\t</div>\r\n\t<div id=\"map\" style=\"width:100%;height:100%;\"></div>\r\n</body>\r\n\r\n</html>\r\n<script type=\"text/javascript\">\r\n\tvar map;\r\n\tvar drawingManager;\r\n\tvar opts = {\r\n\t\tstrokeColor: \"rgb(255, 0, 0)\",    //边线颜色。\r\n\t\tfillColor: \"rgb(227, 0, 0)\",      //填充颜色。当参数为空时，圆形将没有填充效果。\r\n\t\tstrokeWeight: 1,       //边线的宽度，以像素为单位。\r\n\t\tstrokeOpacity: 1,    //边线透明度，取值范围0 - 1。\r\n\t\tfillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。\r\n\t\tstrokeStyle: 'solid' //边线的样式，solid或dashed。\r\n\t};//覆盖物属性\r\n\tvar overlays = [];//多边形点集\r\n\tvar curOverlay = null; // 记录当前绘制的overlay\r\n\tvar drawing = false; //绘图状态\r\n\tvar data = {\r\n\t\tname: '名称',\r\n\t\tdescription: '描述'\r\n\t};//预设填充信息\r\n\r\n\t//创建和初始化地图函数：\r\n\tfunction initMap() {\r\n\t\tcreateMap();//创建地图\r\n\t\tsetMapEvent();//设置地图事件\r\n\t\taddMapControl();//向地图添加控件\r\n\t\taddMapOverlay();//向地图添加覆盖物\r\n\t};\r\n\tfunction createMap() {\r\n\t\tmap = new BMap.Map(\"map\");\r\n\t\tmap.centerAndZoom(new BMap.Point(120.137323, 30.232054), 12);\r\n\t};\r\n\tfunction setMapEvent() {\r\n\t\tmap.enableScrollWheelZoom();\r\n\t\tmap.addEventListener('click', mapClickEvent)\r\n\t};\r\n\tfunction addMapOverlay() {\r\n\t};\r\n\t//向地图添加控件\r\n\tfunction addMapControl() {\r\n\t\tdrawingManager = new BMapLib.DrawingManager(map, {\r\n\t\t\tisOpen: false, //是否开启绘制模式  \r\n\t\t\tenableDrawingTool: false, //是否显示工具栏  \r\n\t\t\tcircleOptions: opts, //圆的样式\r\n\t\t\tpolygonOptions: opts //多边形的样式\r\n\t\t});\r\n\t};\r\n\r\n\tinitMap();\r\n\r\n\tfunction stopPropagation(e) {\r\n\t\te = e || window.event;\r\n\t\tif (e && e.stopPropagation) {\r\n\t\t\te.stopPropagation();\r\n\t\t} else {\r\n\r\n\t\t}\r\n\t}\r\n\r\n\tfunction mapClickEvent(e) {\r\n\t\tif (curOverlay) {\r\n\t\t\tEditing('disable', curOverlay);\r\n\t\t}\r\n\t}\r\n\tfunction setDrawingPolygon() {\r\n\t\tdrawingManager.open();\r\n\t\tdrawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);\r\n\t\tdrawingManager.addEventListener('overlaycomplete', polygonComplete);\r\n\t}\r\n\tfunction setDrawingCircle() {\r\n\t\tdrawingManager.open();\r\n\t\tdrawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);\r\n\t\tdrawingManager.addEventListener('overlaycomplete', circleComplete);\r\n\t}\r\n\r\n\tfunction polygonComplete(e, data) {\r\n\t\tvar pt = getPointInPolygon(e.overlay);\r\n\t\toverlayComplete(e, pt);\r\n\t}\r\n\r\n\tfunction getPointInPolygon(polygon) {\r\n\t\tif (!polygon instanceof BMap.Polygon || !polygon) {\r\n\t\t\treturn;\r\n\t\t};\r\n\t\t//获得中心\r\n\t\tvar bounds = polygon.getBounds();\r\n\t\tvar sw = bounds.getSouthWest();\r\n\t\tvar ne = bounds.getNorthEast();\r\n\t\tvar center = bounds.getCenter();\r\n\t\tif (center) {\r\n\t\t\tvar pt = new BMap.Point(center.lng, center.lat);\r\n\t\t}\r\n\t\treturn pt;\r\n\t}\r\n\r\n\tfunction circleComplete(e) {\r\n\t\toverlayComplete(e, e.overlay.point);\r\n\t}\r\n\r\n\tfunction overlayComplete(e, pt) {\r\n\t\t//设置中心点\r\n\t\tvar o = e.overlay;\r\n\t\tif (!o.data) {\r\n\t\t\to.data = data;\r\n\t\t}\r\n\t\tcurOverlay = o;\r\n\t\tcurOverlay.addEventListener('click', function (e) {\r\n\t\t\tvar target = e;\r\n\t\t\tif (e.target || e.currentTarget) {\r\n\t\t\t\ttarget = e.target || e.currentTarget;\r\n\t\t\t}\r\n\t\t\tdrawing = false;\r\n\t\t\toverlayClick(target, pt);\r\n\t\t});\r\n\t\tdrawing = true;\r\n\t\toverlayClick(o, pt);\r\n\t}\r\n\r\n\r\n\tfunction overlayClick(o, pt) {\r\n\t\tvar content = infoHtml(o.data);\r\n\t\tvar newpt = new BMap.Point(pt.lng, pt.lat);\r\n\t\tinfoWin = new BMap.InfoWindow(content, newpt);\r\n\t\tinfoWin.addEventListener('open', function () {\r\n\t\t});\r\n\t\tmap.openInfoWindow(infoWin, pt);//打开信息窗口\r\n\t\tdrawingManager.close();\r\n\t}\r\n\r\n\tfunction fnOK() {\r\n\t\tvar name = document.getElementById(\"txtName\").value;\r\n\t\tvar description = document.getElementById(\"txtDesc\").value;\r\n\r\n\t\tif (!name) {\r\n\t\t\talert(\"星号字段必须填写\");\r\n\t\t\treturn;\r\n\t\t}\r\n\t\tcurOverlay.data.name = name;\r\n\t\tcurOverlay.data.description = description;\r\n\r\n\t\tif (infoWin.isOpen()) {\r\n\t\t\tmap.closeInfoWindow();\r\n\t\t}\r\n\t\tdrawingManager.close();\r\n\t}\r\n\r\n\tfunction fnEdit() {\r\n\t\tdrawing = true;\r\n\t\tsubmitEdit();\r\n\t}\r\n\r\n\tfunction fnDel() {\r\n\t\tmap.removeOverlay(curOverlay);\r\n\t\tmap.closeInfoWindow();\r\n\t}\r\n\r\n\tfunction submitEdit() {\r\n\t\tEditing('enable', curOverlay);\r\n\t}\r\n\r\n\tfunction Editing(state, overlay) {\r\n\t\tstate == 'enable' ? overlay.enableEditing() : overlay.disableEditing();\r\n\t};\r\n\r\n\tfunction infoHtml(data) {\r\n\t\tvar content = '';\r\n\t\tcontent += \"<table class='table-wrap'>\";\r\n\t\tcontent += \"<tr>\";\r\n\t\tcontent += \"<td width='60px'>*名称：</td>\";\r\n\t\tif (drawing) {\r\n\t\t\tcontent += \"<td width='230px'><input style='width:230px' type='text' id='txtName' value='\" + data.name + \"'></td>\";\r\n\t\t} else {\r\n\t\t\tcontent += \"<td width='230px'>\" + data.name + \"</td>\";\r\n\t\t}\r\n\t\tcontent += \"</tr>\";\r\n\t\tcontent += \"<tr>\";\r\n\t\tcontent += \"<td width='60px'>描述：</td>\";\r\n\t\tif (drawing) {\r\n\t\t\tcontent += \"<td width='230px'><input style='width:230px' type='text' id='txtDesc' value='\" + data.description + \"'></td>\";\r\n\t\t} else {\r\n\t\t\tcontent += \"<td width='230px'>\" + data.description + \"</td>\";\r\n\t\t}\r\n\t\tcontent += \"</tr>\";\r\n\t\tcontent += \"<tr>\";\r\n\t\tcontent += \"<td align='right' colspan='2'>\";\r\n\t\tif (drawing) {\r\n\t\t\tcontent += \"<input type='button' name='btnOK' class='table-btn' onclick='fnOK()' value='确定'>\";\r\n\t\t\tcontent += \"<input type='button' name='btnOK' class='table-btn' onclick='fnDel()' value='删除'>\";\r\n\t\t} else {\r\n\t\t\tcontent += \"<input type='button' name='btnOK' class='table-btn' onclick='fnEdit()' value='编辑'>\";\r\n\t\t\tcontent += \"<input type='button' name='btnOK' class='table-btn' onclick='fnDel()' value='删除'>\";\r\n\t\t}\r\n\t\tcontent += \"</td>\";\r\n\t\tcontent += \"</tr>\";\r\n\t\tcontent += \"</table>\";\r\n\t\treturn content;\r\n\t};\r\n\r\n<\/script>"}});