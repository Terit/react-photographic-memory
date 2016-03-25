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
  setTimeout(
    timer.setState.bind(timer, { gameOn : false })
  , 60000)
  return true;
}

export let formatTime = (timeInMs) => parseFloat(timeInMs / 1000)

export let percentTimeLeft = (time) => (60000 - time) / 60000.0
