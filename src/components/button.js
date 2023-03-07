import React from 'react';

function Button({ children, onClick }) {
  return <button className="rubber" onClick={onClick}>{children}</button>;
}

export default Button;
