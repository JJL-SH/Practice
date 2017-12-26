import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="pHome__card">
        {
          this.props.datas.map((data, index) => {
            return(<a key={index} className="pHome__card-item" href={data.link}>
              <h2 className="pHome__card-hd">{data.adTitle}</h2>
              <p className="pHome__card-bd">{data.adSubTitle}</p>
              <div className="pHome__card-img"><img src={data.thumb} width="50"/></div>
            </a>)
          })
        }
      </div>
    )
  }
}

export default Card;