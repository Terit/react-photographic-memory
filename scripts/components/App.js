import React from 'react';

import Header from './Header';
import Body from './Body';
import Modal from './Modal';

import helpers from '../helpers/game_logic';
import instagram from '../helpers/instagram';

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
    this.resetCards(nextProps);
  },

  resetCards : function(props) {
    instagram.fetchCards(props)
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
    if(!this.state.gameOn) {
      this.setState({
        gameOn : true
      });
    }
  },

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} gameOn={this.state.gameOn} />
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
