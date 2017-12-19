import React, { Component } from 'react';

class Headline extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <div className="pHome__headline">
        <div className="pHome__headline-title"><b>点评<br/>头条</b></div>
        <div className="pHome__headline-content">
          <ul className="pHome__headline-">
            <li></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Headline;