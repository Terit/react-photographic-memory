let mouseClicks = null;
let clickedCards = [];
let matchCountVar = 0;

const isClicked = (card) => new Promise((resolve) => {
  card.setState({
    isClicked: true,
  });
  clickedCards.push(card);
  setTimeout(() => { resolve(clickedCards); }, 1500);
});

const resetCards = () => {
  mouseClicks = 0;
  clickedCards = [];
};

const updateCard = (value, card) => {
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
    if (value) matchCountVar += 1;

    // Update the state for the matches
    cards.map(updateCard.bind(null, value));

    return resolve(true);
  }
  return reject();
});


// EXPORTS
export const matchCount = () => matchCountVar;

export const resetMatches = () => {
  resetCards();
};

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
        .then(resetCards) // Regardless, reset the click counter and clickedCards array
        .catch(e => `There was an error: ${e}`)
        .then(currentCard.props.gameOver);
    }
  }
  return true;
};

export const cssStopGame = () => {
  document.getElementById('timer').className = '';
  document.getElementById('css-progress-bar').className = 'progress-meter';
  document.getElementById('progress').className = 'progress';
};

export const cssStartGame = () => new Promise((resolve) => {
  document.getElementById('timer').className = 'running';
  document.getElementById('css-progress-bar').className = 'progress-meter transition';
  document.getElementById('progress').className = 'progress transition';
  resolve();
});

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

