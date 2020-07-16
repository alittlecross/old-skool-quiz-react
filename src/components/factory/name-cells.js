import React from 'react'

import HighestAndLowestPoints from '../../lib/highest-and-lowest-points'

const NameCellsFactory = (obj, colour) => {
  const { highest, lowest } = HighestAndLowestPoints(obj)

  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    let className

    if (colour && (highest || lowest)) {
      if (highest === value.points) {
        className = 'highlight-yellow'
      }

      if (lowest >= value.points) {
        className = 'highlight-pink'
      }
    }

    arr.push(<td key={key} data-id={key}><span className={className}>{value.name}</span></td>)
  }

  return arr
}

export default NameCellsFactory
