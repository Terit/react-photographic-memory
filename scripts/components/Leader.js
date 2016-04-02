import React, { PropTypes } from 'react';

export default function Leader({ rank, name, hashtag, score }) {
  return (
    <tr>
      <td>{rank}</td>
      <td>{name}</td>
      <td>#{hashtag}</td>
      <td>{score}</td>
    </tr>
  );
}

Leader.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hashtag: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
