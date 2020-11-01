import React from 'react'

import NameCellsFactory from '../factory/name-cells'
import ScoreCellsFactory from '../factory/score-cells'

const ScoresTable = ({ game: { players } }) => (
  <table id='scores-table'>
    <thead>
      <tr className='names'>
        {NameCellsFactory(players, true)}
      </tr>
    </thead>

    <tbody>
      <tr id='scores'>
        {ScoreCellsFactory(players)}
      </tr>
    </tbody>
  </table>
)

export default ScoresTable
