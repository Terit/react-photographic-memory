import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default function Header({ children, tag }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="title"><Link to="/">Photographic Memory</Link></li>
          <li className="menu-text">#{tag}</li>
          {children[0]}
        </ul>
      </div>
      <div className="top-bar-right">
        {children[1]}
      </div>
    </div>
  );
}

Header.propTypes = propTypes;
