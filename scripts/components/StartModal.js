import React, { PropTypes } from 'react';

export default function StartModal({ startGame }) {
  return (
    <div className="small-3 small-centered columns buttons">
      <button onClick={startGame} className="button large expanded">
        Start Game
      </button>
    </div>
  );
}

StartModal.propTypes = {
  startGame: PropTypes.func.isRequired,
};
