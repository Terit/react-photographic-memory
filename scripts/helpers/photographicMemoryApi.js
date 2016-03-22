const tagURL = 'http://localhost:3002/api/images/'

let api = {
  fetchCards : function(props) {
    let url = this.getUrl(props.params.tag);
    return fetch(url)
            .then((response) => {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +  response.status);
                return;
              }
              return response.json().then(this.updateCards)
            });
  },

  getUrl: (tag)=> tag ? tagURL+tag : tagURL+'popular',

  updateCards : (imgs)=> {
    let cards = [];
    // limit the number of images to 8
    imgs.slice(0,8).map((img, index)=> {
      // Grab the low_resolution url and set it to the current index of cards
      cards.push({ image: img, id: index, match: index + 8 });
      // Duplicate the cards
      cards.push({ image: img, id: index + 8, match: index });
    });
    return cards;
  },
}

export default api;
