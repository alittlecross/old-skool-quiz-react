import React, { useState } from 'react'

import ErrorMessagesFactory from '../../../factories/error-messages'
import { Post } from '../../../services/fetch'

import Button from '../../button'
import Form from '../../form'
import ImgContainer from '../../img-card'
import TextInput from '../../text-input'

const ClassicFormat = ({ cookie, game, handleClick, updateCookie, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [errorSeconds, setErrorSeconds] = useState(null)
  const [answer, setAnswer] = useState('')
  const [picture, setPicture] = useState('')
  const [question, setQuestion] = useState('')
  const [seconds, setSeconds] = useState(game && game.seconds)

  errorForm && answer && question && seconds && setErrorForm(null)
  errorSeconds && (!seconds || /^([0-5]?[0-9]|60)$/.test(seconds)) && setErrorSeconds(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = answer && question && seconds ? null : 'All fields above are required'
    const _errorSeconds = seconds && /^([0-5]?[0-9]|60)$/.test(seconds) ? null : 'The seconds field accepts numbers from 0 to 60'

    if (!_errorForm && !_errorSeconds) {
      try {
        await Post('/question', { answer, cookie, gamecode: game.gamecode, picture, question, seconds })
          .then(res => {
            updateCookie()
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

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput label='Enter the question...' onChange={setQuestion} value={question} />

      <TextInput label='Enter the answer...' onChange={setAnswer} value={answer} />

      <TextInput
        label='Seconds to count down...'
        onChange={setSeconds}
        placeholder='...0-60'
        value={seconds}
      />

      <Button>Submit</Button>

      {ErrorMessagesFactory({ errorApi, errorForm, errorSeconds })}

      <p>Optional</p>

      <TextInput label='Enter a picture url...' onChange={setPicture} value={picture} />

      {picture && <ImgContainer onClick={handleClick} picture={picture} />}
    </Form>
  )
}

export default ClassicFormat
