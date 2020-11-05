import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import ConvertToJson from '../../services/convert-to-json'
import ErrorMessagesFactory from '../factory/error-messages'
import GameContainer from '../container/game'
import HandleErrors from '../../services/handle-errors'
import ImgContainer from '../function/img-container'

const Question = ({ api, cookie, game, handleClick, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [errorSeconds, setErrorSeconds] = useState(null)
  const [answer, setAnswer] = useState('')
  const [picture, setPicture] = useState('')
  const [question, setQuestion] = useState('')
  const [seconds, setSeconds] = useState(game && game.seconds)

  errorForm && answer && question && seconds && setErrorForm(null)
  errorSeconds && (!seconds || /^([0-5]?[0-9]|60)$/.test(seconds)) && setSeconds(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = answer && question && seconds ? null : 'All fields above are required'
    const _errorSeconds = seconds && /^([0-5]?[0-9]|60)$/.test(seconds) ? null : 'The seconds field accepts numbers from 0 to 60'

    if (!_errorForm && !_errorSeconds) {
      try {
        await fetch(`${api}/question`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answer,
            cookie,
            gamecode: game.gamecode,
            picture,
            question,
            seconds
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
          .then(res => {
            updateGame(res.game)
          })
      } catch (e) {
        setErrorApi('Unable to submit question')
      }
    } else {
      setErrorApi(null)
      setErrorForm(_errorForm)
      setErrorSeconds(_errorSeconds)
    }
  }

  const redirect = game ? cookie === game.host.id && !game.counting ? null : '/game/play' : '/'

  return (
    <>
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <GameContainer {...{ game }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor='question'>Enter the question...</label>
            <input
              autoComplete='off'
              name='question'
              onChange={e => setQuestion(e.target.value)}
              placeholder='...here'
              type='text'
              value={question}
            />

            <label htmlFor='answer'>Enter the answer...</label>
            <input
              autoComplete='off'
              name='answer'
              onChange={e => setAnswer(e.target.value)}
              placeholder='...here'
              type='text'
              value={answer}
            />

            <label htmlFor='seconds'>Seconds to count down...</label>
            <input
              autoComplete='off'
              name='seconds'
              onChange={e => setSeconds(e.target.value)}
              placeholder='...0-60'
              type='text'
              value={seconds}
            />

            <button className='rubber'>Submit</button>

            {ErrorMessagesFactory({ errorApi, errorForm, errorSeconds })}

            <p>Optional</p>

            <label htmlFor='picture'>Enter a picture url...</label>
            <input
              autoComplete='off'
              name='picture'
              onChange={e => setPicture(e.target.value)}
              placeholder='...here'
              type='text'
              value={picture}
            />
          </form>

          {picture && <ImgContainer onClick={handleClick} picture={picture} />}
        </GameContainer>
      )}
    </>
  )
}

export default Question
