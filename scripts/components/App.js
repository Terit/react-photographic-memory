import React from 'react';

import Header from './Header';
import Body from './Body';
import Modal from './Modal';

import * as helpers from '../helpers/gameLogic';
import * as timers from '../helpers/timeHelpers';
import api from '../helpers/photographicMemoryApi';

var App = React.createClass({
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
      .outerHTML = "<div class='progress' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'><div id='css-progress-bar' class='progress-meter' style={width: '100%'}></div></div>"
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
        <div className="progress" aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>
          <div id='css-progress-bar' className="progress-meter" style={{width: '100%'}}></div>
        </div>
        <Modal gameStatus={this.state.gameOn} startTimer={this.startGame} />
        <Body cards={helpers.shuffle(this.state.cards)} timer={this.startGame} />
      </div>
    )
  }
});

export default App;
