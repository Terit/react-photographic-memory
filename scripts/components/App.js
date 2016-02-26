import React from 'react';

import Header from './Header';
import Body from './Body';
import request from 'superagent';

const InstagramClientId = "d59e45dfeb284b4ba733c144b55175de";
const InstagramClientSecret = "79fbd5ff57ec47e5bd61ff084747cb49";
const InstagramRedirectUri = "http://localhost:3000";
const InstagramAccessToken = "1566108475.d59e45d.2bd936b7ac3a46ebabf7a77435679d6b"

var App = React.createClass({

  getInitialState : function() {
    return {
      cards: {},
      gameTime: 60000
    };
  },

  componentDidMount : function() {
    this.fetchCards(this.props);
  },

  componentWillReceiveProps : function(nextProps) {
    this.fetchCards(nextProps);
  },

  fetchCards : function(props) {
    if(props.params.tag) {
      var url = 'https://api.instagram.com/v1/tags/'+props.params.tag+'/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=?'
    } else {
      var url = 'https://api.instagram.com/v1/media/popular.json?client_id=642176ece1e7445e99244cec26f4de1f&callback=?'
    }

    // var auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='+InstagramClientId+'&redirect_uri='+InstagramRedirectUri+'&response_type=token';
    // var url = 'https://api.instagram.com/v1/tags/search?q=snowy&access_token=' + InstagramAccessToken
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
          return;
        }

        response.json().then((response) => {
          return response.data.map(function(p){
            return {
                id: p.id,
                url: p.link,
                src: p.images.low_resolution.url,
                title: p.caption ? p.caption.text : '',
                favorite: false
            };
          });
        }).then(this.updateCards)
          .then((cards) => {
            this.setState({
              cards : cards,
              gameTime: 60000
            });
          });
      });
  },

  updateCards : function(imgs) {
    var cards = [];
    // limit the number of images to 8
    imgs.slice(0,8).map((img, index)=> {
      // Grab the low_resolution url and set it to the current index of cards
      cards.push({ image: img.src, id: index, match: index + 8 });
      // Duplicate the cards
      cards.push({ image: img.src, id: index + 8, match: index });
    });
    return cards;
  },

  startTimer : function() {
    if(this.state.gameTime === 6000) {
      this.runTimer();
    }
    return (this.state.gameTime > 0 ? true : false);
  },

  runTimer : function() {
    if(this.state.gameTime > 0) {
      this.setState({
        gameTime : (this.state.gameTime -= 100)
      });
      setTimeout(this.runTimer, 100);
    }
  },

  gameOn : function(event) {
    if(this.state.gameTime === 0) {
      event.preventDefault();
    }
    return true;
  },

  shuffle : function(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },

  render : function() {
    return (
      <div className='row'>
        <Header tag={this.props.params.tag} gameTime={this.state.gameTime} />
        <Body cards={/*this.shuffle(this.state.cards)*/this.state.cards} timer={this.startTimer} />
      </div>
    )
  }
});

export default App;
