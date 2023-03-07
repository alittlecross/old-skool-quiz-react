import React from 'react';

import ImgCard from '../../img-card';
import PastQuestionsCells from '../../../factories/past-questions.cells';

function PastQuestions({
  cookie, game, handleClick, io, updateCookie,
}) {
  const arr = [];

  game.questions.forEach((q, i) => {
    const cells = PastQuestionsCells(cookie, game, i, io, game.players);

    arr.push(
      <div key={i}>
        <div className="question">
          {i + 1}
          .
          {q.question}
          {' '}
          <span className="highlight-yellow">{Array.isArray(q.answer) ? q.answer[q.correct] : q.answer}</span>
        </div>

        {
          q.picture
            && <ImgCard onClick={handleClick} picture={q.picture} />
        }

        <table>
          <thead>
            <tr>
              {cells.th}
            </tr>
          </thead>

          <tbody>
            <tr>
              {cells.td.answers}
            </tr>

            <tr className="points">
              {cells.td.points}
            </tr>
          </tbody>
        </table>
      </div>,
    );
  });

  return (
    <div>
      {arr.reverse()}
    </div>
  );
}

export default PastQuestions;
