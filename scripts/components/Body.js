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

  shouldComponentUpdate : function(nextProps, nextState) {
    if(nextState.cardsClicked.length !== 0 && nextState.cardsClicked.length < 3) {
      return false;
    }
    return true;
  },

  componentDidUpdate : function(prevProps, prevState) {
    // console.log('component updated')
  },

  clicker : function(card) {
    var isMatched = false;
    var lastCard = this.state.cardsClicked[this.state.cardsClicked.length - 1];
    if(lastCard && (lastCard.props.number === card.props.match)) {
      this.state.cardsClicked[this.state.cardsClicked.length - 1].setState({
        isMatched : true
      });
      isMatched = true;
    }
    this.state.cardsClicked.push(card);

    if(this.state.cardsClicked.length === 3) {
      this.state.cardsClicked = [];
    }

    this.setState({
      cardsClicked : this.state.cardsClicked
    });
//     console.log(this.state.cardsClicked)
//     if(this.state.cardsClicked === 2) {
//       console.log('here')
//       this.state.cardsClicked = -1;
//     }
//     this.state.cardsClicked++;

//     this.setState({
//       cardsClicked : this.state.cardsClicked
//     });
// console.log('end of clicker ' + this.state.cardsClicked)
    return { canClick : true, isMatched: isMatched };
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
