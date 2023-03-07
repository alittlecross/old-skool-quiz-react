import React from 'react';

import MenuCell from '../components/pages/play/menu-cell';

const MenuCells = (io, merge, players, setMerge) => {
  const handleClickMergePlayers = (e, id) => {
    if (merge) {
      if (id !== merge) io.emit('merge players', id, merge);

      setMerge(null);
    } else {
      setMerge(id);
    }
  };

  const handleClickSwitchHost = (e, id) => {
    io.emit('switch host', id);
  };

  const handleClickRemovePlayer = (e, id) => {
    io.emit('remove player', id);
  };

  const cells = [[], [], []];

  for (const key of Object.keys(players)) {
    const props = (onClick, sign) => ({
      id: key,
      key,
      onClick,
      sign,
    });

    cells[0].push(
      <MenuCell {...props(handleClickMergePlayers, '#')} {...{ merge }} />,
    );
    cells[1].push(
      <MenuCell {...props(handleClickSwitchHost, '✓')} />,
    );
    cells[2].push(
      <MenuCell {...props(handleClickRemovePlayer, '✗')} />,
    );
  }

  return cells;
};

export default MenuCells;
