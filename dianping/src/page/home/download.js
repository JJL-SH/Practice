import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Download extends Component {
  render() {
    return(
      <div className="pHome__download">
        <div className="pHome__download-wrap">
          <div className="pHome__download-hd"><i className="iconfont icon-game"></i><span>&nbsp;吃喝玩乐，找优惠</span></div>
          <div className="pHome__download-bd">
            <Link className="pHome__download-open" to="/">打开大众点评</Link>
            <Link className="pHome__download-app" to="/">下载APP享特价</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Download;