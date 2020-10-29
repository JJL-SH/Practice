// const toStr = Function.prototype.call.bind(Object.prototype.toString);

// console.log(toStr([]));

Function.prototype.mycall = function (context) {
  // 这里做了防止标准数据的无法添加属性的兼容
  context = context ? Object(context) : window;
  var fn = Symbol();
  // 这里的 this 指向的是被调用方法
  context[fn] = this;
  // 取出所有的额外参数
  let args = [...arguments].slice(1);
  // 执行被调用的方法并把参数传入
  // 这里利用了 this 指向调用者的逻辑修改了。调用方法的 this 指向
  let result = context[fn](...args);
  // 删除临时的方法
  delete context[fn];
  // 返回结果
  return result;
};

Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
    throw new Error("请使用函数对象调用我");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    // 类数组转数组
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.myapply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
Function.prototype.myapply = function (context, arr) {
  context = context ? Object(context) : window;
  var fn = Symbol();
  context[fn] = this;
  let result;
  if (!arr) {
    result = context[fn]();
  } else {
    result = context[fn](...arr);
  }

  delete context[fn];
  return result;
};
var toStr1 = Function.prototype.mycall.mybind(Object.prototype.toString);
