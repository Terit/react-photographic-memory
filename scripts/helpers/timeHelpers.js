export const formatTime = (timeInMs) => parseFloat(timeInMs / 1000);

export const runTimer = (time) => {
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

export const percentTimeLeft = (time) => time / 600.0;
