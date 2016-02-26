import React from 'react';
import Card from './Card';

var Body = React.createClass({
  getInitialState : function() {
    return {
      cardsClicked : []
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
        onClick={this.props.timer}
      />
    )
  },

  clicker : function(card) {
    var isMatched = false;
    var lastCard = this.state.cardsClicked[0];
    // if there is a lastCard, ie 1 card is already clicked, update the lastCard
    if(lastCard) {
      // Check if the last card is a match with the current card
      if(lastCard.props.number === card.props.match) {
        // It is a match, set isMatched to true
        isMatched = true;
      }

      lastCard.setState({
        isMatched : isMatched,
        isClicked : isMatched
      });
    }

    // Update the current card
    card.setState({
      isMatched : isMatched,
      isClicked : true
    });

    // Add this card into the card history
    this.state.cardsClicked.push(card);

    // if the card history is 3 cards reset it
    if(this.state.cardsClicked.length === 2) {
      this.state.cardsClicked = [];
    }
    this.setState({
      cardsClicked : this.state.cardsClicked
    });
    return true;
  },

  render : function() {
    var cards = Object.keys(this.props.cards);
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
