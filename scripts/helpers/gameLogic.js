let mouseClicks = null;
let clickedCards = [];
export let matchCount = 0;

export const shuffle = (array) => {
  let m = array.length, t, i;

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
};

const isClicked = (card) => new Promise((resolve) => {
  card.setState({
    isClicked: true,
  });
  clickedCards.push(card);
  setTimeout(() => { resolve(clickedCards); }, 1500);
});

export const resetMatches = () => {
  mouseClicks = 0;
  clickedCards = [];
};

export const updateCard = (value, card) => {
  card.setState({
    isMatched: value,
    isClicked: value,
  });
  return card;
};

const isMatch = (cards) => new Promise((resolve, reject) => {
  // // If there are 2 cards, we can see if it's a match
  if (cards.length === 2) {
    // Check if the cards are a match
    const value = cards[0].props.number === cards[1].props.match;
    // Updated # of matches
    if (value) matchCount += 1;

    // Update the state for the matches
    cards.map(updateCard.bind(null, value));

    // Regardless, reset the click counter and clickedCards array
    // resetMatches();
    return resolve(true);
  }
  return reject();
});

export const shouldFlip = (currentCard) => {
  // if card is not Clicked and is not Matched
  if (!currentCard.state.isClicked && !currentCard.state.isMatched) {
  // Flip the card
    // Count the click
    mouseClicks ++;
    // If there are less than 3 clicks, no cheating
    if (mouseClicks < 3) {
      // The card is now clicked and added to the clickedCards array
      isClicked(currentCard)
        .then(isMatch)
        .then(resetMatches)
        .catch(e => `There was an error: ${e}`)
        .then(currentCard.props.gameOver);
    }
  }
  return true;
};

