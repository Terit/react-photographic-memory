import React from 'react';
import helpers from '../helpers/game_logic';
import timeHelpers from '../helpers/time_helpers'

var Card = React.createClass({
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

  startTimer : function() {
    this.props.timer();
    helpers.shouldFlip(this);
  },

  render : function() {
    var background = (this.state.isClicked ? 'url(' + this.props.image + ') 50% 50% / 183px 183px no-repeat' : 'url(./assets/images/Instagram_Icon_Large.png) 50% 50% / 200px 200px no-repeat');
    return(
      <div className='small-3 columns'>
        <div
          style={{
            background: background,
            height: '200px'
          }}
          onClick={this.startTimer}
        ></div>
      </div>
    )
  }
})

export default Card;
