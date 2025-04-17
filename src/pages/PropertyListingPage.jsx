import React, { useEffect, useState } from 'react';
import PropertyList from '../components/property/PropertyList';
import Loading from '../components/common/Loading';
import { fetchProperties } from '../services/api';

const PropertyListingPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const data = await fetchProperties();
                setProperties(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProperties();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
            <PropertyList properties={properties} />
        </div>
    );
};

export default PropertyListingPage;