const tagURL = 'http://localhost:3002/api/images/';
const leaderboardURL = 'http://localhost:3002/api/leaderboard/';
const saveScoreURL = 'http://localhost:3002/api/leaderboard/new/'

export let fetchCards = (props) => {
  let url = getUrl(props.params.tag);
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +  response.status);
              return;
            }
            return response.json().then(updateCards)
          });
}

let getUrl = (tag) => tag ? tagURL+tag : tagURL+'popular'

let updateCards = (imgs) => {
  let cards = [];
  // limit the number of images to 8
  imgs.slice(0,8).map((img, index)=> {
    // Grab the low_resolution url and set it to the current index of cards
    cards.push({ image: img, id: index, match: index + 8 });
    // Duplicate the cards
    cards.push({ image: img, id: index + 8, match: index });
  });
  return cards;
}

export let leaderboard = (tag) => {
  let url = leaderboardURL + tag;
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +  response.status);
              return;
            }
            return response.json();
          });
}

export let saveScore = (name, tag, score) => {
  let url = [saveScoreURL, tag, name, score].join('/');
  // Post to API
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +  response.status);
              return;
            }
            return response.json();
          });
}
