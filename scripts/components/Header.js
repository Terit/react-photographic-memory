import React from 'react';
import { History } from 'react-router';
import Timer from './Timer';

const Header = React.createClass({
  propTypes: {
    tag: React.PropTypes.string,
    gameTime: React.PropTypes.number.isRequired,
  },

  mixins: [History],

  search: function (event) {
    event.preventDefault();
    const searchTag = this.refs.searchTag.value;
    this.history.pushState(null, `/${searchTag}`);
    this.refs.tagSearch.reset();
  },

  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Photographic Memory</li>
            <li className='menu-text'>#{this.props.tag || 'popular'}</li>
            <Timer gameTime={this.props.gameTime} />
          </ul>
        </div>
        <div className="top-bar-right">
          <form ref="tagSearch" onSubmit={this.search}>
            <ul className="menu">
              <li><input type="search" placeholder="Search" ref="searchTag" /></li>
              <li><button type="submit" className="button">Search</button></li>
            </ul>
          </form>
        </div>
      </div>
    );
  },
});

export default Header;
