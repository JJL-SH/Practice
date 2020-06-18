var googleMao = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};
var baiduMap = {
  show: function () {
    console.log("开始渲染百度地图");
  },
};
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMao);
