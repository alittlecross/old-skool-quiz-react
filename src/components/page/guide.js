import React from 'react'

const Guide = () => (
  <>
    <div id='heading'>Guide</div>
    <div className='sub-heading'>Scoring...</div>

    <p>Click correct answers to give out points.</p>
    <p>The lead score(s) will be highlighted yellow.</p>
    <p>The bottom three scores will be highlighted pink.</p>

    <div className='sub-heading'><span className='highlight-yellow'>Switch host...</span></div>

    <p>This can be used to pass hosting duties to another player.</p>
    <p>Click the ✓ below the player whom you want to pass hosting duties to.</p>

    <div className='sub-heading'><span className='highlight-green'>Bonus points...</span></div>

    <p>Points can be adjusted if an answer is worth more than one point.</p>
    <p>Click the + or - below a player to add or remove bonus points.</p>

    <div className='sub-heading'><span className='highlight-blue'>Merge players...</span></div>

    <p>If for any reason a player joins twice, their columns can be merged.</p>
    <p>Click the # below the two players to be merged.</p>

    <div className='sub-heading'><span className='highlight-pink'>Remove player...</span></div>

    <p>A player might leave and not return.</p>
    <p>Click the ✗ below a player to remove them.</p>
  </>
)

export default Guide
