import React from 'react';
import { Link } from 'react-router-dom';

function GuideLink() {
  return <Link className="corner-link" id="guide" target="_blank" to="/guide">Guide</Link>;
}

export default GuideLink;
