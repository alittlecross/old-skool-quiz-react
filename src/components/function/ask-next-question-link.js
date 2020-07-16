import React from 'react'
import { Link } from 'react-router-dom'

const AskNextQuestionLink = () => (
  <div id='ask-next-question'>
    <Link className='rubber' to='/game/question'>Ask next question</Link>
  </div>
)

export default AskNextQuestionLink
