import React from 'react'

const TextInput = ({ className, label, onChange, placeholder, readonly, type, value }) => (
  <>
    <label>{label}</label>
    <input
      className={className}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || '...here'}
      readOnly={readonly || false}
      type={type || 'text'}
      value={value}
    />
  </>
)

export default TextInput
