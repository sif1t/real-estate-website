import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { getPropertyImage } from '../../utils/imageImports';

const PropertyCard = ({ property }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Handle missing or invalid property data
    if (!property || typeof property !== 'object') {
        return null;
    }

    const {
        id = 'unknown',
        title = 'Untitled Property',
        price = 0,
        location = 'Location not specified',
        bedrooms = 0,
        bathrooms = 0,
        area = 0,
        type = 'Not specified',
        status = 'Unknown'
    } = property;

    // Use the new image import utility to get the property image
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const loadImage = async () => {
            try {
                // Get image using our new auto-import utility
                const image = getPropertyImage(property);
                if (isMounted) {
                    setImageUrl(image);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error loading property image:', error);
                    // Using fallback image will be handled by the onError handler of the img tag
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadImage();

        return () => {
            isMounted = false;
        };
    }, [property]);

    // Fallback ID for link if id is missing
    const propertyLink = id !== 'unknown' ? `/properties/${id}` : '#';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <Link to={propertyLink}>
                <div className="relative h-64 overflow-hidden">
                    {isLoading ? (
                        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    ) : (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                const typeText = type || 'Property';
                                e.target.src = propertyTypePlaceholders[type.toLowerCase()] || `https://placehold.co/600x400?text=${typeText}`;
                            }}
                        />
                    )}
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded">
                        {status}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 truncate">{title}</h3>
                    <p className="text-gray-600 mb-2">{location}</p>
                    <p className="text-primary font-bold text-xl mb-3">
                        {status === 'For Rent' ? `${formatCurrency(price)}/month` : formatCurrency(price)}
                    </p>

                    <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 7H7v6h6V7z" />
                                <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H2a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-4V3a1 1 0 00-1-1H7zm7 5V5H6v2h8z" clipRule="evenodd" />
                            </svg>
                            <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H5zm9 1H6v14h8V3z" clipRule="evenodd" />
                            </svg>
                            <span>{area} sq ft</span>
                        </div>
                    </div>

                    <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                        <span className="bg-gray-100 rounded px-2 py-1">{type}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

// Add propertyTypePlaceholders here to have direct access in this component
const propertyTypePlaceholders = {
    apartment: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    villa: 'https://images.unsplash.com/photo-1613977257363-707004c259fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    house: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    condo: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    brownstone: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    penthouse: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80'
};

export default PropertyCard;