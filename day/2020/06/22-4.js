var Flower = function () {};

var xm = {
  sendFlower: function (target) {
    target.receiveFlower();
  },
};
var B = {
  receiveFlower: function () {
    // 坚挺 A 的好心情
    A.listenGoodMood(function () {
      var flower = new Flower();
      A.receiveFlower(flower);
    });
  },
};
var A = {
  receiveFlower: function (flower) {
    console.log("收到花" + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 1000);
  },
};

xm.sendFlower(B);
