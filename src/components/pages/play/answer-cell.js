import React from 'react'

const AnswerCell = ({ answer }) => {
  let highlightAnswer

  if (answer.points > 0) highlightAnswer = 'highlight-green'
  if (answer.points < 0) highlightAnswer = 'highlight-pink'

  return (
    <td>
      <span className={highlightAnswer}>{answer.answer}</span>
    </td>
  )
}

export default AnswerCell
