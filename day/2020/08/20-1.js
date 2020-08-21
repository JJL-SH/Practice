// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
const mySetInterval = (callback, firstTime, secondTime) => {
  let _timer = null;
  let _count = 0;

  function time() {
    _timer = setTimeout(() => {
      callback();
      console.log(_count, firstTime, secondTime);
      _count += 1;
      time();
    }, firstTime + _count * secondTime);
  }
  callback();
  time();

  return () => {
    clearTimeout(_timer);
  };
};

const myClear = mySetInterval(
  () => {
    console.log(1);
  },
  100,
  200
);
// myClear();
