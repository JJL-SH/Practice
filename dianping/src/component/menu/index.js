import './index.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return(
      <div className="cMenu">
        <ul className="cMenu__list">
          <li><Link className="cMenu__list-item" to="/"><b className="iconfont icon-home"></b> Home</Link></li>
          <li><Link className="cMenu__list-item" to="/about"><b className="iconfont icon-discover"></b> About</Link></li>
          <li><Link className="cMenu__list-item" to="/counter"><b className="iconfont icon-light"></b> Counter</Link></li>
        </ul>
      </div>
    )
  }
}