import React from 'react'

import AnswerCell from '../class/answer-cell'
import ImgContainer from './img-container'
import NameCellsFactory from '../factory/name-cells'
import QuestionContainer from '../container/question'

const Questions = props => {
  const { game: { players, questions }, handleClick } = props

  const elements = []

  questions.forEach((q, i) => {
    const cells = []

    let answer

    if (q.answer) {
      answer = (
        <>
          {' '}
          <span className='highlight-yellow'>{q.answer}</span>
        </>
      )
    }

    for (const [key, value] of Object.entries(players)) {
      cells.push(<AnswerCell key={key} {...props} answer={value.answers[i]} i={i} id={key} />)
    }

    elements.push(
      <QuestionContainer key={i} id={i}>
        <div className='question'>
          {i + 1}. {q.question}{answer}
        </div>

        {(q.picture ? <ImgContainer onClick={handleClick} picture={q.picture} /> : null)}

        <table>
          <thead>
            <tr className='names'>
              {NameCellsFactory(players)}
            </tr>
          </thead>

          <tbody>
            <tr className='answers'>
              {cells}
            </tr>
          </tbody>
        </table>
      </QuestionContainer>
    )
  })

  return (
    <div id='questions'>
      {elements.reverse()}
    </div>
  )
}

export default Questions
