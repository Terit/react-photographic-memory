import React from 'react';

import Header from './Header';
import Body from './Body';

import Instafeed from 'instafeed.js';

var App = React.createClass({
  getInitialState : function() {
    var tag = (this.props.params.tag ?'tagged' : 'popular')
    var feed = new Instafeed({
      get: tag,
      tagName: this.props.params.tag,
      clientId: "9da886f5f068407d9239abb2ae46cda2",
      mock: true,
      resolution: 'low_resolution',
      success: this.updateCards
    }).run();

    return { 
      cards: {}
    };
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

  render : function() {
    return (
      <div className='row'>
        <Header />
        <Body cards={this.state.cards} />
      </div>
    )
  }
});

export default App;
