export const formatTime = (timeInMs) => parseFloat(timeInMs / 1000);

const runTimer = (time) => {
  try {
    if (time > 0) {
      const timer = document.getElementById('timer');
      timer.innerText = formatTime(time - 100);
      if (timer.classList.contains('running')) {
        setTimeout(runTimer.bind(null, time - 100), 100);
      }
    }
  } finally {
    return true;
  }
};

export const startTimer = (timer) => {
  if (timer.state.gameTime !== 60000) {
    return true;
  }
  document.getElementById('timer').className = 'running';
  document.getElementById('css-progress-bar').className = 'progress-meter transition';
  document.getElementById('progress').className = 'progress transition';
  runTimer(timer.state.gameTime);
  setTimeout(
    timer.setState.bind(timer, { gameOn: false })
  , 60000);
  return true;
};

export const percentTimeLeft = (time) => time / 600.0;
