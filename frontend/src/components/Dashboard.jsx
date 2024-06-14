import React, { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
    // Constant used to set and get partners 
    const [partners, setPartners] = useState({});

    // Constant to complete the form data (input to add new partner)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logoUrl: '',
        isActive: null,
        delete: false

    });

    // Constant used to show the input menu
    const [showAdd, setShowAdd] = useState(false);

    // Gets the data from the URL, such as pre-existing partner data
    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => setPartners(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Gets the data that is inputed and formats it with a name and corresponding data 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    
    };

    // Calls the post method and formats the data inputted and adds it to the JSON
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/add-partner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                thumbnailUrl: formData.logoUrl,
                name: formData.name,
                description: formData.description,
                active: formData.isActive,
                delete: false
            })
        })
        .then((res) => res.json())
        .then((data) => {
            // Update the partners state with the new partner
            const newPartnerKey = formData.name;
            setPartners({
                ...partners,
                [newPartnerKey]: data.partner
            });
            // Clears the form once the data is submitted
            setFormData({ name: '', description: '', logoUrl: '', isActive: null, delete: false });
            setShowAdd(false);
        })
        .catch((error) => console.error('Error adding partner:', error));
    };

    // Calls the delete request and passes in the partnerKey 
    const handleDelete = (partnerKey) => {
        fetch(`http://localhost:4000/delete-partner/${partnerKey}`, {
        method: 'DELETE',
    })
    .then(response => {
        const newPartners = { ...partners };
        delete newPartners[partnerKey];
        setPartners(newPartners);
    })
    .catch(error => {
        console.error('Error deleting partner:', error);
    });
        
    };
    

    return (
        // Creates the input text boxes and check boxes and calls either handleSubmit or handleInputChange 
        <div id="main-content">
            <center>
            <div id ="up">
            <button 
             style={{ backgroundColor: 'lightgreen', color: 'black', padding: '5px 20px', borderRadius: '4px', cursor: 'pointer'}}
           onClick={() => setShowAdd(!showAdd)}
           className="button" >Add Partner Info
            </button>
            </div>
            </center>
            {showAdd && (
            <div id="button">
            <form onSubmit={handleSubmit} id="grid-container">
            <div id = "grid-item"> 
           
                <label htmlFor="name">Partner name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                </div>
                <br />
                
                <div id = "item1"> 
                <label htmlFor="description">Partner description</label>
                <input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></input>
                </div>
                <br />

                <div id = "grid-item">
                <label htmlFor="logoUrl">Partner Logo Source</label>
                <input
                    type="text"
                    id="logoUrl"
                    name="logoUrl"
                    value={formData.logoUrl}
                    onChange={handleInputChange}
                />
                </div>
                <br />
                <div id = "item4">
                <label htmlFor="isActive">Active?</label>
               
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    <br />
                    
            
               <p></p>
              
                <div id="left">
                <button type="submit" style={{ backgroundColor: 'lightgreen', color: 'black', padding: '5px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                    Submit
                    </button>
                </div>
                </div>
            </form>
            </div>
            )}

            
            <div id="main-partners-grid">
            
            {Object.keys(partners).map(partnerKey => {
                // Skip creating the PartnerTile if the partner is deleted
                    if (partners[partnerKey].delete) {
                        return null; 
                    }
                    return (
                        // Passes each of the partners through PartnerTiles to be properly formatted
                        <PartnerTile 
                            key={partnerKey} 
                            partnerData={partners[partnerKey]} 
                            onDelete={() => handleDelete(partnerKey)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Dashboard;
