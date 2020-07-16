import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'node-fetch'

import ConvertToJson from '../../services/convert-to-json'
import ErrorMessagesFactory from '../factory/error-messages'
import GameContainer from '../container/game'
import HandleErrors from '../../services/handle-errors'
import ImgContainer from '../function/img-container'

class Question extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    const { api, game } = this.props

    this.state = {
      api: `${api}/question`,
      errors: {
        api: null,
        form: null,
        seconds: null
      },
      form: {
        answer: '',
        picture: '',
        question: '',
        seconds: ''
      },
      redirect: null,
      seconds: game ? game.seconds : null
    }
  }

  componentDidMount () {
    const { form, seconds } = this.state

    form.seconds = seconds || ''

    this.setState({
      form
    })
  }

  handleChange (event) {
    const { errors, form, form: { answer: _a, question: _q, seconds: _s } } = this.state
    const { name: n, value: v } = event.target

    if (errors.form) {
      if (n === 'answer' && v && _q && _s) {
        errors.form = null
      }

      if (n === 'question' && v && _a && _s) {
        errors.form = null
      }

      if (n === 'seconds' && v && _a && _q) {
        errors.form = null
      }
    }

    if (errors.seconds && n === 'seconds' && (!v || /^([0-5]?[0-9]|60)$/.test(v))) {
      errors.seconds = null
    }

    form[n] = v

    this.setState({
      errors,
      form
    })
  }

  async handleSubmit (event) {
    event.preventDefault()

    const { api, errors, form: { answer, picture, question, seconds } } = this.state

    errors.api = null

    if (!answer || !question || !seconds) {
      errors.form = 'All fields above are required'
    }

    if (seconds && !/^([0-5]?[0-9]|60)$/.test(seconds)) {
      errors.seconds = 'The seconds field accepts numbers from 0 to 60'
    }

    const post = !Object.values(errors).filter(error => error !== null).length

    if (post) {
      try {
        const { cookie, game: { gamecode }, updateGame } = this.props

        await fetch(api, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answer,
            cookie,
            gamecode,
            picture,
            question,
            seconds
          })
        })
          .then(HandleErrors)
          .then(ConvertToJson)
          .then(res => {
            updateGame(res.game)
          })
      } catch (e) {
        errors.api = 'Unable to submit question'

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
    const { cookie, game, handleClick } = this.props
    const { errors, form: f } = this.state

    const _redirect = game ? cookie === game.host.id && !game.counting ? null : '/game/play' : '/'

    if (_redirect) {
      return <Redirect to={_redirect} />
    }

    return (
      <GameContainer game={game}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='question'>Enter the question...</label>
          <input
            autoComplete='off'
            id='question'
            name='question'
            onChange={this.handleChange}
            placeholder='...here'
            type='text'
            value={f.question}
          />

          <label htmlFor='answer'>Enter the answer...</label>
          <input
            autoComplete='off'
            id='answer'
            name='answer'
            onChange={this.handleChange}
            placeholder='...here'
            type='text'
            value={f.answer}
          />

          <label htmlFor='seconds'>Seconds to count down...</label>
          <input
            autoComplete='off'
            id='seconds'
            name='seconds'
            onChange={this.handleChange}
            placeholder='...0-60'
            type='text'
            value={f.seconds}
          />

          <button className='rubber'>Submit</button>

          {ErrorMessagesFactory(errors)}

          <p>Optional</p>

          <label htmlFor='picture'>Enter a picture url...</label>
          <input
            autoComplete='off'
            id='picture'
            name='picture'
            onChange={this.handleChange}
            placeholder='...here'
            type='text'
            value={f.picture}
          />
        </form>

        {(f.picture ? <ImgContainer onClick={handleClick} picture={f.picture} /> : null)}
      </GameContainer>
    )
  }
}

export default Question
