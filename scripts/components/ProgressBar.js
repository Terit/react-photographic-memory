import React, { PropTypes } from 'react';

const propTypes = {
  width: PropTypes.number.isRequired,
};

export default function ProgressBar({width}) {
  return (
    <div className="progress" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
      <div
        id="css-progress-bar"
        className="progress-meter css-progress-bar"
        style={ { width: `${width}%` } }
      />

    </div>
  );
}

