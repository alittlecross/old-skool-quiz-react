import React, { useState } from 'react'

import MenuButton from './menu-button'
import MenuCells from '../../../factories/menu-cells'
import MenuTable from './menu-table'

const MenuBar = ({ game, io }) => {
  const [merge, setMerge] = useState(null)
  const [tables, setTables] = useState([false, false, false])

  const handleClick = (e, i) => {
    const arr = [false, false, false]

    arr[i] = !tables[i]

    setTables(arr)
  }

  const cells = MenuCells(io, merge, game.players, setMerge)

  return (
    <div id='menu'>
      <MenuButton colour='yellow' i={0} onClick={handleClick}>Merge players</MenuButton>
      &nbsp;
      <MenuButton colour='blue' i={1} onClick={handleClick}>Switch host</MenuButton>
      &nbsp;
      <MenuButton colour='pink' i={2} onClick={handleClick}>Remove player</MenuButton>

      {
        tables[0] &&
          <MenuTable>{cells[0]}</MenuTable>
      }
      {
        tables[1] &&
          <MenuTable>{cells[1]}</MenuTable>
      }
      {
        tables[2] &&
          <MenuTable>{cells[2]}</MenuTable>
      }
    </div>
  )
}

export default MenuBar
