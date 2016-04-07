import React, { PropTypes } from 'react';
import { shouldFlip } from '../helpers/gameLogic';

const propTypes = {
  image: PropTypes.string.isRequired,
  isGameOver: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};

class Card extends React.Component {
  constructor() {
    super();

    this.onClickDiv = shouldFlip.bind(null, this);
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

  styles() {
    if (this.state.isClicked) {
      return {
        background: `url(${this.props.image}) 50% 50% / 160px 160px no-repeat`,
        className: 'clicked',
      };
    }
    return {
      background: `url(./build/assets/images/Instagram_Icon_Large.png)
                    50% 50% / 180px 180px no-repeat`,
      className: '',
    };
  }

  render() {
    const styles = this.styles();
    return (
      <div className="small-3 columns">
        <div
          style={{
            background: styles.background,
            height: '200px',
          }}
          onClick={this.onClickDiv}
          className={`card ${styles.className}`}
        ></div>
      </div>
    );
  }
}

Card.propTypes = propTypes;

export default Card;
