import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import Header from './Header';
import Timer from './Timer';
import Body from './Body';
import Modal from './Modal';
import StartModal from './StartModal';
import EndModal from './EndModal';
import ProgressBar from './ProgressBar';
import TagForm from './TagForm';

import { matchCount, cssStopGame, cssStartGame, shuffle, resetMatches } from '../helpers/gameLogic';
import { percentTimeLeft, runTimer } from '../helpers/timeHelpers';
import { fetchCards } from '../helpers/photographicMemoryApi';

const propTypes = {
  params: PropTypes.object,
};

@autobind
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      gameTime: 60000,
      gameOn: false,
      width: 100,
    };
  }

  componentDidMount() {
    this.resetCards(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.resetGame(nextProps);
    return nextProps;
  }

  resetGame(props) {
    this.state.gameOn = false;
    this.state.gameTime = 60000;
    this.resetCards(props);
  }

  resetCards(props) {
    fetchCards(props)
      .then((cards) => {
        this.setState({
          cards,
          gameTime: 60000,
          gameOn: false,
          width: 100,
        });
      })
      .then(resetMatches)
      .then(cssStopGame);
  }

  startGame() {
    this.setState({
      gameOn: true,
      gameTime: 60000,
      width: 0,
    });
    cssStartGame()
      .then(runTimer(this.state.gameTime))
      .then(() => {
        setTimeout(
          this.setState.bind(this, { gameOn: false }),
          this.state.gameTime
        )
      });
  }

  gameOver() {
    if (matchCount() === 8) {
      cssStopGame();
      let time = document.getElementById('timer').innerText;
      time = parseFloat(time) * 1000;
      this.state.gameOn = false;
      this.setState({
        gameOn: this.state.gameOn,
        gameTime: time,
        width: percentTimeLeft(time),
      });
    }
    return true;
  }

  modal() {
    if (!this.state.gameOn && (this.state.gameTime < 60000)) {
      return (
        <EndModal
          startGame={this.startGame}
          gameTime={this.state.gameTime}
          tag={this.props.params.tag || 'popular'}
        >
          <TagForm />
        </EndModal>
      );
    }
    return <StartModal startGame={this.startGame} />;
  }

  render() {
    return (
      <div className="row">
        <Header tag={this.props.params.tag || 'popular'} gameTime={this.state.gameTime}>
          <Timer gameTime={this.state.gameTime} />
          <TagForm />
        </Header>
        <ProgressBar width={this.state.width} />
        <Modal gameOn={this.state.gameOn}>
          {this.modal()}
        </Modal>
        <Body cards={shuffle(this.state.cards)} gameOver={this.gameOver} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
