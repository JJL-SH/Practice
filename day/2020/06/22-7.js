// 模拟 Object.create
function myCreate(obj) {
  let Fn = function () {};
  Fn.prototype = obj;

  return new Fn();
}
console.log(myCreate({ a: 1 }));
// 模拟 new

// 1.执行构造函数
// 2.设置原型链

function myNew(cons) {
  const obj = new Object();
  // 拿到构造函数
  const _cons = Array.prototype.shift.call(arguments);
  obj.__proto__ = _cons.prototype;
  const _res = _cons.apply(obj, arguments);
  return typeof obj === "object" ? _res : obj;
}

var a = myNew(
  function () {
    console.log("执行了构造函数");
  },
  1,
  2,
  3
);
