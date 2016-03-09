export default {
  startTimer : function() {
    if(this.state.gameTime === 6000) {
      this.runTimer();
    }
    return (this.state.gameTime > 0 ? true : false);
  },

  runTimer : function() {
    if(this.state.gameTime > 0) {
      this.setState({
        gameTime : (this.state.gameTime -= 100)
      });
      setTimeout(this.runTimer, 100);
    }
  },

  gameOn : function(event) {
    if(this.state.gameTime === 0) {
      event.preventDefault();
    }
    return true;
  }
};
