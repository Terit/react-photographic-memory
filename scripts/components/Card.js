import React from 'react';
import * as helpers from '../helpers/gameLogic';
import * as timeHelpers from '../helpers/timeHelpers';

let Card = React.createClass({
  getInitialState : function() {
    return {
      isClicked : false,
      isMatched : false
    };
  },

  componentWillReceiveProps : function(nextProps) {
    // Check to see if the cards have been updated, ie a new game
    if(this.props.image !== nextProps.image) {
      this.setState({
        isClicked : false,
        isMatched : false
      });
    }
  },

  render : function() {
    let background = (this.state.isClicked ? 'url(' + this.props.image + ') 50% 50% / 183px 183px no-repeat' : 'url(./assets/images/Instagram_Icon_Large.png) 50% 50% / 200px 200px no-repeat');
    let className = this.state.isClicked ? 'clicked' : '';
    return(
      <div className='small-3 columns'>
        <div
          style={{
            background: background,
            height: '200px'
          }}
          onClick={helpers.shouldFlip.bind(null, this)}
          className={`card ${className}`}
        ></div>
      </div>
    )
  }
});

export default Card;
