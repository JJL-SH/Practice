var Event = (function () {
  var clientList = {};
  var listen;
  var trigger;
  var remove;

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function () {
    var key = Array.prototype.shift.call(arguments);
    if (!clientList[key] || !clientList[key].length) {
      return false;
    }

    for (var i = 0, fn; (fn = clientList[key][i++]); ) {
      fn.apply(this, arguments);
    }
  };
  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      // 如果没传 fn 则表示删除所有订阅
      fns && (fns.length = 0);
    } else {
      for (var i = fns.length; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  };

  return { listen, trigger, remove };
})();

// Event.listen("squareMeter88", function (price) {
//   console.log("价格=" + price);
// });

// Event.trigger("squareMeter88", 20000);
