import React from 'react';
import { Link } from 'react-router-dom';

function BackLink({ url }) {
  return <Link className="corner-link" id="back" to={url}>Back</Link>;
}

export default BackLink;
