import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem'
};

const MapView = ({ location = '123 Real Estate Blvd, New York, NY 10001', zoom = 14 }) => {
    // You would normally use an environment variable for the API key
    // For demo purposes, we'll use a restricted placeholder key
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'YOUR_API_KEY_HERE' // Replace with your Google Maps API key
    });

    // Default coordinates for NYC (replace with geocoded address in production)
    const center = {
        lat: 40.7128,
        lng: -74.0060
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
        >
            <Marker
                position={center}
                title={location}
            />
        </GoogleMap>
    ) : (
        <div className="flex items-center justify-center bg-gray-200 h-full w-full rounded-lg">
            <p className="text-gray-500">Loading map...</p>
        </div>
    );
};

export default MapView;