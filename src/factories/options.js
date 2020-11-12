import React from 'react'

const Options = players => {
  const arr = []

  for (const [key, value] of Object.entries(players)) {
    arr.push(
      <option key={key} value={key}>{value.name}</option>
    )
  }

  return arr
}

export default Options
