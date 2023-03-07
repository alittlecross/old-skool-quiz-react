import React, { useState } from 'react';

import Button from '../../button';
import Form from '../../form';

function AnswerForm({ cookie, io, updateCookie }) {
  const [answer, setAnswer] = useState('');
  const [className, setClassName] = useState(null);

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setClassName(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setClassName('post-answer-submit');
    updateCookie();

    io.emit('add answer', answer, cookie);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        className={className}
        onChange={handleChange}
        placeholder="Enter your answer..."
        type="text"
        value={answer}
      />

      <Button>Submit</Button>
    </Form>
  );
}

export default AnswerForm;
