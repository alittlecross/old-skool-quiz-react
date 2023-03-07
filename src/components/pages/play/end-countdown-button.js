import React from 'react';

import Button from '../../button';

function EndCountdownButton({ io }) {
  const handleClick = () => {
    io.emit('end countdown');
  };

  return (
    <div>
      <Button onClick={handleClick}>
        End countdown
      </Button>
    </div>
  );
}

export default EndCountdownButton;
