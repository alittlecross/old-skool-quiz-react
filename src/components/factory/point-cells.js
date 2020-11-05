import React from 'react'

import PointCell from '../function/point-cell'

const PointCells = (cookie, game, i, io, obj) => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<PointCell {...{ answer: value.answers[i], cookie, game, i, id: key, io, key, points: value.answers[i].points }} />)
  }

  return arr
}

export default PointCells
