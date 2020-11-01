import React from 'react'

import ErrorMessage from '../function/error-message'

const ErrorMessagesFactory = obj => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      arr.push(<ErrorMessage {...{ key, value }} />)
    }
  }

  return arr
}

export default ErrorMessagesFactory
