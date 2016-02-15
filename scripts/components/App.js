import React from 'react';

import Header from './Header';
import Body from './Body';

// Instagram API
import Instafeed from 'instafeed.js';

var App = React.createClass({
  getInitialState : function() {
    var type = (this.props.params.tag ? 'tagged' : 'popular');
    this.setFeed(type, this.props.params.tag);
    return {
      cards: {},
      gameTime: 6000
    };
  },

  componentWillReceiveProps : function(nextProps) {
    var type = (nextProps.params.tag ? 'tagged' : 'popular');
    this.setFeed(type, nextProps.params.tag);
    this.setState({
      gameTime : 6000
    });
  },

  setFeed : function(type, tag) {
    new Instafeed({
      get: type,
      tagName: tag,
      clientId: "9da886f5f068407d9239abb2ae46cda2",
      mock: true,
      resolution: 'low_resolution',
      success: this.updateCards
    }).run();
  },

  updateCards : function(imgs) {
    // limit the number of images to 8
    imgs.data.slice(0,8).map((img, index)=> {
      // Grab the low_resolution url and set it to the current index of cards
      this.state.cards[index] = { image: img.images.low_resolution.url, match: index + 8 };
      // Duplicate the cards
      this.state.cards[index + 8] = { image: img.images.low_resolution.url, match: index };
    });

    // update state
    this.setState({
      cards : this.state.cards
    });
  },

  startTimer : function() {
    if(this.state.gameTime === 6000) {
      this.runTimer();
    }
    return true;
  },

  runTimer : function() {
    if(this.state.gameTime > 0) {
      this.setState({
        gameTime : (this.state.gameTime -= 100)
      });
      setTimeout(this.runTimer, 100);
    }
    return true;
  },

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} />
        <Body cards={this.state.cards} />
      </div>
    )
  }
});

export default App;
