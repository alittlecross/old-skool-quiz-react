import React from 'react';

function PointCell({
  cookie, game, i, id, io, points,
}) {
  const handleClick = (e, i, id, p) => {
    io.emit('add/remove points', i, id, p);
  };

  return (
    <td>
      {
        cookie === game.host.id
          && <span onClick={(e) => handleClick(e, i, id, -1)}>&nbsp;-&nbsp;</span>
      }
      {points}
      {
        cookie === game.host.id
          && <span onClick={(e) => handleClick(e, i, id, +1)}>&nbsp;+&nbsp;</span>
      }
    </td>
  );
}

export default PointCell;
