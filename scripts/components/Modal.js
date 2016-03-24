import React from 'react';
import * as timeHelpers from '../helpers/timeHelpers';

var Modal = React.createClass({
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
          <div className='small-2 columns small-offset-5'>
            <button onClick={this.gameOn} className='button small'>
              Start Game
            </button>
          </div>
        </div>
      </div>
    )
  }
});

export default Modal;
