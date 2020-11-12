import React from 'react'

const MenuButton = ({ children, colour, i, onClick }) => (
  <span className={`highlight-${colour}`} onClick={e => onClick(e, i)}>{children}...</span>
)

export default MenuButton
