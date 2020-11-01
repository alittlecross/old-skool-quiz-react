import React, { useState } from 'react'

const AnswerForm = ({ cookie, io, updateCookie }) => {
  const [answer, setAnswer] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    updateCookie()

    io.emit('add answer', answer, cookie)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoComplete='off'
        name='answer'
        onChange={e => setAnswer(e.target.value)}
        placeholder='Enter your answer...'
        type='text'
        value={answer}
      />

      <button className='rubber'>Submit</button>
    </form>
  )
}

export default AnswerForm
