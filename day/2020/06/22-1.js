const fn1 = new Promise((resolve, reject) => {
  console.log("00");
  setTimeout(() => {
    resolve(0);
  }, 1000);
});
const fn2 = new Promise((resolve, reject) => {
  console.log("11");
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
const fn3 = new Promise((resolve, reject) => {
  console.log("22");
  setTimeout(() => {
    resolve(2);
  }, 3000);
});

const list = [fn1, fn2, fn3];
function start() {
  if (Object.keys(list).length) {
    Promise.race(list.filter((it) => !!it)).then((res) => {
      console.log(res);
      delete list[res];
      start();
    });
  }
}

start();
