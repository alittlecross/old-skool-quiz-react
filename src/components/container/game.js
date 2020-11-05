import React from 'react'

import CopyLinkLink from '../function/copy-link-link'

const GameContainer = ({ children, game: { gamecode, name, password } }) => (
  <>
    <div id='heading'>{name}</div>

    {children}

    <CopyLinkLink {...{ gamecode, password }} />
  </>
)

export default GameContainer
