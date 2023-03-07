import React from 'react';

function DefaultContainer({ children }) {
  return (
    <>
      <div id="heading">
        Old Skool Quiz
      </div>

      {children}
    </>
  );
}

export default DefaultContainer;
