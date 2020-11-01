import React, { useState } from 'react'

const AnswerForm = ({ cookie, io, updateCookie }) => {
  const [answer, setAnswer] = useState('')
  const [className, setClassName] = useState(null)

  const handleChange = e => {
    setAnswer(e.target.value)
    setClassName(null)
  }

  const handleSubmit = e => {
    e.preventDefault()

    setClassName('post-answer-submit')
    updateCookie()

    io.emit('add answer', answer, cookie)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoComplete='off'
        className={className}
        name='answer'
        onChange={handleChange}
        placeholder='Enter your answer...'
        type='text'
        value={answer}
      />

      <button className='rubber'>Submit</button>
    </form>
  )
}

export default AnswerForm
