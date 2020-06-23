var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]);
  }
};

// each([1, 2, 3, 4], function (i, n) {
//   console.log(i, n);
// });

var Iterator = function (obj) {
  // 缓存索引
  var current = 0;
  // 进入下一个索引
  var next = function () {
    current += 1;
  };
  // 是否已经完成
  var isDone = function () {
    return current >= obj.length;
  };
  // 获取当前索引对应的数据
  var getCurrItem = function () {
    return obj[current];
  };

  return { next, isDone, getCurrItem };
};

var compare = function (iterator1, iterator2) {
  // 验证两个数据的循环是否有一个已经结束
  while (!iterator1.isDone() && !iterator2.isDone()) {
    // 如果两个数据的当前项不一致的话报错
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error("iterator1 和 iterator2 不相等");
    }
    // 让两个数据进入下一个索引
    iterator1.next();
    iterator2.next();
  }
  // 当所有都结束并且没有抛出错误的情况下提示相等信息
  console.log("iterator1和iterator2相等");
};

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
compare(iterator1, iterator2);
