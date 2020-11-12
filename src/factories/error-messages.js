import React from 'react'

const ErrorMessages = errors => {
  const arr = []

  for (const [key, value] of Object.entries(errors)) {
    if (value) {
      arr.push(
        <div key={key} className='error'>
          {value}
        </div>
      )
    }
  }

  return arr
}

export default ErrorMessages
