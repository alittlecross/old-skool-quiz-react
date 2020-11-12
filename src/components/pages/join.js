import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import ErrorMessagesFactory from '../../factories/error-messages'
import { Post } from '../../services/fetch'

import BackLink from '../back-link'
import Button from '../button'
import DefaultContainer from '../../containers/default'
import Form from '../form'
import TextInput from '../text-input'

const Join = ({ cookie, match: { params: { gamecode: _gamecode, password: _password } }, updateCookie, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [errorGamecode, setErrorGamecode] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [gamecode, setGamecode] = useState(_gamecode || '')
  const [name, setName] = useState('')
  const [password, setPassword] = useState(_password || '')
  const [redirect, setRedirect] = useState(null)

  errorForm && gamecode && name && password && setErrorForm(null)
  errorGamecode && (!gamecode || /^[0-9]{3}[-][0-9]{3}$/.test(gamecode)) && setErrorGamecode(null)
  errorPassword && (!password || /^[a-z]{3}[-][a-z]{3}$/.test(password)) && setErrorPassword(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = gamecode && name && password ? null : 'All fields above are required'
    const _errorGamecode = gamecode && /^[0-9]{3}[-][0-9]{3}$/.test(gamecode) ? null : 'The gamecode format is 123-123'
    const _errorPassword = password && /^[a-z]{3}[-][a-z]{3}$/.test(password) ? null : 'The password format is abc-abc'

    if (!_errorForm && !_errorGamecode && !_errorPassword) {
      try {
        await Post('/join', { cookie, gamecode, name, password })
          .then(res => {
            updateCookie(res.id)
            updateGame(res.game)

            setRedirect('/game/host')
          })
      } catch (e) {
        setErrorApi(e.status === 404 ? 'Sorry, gamecode or password incorrect' : 'Unable to join quiz')
      }
    } else {
      setErrorApi(null)
      setErrorForm(_errorForm)
      setErrorGamecode(_errorGamecode)
      setErrorPassword(_errorPassword)
    }
  }

  return (
    <>
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <DefaultContainer>
          <Form onSubmit={handleSubmit}>
            <TextInput label='Enter your name...' onChange={setName} value={name} />

            <TextInput
              label='Gamecode...'
              onChange={setGamecode}
              placeholder='...123-123'
              readonly={_gamecode !== undefined}
              value={gamecode}
            />

            <TextInput
              label='Password...'
              onChange={setPassword}
              placeholder='...abc-abc'
              readonly={_password !== undefined}
              type='password'
              value={password}
            />

            <Button>Join</Button>

            {ErrorMessagesFactory({ errorApi, errorForm, errorGamecode, errorPassword })}
          </Form>

          <p>Once you have joined, use Copy link to invite people.</p>

          <BackLink url='/' />
        </DefaultContainer>
      )}
    </>
  )
}

export default Join
