import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState({});
  

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      // Set the parsed data into the partners state
      setPartners(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [])

  return (
    <div id="main-content">
      <div id="main-partners-grid">
        {Object.keys(partners).map(partnerKey => (
          <PartnerTile key={partnerKey} partnerData={partners[partnerKey]} />
        ))}
      </div>

    </div>
  )
}

export default Dashboard;