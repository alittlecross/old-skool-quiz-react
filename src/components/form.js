import React from 'react'

const Form = ({ children, onSubmit }) => (
  <form autoComplete='off' onSubmit={onSubmit} spellCheck='false'>
    {children}
  </form>
)

export default Form
