import React from 'react'

const DefaultContainer = props => (
  <>
    <div id='heading'>Old Skool Quiz</div>

    {props.children}
  </>
)

export default DefaultContainer
