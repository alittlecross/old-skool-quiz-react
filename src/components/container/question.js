import React from 'react'

const QuestionContainer = props => {
  const { children, id } = props

  return (
    <div id={id}>
      {children}
    </div>
  )
}

export default QuestionContainer
