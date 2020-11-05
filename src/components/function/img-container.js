import React from 'react'

const ImgContainer = ({ onClick, picture }) => (
  <div className='img-container'>
    <div className='img-card' onClick={e => onClick(e, picture)}>
      <div>
        <img src={picture} alt='Cannot find that url &nbsp;' />
      </div>
    </div>
  </div>
)

export default ImgContainer
