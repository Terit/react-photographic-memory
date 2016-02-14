import React from 'react';
import Card from './Card';

var Body = React.createClass({
  renderCards : function(key) {
    const card = this.props.cards[key];
    return(
      <Card key={key} image={card.image} match={card.match} />

    )
  },

  render : function() {
    return(
      <main>
        <div className='row'>
          {Object.keys(this.props.cards).map(this.renderCards)}
        </div>
      </main>
    );
  }
});

export default Body;
