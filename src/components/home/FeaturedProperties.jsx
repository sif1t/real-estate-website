import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../property/PropertyCard';
import Loading from '../common/Loading';
import ApiError from '../common/ApiError';
import { usePropertyContext } from '../../context/PropertyContext';
import { getHighQualityPropertyImages } from '../../utils/imageImports';

const FeaturedProperties = () => {
    // Use the property context instead of direct API calls
    const {
        featuredProperties,
        loading,
        error,
        refreshFeaturedProperties
    } = usePropertyContext();

    // Prepare fallback properties if needed
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

    // Only show ApiError if no properties are available
    if (error && (!featuredProperties || featuredProperties.length === 0)) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
                    <ApiError error={error} retry={refreshFeaturedProperties} />
                </div>
            </section>
        );
    }

    // Use context properties or fallback to mock data if needed
    const properties = featuredProperties && featuredProperties.length > 0
        ? featuredProperties
        : getMockProperties();

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