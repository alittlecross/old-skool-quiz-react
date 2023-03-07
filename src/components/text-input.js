import React from 'react';

function TextInput({
  className, label, onChange, placeholder, readonly, type, value,
}) {
  return (
    <>
      <label>{label}</label>
      <input
        className={className}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '...here'}
        readOnly={readonly || false}
        type={type || 'text'}
        value={value}
      />
    </>
  );
}

export default TextInput;
