import React from 'react'
import { Link } from 'react-router-dom'

const BackLink = ({ url }) => (
  <Link className='corner-link' id='back' to={url}>Back</Link>
)

export default BackLink
