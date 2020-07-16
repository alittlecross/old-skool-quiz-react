import React, { Component } from 'react'

class CopyLinkLink extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const { gamecode, password } = this.props

    navigator.clipboard.writeText(`${window.location.origin}/join/${gamecode}/${password}`)
  }

  render () {
    return (
      <span className='corner-link' id='copy-link' onClick={this.handleClick}>Copy link</span>
    )
  }
}

export default CopyLinkLink
