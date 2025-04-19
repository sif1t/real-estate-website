import React, { useEffect, useState } from 'react';
import PropertyList from '../components/property/PropertyList';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import { fetchProperties } from '../services/api';
import { getPropertyGalleryImages } from '../utils/imageImports';

const PropertyListingPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const data = await fetchProperties();

                // Add images to each property
                const propertiesWithImages = data.map(property => {
                    const images = getPropertyGalleryImages(property);
                    return { ...property, images };
                });

                setProperties(propertiesWithImages);
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
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
                <PropertyList properties={properties} />
            </div>
        </Layout>
    );
};

export default PropertyListingPage;