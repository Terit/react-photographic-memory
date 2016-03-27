import React from 'react';
import * as timeHelpers from '../helpers/timeHelpers';

let Modal = React.createClass({
  renderStart : function() {
    return (
      <div className={`modal large-11 small-12 columns ${this.props.gameOn ? 'hide' : ''}`}>
        <div className='row'>
          <div id='buttons' className='small-3 small-centered columns'>
            <button id='button' onClick={this.props.startGame} className='button large'>
              Start Game
            </button>
          </div>
        </div>
      </div>
    )
  },

  renderEnd : function() {
    return (
      <div className='modal large-11 small-12 columns'>
        <div className='row'>
          <div id='buttons' className='small-3 small-centered columns'>
            <button id='button' onClick={this.props.startGame} className='button large'>
              New Game
            </button>
          </div>
        </div>
      </div>
    )
  },

  render : function() {
    return (
      (!this.props.gameOn && (this.props.gameTime < 60000)) ? this.renderEnd() : this.renderStart()
    )
  }
});

export default Modal;
