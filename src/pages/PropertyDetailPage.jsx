import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/property/PropertyDetails';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import SEO from '../components/common/SEO';
import { usePropertyContext } from '../context/PropertyContext';
import NotFoundPage from './NotFoundPage';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [localError, setLocalError] = useState(null);

    // Use the property context
    const { getPropertyById } = usePropertyContext();

    // Load the property data
    useEffect(() => {
        const loadProperty = async () => {
            try {
                setLocalLoading(true);
                const propertyData = await getPropertyById(id);
                setProperty(propertyData);
                setLocalError(null);
            } catch (err) {
                console.error(`Error loading property ${id}:`, err);
                setLocalError(err.message || "Failed to load property");
                setProperty(null);
            } finally {
                setLocalLoading(false);
            }
        };

        loadProperty();
    }, [id, getPropertyById]);

    if (localLoading) {
        return (
            <Layout>
                <div className="container mx-auto p-4">
                    <Loading />
                </div>
            </Layout>
        );
    }

    if (localError) {
        // If property not found, show the 404 page
        if (localError.includes("not found")) {
            return <NotFoundPage />;
        }

        // Otherwise show an error with retry option
        return (
            <Layout>
                <div className="container mx-auto p-4 text-center">
                    <div className="bg-red-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-red-600 mb-3">Error Loading Property</h2>
                        <p className="text-gray-700 mb-4">{localError}</p>
                        <button
                            onClick={() => getPropertyById(id).then(setProperty).catch(err => setLocalError(err.message))}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!property) {
        return <NotFoundPage />;
    }

    return (
        <Layout>
            <SEO
                title={`${property.title} | Real Estate Listing`}
                description={property.description?.substring(0, 160) || `View details for ${property.title}`}
            />
            <div className="container mx-auto p-4">
                <PropertyDetails property={property} />
            </div>
        </Layout>
    );
};

export default PropertyDetailPage;