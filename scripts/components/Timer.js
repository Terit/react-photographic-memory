import React, { PropTypes } from 'react';
import { formatTime } from '../helpers/timeHelpers';

const propTypes = {
  gameTime: PropTypes.number.isRequired,
};

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      gameTime: 0,
    };
  }

  componentDidMount() {
    this.state.gameTime = this.props.gameTime;
  }

  componentWillReceiveProps(nextProps) {
    this.state.gameTime = nextProps.gameTime;
    this.setState({
      gameTime: this.state.gameTime,
    });
  }

  render() {
    if (this.state.gameTime) {
      return (
        <li id="timer-component" className="menu-text">
          Timer: <span id="timer" className="running">{formatTime(this.state.gameTime)}</span>
        </li>
      );
    }
    return (<li className="menu-text"></li>);
  }
}

Timer.propTypes = propTypes;

export default Timer;
