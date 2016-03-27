import React from 'react'
import {formatTime} from '../helpers/timeHelpers'

export default React.createClass({
  componentWillReceiveProps : function(nextProps) {
    if(nextProps.gameTime === 60000) {
      document.getElementById('timer').className = 'running'
    }
  },
  render : function() {
    if(this.props.gameTime) {
      return(<li id='timer-component' className='menu-text'>Timer: <span id='timer' className='running'>{formatTime(this.props.gameTime)}</span></li>)
    } else {
      return(<li className='menu-text'></li>)
    }
  }
});
