import React from 'react';

import Header from './Header';
import Leader from './Leader';

import {leaderboard} from '../helpers/photographicMemoryApi';

let Leaderboard = React.createClass({
  getInitialState : function() {
    return {
      leaderboard: {}
    };
  },

  componentDidMount : function () {
    leaderboard(this.props.params.tag)
      .then((leaders) => {
        this.setState({
          leaderboard : leaders
        })
      });
  },

  renderScores : function(key) {
    const leader = this.state.leaderboard[key];
    return (
      <Leader
        key={key}
        rank={parseInt(key) + 1}
        score={leader.score}
        name={leader.name}
        hashtag={leader.hashtag}
      />
    )
  },

  render : function() {
    let scores = Object.keys(this.state.leaderboard);
    return (
      <div className='row'>
        <Header tag={'Leaders'} />
        <table>
          <thead>
            <th>Rank</th>
            <th>Name</th>
            <th>Hashtag</th>
            <th>Score</th>
          </thead>
          <tbody>
            {scores.map(this.renderScores)}
          </tbody>
        </table>
      </div>
    )
  }
});

export default Leaderboard;
