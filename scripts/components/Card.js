import React from 'react';

var Card = React.createClass({
  getInitialState : function() {
    return { 
      isClicked : false,
      isMatched : false
    };

  },
  isMatch : function() {
    if(this.state.isMatched) {
      return true;
    }

    this.setState({ isClicked : !this.state.isClicked });
  },

  render : function() {
    var url = (this.state.isClicked ? this.props.image : './assets/images/Instagram_Icon_Large.png');
    return(
      <div className='small-3 columns'>
        <div
          style={{
            background: 'url(' + url + ') 50% 50% / 200px 200px no-repeat', 
            height: '200px'
          }}
          onClick={this.isMatch}
        ></div> 
      </div>
    )    
  }
})

export default Card;
