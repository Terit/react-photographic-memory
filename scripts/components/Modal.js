import React, { PropTypes } from 'react';

const propTypes = {
  gameOn: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export default function Modal({ gameOn, children }) {
  return (
    <div className={`modal small-12 columns ${gameOn ? 'hide' : ''}`}>
      <div className="row">
          {children}
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;
