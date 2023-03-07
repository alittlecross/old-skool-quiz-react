import React from 'react';

const ActiveQuestionCells = (players) => {
  const th = [];
  const td = [];

  for (const [key, value] of Object.entries(players)) {
    th.push(
      <th key={key}>
        {value.name}
      </th>,
    );

    td.push(
      value.active
        ? <td key={key} className="highlight-blue">{value.active.answer}</td>
        : <td key={key} />,
    );
  }

  return {
    th,
    td,
  };
};

export default ActiveQuestionCells;
