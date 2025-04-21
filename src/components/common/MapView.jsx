import React from 'react';

const MapView = ({ location = '123 Real Estate Blvd, New York, NY 10001', zoom = 14 }) => {
    // Function to generate a Google Maps embed URL
    const getMapUrl = () => {
        const encodedAddress = encodeURIComponent(location);
        return `https://maps.google.com/maps?q=${encodedAddress}&z=${zoom}&output=embed`;
    };

    return (
        <div className="h-full w-full rounded-lg overflow-hidden">
            <iframe
                title="Property Location Map"
                src={getMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default MapView;