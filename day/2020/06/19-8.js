const applyAsync = (acc, val) => {
  acc.then(val);
};
const composeAsync = (...dd) => (x) => {
  dd.reduce(applyAsync, Promise.resolve(x));
};
const transformData = composeAsync(fn1, fn2, fn3, fn4);

transformData(1).then((result) => console.log(result, "last result"));
