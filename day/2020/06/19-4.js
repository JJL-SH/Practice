// 定义规则
// 首位为需要验证的数据
// 末尾为报错信息
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === "") {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};

var validataFn = function () {
  var validator = new Validator();

  validator.add(registerFrom.userName, "isNonEmpty", "用户名不能为空");
  validator.add(registerFrom.password, "minLength:6", "密码长度不能少于6位");
  validator.add(registerFrom.phoneNumber, "isMobile", "手机号码格式不正确");

  var errorMsg = validator.start();
  return errorMsg;
};
// 定义策略的使用方法，把变和不变拆分出来
// 变：规则
// 不变：添加方法，执行方法
var Validator = function () {
  this.cache = [];
};
Validator.prototype.add = function (dom, rule, msg) {
  // 分割规则
  var _arr = rule.split(":");
  // 把添加的验证类型存入缓存中用于后面统一执行的时候运行
  this.cache.push(function () {
    // 取规则名称，从规则中获取对应的规则，这里固定写死第一条为规则名称
    var strategy = _arr.shift();
    // 添加验证数据到第一条
    _arr.unshift(dom.value);
    // 添加报错信息到最后一条
    _arr.push(msg);
    // 最后执行规则通过 apply 方法把参数传递给规则执行并重新定义规则的 this 指向
    return strategies[strategy].apply(dom, _arr);
  });
};
Validator.prototype.start = function () {
  // 执行缓存中的验证，如果有返回报错信息则需要退出整个验证循环并跑出报错信息
  for (var i = 0, validatorFn; (validatorFn = this.cache[i++]); ) {
    var msg = validatorFn();

    if (msg) {
      return msg;
    }
  }
};
