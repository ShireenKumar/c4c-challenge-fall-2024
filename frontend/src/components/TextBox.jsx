import React, { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function TextBox() {
    const [partners, setPartners] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logoUrl: '',
        isActive: null

    });

    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => setPartners(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    
    };

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
                active: formData.isActive
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
            // Clear the form
            setFormData({ name: '', description: '', logoUrl: '', isActive: null });
        })
        .catch((error) => console.error('Error adding partner:', error));
    };

    return (
        <div id="main-content">
            <div id="main-partners-grid">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
                <br />

                <label htmlFor="logoUrl">Logo URL:</label>
                <input
                    type="text"
                    id="logoUrl"
                    name="logoUrl"
                    value={formData.logoUrl}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="isActive">Active:</label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    <br />

                <button type="submit">Submit</button>
            </form>
            

                {Object.keys(partners).map(partnerKey => (
                    <PartnerTile key={partnerKey} partnerData={partners[partnerKey]} />
                ))}
                
            </div>
        </div>
    );
}

export default TextBox;
