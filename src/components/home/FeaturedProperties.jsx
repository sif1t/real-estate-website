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

                // Pre-fetch images for each property using our new utility
                propertiesToShow = propertiesToShow.map(property => {
                    // Use getPropertyGalleryImages to get images for each property
                    const images = getPropertyGalleryImages(property);
                    return { ...property, images };
                });

                setProperties(propertiesToShow);
                setError(null);
            } catch (err) {
                console.error("Failed to load featured properties:", err);
                setError(err);

                // Use fallback mock data to ensure content is shown
                setProperties(getMockProperties());
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    // Mock data to use as fallback
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
                images: ['https://placehold.co/600x400?text=Apartment'],
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
                images: ['https://placehold.co/600x400?text=Villa'],
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
                images: ['https://placehold.co/600x400?text=House'],
                featured: true,
                type: 'House',
                status: 'For Sale'
            }
        ];
    };

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

    // Show a better "no properties" message with a CTA
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
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/properties" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                        View All Properties
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;