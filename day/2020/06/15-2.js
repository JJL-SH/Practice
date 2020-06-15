var obj = { a: 1, b: 2, c: 3 };
var newObj = new Proxy(obj, {
  get: function (target, key) {
    return key in target ? target[key] : false;
  },
});

let ecArrayProxy = {
  get(target, key) {
    let _index = key < 0 ? target.length + Number(key) : key;
    return Reflect.get(target, _index);
  },
};

let arr = new Proxy([1, 2, 3, 4], ecArrayProxy);

// console.log(arr[-2]);

let scValidate = {
  set(target, key, value) {
    if (key === "age") {
      if (value < 0 || !Number.isInteger(value)) {
        throw new Error("请输入正确的年龄");
      }
    }
    return Reflect.set(target, key, value);
  },
};
let temp1 = new Proxy({ age: 18 }, scValidate);

// 通过身份证号码自动校验用户信息
const PROVINCE_NUMBER = {
  44: "广东省",
  46: "海南省",
  31: "上海市",
};
const CITY_NUMBER = {
  4401: "广州市",
  4601: "海口市",
  3102: "崇明区",
};
// 310230199006232316
const cardNumber = {
  set(target, key, value) {
    if (key === "cardNumber") {
      Reflect.set(target, key, value);
      Reflect.set(
        target,
        "hometown",
        PROVINCE_NUMBER[value.substr(0, 2)] +
          ":" +
          CITY_NUMBER[value.substr(0, 4)]
      );
      Reflect.set(target, "birthday", value.substr(6, 8));
      Reflect.set(target, "gender", value.substr(-2, 1) % 2 ? "男" : "女");
    }
  },
};

const person = new Proxy({ cardNumber: "" }, cardNumber);
person.cardNumber = "310230199006232316";

// console.log(person);

// 格式化时间转换成时间戳
const formatTimestamp = {
  set(target, key, value) {
    if (key === "time") {
      Reflect.set(target, "timestamp", +new Date(value));
    }
  },
};

const timestampObj = new Proxy({ timestamp: 0 }, formatTimestamp);

timestampObj.time = "2020-01-18 10:10:10";

console.log(timestampObj);
