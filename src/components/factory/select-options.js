import React from 'react'

const SelectOptionsFactory = obj => {
  const arr = []

  for (const [key, value] of Object.entries(obj)) {
    arr.push(<option key={key} value={key}>{value.name}</option>)
  }

  return arr
}

export default SelectOptionsFactory
