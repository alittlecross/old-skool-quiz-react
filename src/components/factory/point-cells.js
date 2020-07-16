import React from 'react'

const PointCellsFactory = obj => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<td key={key} data-id={key}>{value.points}</td>)
  }

  return arr
}

export default PointCellsFactory
