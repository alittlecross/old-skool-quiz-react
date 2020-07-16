import React, { Component } from 'react'

class AnswerCell extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event, bool, i, id) {
    this.props.io.emit('add/remove points', !bool, i, id)
  }

  render () {
    const { answer, cookie, game, i, id } = this.props

    if (answer) {
      const { answer: a, correct, visible } = answer

      if (visible) {
        if (cookie === game.host.id) {
          if (correct) {
            return (
              <td className='answer' data-id={id}>
                <span className='highlight-green' onClick={event => this.handleClick(event, correct, i, id)}>{a}</span>
              </td>
            )
          } else {
            return (
              <td className='answer' data-id={id}>
                <span onClick={event => this.handleClick(event, correct, i, id)}>{a}</span>
              </td>
            )
          }
        } else {
          if (correct) {
            return (
              <td data-id={id}>
                <span className='highlight-green'>{a}</span>
              </td>
            )
          } else {
            return (
              <td data-id={id}>
                <span>{a}</span>
              </td>
            )
          }
        }
      } else {
        if (a) {
          return (
            <td className='highlight-blue' data-id={id}>
              <span>{a}</span>
            </td>
          )
        } else {
          return (
            <td className='highlight-blue' data-id={id} />
          )
        }
      }
    } else {
      return (
        <td data-id={id} />
      )
    }
  }
}

export default AnswerCell
