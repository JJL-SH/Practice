import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class More extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let props = this.props;

    return(
      <div className="pHome__more">
        <div className="pHome__more-head">
          <Link className="pHome__more-title" to={props.link}>更多优惠</Link>
          <div className="pHome__more-text"><b>{props.title}</b></div>
        </div>
        <div className="pHome__more-content">
          {
            props.datas.map((data, index) => {
              console.log(data);
              return <Link key={index} className="pHome__more-item" to="">
                <img className="pHome__more-img" src={data.imageUrl} width="100%"/>
                <h2 className="pHome__more-hd">{data.shortTitle}</h2>
                <p className="pHome__more-bd"><b className="pHome__more-price">￥{data.price}</b><del>￥{data.markPrice}</del></p>
              </Link>
            })
          }
        </div>
      </div>
    )
  }
}

export default More;