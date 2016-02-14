import React from 'react';

var Header = React.createClass({
  render : function() {
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Photographic Memory</li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><input type="search" placeholder="Search" /></li>
            <li><button type="button" className="button">Search</button></li>
          </ul>
        </div>
      </div>   
    );
  }
});

export default Header;
