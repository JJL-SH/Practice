import { INCREMENT, DECREMENT } from 'Action/counter';
// 初始化数据
const initialState = {
  number: 0
}
// reducer群
const action = {
  [INCREMENT](state, number) {
    return {
      ...state,
      number: state.number + number
    }
  },
  [DECREMENT](state, number) {
    return {
      ...state,
      number: state.number - number
    }
  }
}
// 这里进行了默认值赋值，以及对象的解构
export default (state = initialState, {type, number}) => {
  // 使用[]特性拿到需要的函数返回值，没有找到则使用state
  return action[type] ? action[type](state, number) : state;
};