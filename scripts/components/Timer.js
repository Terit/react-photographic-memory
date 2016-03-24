import React from 'react'
import * as timeHelpers from '../helpers/timeHelpers'

var Timer = React.createClass({
  getInitialState: function() {
    return {
      gameTime : this.props.gameTime
    };
  },

  render : function() {
    return(
      <li className='menu-text'>Timer: {timeHelpers.formatTime(this.props.gameTime)}</li>
    )
  }
})

export default Timer;
