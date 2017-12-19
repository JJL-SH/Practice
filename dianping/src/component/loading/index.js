import './index.scss';
import React, { Component } from 'react';

class Loading extends Component {
  static defaultProps = {
    content: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { content } = this.props;

    return(
      <div className="cLoading">
        <div className="cLoading__img"></div>
        {
          content && <div className="cLoading__txt">{content}</div>
        }
      </div>
    )
  }
}

export default Loading;