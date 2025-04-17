import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyDetails } from '../../services/propertyService';
import Loading from '../common/Loading';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPropertyDetails = async () => {
            try {
                const data = await fetchPropertyDetails(id);
                setProperty(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPropertyDetails();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <img src={property.image} alt={property.title} className="w-full h-64 object-cover mt-4" />
            <p className="mt-4">{property.description}</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Details</h2>
                <ul className="list-disc list-inside">
                    <li>Price: ${property.price}</li>
                    <li>Location: {property.location}</li>
                    <li>Bedrooms: {property.bedrooms}</li>
                    <li>Bathrooms: {property.bathrooms}</li>
                </ul>
            </div>
        </div>
    );
};

export default PropertyDetails;