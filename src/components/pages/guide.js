import React from 'react';

function Guide() {
  return (
    <>
      <div id="heading">Guide</div>
      <div className="sub-heading">Scoring...</div>

      <p>Click + or - to add or remove points.</p>
      <p>The lead score(s) will be highlighted yellow.</p>
      <p>The bottom three scores will be highlighted pink.</p>

      <div className="sub-heading"><span className="highlight-yellow">Merge players...</span></div>

      <p>If for any reason a player joins twice, their columns can be merged.</p>
      <p>Click the # below the two players to be merged.</p>

      <div className="sub-heading"><span className="highlight-blue">Switch host...</span></div>

      <p>This can be used to pass hosting duties to another player.</p>
      <p>Click the ✓ below the player whom you want to pass hosting duties to.</p>

      <div className="sub-heading"><span className="highlight-pink">Remove player...</span></div>

      <p>A player might leave and not return.</p>
      <p>Click the ✗ below a player to remove them.</p>
    </>
  );
}

export default Guide;
