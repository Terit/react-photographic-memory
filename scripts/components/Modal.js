import React from 'react';
import timeHelpers from '../helpers/time_helpers';

var Modal = React.createClass({
  getInitialState : function() {
    return {
      gameOn : this.props.gameOn
    }
  },

  gameOn : function() {
    this.props.startTimer();
    this.setState({
      gameOn : true
    });
  },

  render : function() {
    return(
      <div
        className = {this.state.gameOn ? 'hide' : ''}
        onClick={this.gameOn}>
        Hello world
      </div>
    )
  }
});

export default Modal;
