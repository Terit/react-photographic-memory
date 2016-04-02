import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import autobind from 'autobind-decorator';

import Header from './Header';
import Timer from './Timer';
import Body from './Body';
import Modal from './Modal';
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
    document.getElementsByClassName('progress')[0]
      .outerHTML = "<span id='replace'></span>";
    this.resetCards(props);
    document.getElementById('replace')
      .outerHTML = ReactDOMServer.renderToString(<ProgressBar width={100} />);
  }

  resetCards(props) {
    fetchCards(props)
      .then((cards) => {
        this.setState({
          cards,
          gameTime: 60000,
          gameOn: false,
        });
      })
      .then(helpers.resetMatches);
  }

  startGame() {
    timers.startTimer(this);
    if (!this.state.gameOn) {
      this.setState({
        gameOn: true,
        gameTime: 60000,
      });
    }
  }

  gameOver() {
    if (helpers.matchCount === 8) {
      this.state.gameOn = false;
      let time = document.getElementById('timer').innerText;
      time = parseFloat(time) * 1000;
      this.setState({
        gameOn: this.state.gameOn,
        gameTime: time,
      });
      // Do I need to replace the progress bar component here and not use props
      //  or do I need to replace the progress bar in a new function newGame??

      // let timeLeft = timers.percentTimeLeft(time)
      // document.getElementsByClassName('progress')[0]
      //   .outerHTML = ReactDOMServer.renderToString(<ProgressBar width={timeLeft} />)
      document.getElementById('timer').className = '';
      helpers.matchCount = 0;
    }
    return true;
  }

  render() {
    return (
      <div className="row">
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime}>
          <Timer gameTime={this.state.gameTime} />
        </Header>
        <ProgressBar width={timers.percentTimeLeft(this.state.gameTime)} />
        <Modal
          gameOn={this.state.gameOn}
          startGame={this.startGame}
          gameTime={this.state.gameTime}
          tag={this.props.params.tag}
        />
        <Body cards={helpers.shuffle(this.state.cards)} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
