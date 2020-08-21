// 合并二维有序数组成一维有序数组，归并排序的思路
const mergeSort = (arr) =>
  arr.reduce((cacheArr, it) => [...cacheArr, ...it], []).sort((a, b) => a - b);
const arr = [[1, 2, 3], [6], [7, 8, 9], [1, 12, 13], [4, 5, 6]];
mergeSort(arr)
