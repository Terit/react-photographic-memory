let runTimer = (time) => {
  if(time > 0) {
    time -= 100;
    let timer = document.getElementById('timer');
    timer.innerText = formatTime(time);
    if(timer.classList.contains('running')) {
      setTimeout(runTimer.bind(null, time), 100);
    }
  }
  return true;
}

export let startTimer = (timer) => {
  if(timer.state.gameTime != 60000) {
    return true
  }
  document.getElementById('css-progress-bar').style.width = '0%';
  document.getElementsByClassName('progress')[0].style.background = '#ec5840';
  runTimer(timer.state.gameTime);
  setTimeout(
    timer.setState.bind(timer, { gameOn : false })
  , 60000)
  return true;
}

export let formatTime = (timeInMs) => parseFloat(timeInMs / 1000)

export let percentTimeLeft = (time) => time / 600.0
