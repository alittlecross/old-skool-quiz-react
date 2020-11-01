import React from 'react'

import HighestAndLowestScores from '../../lib/highest-and-lowest-scores'

const NameCellsFactory = (obj, colour) => {
  const { highest, lowest } = HighestAndLowestScores(obj)

  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    let className

    if (colour && (highest || lowest)) {
      if (highest === value.score) {
        className = 'highlight-yellow'
      }

      if (lowest >= value.score) {
        className = 'highlight-pink'
      }
    }

    arr.push(<td key={key}><span className={className}>{value.name}</span></td>)
  }

  return arr
}

export default NameCellsFactory
