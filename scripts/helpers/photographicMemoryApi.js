const baseURL = 'http://photographicmemory-api.herokuapp.com';
const tagURL = `${baseURL}/api/images/`;
const leaderboardURL = `${baseURL}/api/leaderboard/`;
const saveScoreURL = `${baseURL}/api/leaderboard/new`;
const getUrl = (tag) => `${tagURL}${tag || 'popular'}`;

const updateCards = (imgs) => {
  const cards = [];
  // limit the number of images to 8
  imgs.slice(0, 8).map((img, index) => {
    // Grab the low_resolution url and set it to the current index of cards
    cards.push({ image: img, id: index, match: index + 8 });
    // Duplicate the cards
    cards.push({ image: img, id: index + 8, match: index });
    return null;
  });
  return cards;
};

export const fetchCards = (props) => {
  const url = getUrl(props.params.tag);
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            return response.json().then(updateCards);
          });
};

export const leaderboard = (tag) => {
  const url = leaderboardURL + tag;
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            return response.json();
          });
};

export const saveScore = (name, tag, score) => {
  // Post to API
  const data = new FormData();
  data.append('name', name);
  data.append('tag', tag);
  data.append('score', score);
  return fetch(saveScoreURL, { method: 'POST', body: data })
          .then((response) => {
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            response.json();
          });
};
