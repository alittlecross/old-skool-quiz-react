import React from 'react'

const AnswerCell = ({ answer, cookie, game, i, id, io }) => {
  if (answer) {
    const { answer: a, points, visible } = answer

    if (visible) {
      if (cookie === game.host.id) {
        if (points) {
          return (
            <td>
              <span className='highlight-green'>{a}</span>
            </td>
          )
        } else {
          return (
            <td>
              <span>{a}</span>
            </td>
          )
        }
      } else {
        if (points) {
          return (
            <td>
              <span className='highlight-green'>{a}</span>
            </td>
          )
        } else {
          return (
            <td>
              <span>{a}</span>
            </td>
          )
        }
      }
    } else {
      if (a) {
        return (
          <td className='highlight-blue'>
            <span>{a}</span>
          </td>
        )
      } else {
        return (
          <td className='highlight-blue' />
        )
      }
    }
  } else {
    return (
      <td />
    )
  }
}

export default AnswerCell
