import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import ConvertToJson from '../../services/convert-to-json'
import ErrorMessagesFactory from '../factory/error-messages'
import GameContainer from '../container/game'
import HandleErrors from '../../services/handle-errors'
import SelectOptionsFactory from '../factory/select-options'

const Host = ({ api, cookie, game, setListen, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [id, setId] = useState('')

  errorForm && id && setErrorForm(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = id ? null : 'A selection is required'

    if (!_errorForm) {
      try {
        setListen(false)

        await fetch(`${api}/host`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cookie,
            gamecode: game.gamecode,
            id
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
          .then(res => {
            updateGame(res.game)
          })
      } catch (e) {
        setErrorApi('Unable to select host')
        setListen(true)
      }
    } else {
      setErrorApi(null)
      setErrorForm(_errorForm)
    }
  }

  const redirect = game ? game.host.id ? '/game/play' : null : '/'

  return (
    <>
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <GameContainer {...{ game }}>
          <form onSubmit={handleSubmit}>
            <label className='sub-heading' htmlFor='id'>Select the host...</label>
            <select defaultValue='' name='id' onChange={e => setId(e.target.value)}>
              <option value='' disabled>Select</option>
              {SelectOptionsFactory(game.players)}
            </select>

            <button className='rubber'>Submit</button>
          </form>

          {ErrorMessagesFactory({ errorApi, errorForm })}

          <p>The host can change this between questions.</p>
        </GameContainer>
      )}
    </>
  )
}

export default Host
