export const formatTime = (timeInMs) => parseFloat(timeInMs / 1000);

const runTimer = (time) => {
  if (time > 0) {
    const timer = document.getElementById('timer');
    timer.innerText = formatTime(time - 100);
    if (timer.classList.contains('running')) {
      setTimeout(runTimer.bind(null, time - 100), 100);
    }
  }
  return true;
};

export const startTimer = (timer) => {
  if (timer.state.gameTime !== 60000) {
    return true;
  }
  document.getElementById('css-progress-bar').style.width = '0%';
  document.getElementsByClassName('progress')[0].style.background = '#ec5840';
  runTimer(timer.state.gameTime);
  setTimeout(
    timer.setState.bind(timer, { gameOn: false })
  , 60000);
  return true;
};

export const percentTimeLeft = (time) => time / 600.0;
