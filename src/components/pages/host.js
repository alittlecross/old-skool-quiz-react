import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import ErrorMessagesFactory from '../../factories/error-messages'
import { Post } from '../../services/fetch'

import Button from '../button'
import Form from '../form'
import GameContainer from '../../containers/game'
import SelectInput from '../select-input'

const Host = ({ cookie, game, io, updateGame }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [id, setId] = useState('')
  const [listen, setListen] = useState(true)

  useEffect(() => {
    if (io && listen) io.on('update game', game => updateGame(game))

    return () => {
      if (io) io.off('update game')
    }
  })

  errorForm && id && setErrorForm(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = id ? null : 'A selection is required'

    if (!_errorForm) {
      try {
        setListen(false)

        await Post('/host', { cookie, gamecode: game.gamecode, id })
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
          <Form onSubmit={handleSubmit}>
            <SelectInput label='Select the host...' onChange={setId} players={game.players} />

            <Button>Submit</Button>
          </Form>

          {ErrorMessagesFactory({ errorApi, errorForm })}

          <p>The host can change this between questions.</p>
        </GameContainer>
      )}
    </>
  )
}

export default Host
