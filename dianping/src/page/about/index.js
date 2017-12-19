import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import router from './router';

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="pAbout">
        <h2 className="pAbout__title">关于</h2>
        <p className="pAbout__nav"><Link className="pAbout__nav-link" to={this.props.match.url + '/me'}>Me</Link></p>
        {
          // 路由输出
          router.map((route, index) => {
            return <Route key={index} exact={route.exact} path={this.props.match.url + route.path} component={route.component}/>
          })
        }
      </div>
    )
  }
}

export default About;