import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Love extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let props = this.props;
    console.log(props.datas);
    return(
      <div className="pHome__love">
        <h2 className="pHome__love-head">猜你喜欢</h2>
        <div className="pHome__love-content">
          {
            props.datas.map((data, index) => {
              console.log(data);
              return <a key={index} className="pHome__love-link" href={data.schema}>
                <div className="pHome__love-img">
                  {
                    data.pictag.tag && <div className="pHome__love-not" style={{color:data.pictag.color}}>{data.pictag.tag}</div>
                  }
                  <img src={data.defaultPic} width="100%"/>
                </div>
                <div className="pHome__love-title">
                  <div className="pHome__love-distence">{data.distance}</div>
                  <div className="pHome__love-shop">{data.shopName}</div>
                </div>
                <div className="pHome__love-desc">{data.dealGroupTitle}</div>
                <div className="pHome__love-number">
                  <span className="pHome__love-sold">{data.salesdesc}</span>
                  <strong className="pHome__love-price">￥{data.dealgroupPrice}</strong>
                  <del className="pHome__love-oldprice">￥{data.marketPrice}</del>
                </div>
              </a>
            })
          }
        </div>
      </div>
    )
  }
}

export default Love;