const _baseUrl = "http://img.aizhifou.cn/";
const _urls = [...new Array(10)].map((it, index) => `${index + 1}.png`);
const __loadImg = function (url, index) {
  return new Promise((resolve, reject) => {
    try {
      const _img = new Image();

      _img.onload = function () {
        resolve(index);
      };
      _img.onerror = function () {
        reject(index);
      };
      _img.src = _baseUrl + url;
    } catch (e) {
      reject(index);
    }
  });
};
const __startLoadImg = function (urls, limits, endHandle) {
  let _promiseMap = [];
  let _loadIndexMap = {};
  let _currentIndex = 0;

  const __loadOneImg = function () {
    // 当累加的任务数达到了链接数量的时候使用 Promise.all 完成所有的数据请求
    // 最后回调一个完成函数
    if (Object.keys(_loadIndexMap).length === urls.length) {
      // 资源加载完毕
      const _promiseList = Object.keys(_promiseMap).reduce(
        (cacheArr, it) => [...cacheArr, _promiseMap[it]],
        []
      );
      Promise.all(_promiseList)
        .then((res) => {
          console.log("all");
          !!endHandle && endHandle();
        })
        .catch((e) => {
          console.log("end:" + e);
        });
    } else {
      // 根据当前任务队列的数量补充满3个任务进队列
      while (Object.keys(_promiseMap).length < limits) {
        for (let i = _currentIndex; i < urls.length; i++) {
          if (_loadIndexMap[i] === undefined) {
            _loadIndexMap[i] = false;
            _promiseMap[i] = __loadImg(urls[i], i);
            _currentIndex = i;
            break;
          }
        }
      }
      // 根据保存的队列创建请求队列，根据 Object.keys 获取为空数据不会返回 keys 的特性
      const _promiseList = Object.keys(_promiseMap).reduce(
        (cacheArr, it) => [...cacheArr, _promiseMap[it]],
        []
      );
      // 请求数据如果其中有一个成功活着失败则完成 Promise 请求
      Promise.race(_promiseList)
        .then((index) => {
          console.log("end:" + index);
          // 设置成功的图片的请求
          _loadIndexMap[index] = true;
          // delete 可以删除对应索引的数组，在使用 Object.keys 的时候只会获取不为空的数据
          // 删除队列中的任务
          delete _promiseMap[index];
          // 完成之后重新发起任务
          __loadOneImg();
        })
        .catch((e) => {
          // 和成功一样处理
          console.log("end:" + e);
          _loadIndexMap[e] = true;
          delete _promiseMap[e];
          __loadOneImg();
        });
    }
  };
  __loadOneImg();
};

__startLoadImg(_urls, 3);
