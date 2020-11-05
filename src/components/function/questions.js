import React from 'react'

import AnswerCellsFactory from '../factory/answer-cells'
import ImgContainer from './img-container'
import NameCellsFactory from '../factory/name-cells'
import PointCellsFactory from '../factory/point-cells'

const Questions = ({ cookie, game, game: { players, questions }, handleClick, io }) => {
  const elements = []

  questions.forEach((q, i) => {
    elements.push(
      <div key={i}>
        <div className='question'>
          {i + 1}. {q.question}{q.answer && <> <span className='highlight-yellow'>{q.answer}</span></>}
        </div>

        {q.picture && <ImgContainer onClick={handleClick} picture={q.picture} />}

        <table>
          <thead>
            <tr className='names'>
              {NameCellsFactory(players)}
            </tr>
          </thead>

          <tbody>
            <tr className='answers'>
              {AnswerCellsFactory(cookie, game, i, io, players)}
            </tr>

            {
              q.answer &&
                <tr className='points'>
                  {PointCellsFactory(cookie, game, i, io, players)}
                </tr>
            }
          </tbody>
        </table>
      </div>
    )
  })

  return (
    <div>
      {elements.reverse()}
    </div>
  )
}

export default Questions
