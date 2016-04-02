import React, { PropTypes } from 'react';
import * as helpers from '../helpers/gameLogic';

const propTypes = {
  image: PropTypes.string.isRequired,
  gameOver: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};

class Card extends React.Component {
  constructor() {
    super();

    this.onClickDiv = helpers.shouldFlip.bind(null, this);
    this.state = {
      isClicked: false,
      isMatched: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // Check to see if the cards have been updated, ie a new game
    if (this.props.image !== nextProps.image) {
      this.setState({
        isClicked: false,
        isMatched: false,
      });
    }
  }

  background() {
    if (this.state.isClicked) return `url(${this.props.image}) 50% 50% / 183px 183px no-repeat`;
    return 'url(./assets/images/Instagram_Icon_Large.png) 50% 50% / 200px 200px no-repeat';
  }

  render() {
    const background = this.background();
    const className = this.state.isClicked ? 'clicked' : '';
    return (
      <div className="small-3 columns">
        <div
          style={{
            background,
            height: '200px',
          }}
          onClick={this.onClickDiv}
          className={`card ${className}`}
        ></div>
      </div>
    );
  }
}

Card.propTypes = propTypes;

export default Card;
