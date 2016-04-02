import React, { PropTypes } from 'react';
import autobind from 'autobind-decorator';

import Header from './Header';
import Leader from './Leader';
import Timer from './Timer';
import TagForm from './TagForm';

import { leaderboard } from '../helpers/photographicMemoryApi';

const propTypes = {
  params: PropTypes.object.isRequired,
};

class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: {},
    };
  }

  componentDidMount() {
    leaderboard(this.props.params.tag)
      .then((leaders) => {
        this.setState({
          leaderboard: leaders,
        });
      });
  }

  @autobind
  renderScores(key) {
    const leader = this.state.leaderboard[key];
    return (
      <Leader
        key={key}
        rank={parseInt(key) + 1}
        score={leader.score}
        name={leader.name}
        hashtag={leader.hashtag}
      />
    );
  }

  render() {
    const scores = Object.keys(this.state.leaderboard);
    return (
      <div className="row">
        <Header tag={'Leaders'}>
          <span></span>
          <TagForm />
        </Header>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Hashtag</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(this.renderScores)}
          </tbody>
        </table>
      </div>
    );
  }
}

Leaderboard.propTypes = propTypes;

export default Leaderboard;
