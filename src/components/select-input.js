import React from 'react';

import Options from '../factories/options';

function SelectInput({ label, onChange, players }) {
  return (
    <>
      <label className="sub-heading">{label}</label>
      <select defaultValue="" name="id" onChange={(e) => onChange(e.target.value)}>
        <option disabled value="">Select</option>
        {Options(players)}
      </select>
    </>
  );
}

export default SelectInput;
