import React from 'react'

const Button = ({ children, onClick }) => (
  <button className='rubber' onClick={onClick}>{children}</button>
)

export default Button
