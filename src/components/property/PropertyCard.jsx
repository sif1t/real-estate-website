import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { getPropertyImage } from '../../utils/imageImports';
import { useCardStyle, CARD_STYLES } from '../../context/CardStyleContext';

// High-quality property image placeholders
const propertyTypePlaceholders = {
    apartment: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    villa: 'https://images.unsplash.com/photo-1613977257363-707004c259fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    house: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    condo: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    brownstone: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    penthouse: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
    default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80'
};

const PropertyCard = ({ property }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [, setImageError] = useState(false);
    const { currentStyle } = useCardStyle();

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
        status = 'Unknown',
        images = []
    } = property;

    // Use the provided images or fetch with our image utility
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setImageError(false);

        const loadImage = async () => {
            try {
                // First try to use the images array if it exists
                if (images && images.length > 0) {
                    if (isMounted) {
                        setImageUrl(images[0]);
                        setIsLoading(false);
                    }
                } else {
                    // Otherwise get image using our auto-import utility
                    const image = getPropertyImage(property);
                    if (isMounted) {
                        setImageUrl(image);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error loading property image:', error);
                    setImageError(true);
                    setIsLoading(false);
                }
            }
        };

        loadImage();

        return () => {
            isMounted = false;
        };
    }, [property, images]);

    // Fallback ID for link if id is missing
    const propertyLink = id !== 'unknown' ? `/property/${id}` : '#';

    const handleImageError = () => {
        setImageError(true);
        const typeText = type?.toLowerCase() || 'property';
        // Directly use unsplash URLs for fallback to ensure images load properly
        const fallbackImage = propertyTypePlaceholders[typeText] || propertyTypePlaceholders.default;
        console.log('Using fallback image:', fallbackImage);
        setImageUrl(fallbackImage);
    };

    // Render different card styles based on currentStyle
    switch (currentStyle) {
        case CARD_STYLES.COMPACT:
            return (
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Link to={propertyLink} className="block">
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative h-48 sm:h-auto sm:w-40 sm:flex-shrink-0">
                                {isLoading ? (
                                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                                ) : (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-sm">
                                    {status}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 truncate">{title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{location}</p>
                                <p className="text-primary font-bold">
                                    {status === 'For Rent' ? `${formatCurrency(price)}/month` : formatCurrency(price)}
                                </p>
                                <div className="flex text-xs text-gray-500 mt-2 gap-3">
                                    <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                                    <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                                    <span>{area} sq ft</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );

        case CARD_STYLES.MODERN:
            return (
                <div className="bg-white overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:translate-y-[-5px]">
                    <Link to={propertyLink} className="block">
                        <div className="relative h-56">
                            {isLoading ? (
                                <div className="w-full h-full bg-gray-200 animate-pulse" />
                            ) : (
                                <>
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                </>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="font-bold text-xl mb-1">{title}</h3>
                                <p className="text-white/90 text-sm">{location}</p>
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className="bg-white text-primary font-medium px-3 py-1 rounded-full text-sm shadow-md">
                                    {status}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-primary font-bold text-xl">
                                    {status === 'For Rent' ? `${formatCurrency(price)}/mo` : formatCurrency(price)}
                                </p>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{type}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <div className="text-center border-r border-gray-200 pr-3 flex-1">
                                    <div className="font-semibold">{bedrooms}</div>
                                    <div className="text-xs">Beds</div>
                                </div>
                                <div className="text-center border-r border-gray-200 px-3 flex-1">
                                    <div className="font-semibold">{bathrooms}</div>
                                    <div className="text-xs">Baths</div>
                                </div>
                                <div className="text-center pl-3 flex-1">
                                    <div className="font-semibold">{area}</div>
                                    <div className="text-xs">Sq Ft</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );

        case CARD_STYLES.ELEGANT:
            return (
                <div className="bg-white rounded-none border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <Link to={propertyLink} className="block">
                        <div className="relative">
                            <div className="h-64">
                                {isLoading ? (
                                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                                ) : (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <div className="absolute top-4 left-0">
                                <div className="bg-primary text-white px-4 py-1 font-serif">
                                    {status}
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <h3 className="font-serif text-xl mb-2">{title}</h3>
                                <p className="text-gray-600 font-serif italic">{location}</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <p className="text-primary font-serif text-xl">
                                    {status === 'For Rent' ? `${formatCurrency(price)}/month` : formatCurrency(price)}
                                </p>
                                <div className="text-gray-500 text-sm">
                                    <div className="flex items-center gap-4">
                                        <span>{bedrooms} bd</span>
                                        <span>{bathrooms} ba</span>
                                        <span>{area} ft²</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );

        // Default standard style
        default:
            return (
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <Link to={propertyLink} className="block relative cursor-pointer">
                        <div className="relative h-64 overflow-hidden">
                            {isLoading ? (
                                <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        onError={handleImageError}
                                        loading="lazy"
                                        crossOrigin="anonymous"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                                </>
                            )}
                            <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-medium shadow-md">
                                {status}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold mb-2 truncate text-gray-800">{title}</h3>
                            <p className="text-gray-600 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                {location}
                            </p>
                            <p className="text-primary font-bold text-xl mb-3">
                                {status === 'For Rent' ? `${formatCurrency(price)}/month` : formatCurrency(price)}
                            </p>

                            <div className="border-t border-gray-100 pt-3 mt-3">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                        </svg>
                                        <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>{area} sq ft</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 flex items-center justify-between">
                                    <span className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 font-medium">{type}</span>
                                    <span className="text-primary text-sm font-medium flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
    }
};

// New component for displaying multiple property cards in a grid
const PropertyCardGrid = ({ properties = [] }) => {
    // Sample properties data if none is provided
    const sampleProperties = [
        {
            id: 'prop-001',
            title: 'Modern Apartment with Ocean View',
            price: 420000,
            location: 'Miami Beach, FL',
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            type: 'apartment',
            status: 'For Sale',
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-002',
            title: 'Luxury Villa with Pool',
            price: 1250000,
            location: 'Beverly Hills, CA',
            bedrooms: 5,
            bathrooms: 4.5,
            area: 4500,
            type: 'villa',
            status: 'For Sale',
            images: ['https://images.unsplash.com/photo-1613977257363-707004c259fc?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-003',
            title: 'Cozy Downtown Condo',
            price: 2800,
            location: 'Seattle, WA',
            bedrooms: 1,
            bathrooms: 1,
            area: 850,
            type: 'condo',
            status: 'For Rent',
            images: ['https://images.unsplash.com/photo-1594484208280-efa00f96fc21?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-004',
            title: 'Charming Brownstone Townhouse',
            price: 875000,
            location: 'Brooklyn, NY',
            bedrooms: 3,
            bathrooms: 2,
            area: 2200,
            type: 'brownstone',
            status: 'For Sale',
            images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-005',
            title: 'Waterfront Penthouse',
            price: 3500,
            location: 'San Francisco, CA',
            bedrooms: 2,
            bathrooms: 2,
            area: 1400,
            type: 'penthouse',
            status: 'For Rent',
            images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-006',
            title: 'Suburban Family Home',
            price: 550000,
            location: 'Austin, TX',
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            type: 'house',
            status: 'For Sale',
            images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-007',
            title: 'Urban Studio Apartment',
            price: 1800,
            location: 'Chicago, IL',
            bedrooms: 0,
            bathrooms: 1,
            area: 550,
            type: 'apartment',
            status: 'For Rent',
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&h=800&q=80']
        },
        {
            id: 'prop-008',
            title: 'Mountain View Cabin',
            price: 320000,
            location: 'Aspen, CO',
            bedrooms: 2,
            bathrooms: 1,
            area: 1100,
            type: 'house',
            status: 'For Sale',
            images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&h=800&q=80']
        }
    ];

    // Use provided properties or fall back to sample data
    const displayProperties = properties.length > 0 ? properties : sampleProperties;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export { PropertyCardGrid };
export default PropertyCard;