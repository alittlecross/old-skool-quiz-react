import React from 'react';

function Form({ children, onSubmit }) {
  return (
    <form autoComplete="off" onSubmit={onSubmit} spellCheck="false">
      {children}
    </form>
  );
}

export default Form;
