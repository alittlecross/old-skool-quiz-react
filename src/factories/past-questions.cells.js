import React from 'react'

import AnswerCell from '../components/pages/play/answer-cell'
import PointCell from '../components/pages/play/point-cell'

const PastQuestionsCells = (cookie, game, i, io, players) => {
  const th = []
  const td = {
    answers: [],
    points: []
  }

  for (const [key, value] of Object.entries(players)) {
    th.push(
      <th key={key}>
        {value.name}
      </th>
    )

    td.answers.push(
      <AnswerCell {...{ answer: value.answers[i], key }} />
    )

    td.points.push(
      <PointCell {...{ cookie, game, i, id: key, io, key, points: value.answers[i].points }} />
    )
  }

  return {
    th,
    td
  }
}

export default PastQuestionsCells
