import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SAGA_INCREMENT, incrementCount } from 'Action/counter';

function* fetchCounter(action) {
  // 这里做了1秒的延时处理
  yield new Promise(function (resolve) {
    setTimeout(function () {
        resolve()
    }, 1000)
  })
  // 执行dispatch
  yield put(incrementCount(action.number));
}

function* mySaga() {
  // 多次点击只执行最后一次
  yield* takeLatest(SAGA_INCREMENT, fetchCounter)
}

export default [
  mySaga
]