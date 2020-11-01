import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import BackLink from '../function/back-link'
import ConvertToJson from '../../services/convert-to-json'
import DefaultContainer from '../container/default'
import ErrorMessagesFactory from '../factory/error-messages'
import HandleErrors from '../../services/handle-errors'

const Join = ({ api, cookie, match: { params: { gamecode: _gamecode, password: _password } }, updateCookie, updateGame }) => {
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
        await fetch(`${api}/join`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cookie,
            gamecode,
            name,
            password
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
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
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Enter your name...</label>
            <input
              autoComplete='off'
              name='name'
              onChange={e => setName(e.target.value)}
              placeholder='...here'
              spellCheck='false'
              type='text'
              value={name}
            />

            <label htmlFor='gamecode'>Gamecode...</label>
            <input
              autoComplete='off'
              name='gamecode'
              onChange={e => setGamecode(e.target.value)}
              placeholder='...123-123'
              readOnly={_gamecode !== undefined}
              spellCheck='false'
              type='text'
              value={gamecode}
            />

            <label htmlFor='password'>Password...</label>
            <input
              autoComplete='off'
              name='password'
              onChange={e => setPassword(e.target.value)}
              placeholder='...abc-abc'
              readOnly={_password !== undefined}
              spellCheck='false'
              type='password'
              value={password}
            />

            <button className='rubber'>Join</button>
          </form>

          {ErrorMessagesFactory({ errorApi, errorForm, errorGamecode, errorPassword })}

          <p>Once you have joined, use Copy link to invite people.</p>

          <BackLink />
        </DefaultContainer>
      )}
    </>
  )
}

export default Join
