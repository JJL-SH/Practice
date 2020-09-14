function Test(name, age) {
  console.log(JSON.stringify(this));
  console.log(this.__proto__.constructor === Test);

  this.name = name;
  this.age = age;
  console.log(JSON.stringify(this));
}

function myNew(func, ...rest) {
  var obj = Object.create(func.prototype);

  func.call(obj, ...rest);
  return obj;
}

myNew(Test, "小明", 18);
