import React from 'react'

const ErrorMessage = props => (
  <div className='sub-heading'>
    <span className='error'>{props.value}</span>
  </div>
)

export default ErrorMessage
