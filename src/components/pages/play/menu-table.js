import React from 'react';

function MenuTable({ children }) {
  return (
    <table>
      <tbody>
        <tr>
          {children}
        </tr>
      </tbody>
    </table>
  );
}

export default MenuTable;
