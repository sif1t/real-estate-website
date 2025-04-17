import React from 'react';
import PropertyCard from './PropertyCard';
import Loading from '../common/Loading';
import ApiError from '../common/ApiError';

const PropertyList = ({ properties, loading, error, retry }) => {
    if (loading) return <Loading />;

    if (error) return (
        <ApiError
            error={error}
            retry={retry}
        />
    );

    if (!properties || properties.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl text-gray-600 mb-4">No properties available at the moment.</p>
                <p className="text-gray-500">Please check back later or try a different search.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyList;