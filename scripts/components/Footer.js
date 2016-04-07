import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Footer({ tag }) {
  return (
    <footer className="footer">
      <div className="row">
        <div className="small-12 columns">
          <p className="slogan">Having fun? Check this out.</p>
          <p className="links">
            <Link to="/">Home</Link>
            <Link to={`/${tag}/leaderboard`}>Leaderboard</Link>
            <a href="https://terit.github.io/#blog">Blog</a>
            <a href="https://terit.github.io">More</a>
            <a href="https://terit.github.io/resume">Resume</a>
            <a href="mailto:artheriault@gmail.com" target="_blank">Contact</a>
          </p>
          <p className="copywrite">Andy Theriault, Vancouver, BC, Canada - 2016</p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  tag: PropTypes.string.isRequired,
};
