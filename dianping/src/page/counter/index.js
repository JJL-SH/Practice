import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCount, decrementCount, saga_incrementCount } from 'Action/counter';

@connect((state) => {
  // 给类添加指定的store数据
  return state.counter;
})
class Counter extends Component {
  constructor(props) {
    super(props);
  }
  _incrementCounter = () => {
    this.props.dispatch(incrementCount(1));
  }
  _decrementCounter = () => {
    this.props.dispatch(decrementCount(1));
  }
  _sagaIncrementCounter = () => {
    this.props.dispatch(saga_incrementCount(10))
  }
  render(){
    const { number } = this.props;

    return(
      <div>
        <h2>Number:{number}</h2>
        <button onClick={this._incrementCounter}>+</button>
        <button onClick={this._decrementCounter}>-</button>
        <button onClick={this._sagaIncrementCounter}>异步增加</button>
      </div>
    )
  }
}

export default Counter;