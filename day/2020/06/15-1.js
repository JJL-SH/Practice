// 通过 Object.defineProperty 劫持数据的修改和获取
function observer(obj) {
  // 验证当前数据是不是对象
  if (typeof obj === "object") {
    // 通过 forin 循环对象
    for (let key in obj) {
      console.log(key, obj[key]);
      // 劫持当前数据的修改和获取
      defineReactive(obj, key, obj[key]);
    }
  }
}
function defineReactive(obj, key, value) {
  // 递归劫持数据
  observer(value);
  Object.defineProperty(obj, key, {
    get() {
      console.log("获取：" + key);
      return value;
    },
    set(val) {
      observer(val);
      console.log(key + "-数据改变了");
      value = val;
    },
  });
}

function observerProxy(obj) {
  let handler = {
    get(target, key) {
      console.log(key, ":::::::", target);
      console.log(typeof target[key]);
      console.log(`--------------`);
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], handler);
      }
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log(key + "-数据改变了");
      return Reflect.set(target, key, value);
    },
  };

  return new Proxy(obj, handler);
}

let obj = {
  cname: "守候",
  flag: { book: { name: "js", page: 325 }, interest: ["111", "222"] },
};

let objTest = observerProxy(obj);
objTest.flag.interest.push(1);
objTest.flag.interest[0] = 0;
