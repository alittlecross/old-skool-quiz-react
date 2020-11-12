import React from 'react'

const CopyLinkLink = ({ gamecode, password }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${gamecode}/${password}`)
  }

  return (
    <span className='corner-link' id='copy-link' onClick={handleClick}>Copy link</span>
  )
}

export default CopyLinkLink
