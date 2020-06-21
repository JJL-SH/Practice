function fn1(data) {
  // 这里返回的是初始化默认传的 1
  console.log(data);
  throw new Error("xxxx");
  return Promise.resolve(11);
}
function fn2(data) {
  // 这里返回的是上一个执行函数返回的 11
  console.log(data);
  return Promise.resolve(22);
}

// const applyAsync = (acc, val) => {
//   return acc.then(val);
// };

// 这里使用高阶函数、柯里化的方式缓存需要执行的函数列表
const composeAsync = (...dd) => {
  return (x) => {
    // reduce 设置的默认值为 Promise.resolve 这样在 reduce 执行的时候默认第一次执行的是设置的 Promise
    // 当执行的同步函数没有返回 Promise 的时候可以利用默认 Promise 一直可以执行 then 的特性同步执行后面的函数
    // 最后返回的也是一个 Promise 所以在外部使用的时候也可以直接使用 then 方法去获取返回的内容，也可以通过 catch 方法捕获错误信息
    return dd.reduce((acc, val) => {
      console.log(acc);
      return acc.then(val);
    }, Promise.resolve(x));
  };
};
const transformData = composeAsync(fn1, fn2);

transformData(1)
  .then((result) => console.log(result, "last result"))
  .catch((e) => {
    console.log("xxxxxxxxx", e);
  });
