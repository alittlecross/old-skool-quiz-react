import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import ErrorMessagesFactory from '../../factories/error-messages'
import { Post } from '../../services/fetch'

import BackLink from '../back-link'
import Button from '../button'
import DefaultContainer from '../../containers/default'
import Form from '../form'
import TextInput from '../text-input'

const Create = () => {
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
        await Post('/create', { name })
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
          <Form onSubmit={handleSubmit}>
            <TextInput
              label='Set the quiz name...'
              onChange={setName}
              placeholder='...it will replace Old Skool Quiz'
              value={name}
            />

            <Button>Create</Button>

            {ErrorMessagesFactory({ errorApi, errorForm })}
          </Form>

          <BackLink url='/' />
        </DefaultContainer>
      )}
    </>
  )
}

export default Create
