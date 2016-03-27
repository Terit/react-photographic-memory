import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Header from './Header';
import Body from './Body';
import Modal from './Modal';
import ProgressBar from './ProgressBar';

import * as helpers from '../helpers/gameLogic';
import * as timers from '../helpers/timeHelpers';
import {fetchCards} from '../helpers/photographicMemoryApi';

let App = React.createClass({
  getInitialState : function() {
    return {
      cards: {},
      gameTime: 60000,
      gameOn: false
    };
  },

  componentDidMount : function() {
    this.resetCards(this.props);
  },

  componentWillReceiveProps : function(nextProps) {
    this.resetGame(nextProps);
    return nextProps;
  },

  resetGame : function(props) {
    this.state.gameOn = false;
    this.state.gameTime = 60000;
    helpers.matchCount = 0;
    this.resetCards(props);
    document.getElementsByClassName('progress')[0]
      .outerHTML = ReactDOMServer.renderToString(<ProgressBar width={100} />)
  },

  resetCards : function(props) {
    fetchCards(props)
      .then((cards) => {
        this.setState({
          cards : cards,
          gameTime: 60000,
          gameOn: false
        });
      })
      .then(helpers.resetMatches);
  },

  startGame : function() {
    timers.startTimer(this);
    if(!this.state.gameOn) {
      this.setState({
        gameOn : true
      });
    }
  },

  gameOver : function() {
    if(helpers.matchCount === 8) {
      this.state.gameOn = false;
      this.setState({
        gameOn : this.state.gameOn
      });
      let timeLeft = timers.percentTimeLeft(this.state.gameTime)
      document.getElementsByClassName('progress')[0]
        .outerHTML = ReactDOMServer.renderToString(<ProgressBar width={timeLeft} />)
    }
    return true
  },

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} />
        <ProgressBar width={100} />
        <Modal gameOn={this.state.gameOn} startGame={this.startGame} />
        <Body cards={helpers.shuffle(this.state.cards)} gameOver={this.gameOver} />
      </div>
    )
  }
});

export default App;
