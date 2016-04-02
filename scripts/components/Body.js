import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import Card from './Card';

const propTypes = {
  cards: PropTypes.array.isRequired,
  gameOver: PropTypes.func.isRequired,
};

class Body extends React.Component {
  @autobind
  renderCards(key) {
    const card = this.props.cards[key];
    return (
      <Card
        key={key}
        image={card.image}
        number={card.id}
        match={card.match}
        gameOver={this.props.gameOver}
      />
    );
  }

  render() {
    const cards = Object.keys(this.props.cards);
    return (
      <main >
        <div className="row">
          {cards.map(this.renderCards)}
        </div>
      </main>
    );
  }
}

Body.propTypes = propTypes;

export default Body;
