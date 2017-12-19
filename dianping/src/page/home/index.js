import React, { Component } from 'react';
import Header from './header';
import Download from './download';
import Nav from './nav';
import Headline from './headline';
import Loading from 'Component/loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      headlineData: [],
      valueData: [],
      dayData: []
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
          loveData: this._getObjData(res, 'cnxh').guessYouVoList
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
        <div className="pHome__value"></div>
        <div className="pHome__day"></div>
        <div className="pHome__love"></div>
        {state.loading && <Loading/>}
      </div>
    )
  }
}

export default Home;