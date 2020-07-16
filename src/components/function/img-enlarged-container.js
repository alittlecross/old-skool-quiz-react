import React from 'react'

const ImgEnlargedContainer = props => (
  <div id='img-enlarged-container'>
    <div className='img-card' onClick={event => props.onClick(event, null)}>
      <div>
        <img src={props.picture} alt='Cannot find that url &nbsp;' />
      </div>
    </div>
  </div>
)

export default ImgEnlargedContainer
