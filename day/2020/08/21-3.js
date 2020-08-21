// 字符串出现的不重复最长长度
// fdsfsdzffdfdddfsdsds

const getNotRepeatMaxLength = (str) => {
  return [...new Set(str)].length;
};

console.log(getNotRepeatMaxLength("112345123"));
