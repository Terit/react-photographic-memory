import React from 'react'
import * as timeHelpers from '../helpers/timeHelpers'

export default React.createClass({
  render : function() {
    return(
      <li className='menu-text'>Timer: <span id='timer'>{timeHelpers.formatTime(this.props.gameTime)}</span></li>
    )
  }
});
