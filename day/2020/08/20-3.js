// 0,1,1,2,3,5,8,13,21
const fbnq = (num) =>
  Array.from(new Array(num)).reduce((cacheArr, it, index) => {
    if (index > 1) {
      cacheArr.push(cacheArr[index - 2] + cacheArr[index - 1]);
    } else {
      cacheArr.push(index);
    }

    return cacheArr;
  }, []);

console.log(fbnq(9));
