import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import autobind from 'autobind-decorator';

import Header from './Header';
import Timer from './Timer';
import Body from './Body';
import Modal from './Modal';
import StartModal from './StartModal';
import EndModal from './EndModal';
import ProgressBar from './ProgressBar';

import * as helpers from '../helpers/gameLogic';
import * as timers from '../helpers/timeHelpers';
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
    helpers.matchCount = 0;
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
      .then(helpers.resetMatches)
      .then(() => {
        document.getElementById('timer').className = '';
        document.getElementById('css-progress-bar').className = 'progress-meter';
        document.getElementById('progress').className = 'progress';
      });
  }

  startGame() {
    this.setState({
      gameOn: true,
      gameTime: 60000,
      width: 0,
    });
    timers.startTimer(this);
  }

  gameOver() {
    if (helpers.matchCount === 8) {
      let time = document.getElementById('timer').innerText;
      time = parseFloat(time) * 1000;
      this.state.gameOn = false;
      this.setState({
        gameOn: this.state.gameOn,
        gameTime: time,
      });
      helpers.matchCount = 0;
    }
    return true;
  }

  modal() {
    if (!this.state.gameOn && (this.state.gameTime < 60000)) {
      return <EndModal
              startGame={this.startGame}
              gameTime={this.state.gameTime}
              tag={this.props.params.tag}
             />;
    }
    return <StartModal startGame={this.startGame} />;
  }

  render() {
    return (
      <div className="row">
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime}>
          <Timer gameTime={this.state.gameTime} />
        </Header>
        <ProgressBar width={this.state.width} />
        <Modal gameOn={this.state.gameOn}>
          {this.modal()}
        </Modal>
        <Body cards={helpers.shuffle(this.state.cards)} gameOver={this.gameOver} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
