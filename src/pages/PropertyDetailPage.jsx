import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/property/PropertyDetails';
import Loading from '../components/common/Loading';
import { fetchPropertyById } from '../services/propertyService';
import { getPropertyGalleryImages } from '../utils/imageImports';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProperty = async () => {
            try {
                const data = await fetchPropertyById(id);

                // Add gallery images to the property
                const images = getPropertyGalleryImages(data);
                const propertyWithImages = { ...data, images };

                setProperty(propertyWithImages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProperty();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!property) return <div>No property found.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
            <PropertyDetails property={property} />
        </div>
    );
};

export default PropertyDetailPage;