import React from 'react';

import CopyLinkLink from '../components/copy-link-link';

function GameContainer({ children, game: { gamecode, name, password } }) {
  return (
    <>
      <div id="heading">{name}</div>

      {children}

      <CopyLinkLink {...{ gamecode, password }} />
    </>
  );
}

export default GameContainer;
