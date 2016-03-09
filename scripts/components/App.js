import React from 'react';

import Header from './Header';
import Body from './Body';

import helpers from '../helpers/game_logic';
import timeHelpers from '../helpers/time_helpers';
import instagram from '../helpers/instagram';

var App = React.createClass({

  getInitialState : function() {
    return {
      cards: {},
      gameTime: 60000
    };
  },

  componentDidMount : function() {
    instagram.fetchCards(this.props)
      .then((cards) => {
        this.setState({
          cards : cards,
          gameTime: 60000
        });
      });
  },

  componentWillReceiveProps : function(nextProps) {
    instagram.fetchCards(nextProps)
      .then((cards) => {
        this.setState({
          cards : cards,
          gameTime: 60000
        });
      });
  },

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} />
        <Body cards={helpers.shuffle(this.state.cards)} timer={timeHelpers.startTimer} />
      </div>
    )
  }
});

export default App;
