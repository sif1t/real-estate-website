import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem'
};

const MapView = ({ location = '123 Real Estate Blvd, New York, NY 10001', zoom = 14 }) => {
    const [mapError, setMapError] = useState(false);

    // You would normally use an environment variable for the API key
    // For demo purposes, we'll use a restricted placeholder key
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Use environment variable
        onError: () => setMapError(true)
    });

    // Default coordinates for NYC (replace with geocoded address in production)
    const center = {
        lat: 40.7128,
        lng: -74.0060
    };

    // Handle map loading error
    if (loadError || mapError) {
        return (
            <div className="flex flex-col items-center justify-center bg-gray-100 h-full w-full rounded-lg p-4 text-center">
                <div className="text-amber-600 text-5xl mb-4">⚠️</div>
                <h3 className="text-lg font-bold mb-2">Map cannot be displayed</h3>
                <p className="text-gray-600 text-sm mb-2">{location}</p>
                <p className="text-gray-500 text-xs">Please check your Google Maps API key configuration.</p>
            </div>
        );
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={() => {
                console.log('Map loaded successfully');
            }}
            onError={(e) => {
                console.error('Map error:', e);
                setMapError(true);
            }}
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