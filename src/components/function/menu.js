import React, { useState } from 'react'

import MenuTable from './menu-table'
import MenuTableCell from './menu-table-cell'

const Menu = ({ game, io }) => {
  const [merge, setMerge] = useState(null)
  const [tables, setTables] = useState([false, false, false])

  const handleClick = (_, i) => {
    const arr = [false, false, false]

    arr[i] = !tables[i]

    setTables(arr)
  }

  const handleClickSign = (e, i, id) => {
    const handlers = [
      () => {
        if (merge) {
          if (id !== merge) {
            io.emit('merge players', id, merge)
          }

          setMerge(null)
        } else {
          setMerge(id)
        }
      },
      () => {
        io.emit('switch host', id)
      },
      () => {
        io.emit('remove player', id)
      }
    ]

    handlers[i]()
  }

  const cells = [[], [], []]

  for (const [key] of Object.entries(game.players)) {
    const props = (i, key, sign) => ({
      i,
      id: key,
      onClick: handleClickSign,
      sign: sign
    })

    cells[0].push(<MenuTableCell key={key} {...props(0, key, '#')} merge={merge} />)
    cells[1].push(<MenuTableCell key={key} {...props(1, key, '✓')} />)
    cells[2].push(<MenuTableCell key={key} {...props(2, key, '✗')} />)
  }

  return (
    <div id='menu'>
      <span className='highlight-yellow' id='merge-players' onClick={e => handleClick(e, 0)}>Merge players...</span>
      &nbsp;
      <span className='highlight-blue' id='switch-host' onClick={e => handleClick(e, 1)}>Switch host...</span>
      &nbsp;
      <span className='highlight-pink' id='remove-player' onClick={e => handleClick(e, 2)}>Remove player...</span>

      {tables[0] && <MenuTable cells={cells[0]} />}
      {tables[1] && <MenuTable cells={cells[1]} />}
      {tables[2] && <MenuTable cells={cells[2]} />}
    </div>
  )
}

export default Menu
