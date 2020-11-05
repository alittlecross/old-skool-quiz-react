import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import AnswerForm from '../function/answer-form'
import AskNextQuestionLink from '../function/ask-next-question-link'
import EndCountdownButton from '../function/end-countdown-button'
import GameContainer from '../container/game'
import GuideLink from '../function/guide-link'
import Menu from '../function/menu'
import Questions from '../function/questions'
import ScoresTable from '../function/scores-table'

const Play = ({ cookie, game, handleClick, io, updateCookie, updateGame }) => {
  useEffect(() => {
    if (io) {
      io.on('remove player', id => {
        if (cookie === +id) {
          updateGame()
        }
      })

      io.on('update game', game => updateGame(game))
    }

    return () => {
      if (io) {
        io.off('remove player')
        io.off('update game')
      }
    }
  })

  const redirect = game ? game.host.id ? null : '/game/host' : '/'

  return (
    <>
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <GameContainer {...{ game }}>
          <div className='sub-heading'>
            Asking the questions is... <span id='host'>{game.host.name}</span>
          </div>

          {!game.counting && cookie === game.host.id && <AskNextQuestionLink />}
          {!game.counting && <ScoresTable {...{ game }} />}
          {!game.counting && cookie === game.host.id && <Menu {...{ game, io }} />}

          {game.counting && cookie !== game.host.id && <AnswerForm {...{ cookie, io, updateCookie }} />}
          {game.counting && cookie === game.host.id && <EndCountdownButton {...{ io }} />}

          <Questions {...{ cookie, game, handleClick, io }} />

          <GuideLink />
        </GameContainer>
      )}
    </>
  )
}

export default Play
