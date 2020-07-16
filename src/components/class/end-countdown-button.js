import React, { Component } from 'react'

class EndCountdownButton extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.io.emit('end countdown')
  }

  render () {
    return (
      <div id='end-countdown'>
        <button className='rubber' onClick={this.handleClick}>End countdown</button>
      </div>
    )
  }
}

export default EndCountdownButton
