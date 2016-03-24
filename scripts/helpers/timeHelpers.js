export let runTimer = (timer) => {
  if(timer.state.gameTime > 0) {
    timer.setState({
      gameTime : (timer.state.gameTime -= 100)
    });
    setTimeout(runTimer.bind(null, timer), 100);
  }
  return true;
}

export let startTimer = (timer) => {
  if(timer.state.gameTime != 60000) {
    return true
  }
  document.getElementById('css-progress-bar').style.width = '0%';
  document.getElementsByClassName('progress')[0].style.background = '#ec5840';
  runTimer(timer);
  return true;
}
