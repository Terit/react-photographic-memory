var tag_url = 'https://api.instagram.com/v1/tags/';
var popular_url = 'https://api.instagram.com/v1/media/popular.json?'
var client_id = 'client_id=642176ece1e7445e99244cec26f4de1f&callback=?'

const InstagramClientId = "d59e45dfeb284b4ba733c144b55175de";
const InstagramClientSecret = "79fbd5ff57ec47e5bd61ff084747cb49";
const InstagramRedirectUri = "http://localhost:3000";
const InstagramAccessToken = "1566108475.d59e45d.2bd936b7ac3a46ebabf7a77435679d6b"

var instagram = {
  fetchCards : function(props) {
    var url = this.getUrl(props.params.tag)

    // var auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='+InstagramClientId+'&redirect_uri='+InstagramRedirectUri+'&response_type=token';
    // var url = 'https://api.instagram.com/v1/tags/search?q=snowy&access_token=' + InstagramAccessToken
    return fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +  response.status);
          return;
        }

        return response.json().then((response) => {
          return response.data.map(function(p){
            return {
                // id: p.id,
                // url: p.link,
                src: p.images.low_resolution.url,
                // title: p.caption ? p.caption.text : '',
                // favorite: false
            };
          });
        }).then(this.updateCards)
      });
  },

  getUrl : function(tag){
    if(tag) {
      return tag_url+tag+'/media/recent?'+client_id
    } else {
      return popular_url+client_id
    }
  },

  updateCards : function(imgs) {
    var cards = [];
    // limit the number of images to 8
    imgs.slice(0,8).map((img, index)=> {
      // Grab the low_resolution url and set it to the current index of cards
      cards.push({ image: img.src, id: index, match: index + 8 });
      // Duplicate the cards
      cards.push({ image: img.src, id: index + 8, match: index });
    });
    return cards;
  },
}

export default instagram;
