import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <div className="pHome__header">
        <div className="pHome__header-wrap">
          <Link className="pHome__header-address" to="/">上海</Link>
          <div className="pHome__header-bar">输入商户名、地点</div>
          <Link className="pHome__header-user iconfont icon-my" to="/"></Link>
        </div>
        <div className="pHome__header-fill"></div>
      </div>
    )
  }
}

export default Header;