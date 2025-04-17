import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPropertyById } from '../services/propertyService'; // Change to fetchPropertyById which is available
import Loading from '../components/common/Loading';
import ApiError from '../components/common/ApiError';
import SEO from '../components/common/SEO';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyFeatures from '../components/property/PropertyFeatures';
import PropertyContact from '../components/property/PropertyContact';
import PropertyMap from '../components/property/PropertyMap';
import { formatCurrency } from '../utils/formatters';

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPropertyDetails = async () => {
            try {
                setLoading(true);
                const data = await fetchPropertyById(id); // Using fetchPropertyById instead
                setProperty(data);
                setError(null);
            } catch (err) {
                console.error(`Error loading property ${id}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadPropertyDetails();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <ApiError error={error} retry={() => fetchPropertyById(id).then(setProperty)} />;
    if (!property) return <div className="container mx-auto p-4">Property not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <SEO
                title={`${property.title} - Real Estate`}
                description={property.description?.substring(0, 160)}
                keywords={`${property.type}, ${property.location}, ${property.bedrooms} bedroom, real estate, property`}
            />

            <div className="mb-4">
                <Link to="/properties" className="text-primary hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Properties
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {property.location}
                    </span>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {property.status}
                    </span>
                </div>
                
                <div className="text-2xl font-bold text-primary mb-4">
                    {property.status === 'For Rent' 
                        ? `${formatCurrency(property.price)}/month` 
                        : formatCurrency(property.price)
                    }
                </div>
            </div>

            <PropertyGallery images={property.images || []} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                    </div>

                    <PropertyFeatures property={property} />

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Location</h2>
                        <PropertyMap location={property.location} address={property.address} />
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <PropertyContact property={property} />
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;