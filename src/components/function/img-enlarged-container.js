import React from 'react'

const ImgEnlargedContainer = ({ onClick, picture }) => (
  <div id='img-enlarged-container'>
    <div className='img-card' onClick={e => onClick(e, null)}>
      <div>
        <img src={picture} alt='Cannot find that url &nbsp;' />
      </div>
    </div>
  </div>
)

export default ImgEnlargedContainer
