import React, { PropTypes } from 'react';

export default function ProgressBar({ width }) {
  return (
    <div id="progress" className="progress">
      <div
        id="css-progress-bar"
        className="progress-meter css-progress-bar"
        style={ { width: `${width}%` } }
      />
    </div>
  );
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired,
};
