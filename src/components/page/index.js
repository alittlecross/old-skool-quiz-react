import React from 'react'
import { Link } from 'react-router-dom'

import DefaultContainer from '../container/default'

const Index = () => (
  <DefaultContainer>
    <div id='rubbers'>
      <Link className='rubber' to='/create'>Create</Link>
      <Link className='rubber' to='/join'>Join</Link>
    </div>
  </DefaultContainer>
)

export default Index
