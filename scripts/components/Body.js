import React from 'react';
import Card from './Card';

var Body = React.createClass({
  renderCards : function(key) {
    const card = this.props.cards[key];
    return(
      <Card
        key={key}
        image={card.image}
        number={card.id}
        match={card.match}
      />
    )
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
