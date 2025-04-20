import React from 'react';
import PropertyList from '../components/property/PropertyList';
import Layout from '../components/common/Layout';
import SEO from '../components/common/SEO';
import { usePropertyContext } from '../context/PropertyContext';

const PropertyListingPage = () => {
    // Use the property context instead of direct API calls
    const {
        allProperties,
        loading,
        error,
        refreshProperties
    } = usePropertyContext();

    return (
        <Layout>
            <SEO
                title="Browse Properties - Find Your Dream Home"
                description="Browse our extensive collection of properties for sale and rent."
            />
            <div className="container mx-auto p-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Properties</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover a wide range of properties that fit your needs and budget.
                    </p>
                </div>

                {/* Property filters could go here */}

                <PropertyList
                    properties={allProperties}
                    loading={loading}
                    error={error}
                    retry={refreshProperties}
                />

                {!loading && !error && allProperties.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-500">
                            Showing {allProperties.length} properties
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PropertyListingPage;