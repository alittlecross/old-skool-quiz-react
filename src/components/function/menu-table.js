import React from 'react'

const MenuTable = props => {
  const { cells, id } = props

  return (
    <table id={id}>
      <tbody>
        <tr>
          {cells}
        </tr>
      </tbody>
    </table>
  )
}

export default MenuTable
