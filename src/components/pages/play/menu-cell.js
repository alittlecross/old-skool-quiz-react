import React from 'react'

const MenuCell = ({ id, merge, onClick, sign }) => (
  <td>
    <span className={id === merge ? 'highlight-pink' : null} onClick={e => onClick(e, id)}>{sign}</span>
  </td>
)

export default MenuCell
