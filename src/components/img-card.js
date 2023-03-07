import React from 'react';

function ImgCard({ enlarged, onClick, picture }) {
  return (
    <div className={enlarged ? 'outer-img-card-enlarged' : null}>
      <div className="inner-img-card" onClick={(e) => onClick(e, picture)}>
        <div>
          <img src={picture} alt="Cannot find that url &nbsp;" />
        </div>
      </div>
    </div>
  );
}

export default ImgCard;
