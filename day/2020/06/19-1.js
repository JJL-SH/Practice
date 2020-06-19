var throttle = function (fn, interval = 100) {
  var _target = fn;
  var _timer;
  var _firstTime = true;

  return function () {
    var _args = arguments;
    var _self = this;

    if (_firstTime) {
      _target.apply(_self, _args);
      return (_firstTime = false);
    }

    if (_timer) {
      return false;
    }

    _timer = setTimeout(function () {
      clearTimeout(_timer);
      timer = null;
      _target.apply(_self, _args);
    }, interval);
  };
};

var CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      return (instance = new CreateDiv());
    }
    return instance;
  };
})();
