import React from 'react';

export default React.createClass({
  render : () => {
    return(
      <div className="progress" aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>
        <div id='css-progress-bar' className="progress-meter" style={{width: '100%'}}></div>
      </div>
    )
  }
});
