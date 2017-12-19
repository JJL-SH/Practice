import { combineReducers } from 'redux';
import counter from './counter';

// 把所有的reducer合并到一起
export default combineReducers({
  counter
});