Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// Promise.resolve 会返回一个 promise 对象 并且会将 1 当作 then 的参数。而 .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。所以最后会输出：1