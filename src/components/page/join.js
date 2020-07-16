import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import BackLink from '../function/back-link'
import ConvertToJson from '../../services/convert-to-json'
import DefaultContainer from '../container/default'
import ErrorMessagesFactory from '../factory/error-messages'
import HandleErrors from '../../services/handle-errors'

class Join extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    const { api, match: { params: { gamecode, password } } } = this.props

    this.state = {
      api: `${api}/join`,
      gamecode: gamecode,
      errors: {
        api: null,
        form: null,
        gamecode: null,
        password: null
      },
      form: {
        gamecode: '',
        name: '',
        password: ''
      },
      password: password,
      redirect: null
    }
  }

  componentDidMount () {
    const { gamecode, form, password } = this.state

    form.gamecode = gamecode || ''
    form.password = password || ''

    this.setState({
      form
    })
  }

  handleChange (event) {
    const { errors, form, form: { gamecode: _g, name: _n, password: _p } } = this.state
    const { name: n, value: v } = event.target

    if (errors.form) {
      if (n === 'name' && v && _g && _p) {
        errors.form = null
      }

      if (n === 'gamecode' && v && _n && _p) {
        errors.form = null
      }

      if (n === 'password' && v && _n && _g) {
        errors.form = null
      }
    }

    if (errors.gamecode && n === 'gamecode' && (!v || /^[0-9]{3}[-][0-9]{3}$/.test(v))) {
      errors.gamecode = null
    }

    if (errors.password && n === 'password' && (!v || /^[a-z]{3}[-][a-z]{3}$/.test(v))) {
      errors.password = null
    }

    form[n] = v

    this.setState({
      errors,
      form
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const { api, errors, form: { gamecode, name, password } } = this.state

    errors.api = null

    if (!gamecode || !name || !password) {
      errors.form = 'All fields above are required'
    }

    if (gamecode && !/^[0-9]{3}[-][0-9]{3}$/.test(gamecode)) {
      errors.gamecode = 'The gamecode format is 123-123'
    }

    if (password && !/^[a-z]{3}[-][a-z]{3}$/.test(password)) {
      errors.password = 'The password format is abc-abc'
    }

    const post = !Object.values(errors).filter(error => error !== null).length

    if (post) {
      try {
        const { cookie, updateCookie, updateGame } = this.props

        await fetch(api, {
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

            this.setState({
              redirect: '/game/host'
            })
          })
      } catch (e) {
        errors.api = e.status === 404 ? 'Sorry, gamecode or password incorrect' : 'Unable to join quiz'

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
    const { gamecode, errors, form: f, password, redirect } = this.state

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <DefaultContainer>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Enter your name...</label>
          <input
            autoComplete='off'
            id='name'
            name='name'
            onChange={this.handleChange}
            placeholder='...here'
            spellCheck='false'
            type='text'
            value={f.name}
          />

          <label htmlFor='gamecode'>Gamecode...</label>
          <input
            autoComplete='off'
            id='gamecode'
            name='gamecode'
            onChange={this.handleChange}
            placeholder='...123-123'
            readOnly={gamecode !== undefined}
            spellCheck='false'
            type='text'
            value={f.gamecode}
          />

          <label htmlFor='password'>Password...</label>
          <input
            autoComplete='off'
            id='password'
            name='password'
            onChange={this.handleChange}
            placeholder='...abc-abc'
            readOnly={password !== undefined}
            spellCheck='false'
            type='password'
            value={f.password}
          />

          <button className='rubber'>Join</button>
        </form>

        {ErrorMessagesFactory(errors)}

        <p>Once you have joined, use Copy link to invite people.</p>

        <BackLink />
      </DefaultContainer>
    )
  }
}

export default Join
