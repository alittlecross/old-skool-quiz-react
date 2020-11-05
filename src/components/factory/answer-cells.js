import React from 'react'

import AnswerCell from '../function/answer-cell'

const AnswerCells = (cookie, game, i, io, obj) => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<AnswerCell {...{ answer: value.answers[i], cookie, game, i, id: key, io, key }} />)
  }

  return arr
}

export default AnswerCells
