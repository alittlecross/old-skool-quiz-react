import React from 'react'

const ImgContainer = props => (
  <div className='img-container'>
    <div className='img-card' onClick={event => props.onClick(event, props.picture)}>
      <div>
        <img src={props.picture} alt='Cannot find that url &nbsp;' />
      </div>
    </div>
  </div>
)

export default ImgContainer
