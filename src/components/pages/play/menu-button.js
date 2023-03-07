import React from 'react';

function MenuButton({
  children, colour, i, onClick,
}) {
  return (
    <span className={`highlight-${colour}`} onClick={(e) => onClick(e, i)}>
      {children}
      ...
    </span>
  );
}

export default MenuButton;
