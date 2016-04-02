import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import { saveScore } from '../helpers/photographicMemoryApi';

const propTypes = {
  tag: PropTypes.string,
  startGame: PropTypes.func.isRequired,
};

@autobind
class Modal extends React.Component {
  submitScore(event) {
    event.preventDefault();
    const name = this.refs.name.value;
    const tag = this.props.tag;
    const score = this.props.gameTime;
    saveScore(name, tag, score)
      .then(() => this.refs.scoreForm.reset());
    return true;
  }

  renderEnd() {
    return (
      <div className="modal large-11 small-12 columns">
        <div className="row">
          <div id="buttons" className="small-3 small-centered columns">
            <form ref="scoreForm" onSubmit={this.submitScore}>
              <ul className="menu">
                <li><input type="textfield" placeholder="Name" ref="name" /></li>
                <li><button type="submit" className="button">Submit</button></li>
              </ul>
            </form>

            <button id="button" onClick={this.props.startGame} className="button large">
              New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderStart() {
    return (
      <div className={`modal large-11 small-12 columns ${this.props.gameOn ? 'hide' : ''}`}>
        <div className="row">
          <div id="buttons" className="small-3 small-centered columns">
            <button id="button" onClick={this.props.startGame} className="button large">
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      (!this.props.gameOn && (this.props.gameTime < 60000)) ? this.renderEnd() : this.renderStart()
    );
  }
}

Modal.propTypes = propTypes;

export default Modal;
