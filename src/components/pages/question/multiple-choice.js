import React, { useState } from 'react'

import ErrorMessagesFactory from '../../../factories/error-messages'
import { Post } from '../../../services/fetch'

import Button from '../../button'
import Form from '../../form'
import MultipleChoiceTextInput from './text-input'
import TextInput from '../../text-input'

const MultipleChoice = ({ cookie, game, updateCookie, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorCorrect, setErrorCorrect] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [errorSeconds, setErrorSeconds] = useState(null)
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [correct, setCorrect] = useState(null)
  const [question, setQuestion] = useState('')
  const [seconds, setSeconds] = useState(game && game.seconds)

  errorCorrect && Number.isInteger(correct) && setErrorCorrect(null)
  errorForm && answers[0] && answers[1] && question && seconds && setErrorForm(null)
  errorSeconds && (!seconds || /^([0-5]?[0-9]|60)$/.test(seconds)) && setErrorSeconds(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorCorrect = answers[0] && answers[1] && !Number.isInteger(correct) ? 'The correct \'Answer ...\' must be clicked' : null
    const _errorForm = answers[0] && answers[1] && question && seconds ? null : 'All fields above are required'
    const _errorSeconds = seconds && /^([0-5]?[0-9]|60)$/.test(seconds) ? null : 'The seconds field accepts numbers from 0 to 60'

    if (!_errorCorrect && !_errorForm && !_errorSeconds) {
      try {
        await Post('/question', { answer: answers.filter(answer => answer), cookie, correct, gamecode: game.gamecode, question, seconds })
          .then(res => {
            updateCookie()
            updateGame(res.game)
          })
      } catch (e) {
        setErrorApi('Unable to submit question')
      }
    } else {
      setErrorApi(null)
      setErrorCorrect(_errorCorrect)
      setErrorForm(_errorForm)
      setErrorSeconds(_errorSeconds)
    }
  }

  const props = i => ({
    answers,
    correct,
    i,
    setAnswers,
    setCorrect
  })

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput label='Enter the question...' onChange={setQuestion} value={question} />

      <MultipleChoiceTextInput {...props(0)} />

      <MultipleChoiceTextInput {...props(1)} />

      <TextInput
        label='Seconds to count down...'
        onChange={setSeconds}
        placeholder='...0-60'
        value={seconds}
      />

      <p>Click the correct 'Answer ...'</p>

      <Button>Submit</Button>

      {ErrorMessagesFactory({ errorApi, errorCorrect, errorForm, errorSeconds })}

      <p>Optional</p>

      <MultipleChoiceTextInput {...props(2)} />

      <MultipleChoiceTextInput {...props(3)} />
    </Form>
  )
}

export default MultipleChoice
