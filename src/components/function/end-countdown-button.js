import React from 'react'

const EndCountdownButton = ({ io }) => {
  const handleClick = () => {
    io.emit('end countdown')
  }

  return (
    <div>
      <button className='rubber' onClick={handleClick}>End countdown</button>
    </div>
  )
}

export default EndCountdownButton
