import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import router from './router';

class Index extends Component {
  render() {
    return(
      <div className="pIndex">
        <Switch>
          {
            // 路由输出
            router.map((route, index) => {
              return <Route key={index} exact={route.exact} path={route.path} component={route.component}/>
            })
          }
        </Switch>
      </div>
    )
  }
}

export default Index;