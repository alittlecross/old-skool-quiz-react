import React from 'react'

const RubberContainer = ({ children, id }) => (
  <div id={id} className='rubbers'>
    {children}
  </div>
)

export default RubberContainer
