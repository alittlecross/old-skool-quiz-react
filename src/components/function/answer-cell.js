import React from 'react'

const AnswerCell = ({ a }) => {
  let highlightAnswer, highlightCell

  if (a) {
    if (a.visible) {
      if (a.points > 0) highlightAnswer = 'highlight-green'
      if (a.points < 0) highlightAnswer = 'highlight-pink'
    } else {
      highlightCell = 'highlight-blue'
    }
  }

  return (
    <td className={highlightCell}>
      <span className={highlightAnswer}>{a && a.answer}</span>
    </td>
  )
}

export default AnswerCell
