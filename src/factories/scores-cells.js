import React from 'react';

import HighestAndLowestScores from '../lib/highest-and-lowest-scores';

const ScoreCells = (players) => {
  const th = [];
  const td = [];

  for (const [key, value] of Object.entries(players)) {
    const { highest, lowest } = HighestAndLowestScores(players);

    let className;

    if (highest || lowest) {
      if (highest === value.score) className = 'highlight-yellow';
      if (lowest >= value.score) className = 'highlight-pink';
    }

    th.push(
      <th key={key}>
        <span className={className}>{value.name}</span>
      </th>,
    );

    td.push(
      <td key={key}>
        {value.score}
      </td>,
    );
  }

  return {
    th,
    td,
  };
};

export default ScoreCells;
