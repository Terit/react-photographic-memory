var mouseClicks = null;
var matches = null;
var clickedCards = [];


var helpers = {
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

  shouldFlip : function(currentCard) {
    // STATE 1
    // if card is not Clicked and is not Matched
    if(!currentCard.state.isClicked && !currentCard.state.isMatched) {
      // Count the click
      mouseClicks ++;
      // If there are less than 3 clicks, no cheating
      if(mouseClicks < 3) {
        // The card is now clicked and added to the clickedCards array
        currentCard.setState({
          isClicked : true
        });
        clickedCards.push(currentCard);
        // If there are 2 cards, we can see if it's a match
        if(clickedCards.length === 2) {
          // Check if the cards are a match
          var value = clickedCards[0].props.number === currentCard.props.match ? true : false;
          // Update the state for the matches
          clickedCards.map(helpers.updateCard.bind(null, value));
          // Regardless, reset the click counter and clickedCards array
          mouseClicks = 0;
          clickedCards = [];
        }
      }
    }
    return true;
  },

  updateCard : function(value, card) {
    card.setState({
      isMatched : value,
      isClicked : value
    });
    return card;
  }
}

export default helpers;
