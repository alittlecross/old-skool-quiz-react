import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import BackLink from '../../back-link'
import ClassicFormat from './classic-format'
import GameContainer from '../../../containers/game'
import MultipleChoice from './multiple-choice'

const Question = ({ cookie, game, handleClick, updateCookie, updateGame }) => {
  const [classic, setType] = useState(true)

  const redirect = game ? cookie === game.host.id && !game.active ? null : '/game/play' : '/'

  return (
    <>
      {
        redirect
          ? (
            <Redirect to={redirect} />
          )
          : (
            <GameContainer {...{ game }}>
              {
                classic
                  ? <ClassicFormat {...{ cookie, game, handleClick, updateCookie, updateGame }} />
                  : <MultipleChoice {...{ cookie, game, updateCookie, updateGame }} />
              }

              <BackLink url='/game/play' />

              <span className='corner-link' id='question-type-link' onClick={e => setType(!classic)}>{classic ? 'Multiple choice' : 'Classic format'}</span>

            </GameContainer>
          )
      }
    </>
  )
}

export default Question
