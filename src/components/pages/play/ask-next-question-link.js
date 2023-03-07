import React from 'react';
import { Link } from 'react-router-dom';

import RubberContainer from '../../../containers/rubber';

function AskNextQuestionLink() {
  return (
    <RubberContainer id="ask-next-question">
      <Link className="rubber" to="/game/question">Ask next question</Link>
    </RubberContainer>
  );
}

export default AskNextQuestionLink;
