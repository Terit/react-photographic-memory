import React, { PropTypes } from 'react';

const divStyle = {
  width: '100%',
  height: '15px',
  borderBottom: '1px solid #e6e6e6',
  textAlign: 'center',
  marginBottom: '20px',
};

const spanStyle = {
  fontSize: '20px',
  backgroundColor: '#FFF',
  padding: '0 10px',
  color: '#e6e6e6',
};

export default function Hr({ text }) {
  return (
    <div style={divStyle}>
      <span style={spanStyle}>
        {text}
      </span>
    </div>
  );
}

Hr.propTypes = { text: PropTypes.string.isRequired };
