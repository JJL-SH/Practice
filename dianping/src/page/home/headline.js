import React, { Component } from 'react';

class Headline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0
    }
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      let { key } = this.state;
      key = (++key >= this.props.datas.length) ? 0 : key;
      this.setState({key: key})
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { key } = this.state;
    const { datas } = this.props;

    return(
      <div className="pHome__headline">
        <div className="pHome__headline-title">点评<br/>头条</div>
        <div className="pHome__headline-content">
          <ul className="pHome__light" style={{transform: `translateY(${key * -60}px)`}}>
            {
              datas.map((data, index) => {
                return <li key={index} className="pHome__light-item">
                  <a className="pHome__light-link" href={data.url}>
                    {data.userPic[0] && <div className="pHome__light-header"><img src={data.userPic[0]} width="30"/></div>}
                    <div className="pHome__light-info">
                      <h3 className="pHome__light-hd">{data.shopName}</h3>
                      <p className="pHome__light-bd">{data.title}</p>
                    </div>
                    {data.pic && <div className="pHome__light-pic"><img src={data.pic} width="50"/></div>}
                  </a>
                </li>;
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Headline;