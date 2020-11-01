import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import BackLink from '../function/back-link'
import ConvertToJson from '../../services/convert-to-json'
import DefaultContainer from '../container/default'
import ErrorMessagesFactory from '../factory/error-messages'
import HandleErrors from '../../services/handle-errors'

const Create = ({ api }) => {
  const [errorApi, setErrorApi] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [name, setName] = useState('')
  const [redirect, setRedirect] = useState(null)

  errorForm && name && setErrorForm(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const _errorForm = name ? null : 'This field is required'

    if (!_errorForm) {
      try {
        await fetch(`${api}/create`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
          .then(res => {
            setRedirect(`/join/${res.gamecode}/${res.password}`)
          })
      } catch (e) {
        setErrorApi('Unable to create quiz')
      }
    } else {
      setErrorApi(null)
      setErrorForm(_errorForm)
    }
  }

  return (
    <>
      {redirect ? (
        <Redirect to={redirect} />
      ) : (
        <DefaultContainer>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Set the quiz name...</label>
            <input
              autoComplete='off'
              name='name'
              onChange={e => setName(e.target.value)}
              placeholder='...it will replace Old Skool Quiz'
              spellCheck='false'
              type='text'
              value={name}
            />

            <button className='rubber'>Create</button>
          </form>

          {ErrorMessagesFactory({ errorApi, errorForm })}

          <BackLink />
        </DefaultContainer>
      )}
    </>
  )
}

export default Create
