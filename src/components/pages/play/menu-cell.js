import React from 'react';

function MenuCell({
  id, merge, onClick, sign,
}) {
  return (
    <td>
      <span className={id === merge ? 'highlight-pink' : null} onClick={(e) => onClick(e, id)}>{sign}</span>
    </td>
  );
}

export default MenuCell;
