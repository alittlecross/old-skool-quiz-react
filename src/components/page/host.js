import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import ConvertToJson from '../../services/convert-to-json'
import ErrorMessagesFactory from '../factory/error-messages'
import GameContainer from '../container/game'
import HandleErrors from '../../services/handle-errors'
import SelectOptionsFactory from '../factory/select-options'

class Host extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      api: `${this.props.api}/host`,
      errors: {
        api: null,
        form: null
      },
      form: {
        id: ''
      },
      listen: true
    }
  }

  componentDidMount () {
    const { io, updateGame } = this.props

    console.log(io)

    if (io && this.state.listen) {
      io.on('update game', game => updateGame(game))
    }
  }

  componentWillUnmount () {
    const { io } = this.props

    if (io) {
      io.off('update game')
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

    const { api, errors, form: { id } } = this.state

    errors.api = null

    if (!id) {
      errors.form = 'A selection is required'
    }

    const post = !Object.values(errors).filter(error => error !== null).length

    if (post) {
      try {
        const { cookie, game: { gamecode }, updateGame } = this.props

        this.setState({
          listen: false
        })

        await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cookie,
            gamecode,
            id
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
          .then(res => {
            updateGame(res.game)
          })
      } catch (e) {
        errors.api = 'Unable to select host'

        this.setState({
          errors,
          listen: true
        })
      }
    } else {
      this.setState({
        errors
      })
    }
  }

  render () {
    const { game } = this.props
    const { errors } = this.state

    const _redirect = game ? game.host.id ? '/game/play' : null : '/'

    if (_redirect) {
      return <Redirect to={_redirect} />
    }

    return (
      <GameContainer game={game}>
        <form onSubmit={this.handleSubmit}>
          <label className='sub-heading' htmlFor='id'>Select the host...</label>
          <select defaultValue='' name='id' onChange={this.handleChange}>
            <option value='' disabled>Select</option>
            {SelectOptionsFactory(game.players)}
          </select>

          <button className='rubber'>Submit</button>
        </form>

        {ErrorMessagesFactory(errors)}

        <p>The host can change this between questions.</p>
      </GameContainer>
    )
  }
}

export default Host
