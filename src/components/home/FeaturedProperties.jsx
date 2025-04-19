import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../property/PropertyCard';
import Loading from '../common/Loading';
import ApiError from '../common/ApiError';
import { fetchProperties } from '../../services/propertyService';
import { getPropertyGalleryImages } from '../../utils/imageImports';

const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                const data = await fetchProperties();

                // Ensure data is valid
                if (!data || !Array.isArray(data)) {
                    throw new Error("Invalid properties data");
                }

                // Filter featured properties
                const featuredProperties = data.filter(property => property.featured);

                // If no featured properties, show the first 3 properties
                let propertiesToShow = featuredProperties.length > 0
                    ? featuredProperties
                    : data.slice(0, 3);

                // Pre-fetch and enhance images for each property
                propertiesToShow = propertiesToShow.map(property => {
                    // Use high-quality images for each property
                    const enhancedImages = getEnhancedPropertyImages(property);
                    return { ...property, images: enhancedImages };
                });

                setProperties(propertiesToShow);
                setError(null);
            } catch (err) {
                console.error("Failed to load featured properties:", err);
                setError(err);

                // Use fallback mock data with high-quality images
                setProperties(getMockProperties());
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    // Get enhanced property images based on property type
    const getEnhancedPropertyImages = (property) => {
        const baseImages = getPropertyGalleryImages(property);

        // If we already have good images, use them
        if (baseImages?.length > 0 && baseImages[0].startsWith('http')) {
            return baseImages;
        }

        // Otherwise provide high-quality images based on property type
        const propertyType = property?.type?.toLowerCase() || 'default';
        const enhancedImageSet = getHighQualityPropertyImages(propertyType);

        return enhancedImageSet;
    };

    // High-quality property images based on type
    const getHighQualityPropertyImages = (type) => {
        const imagesByType = {
            apartment: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            villa: [
                'https://images.unsplash.com/photo-1613977257363-707004c259fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            house: [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            condo: [
                'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1594484247201-e932ae3f9508?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1559599238-308997c787a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            penthouse: [
                'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            default: [
                'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
            ]
        };

        return imagesByType[type] || imagesByType.default;
    };

    // Mock data with high-quality images
    const getMockProperties = () => {
        return [
            {
                id: 1,
                title: 'Modern Apartment in Downtown',
                price: 450000,
                location: 'New York, NY',
                bedrooms: 2,
                bathrooms: 2,
                area: 1200,
                description: 'Beautiful modern apartment in downtown with amazing views.',
                images: getHighQualityPropertyImages('apartment'),
                featured: true,
                type: 'Apartment',
                status: 'For Sale'
            },
            {
                id: 2,
                title: 'Luxury Villa with Pool',
                price: 1250000,
                location: 'Miami, FL',
                bedrooms: 4,
                bathrooms: 3,
                area: 3500,
                description: 'Stunning luxury villa with private pool in exclusive neighborhood.',
                images: getHighQualityPropertyImages('villa'),
                featured: true,
                type: 'Villa',
                status: 'For Sale'
            },
            {
                id: 3,
                title: 'Spacious Family Home',
                price: 750000,
                location: 'Austin, TX',
                bedrooms: 4,
                bathrooms: 3,
                area: 2800,
                description: 'Beautiful family home with large yard and updated features.',
                images: getHighQualityPropertyImages('house'),
                featured: true,
                type: 'House',
                status: 'For Sale'
            }
        ];
    };

    // Show loading component while fetching data
    if (loading) return <Loading />;

    // Only show ApiError if no fallback data was loaded
    if (error && properties.length === 0) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
                    <ApiError error={error} retry={() => fetchProperties().then(data => setProperties(data.filter(p => p.featured)))} />
                </div>
            </section>
        );
    }

    // Show a message if no properties are available
    if (properties.length === 0) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-600 mb-4">No featured properties available at the moment.</p>
                        <Link to="/properties" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                            View All Properties
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Properties</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Explore our handpicked selection of premium properties available for sale and rent.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/properties" className="inline-block px-8 py-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-lg font-medium">
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;