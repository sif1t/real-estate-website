import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';
import { PropertyCardGrid } from '../components/property/PropertyCard';
import PropertyFilters from '../components/property/PropertyFilters';
import propertyService from '../services/propertyService';
import Loading from '../components/common/Loading';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 2000000],
        bedrooms: 'Any',
        bathrooms: 'Any',
        propertyType: 'Any',
        status: 'Any',
        location: '',
        minPrice: '',
        maxPrice: '',
    });

    // Fetch properties based on current filters
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await propertyService.getProperties(filters);
                setProperties(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch properties:', err);
                setError('Failed to load properties. Please try again later.');
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filters]);

    return (
        <Layout>
            <SEO
                title="Properties | Real Estate Listings"
                description="Browse our selection of properties for sale and rent in top locations."
            />

            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Properties</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Find your dream home from our carefully selected properties in the most desirable locations.
                        </p>
                    </div>

                    <PropertyFilters
                        filters={filters}
                        setFilters={setFilters}
                        className="mb-8"
                    />

                    {loading ? (
                        <Loading message="Loading properties..." />
                    ) : error ? (
                        <div className="text-center py-10 text-red-600">
                            <p>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-gray-600">
                                Found {properties.length} properties
                            </div>
                            <PropertyCardGrid properties={properties} />
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PropertiesPage;