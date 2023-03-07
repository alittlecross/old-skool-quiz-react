import React from 'react';

import ScoreCells from '../../../factories/scores-cells';

function ScoresTable({ game }) {
  const cells = ScoreCells(game.players);

  return (
    <table id="scores-table">
      <thead>
        <tr>
          {cells.th}
        </tr>
      </thead>

      <tbody>
        <tr>
          {cells.td}
        </tr>
      </tbody>
    </table>
  );
}

export default ScoresTable;
