import React from 'react';
import { Link } from 'react-router-dom';

import DefaultContainer from '../../containers/default';
import RubberContainer from '../../containers/rubber';

function Index() {
  return (
    <DefaultContainer>
      <RubberContainer>
        <Link className="rubber" to="/create">Create</Link>
        <Link className="rubber" to="/join">Join</Link>
      </RubberContainer>
    </DefaultContainer>
  );
}

export default Index;
