import React from 'react';

export default React.createClass({
  render : function() {
    return(
      <tr>
        <td>{this.props.rank}</td>
        <td>{this.props.name}</td>
        <td>{this.props.hashtag}</td>
        <td>{this.props.score}</td>
      </tr>
    )
  }
});
