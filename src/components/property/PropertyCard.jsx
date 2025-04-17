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
                <div className="relative h-48 overflow-hidden">
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
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = `https://placehold.co/600x400?text=${type}`;
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
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
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

export default PropertyCard;