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

  // Reset the game using the current params, aka the props
  // This ensures the game starts fresh when the page loads
  componentDidMount() {
    this.resetGame(this.props);
  }

  // New props come in, reset the the state to it's original state
  // Pass the new params to reset game which will fetch new cards
  componentWillReceiveProps(nextProps) {
    this.resetGame(nextProps);
    return nextProps;
  }

  resetGame(props) {
    // Pass the props object into fetchCards api call because params might be empty
    // and it's easier to handle this way.
    fetchCards(props)
      .then((cards) => { // After getting the cards, update the state
        this.setState({
          cards,
          gameTime: 60000,
          gameOn: false,
          width: 100,
        });
      })
      .then(resetMatches) // Also make sure to reset the Match count
      .then(cssStopGame); // Finally change the css styles to allow for fast transitions
  }

  // Begin a new game, this function is passed into each Modal
  startGame() {
    this.setState({
      gameOn: true,
      gameTime: 60000,
      width: 0,
    });

    // Apply css styles to allow for slow transitions and the timer to work
    cssStartGame()
      .then(runTimer(this.state.gameTime)) // Pass the gameTime into the timer to countdown
      .then(() => { // Set a timer to check if the player has made all the matches when the timer hits 0sec
        setTimeout(
          this.timeGameOver.bind(this),
          this.state.gameTime
        )
      });
  }

  // Checks the timer gameTime seconds after the game has started to see if the player loses
  timeGameOver() {
    let time = document.getElementById('timer').innerText;
    time = parseInt(time) * 1000;
    if (time === 0) {
      this.state.gameOn = false;
      this.setState({
        gameOn: this.state.gameOn
      });
    }
  }

  // Callback function passed to Cards through the Body component, this is called
  // after all other logic is done on Card.onClick
  isGameOver() {
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

  // Use the same cards and reset the game to original state
  replayGame() {
      this.setState({
        gameTime: 60000,
        gameOn: false,
        width: 100,
      });
      resetMatches(); // Also make sure to reset the Match count
      cssStopGame(); // Finally change the css styles to allow for fast transitions
  }

  // Decides which modal to render when the gameOn state is false
  renderModal() {
    if (!this.state.gameOn && (this.state.gameTime < 60000)) {
      return (
        <EndModal
          replayGame={this.replayGame}
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
          {this.renderModal()}
        </Modal>
        <Body cards={shuffle(this.state.cards)} isGameOver={this.isGameOver} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
