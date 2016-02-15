import React from 'react';
import Card from './Card';

var Body = React.createClass({
  renderCards : function(key) {
    const card = this.props.cards[key];
    return(
      <Card
        key={key}
        image={card.image}
        number={parseInt(key)}
        match={card.match}
        timer={this.props.timer}
      />
    )
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
    return(
      <main >
        <div className='row'>
          {this.shuffle(Object.keys(this.props.cards)).map(this.renderCards)}
        </div>
      </main>
    );
  }
});

export default Body;
