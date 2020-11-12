import React from 'react'

const MultipleChoiceTextInput = ({ answers, correct, i, setAnswers, setCorrect }) => {
  const handleChange = e => {
    const _answers = [...answers]
    const { value } = e.target

    _answers[i] = value

    setAnswers(_answers)

    if (correct === i && !value) setCorrect(null)
  }

  const handleClick = e => {
    const _correct = correct !== i ? answers[i] ? i : correct : null

    setCorrect(_correct)
  }

  return (
    <>
      <label onClick={handleClick}>
        <span className={`answer${correct === i ? ' highlight-yellow' : ''}`}>{`Answer ${String.fromCharCode(97 + i).toUpperCase()}...`}</span>
      </label>
      <input
        autoComplete='off'
        onChange={handleChange}
        placeholder='...here'
        type='text'
        value={answers[i]}
      />
    </>
  )
}

export default MultipleChoiceTextInput
