webpackJsonp([12],{630:function(n,a){n.exports='<h3 id="-">常见问题</h3>\n<h4 id="1-">1. 关于地图初始化只展示一小块的问题</h4>\n<ul>\n<li>注意如果在初始化地图时，出现了加载异常，只是加载了一小块地图，这种问题通常是容\n器处于隐藏状态导致的，api 会认为地图宽高为 0。<strong>建议等待容器处于可见状态后再初\n始化地图</strong>。</li>\n<li>另外百度地图开放平台提供\n了<a href="http://api.map.baidu.com/lbsapi/createmap/index.html">地图生成器</a>; 可以快速\n创建地图。</li>\n</ul>\n<pre><code class="lang-python">//创建和初始化地图函数：\nfunction initMap(){\n  createMap();//创建地图\n  setMapEvent();//设置地图事件\n  addMapControl();//向地图添加控件\n};\nfunction createMap(){\n    map = new BMap.Map(&quot;map&quot;, {\n        enableMapClick:false //是否开启底图可点功能，默认启用\n    });\n    map.centerAndZoom(new BMap.Point(120.259277,30.233864),12);\n    map.addEventListener(&quot;tilesloaded&quot;, function () {\n        //去掉地图左下解的LOGO与文字\n        $(&#39;.anchorBL&#39;).remove();\n        $(&#39;.BMap_cpyCtrl&#39;).remove();\n    });\n};\nfunction setMapEvent(){\n  map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用\n};\n//向地图添加控件\nfunction addMapControl(){\n    //添加切换城市控件\n    var size = new BMap.Size(10, 20);\n    var cityControl = new BMap.CityListControl({\n        anchor: BMAP_ANCHOR_TOP_LEFT,\n        offset: size,\n        onChangeBefore: function(){},\n        onChangeAfter: function(){},\n        onChangeSuccess: function(){},\n    });\n    map.addControl(cityControl);\n}\n\nvar map;\ninitMap();\n</code></pre>\n<h4 id="2-">2. 根据关键字检索数据进行分页展示的问题</h4>\n<p>根据搜索结果自定义展示分页，在分页的时候需要用 gotoPage 返回数据。注意\n：<strong>gotoPage 分页展示不要跨页太大</strong>，比如现在展示的是第 1 页的数据，如果要直接跨\n页展示最后一页 190 页的数据会出现搜索无响应的现象。</p>\n<pre><code class="lang-python">var resultList = [], city = &#39;杭州&#39;, keyword = &#39;酒店&#39;;\nvar local = new BMap.LocalSearch(city, {renderOptions:{selectFirstResult:false,autoViewport:false}});\nlocal.setPageCapacity(20);//设置页数\nlocal.search(keyword);\nlocal.setSearchCompleteCallback(function(results){\n    if(local.getStatus() == BMAP_STATUS_SUCCESS){\n        for(var i=0; i &lt; results.getCurrentNumPois(); i++){\n            var poi = results.getPoi(i);\n            var pt = {\n                &#39;source&#39;:&#39;baidu&#39;,\n                &#39;name&#39;: poi.title || &#39;&#39;,\n                &#39;address&#39;: poi.address || &#39;&#39;,\n                &#39;lng&#39;: poi.point.lng,\n                &#39;lat&#39;: poi.point.lat\n            };\n            resultList[results.getPageIndex() * 4 + i] = pt;\n            //将resultList展示在页面\n        };\n    });\n});\n\n//搜索结果分页，点击分页获取页码，如：第3页，调用gotoPage(page: Number)\nlocal.gotoPage(pn - 1);\n</code></pre>\n<h4 id="3-">3. 关于地图上鼠标经过时展示此时的坐标信息的控件</h4>\n<p>可以利用添加标注工\n具<a href="http://api.map.baidu.com/library/MarkerTool/1.2/docs/help.html">MarkerTool</a>，\n引入 MarkerTool.js，</p>\n<pre><code class="lang-python">var icon = &#39;http://api.map.baidu.com/library/MarkerTool/1.2/src/images/us_mk_icon.png&#39;;//图标地址\nvar mkrTool = &#39;&#39;;\nfunction mkrToolOpen(){\n    mkrTool = new BMapLib.MarkerTool(map);\n    mkrTool.open();\n    var icon = newIcon(icon);\n    mkrTool.setIcon(icon);\n    return mkrTool\n};\n\nmkrTool.addEventListener(&quot;markend&quot;, function(e) {\n    var mkr = e.marker;\n    mkr.addEventListener(&quot;click&quot;,addClickHandler);\n    mkr.addEventListener(&quot;dragend&quot;,addDragendHandler);\n    addClickHandler(mkr);\n});\n</code></pre>\n<h4 id="4-marker-">4. 如何设置 marker 的图标，并添加点击、拖动事件</h4>\n<p>newIcon 创建新\n的<a href="http://lbsyun.baidu.com/cms/jsapi/class/jsapi_reference.html#a3b5">图标</a>，此\n时要配置好图片的哪个点对应 Marker 的经纬度，配置的方法是调用 Icon 的\nicon.setImageSize(imageSize) 方法。</p>\n<pre><code class="lang-python">function newIcon(icon){\n    return new BMap.Icon(icon, new BMap.Size(21, 21),{\n        anchor: new BMap.Size(6, 21),\n        imageOffset: new BMap.Size(0, 0)\n    });\n};\n\nfunction newMarker(data, icon){\n    var lng = data.lng, lat = data.lat;\n    var pt = new BMap.Point(lng, lat);\n    var opts = icon;\n    var icon = newIcon(opts);\n    var mkr = new BMap.Marker(pt, {icon: icon});\n    mkr.data = data;\n    map.addOverlay(mkr);\n    mkr.addEventListener(&quot;click&quot;,addClickHandler);\n    mkr.addEventListener(&quot;dragend&quot;,addDragendHandler);\n    return mkr\n};\n\nfunction addClickHandler(e){\n    openInfoWin(e);\n};\nfunction addDragendHandler(e){\n    openInfoWin(e);\n};\n</code></pre>\n<p>注意：另外也可以用百度地图\n的<a href="http://api.map.baidu.com/library/RichMarker/1.2/docs/help.html">富 Marker 类</a>,\n可以自定义丰富的 Marker 展现，并添加点击、双击、拖拽等事件。富 Marker 类灵活易用\n，在拖动 marker 的时候弹窗可以自动跟随。但是不能和聚合 marker 一起用，有 bug！！</p>\n<h4 id="5-infowindow-">5. 包含信息的窗口 InfoWindow，如何修改内容和样式？</h4>\n<p>在移动的过程中，如果希望 infoWindow 一直处于打开的状态，可以在 marker 的 dragend\n调用再次打开弹窗的函数。</p>\n<pre><code class="lang-python">//修改弹窗内容\nfunction openInfoWin(e){\n    var mkr = e;\n    if(e.currentTarget){\n        mkr = e.currentTarget;\n    };\n    mkr.enableDragging();//开启移动\n    var data = mkr.data;\n    var con = infoWin(), pt = mkr.getPosition();\n    //信息窗宽度，单位像素。取值范围：0,220-730。如果您指定宽度为0，则信息窗口的宽度将按照其内容自动调整\n    var opts = {\n        width: 0,\n        height: 0,\n        offset:{\n            width: -16,\n            height: -20\n        }\n    };\n    var info = new BMap.InfoWindow(con, opts);\n    info.addEventListener(&#39;open&#39;,function(){\n    });\n    map.openInfoWindow(info,pt);//打开信息窗口\n};\n\nfunction infoWin(data){\n    var content = &#39;&#39;;\n    content += &quot;&lt;table&gt;&quot;;\n    content += &quot;&lt;tr&gt;&quot;;\n    content += &quot;&lt;td&gt;地址：&lt;/td&gt;&quot;;\n    content += &quot;&lt;td&gt;&quot; + data.address + &quot;&lt;/td&gt;&quot;;\n    content += &quot;&lt;/tr&gt;&quot;;\n    content += &quot;&lt;/table&gt;&quot;;\n};\n</code></pre>\n<p>InfoWindow ，此类表示地图上包含信息的窗口，信息窗口有几块拼成，可以根据 class\nBMap_top 定位 child 进行适当的修改</p>\n<pre><code class="lang-python">//修改圆角\n.BMap_pop div:nth-child(1) div:nth-child(1){\n    border-radius:6px 0 0 0 ;\n}\n.BMap_pop div:nth-child(3) div:nth-child(1){\n    border-radius:0 6px 0 0 ;\n}\n.BMap_pop div:nth-child(5) div:nth-child(1){\n    border-radius:0 0 0 6px ;\n}\n.BMap_pop div:nth-child(7) div:nth-child(1){\n    border-radius:0 0 6px 0 ;\n}\n//隐藏阴影\n.BMap_shadow{\n    display: none;\n}\n.BMap_pop div:nth-child(8){\n    background: url(./img/info.png) -204px -691px;//设置底部箭头的图片\n}\n//\n.BMap_pop&gt;img{\n    display: none;\n}\n</code></pre>\n<p>如果不用 infoWindow，也可以用百度地图\n的<a href="http://api.map.baidu.com/library/InfoBox/1.2/docs/help.html">infoBox</a>。类似于\ninfoWindow，比 infoWindow 更有灵活性，可以定制 border，关闭按钮样式等。</p>\n<h4 id="6-">6. 如何自定义覆盖物</h4>\n<p>百度地图 API 支持用\n户<a href="http://lbsyun.baidu.com/index.php?title=jspopular/guide/cover#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.A6.86.E7.9B.96.E7.89.A9">自定义覆盖物</a>，\n要创建自定义覆盖物，您需要做以下工作：</p>\n<ol>\n<li>定义一个自定义覆盖物的构造函数，通过构造函数参数可以传递一些自由的变量。</li>\n<li>设置自定义覆盖物对象的 prototype 属性为 Overlay 的实例，以便继承覆盖物基类。</li>\n<li>实现 initialize 方法，当调用 map.addOverlay 方法时，API 会调用此方法。</li>\n<li>实现 draw 方法。</li>\n</ol>\n<h4 id="7-">7. 如何使用绘制地图的点、线、面工具</h4>\n<p><a href="http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html">鼠标绘制管理类</a>，\n鼠标绘制管理的入口。 实例化该类后，即可调用该类提供的 open 方法开启绘制模式状态\n。 也可加入工具栏进行选择操作。\n<a href="http://developer.baidu.com/map/jsdemo.htm#f0_7">百度 demo 入口</a></p>\n<pre><code class="lang-python">var styleOptions = {\n    strokeColor:&quot;rgb(255, 0, 0)&quot;,    //边线颜色。\n    fillColor:&quot;rgb(227, 0, 0)&quot;,      //填充颜色。当参数为空时，圆形将没有填充效果。\n    strokeWeight: 1,       //边线的宽度，以像素为单位。\n    strokeOpacity: 1,    //边线透明度，取值范围0 - 1。\n    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。\n    strokeStyle: &#39;solid&#39; //边线的样式，solid或dashed。\n};\nvar drawingManage = new BMapLib.DrawingManager(map, {\n    isOpen: false, //是否开启绘制模式\n    enableDrawingTool: false, //是否显示工具栏\n    drawingToolOptions: {\n        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置\n        offset: new BMap.Size(5, 5), //偏离值\n        scale: 0.8 //工具栏缩放比例\n    },\n    circleOptions: styleOptions, //圆的样式\n    polygonOptions: styleOptions //多边形的样式\n});\ndrawingManage.addEventListener(&#39;overlaycomplete&#39;, overlaycomplete); //鼠标绘制完成后，派发总事件的接口\nfunction overlaycomplete(){\n\n};\n\n//开始绘制，多边形:BMAP_DRAWING_POLYGON，圆形:BMAP_DRAWING_CIRCLE\ndrawingManage.open();\ndrawingManage.setDrawingMode(BMAP_DRAWING_POLYGON);\n</code></pre>\n<h4 id="8-">8. 绘制行政区划时，放大缩小地图时，不显示的问题</h4>\n<p>严格按照百度地图的 demo 绘制！百度添加行政区划\n：<a href="http://developer.baidu.com/map/jsdemo.htm#c1_10">http://developer.baidu.com/map/jsdemo.htm#c1_10</a></p>\n<p>另外百度地图的行政区划 和高德的行政区划差别较大，具体可以看两者的 demo，以台湾为\n例，比较直观。高德添加行政区划\n：<a href="http://lbs.amap.com/api/javascript-api/guide/map-data/cministrative_division">http://lbs.amap.com/api/javascript-api/guide/map-data/cministrative_division</a></p>\n<h4 id="9-">9. 如何获取多边形的面积</h4>\n<p>百度开源库 GeoUtils 类提供若干几何算法，用来帮助用户判断点与矩形、 圆形、多边形\n线、多边形面的关系 , 并提供计算折线长度和多边形的面积的公式。注意\n：BMapLib.GeoUtils.getPolygonArea(polygon) 不适合计算自相交多边形的面积 ( 封闭的\n面积 ) 实例：\n（<a href="http://api.map.baidu.com/library/GeoUtils/1.2/examples/simple.html）">http://api.map.baidu.com/library/GeoUtils/1.2/examples/simple.html）</a></p>\n<h4 id="10-">10. 关于驾车的数据展示问题</h4>\n<p>如果保存获取的结果、线路等信息，或者修改绘制线路的图标，样式等，可以自行对返回\n的<a href="http://developer.baidu.com/map/jsdemo.htm#i5_5">检索结果</a>进行处理</p>\n<pre><code class="lang-python">var driving = new BMap.DrivingRoute($scope.map,{\n    policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE//最短距离\n});\ndriving.search(markers[0].point, markers[1].point);\ndriving.setSearchCompleteCallback(function(results){\n    onSearchComplete(results);\n});\n\nfunction onSearchComplete(results){\n    var pts = driving.getResults().getPlan(0).getRoute(0).getPath();\n    var line = new BMap.Polyline(pts);\n    map.addOverlay(line);\n};\n</code></pre>\n<p>另外一个关于获取百度地图两点的路线规划信息的 demo：\n<a href="https://october-yan.github.io/driving/">https://october-yan.github.io/driving/</a></p>\n<h4 id="11-">11. 关于动态设置驾车途径点的问题</h4>\n<p>注意：百度地图 API 官方提供的 waypoints 途经点集合，最多支持 10 个途经点。那么问\n题来了，如果你超过 10 个途径点计算驾车路线，解决方法就要分段 search。以每 11 个\n点之间做一次 search, 不足 11 个点的检索做一次 search。</p>\n<p>动态设置驾车途径点： <a href="http://lbsyun.baidu.com/jsdemo.htm?a#i5_9">http://lbsyun.baidu.com/jsdemo.htm?a#i5_9</a></p>\n<h4 id="12-">12. 关于坐标转换几个概念</h4>\n<p>首先看以下几个概念</p>\n<blockquote>\n<p>1、地球坐标 (WGS84)：</p>\n<ul>\n<li>国际标准，从专业 GPS 设备中取出的数据的坐标系，国际地图提供商使用的坐标系\n2、火星坐标 (GCJ-02) 也叫国测局坐标系</li>\n<li>中国标准，从国行移动设备中定位获取的坐标数据使用这个坐标系。、</li>\n<li>国家规定： 国内出版的各种地图系统（包括电子形式），必须至少采用 GCJ-02 对地\n理位置进行首次加密。 3 、百度坐标 (BD-09)：</li>\n<li>百度标准，百度 SDK，百度地图，Geocoding 使用，百度又在火星坐标上来个二次加密\n。</li>\n</ul>\n</blockquote>\n<p>从设备获取经纬度（GPS ）坐标 ：</p>\n<ul>\n<li>如果使用的是百度 sdk 那么可以获得百度坐标（bd09 ）或者火星坐标（GCJ02), 默认是\nbd09</li>\n<li>如果使用的是 ios 的原生定位库，那么获得的坐标是 WGS84</li>\n<li>如果使用的是高德 sdk, 那么获取的坐标是 GCJ02</li>\n</ul>\n<p>互联网在线地图使用的坐标系： 1 、火星坐标系：</p>\n<ul>\n<li>iOS 地图（其实是高德）</li>\n<li>Gogole 地图</li>\n<li>搜搜、阿里云、高德地图 2、百度坐标系：当然只有百度地图 3、WGS84 坐标系：国际标\n准，谷歌国外地图、osm 地图等国外的地图一般都是这个。</li>\n</ul>\n<p>坐标转换：<a href="http://developer.baidu.com/map/jsdemo.htm#a5_2">http://developer.baidu.com/map/jsdemo.htm#a5_2</a></p>\n<h4 id="13-api-">13. 关于百度地图 API 缩放级别和比例尺关系的问题</h4>\n<p>百度地图 API 一共分为 19 级，相对应的比例尺展示可以在拾取坐标系统查看：\n<a href="http://api.map.baidu.com/lbsapi/getpoint/index.html">http://api.map.baidu.com/lbsapi/getpoint/index.html</a> 注意：在 3 级缩放级别下，世\n界地图大小已经和容器大小一致；</p>\n<h4 id="14-">14. 百度地图提供的一些很方便展示的工具</h4>\n<ul>\n<li>拾取坐标系统 <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html">http://api.map.baidu.com/lbsapi/getpoint/index.html</a></li>\n<li>地图编辑工具 <a href="http://lbsyun.baidu.com/custom/">http://lbsyun.baidu.com/custom/</a></li>\n</ul>\n<h4 id="15-api-">15. 百度地图 API 提供类经常用到的一些类有哪些？</h4>\n<p>百度 API 提供了很多类，这里列举下经常用到的一些：</p>\n<ul>\n<li>核心类：Map</li>\n<li>基础类：Point 、 Bounds、Size ，</li>\n<li>覆盖物类：Marker 、 Polygon、Polyline 、 Label、InfoWindow 、 Icon、Circle</li>\n<li>工具类：DistanceTool 、 DragAndZoomTool</li>\n<li>服务类：LocalSearch 、 DrivingRoute、Geocoder 、 Route、Boundary</li>\n</ul>\n'}});