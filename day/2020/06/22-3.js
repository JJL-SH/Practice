function wrap(p) {
  let obj = {};
  let p1 = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = Promise.race([p1, p]);
  return obj;
}

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});

let obj = wrap(promise);

obj.promise.then((res) => {
  console.log(res);
});
setTimeout(() => {
  obj.resolve(1111);
}, 500);
