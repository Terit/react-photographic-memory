import React from 'react';

export default React.createClass({
  render : function() {
    return(
      <div className="progress" aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>
        <div id='css-progress-bar' className="progress-meter" style={{width: `${this.props.width}%`}}></div>
      </div>
    )
  }
});
