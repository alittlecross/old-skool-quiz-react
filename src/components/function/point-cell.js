import React from 'react'

const PointCell = ({ cookie, game, i, id, io, points }) => {
  const handleClick = (e, i, id) => {
    io.emit('add/remove points', i, id, parseInt(`${e.target.innerText}1`))
  }

  if (cookie === game.host.id) {
    return (
      <td>
        <span onClick={e => handleClick(e, i, id)}>-</span>
        &nbsp;
        {points}
        &nbsp;
        <span onClick={e => handleClick(e, i, id)}>+</span>
      </td>
    )
  } else {
    return (
      <td>
        {points}
      </td>
    )
  }
}

export default PointCell
