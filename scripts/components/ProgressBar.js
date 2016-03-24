import React from 'react';

let ProgressBar = React.createClass({
  render : () => {
    return(
      <div className="progress" aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>
        <div id='css-progress-bar' className="progress-meter" style={{width: '100%'}}></div>
      </div>
    )
  }
});

export default ProgressBar;
