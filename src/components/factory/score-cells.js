import React from 'react'

const ScoreCellsFactory = obj => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<td key={key}>{value.score}</td>)
  }

  return arr
}

export default ScoreCellsFactory
