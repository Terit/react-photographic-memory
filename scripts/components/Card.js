import React from 'react';

var Card = React.createClass({
  getInitialState : function() {
    return {
      isClicked : false,
      isMatched : false
    };

  },

  componentWillReceiveProps : function() {
    this.setState({
      isClicked : false,
      isMatched : false
    })
  },

  isMatch : function() {
    if(this.state.isClicked) {
      return false;
    }
    var canClick = this.props.clicker(this);

    if(!canClick) {
      return false;
    }

    if(this.state.isMatched) {
      return true;
    }
    this.setState({ isClicked : !this.state.isClicked });
  },

  render : function() {
    var background = (this.state.isClicked ? 'url(' + this.props.image + ') 50% 50% / 183px 183px no-repeat' : 'url(./assets/images/Instagram_Icon_Large.png) 50% 50% / 200px 200px no-repeat');
    return(
      <div className='small-3 columns'>
        <div
          style={{
            background: background,
            height: '200px'
          }}
          onClick={this.isMatch}
        ></div>
      </div>
    )
  }
})

export default Card;
