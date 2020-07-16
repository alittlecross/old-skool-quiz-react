import React from 'react'

import CopyLinkLink from '../class/copy-link-link'

const GameContainer = props => {
  const { children, game: { gamecode, name, password } } = props

  return (
    <>
      <div id='heading'>{name}</div>

      {children}

      <CopyLinkLink gamecode={gamecode} password={password} />
    </>
  )
}

export default GameContainer
