import React from 'react'

const MenuTableCell = ({ i, id, merge, onClick, sign }) => (
  <td>
    <span className={`sign${id === merge ? ' highlight-pink' : ''}`} onClick={e => onClick(e, i, id)}>{sign}</span>
  </td>
)

export default MenuTableCell
