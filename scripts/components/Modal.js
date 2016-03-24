import React from 'react';
import * as timeHelpers from '../helpers/timeHelpers';

let Modal = React.createClass({
  getInitialState : function() {
    return {
      gameOn : this.props.gameStatus
    }
  },

  componentWillReceiveProps : function(nextProps) {
    this.state.gameOn = nextProps.gameStatus;
    this.setState({
      gameOn : this.state.gameOn
    })
  },

  gameOn : function() {
    this.props.startTimer();
    this.setState({
      gameOn : true
    });
  },

  render : function() {
    return(
      <div className={`modal large-11 small-12 columns ${this.state.gameOn ? 'hide' : ''}`}>
        <div className='row'>
          <div id='buttons' className='small-3 small-centered columns'>
            <button id='button' onClick={this.gameOn} className='button large'>
              Start Game
            </button>
          </div>
        </div>
      </div>
    )
  }
});

export default Modal;
