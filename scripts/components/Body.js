import React from 'react';
import Card from './Card';

var Body = React.createClass({
  getInitialState : function() {
    return {
      cardsClicked : [],
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
        onClick={this.props.timer}
      />
    )
  },

  shouldComponentUpdate : function(nextProps, nextState) {
    if(nextState.cardsClicked.length !== 0 && nextState.cardsClicked.length < 3) {
      return false;
    }
    return true;
    // return false
  },

  componentDidMount : function() {
    this.state.shuffled = true;
    this.setState({
      shuffled : this.state.shuffled
    });
  },

  clicker : function(card) {
    var isMatched = false;
    if(this.state.cardsClicked[this.state.cardsClicked.length - 1] === card.props.match) {
      isMatched = true;
    }
    this.state.cardsClicked.push(card.props.number);

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
