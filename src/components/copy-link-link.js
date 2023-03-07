import React from 'react';

const publicUrl = process.env.PUBLIC_URL || '';

function CopyLinkLink({ gamecode, password }) {
  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${publicUrl}/join/${gamecode}/${password}`);
  };

  return (
    <span className="corner-link" id="copy-link" onClick={handleClick}>Copy link</span>
  );
}

export default CopyLinkLink;
