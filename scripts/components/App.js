import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Header from './Header';
import Body from './Body';
import Modal from './Modal';
import ProgressBar from './ProgressBar';

import * as helpers from '../helpers/gameLogic';
import * as timers from '../helpers/timeHelpers';
import api from '../helpers/photographicMemoryApi';

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
    this.resetCards(props);
    document.getElementsByClassName('progress')[0]
      .outerHTML = ReactDOMServer.renderToString(<ProgressBar />)
  },

  resetCards : function(props) {
    api.fetchCards(props)
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

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} />
        <ProgressBar />
        <Modal gameStatus={this.state.gameOn} startTimer={this.startGame} />
        <Body cards={helpers.shuffle(this.state.cards)} timer={this.startGame} />
      </div>
    )
  }
});

export default App;
