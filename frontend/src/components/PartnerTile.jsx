import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData }) {
  const activeColor = partnerData.active ? 'true-color' : 'false-color';
  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={partnerData.thumbnailUrl} />
      <hr />
      <div className="partner-info">
        <h2>{partnerData.name}</h2>
        <p className={activeColor}>
          {partnerData.active ? 'Active' : 'Inactive'}
        </p>
        <p>{partnerData.description}</p>
      
      
      </div>
    </div>
  )
}

export default PartnerTile;