import React from 'react';

import ActiveQuestionCells from '../../../factories/active-question-cells';
import AnswerForm from './answer-form';
import AnswerSelection from './answer-selection';
import ImgCard from '../../img-card';

function ActiveQuestion({
  cookie, game, game: { active }, handleClick, io, updateCookie,
}) {
  const cells = ActiveQuestionCells(game.players);

  return (
    <>
      {
        cookie !== game.host.id
          && (
            Array.isArray(active.answer)
              ? (
                <AnswerSelection {...{
                  active, cookie, io, updateCookie,
                }}
                />
              )
              : <AnswerForm {...{ cookie, io, updateCookie }} />
          )
      }

      <div className="question">
        {game.questions.length + 1}
        .
        {active.question}
      </div>

      {
        active.picture
          && <ImgCard onClick={handleClick} picture={active.picture} />
      }

      <table>
        <thead>
          <tr>
            {cells.th}
          </tr>
        </thead>

        <tbody>
          <tr>
            {cells.td}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ActiveQuestion;
