import React, { Component } from 'react';
import Header from './Header';
import Download from './Download';
import Nav from './Nav';
import Headline from './Headline';
import Card from './Card';
import More from './More';
import Loading from 'Component/loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      headlineData: [],
      valueData: [],
      dayData: [],
      cardData: []
    }
  }

  componentWillMount() {
    fetch('http://localhost/demo/dianping/model.php',{
      method: 'POST'
    }).then((res) => {
      return res.json();
    }).then((res) => {
      setTimeout(() => {
        this.setState({
          loading: false,
          headlineData: this._getObjData(res, 'headline').list,
          valueData: this._getObjData(res, 'czth').preferenceValueHuiVos,
          dayData: this._getObjData(res, 'ttlj').dayHuiVos,
          loveData: this._getObjData(res, 'cnxh').guessYouVoList,
          cardData: this._getObjData(res, 'rb').list
        })
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  }

  _getObjData = (res, name) => {
    return _.find(res.data.moduleInfoList, (data) => {
      return data.moduleName === name
    }).moduleData.data;
  }

  render() {
    const state = this.state;

    return(
      <div className="pHome">
        <Header/>
        <Download/>
        <Nav/>
        {state.loading || <Headline datas={state.headlineData}/>}
        {state.loading || <Card datas={state.cardData}/>}
        {state.loading || <More
          title="超值特惠"
          link="http://www.baidu.com"
          datas={state.valueData}
        />}
        {state.loading || <More
          title="天天立减"
          link="http://www.baidu.com"
          datas={state.dayData}
        />}
        <div className="pHome__value"></div>
        <div className="pHome__day"></div>
        <div className="pHome__love"></div>
        {state.loading && <Loading/>}
      </div>
    )
  }
}

export default Home;