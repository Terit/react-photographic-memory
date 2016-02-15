import React from 'react';
import Card from './Card';

var Body = React.createClass({
  getInitialState : function() {
    return {
      cardsClicked : 0,
      shuffled: false
    }
  },

  renderCards : function(key) {
    const card = this.props.cards[key];
    return(
      <Card
        key={key}
        image={card.image}
        number={card.id}
        match={card.match}
        timer={this.props.timer}
        clicker={this.clicker}
      />
    )
  },

  shouldComponentUpdate : function(nextProps, nextState) {
    if(nextState.cardsClicked !== 0 && nextState.cardsClicked < 3) {
      return false;
    }
    return true;
  },

  componentDidMount : function() {
    this.state.shuffled = true;
    this.setState({
      shuffled : this.state.shuffled
    });
  },

  clicker : function(card) {
    var canClick = true;
    if(this.state.cardsClicked === 2) {
      canClick = false;
      this.state.cardsClicked = -1
    }
    this.state.cardsClicked++;

    this.setState({
      cardsClicked : this.state.cardsClicked
    });
    return canClick;
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
    var cards = (!this.state.shuffled ? this.shuffle(Object.keys(this.props.cards)) : Object.keys(this.props.cards));

    return(
      <main >
        <div className='row'>
          {cards.map(this.renderCards)}
        </div>
      </main>
    );
  }
});

export default Body;
