import React from 'react'
import * as timeHelpers from '../helpers/timeHelpers'

export default React.createClass({
  render : function() {
    if(this.props.gameTime) {
      return(<li className='menu-text'>Timer: <span id='timer'>{timeHelpers.formatTime(this.props.gameTime)}</span></li>)
    } else {
      return(<li className='menu-text'></li>)
    }
  }
});
