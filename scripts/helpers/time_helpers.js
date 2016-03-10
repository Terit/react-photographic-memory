var timers = {
  runTimer : (timer)=> {
    if(timer.state.gameTime > 0) {
      timer.setState({
        gameTime : (timer.state.gameTime -= 100)
      });
      setTimeout(timers.runTimer.bind(null, timer), 100);
    }
    return true;
  },

  startTimer : (timer)=> {
    if(timer.state.gameTime != 60000) {
      return true
    }
    document.getElementById('css-progress-bar').style.width = '0%';
    document.getElementsByClassName('progress')[0].style.background = '#ec5840';
    timers.runTimer(timer);
    return true;
  }
};

export default timers;
