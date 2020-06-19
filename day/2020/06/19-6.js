const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("1");
    resolve("success");
  }, 1000);
});
promise.then((res) => {
  console.log(res);
});
promise.then((res) => {
  console.log(res);
});

// 1
// success
// 第二次调用 then 的时候会直接返回结果