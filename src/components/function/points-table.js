import React from 'react'

import NameCellsFactory from '../factory/name-cells'
import PointCellsFactory from '../factory/point-cells'

const PointsTable = props => {
  const { players } = props.game

  return (
    <table id='points-table'>
      <thead>
        <tr className='names'>
          {NameCellsFactory(players, true)}
        </tr>
      </thead>

      <tbody>
        <tr id='points'>
          {PointCellsFactory(players)}
        </tr>
      </tbody>
    </table>
  )
}

export default PointsTable
