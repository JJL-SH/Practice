// var obj1 = new Object();
// var obj2 = {};

// console.log(Object.getPrototypeOf(obj1));
// console.log(Object.getPrototypeOf(obj2));
// console.log(Object.prototype);

function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
};

// 模拟实例对象
var objectFactory = function () {
  // 从 Object.prototype 上克隆一个空的对象
  var obj = new Object();
  // 取得外部传入的构造器，这里是 Person
  var Constructor = [].shift.call(arguments);
  // 指向正确的原型
  obj.__proto__ = Constructor.prototype;
  // 借用外部传入的构造器给 obj 设计数据
  var ret = Constructor.apply(obj, arguments);
  // 确保构造器总是会返回一个对象
  return typeof ret === "object" ? ret : obj;
};

var a = objectFactory(Person, "sven");

console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

function create(obj) {
  let cacheObj = function () {};

  cacheObj.prototype = obj;
  return new cacheObj();
}
