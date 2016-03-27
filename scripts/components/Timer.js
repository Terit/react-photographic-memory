import React from 'react'
import {formatTime} from '../helpers/timeHelpers'

export default React.createClass({
  render : function() {
    if(this.props.gameTime) {
      return(<li id='timer-component' className='menu-text'>Timer: <span id='timer' className={this.props.stopTime ? 'stopped' : 'running'}>{formatTime(this.props.gameTime)}</span></li>)
    } else {
      return(<li className='menu-text'></li>)
    }
  }
});
