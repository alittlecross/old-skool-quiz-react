import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import BackLink from '../function/back-link'
import ConvertToJson from '../../services/convert-to-json'
import DefaultContainer from '../container/default'
import ErrorMessagesFactory from '../factory/error-messages'

class Create extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      api: `${this.props.api}/create`,
      errors: {
        api: null,
        form: null
      },
      form: {
        name: ''
      },
      redirect: null
    }
  }

  handleChange (event) {
    const { errors, form } = this.state
    const { name: n, value: v } = event.target

    if (errors.form && v) {
      errors.form = null
    }

    form[n] = v

    this.setState({
      errors,
      form
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const { api, errors, form: { name } } = this.state

    errors.api = null

    if (!name) {
      errors.form = 'This field is required'
    }

    const post = !Object.values(errors).filter(error => error !== null).length

    if (post) {
      try {
        await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name
          })
        })
          .then(ConvertToJson)
          .then(res => {
            this.setState({
              redirect: `/join/${res.gamecode}/${res.password}`
            })
          })
      } catch (e) {
        errors.api = 'Unable to create quiz'

        this.setState({
          errors
        })
      }
    } else {
      this.setState({
        errors
      })
    }
  }

  render () {
    const { errors, form: f, redirect } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <DefaultContainer>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Set the quiz name...</label>
          <input
            autoComplete='off'
            id='name'
            name='name'
            onChange={this.handleChange}
            placeholder='...it will replace Old Skool Quiz'
            spellCheck='false'
            type='text'
            value={f.name}
          />

          <button className='rubber'>Create</button>
        </form>

        {ErrorMessagesFactory(errors)}

        <BackLink />
      </DefaultContainer>
    )
  }
}

export default Create
