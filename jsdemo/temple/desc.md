### 常见问题

#### 1. 关于地图初始化只展示一小块的问题

* 注意如果在初始化地图时，出现了加载异常，只是加载了一小块地图，这种问题通常是容
  器处于隐藏状态导致的，api 会认为地图宽高为 0。**建议等待容器处于可见状态后再初
  始化地图**。
* 另外百度地图开放平台提供
  了[地图生成器](http://api.map.baidu.com/lbsapi/createmap/index.html); 可以快速
  创建地图。
