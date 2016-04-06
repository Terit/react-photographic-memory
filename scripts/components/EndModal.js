import React, { PropTypes } from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

import { saveScore } from '../helpers/photographicMemoryApi';

import Hr from './Hr';

const propTypes = {
  replayGame: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  gameTime: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
};

class EndModal extends React.Component {
  @autobind
  submitScore(event) {
    event.preventDefault();
    const name = this.refs.name.value;
    const tag = this.props.tag;
    const score = this.props.gameTime;
    saveScore(name, tag, score)
      .then(() => this.history.pushState(null, `/${this.props.tag}/leaderboard`));
    this.refs.scoreForm.reset();
  }

  render() {
    return (
      <div className="small-4 small-centered columns">
        <div className="callout" id="gameOver-modal" >

          <Hr text={'You Win!'} />

          <form ref="scoreForm" onSubmit={this.submitScore}>
            <div className="row">
              <div className="medium-12 columns">
                <label>Enter Your Name
                  <input type="text" placeholder="Name" ref="name" />
                </label>
                <button type="submit" className="button expanded">Submit</button>
              </div>
            </div>
          </form>

          <Hr text={'Or'} />

          {this.props.children}

          <Hr text={'Or'} />

          <button onClick={this.props.replayGame} className="button expanded">
            Replay Game
          </button>
        </div>
      </div>
    );
  }
}

EndModal.propTypes = propTypes;

reactMixin.onClass(EndModal, History);

export default EndModal;
