import React from 'react'

const MenuTableCell = props => {
  const { i, id, merge, onClick, sign } = props

  return (
    <td data-id={id}>
      <span className={id === merge ? 'sign highlight-pink' : 'sign'} onClick={event => onClick(event, i, id)}>{sign}</span>
    </td>
  )
}

export default MenuTableCell
