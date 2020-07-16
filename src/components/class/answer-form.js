import React, { Component } from 'react'

class AnswerForm extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      form: {
        answer: ''
      }
    }
  }

  handleChange (event) {
    const { form } = this.state
    const { name: n, value: v } = event.target

    form[n] = v

    this.setState({
      form
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const { cookie, io, updateCookie } = this.props

    updateCookie()
    io.emit('add answer', this.state.form.answer, cookie)
  }

  render () {
    return (
      <form id='answer' onSubmit={this.handleSubmit}>
        <input
          autoComplete='off'
          name='answer'
          onChange={this.handleChange}
          placeholder='Enter your answer...'
          type='text'
          value={this.state.form.answer}
        />

        <button className='rubber'>Submit</button>
      </form>
    )
  }
}

export default AnswerForm
