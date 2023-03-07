import React from 'react';

function RubberContainer({ children, id }) {
  return (
    <div id={id} className="rubbers">
      {children}
    </div>
  );
}

export default RubberContainer;
