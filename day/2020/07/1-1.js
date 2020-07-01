var Event = (function () {
  var global = this;
  var Event;
  var _default = "default";

  Event = function () {
    var _namespaceCache = {};
    var __listen;
    var __trigger;
    var __remove;
    var __create;
    var __find;
    var __each;
    var __slice = Array.prototype.slice;
    var __shift = Array.prototype.shift;
    var __unshift = Array.prototype.unshift;

    __each = function (arr, fn) {
      var result;

      for (var i = 0, it; (it = arr[i++]); ) {
        result = fn.call(it, i, it);
      }
      return result;
    };
    // 订阅
    __listen = function (key, cache, fn) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    // 退订
    __remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          // 如果有 fn 则删除对应的订阅
          for (var i = cache[key].length; i > 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          // 没有的话删除该命名空间下的所有订阅
          cache[key] = [];
        }
      }
    };
    // 发布
    __trigger = function (key, cache, ...rest) {
      var _self = this;

      if (!cache[key] || !cache[key].length) {
        return;
      }

      return __each(cache[key], function () {
        return this.apply(_self, rest);
      });
    };
    __create = function (namespace = _default) {
      var _cache = {};
      var _offlineStack = [];
      var _ret;

      _ret = {
        listen: function (key, fn, last) {
          __listen(key, _cache, fn);

          if (_offlineStack === null) {
            return;
          }
          if (last === "last") {
            offlineStack.length && offlineStack.pop()();
          } else {
            __each(offlineStack, function () {
              this();
            });
          }

          offlineStack = [];
        },
      };
    };
  };
})();
