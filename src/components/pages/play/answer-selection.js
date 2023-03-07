import React, { useState } from 'react';

function AnswerSelection({
  active: { answer }, cookie, io, updateCookie,
}) {
  const [selected, setSelected] = useState(Array(answer.length).fill(false));

  const handleClick = (e, i) => {
    const _selected = Array(answer.length).fill(false);

    _selected[i] = true;

    setSelected(_selected);

    updateCookie();

    io.emit('add answer', answer[i], cookie);
  };

  const td = [];

  answer.forEach((answer, i) => {
    td.push(
      <td key={i}>
        <span className={selected[i] ? 'selected' : null} onClick={(e) => handleClick(e, i)}>{answer}</span>
      </td>,
    );
  });

  return (
    <div id="multiple-choice">
      <table>
        <tbody>
          <tr>
            {td}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AnswerSelection;
