import React from 'react';

var Card = React.createClass({
  getInitialState : function() {
    return {
      isClicked : false,
      isMatched : false
    };
  },

  componentWillReceiveProps : function(nextProps) {
    console.log(nextProps)
    this.setState({
      isClicked : false,
      isMatched : false
    })
  },

  shouldComponentUpdate : function() {
    if(this.state.isMatched) {
      return false;
    }
    return true;
  },

  isMatch : function() {
    if(!this.props.timer()) {
      return false;
    }
    if(this.state.isClicked || this.state.isMatched) {
      return false;
    }

    var clickResults = this.props.clicker(this);

    if(!clickResults.canClick) {
      return false;
    }

    this.setState({
      isClicked : !this.state.isClicked,
      isMatched : clickResults.isMatched
    });
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
