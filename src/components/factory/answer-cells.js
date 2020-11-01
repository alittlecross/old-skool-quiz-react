import React from 'react'

import AnswerCell from '../function/answer-cell'

const AnswerCells = (i, obj) => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<AnswerCell {...{ a: value.answers[i], key }} />)
  }

  return arr
}

export default AnswerCells
