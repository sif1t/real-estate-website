import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropertyDetails from '../components/property/PropertyDetails';
import PropertyGallery from '../components/property/PropertyGallery';
import Loading from '../components/common/Loading';
import Layout from '../components/common/Layout';
import SEO from '../components/common/SEO';
import { usePropertyContext } from '../context/PropertyContext';
import NotFoundPage from './NotFoundPage';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const history = useHistory();
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

    // Handle back button click - go back to previous page or properties list
    const handleBack = () => {
        history.length > 1 ? history.goBack() : history.push('/properties');
    };

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
                {/* Back navigation */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-primary hover:underline"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Properties
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Property Header */}
                    <div className="p-6 border-b">
                        <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
                        <div className="flex items-center flex-wrap gap-4 mt-2">
                            <span className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {property.location}
                            </span>
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                {property.status}
                            </span>
                        </div>
                    </div>

                    {/* Property Gallery */}
                    <PropertyGallery images={property.images || []} />

                    {/* Property Details */}
                    <div className="px-6 pb-6">
                        <PropertyDetails property={property} />
                    </div>
                </div>

                {/* Related properties could be added here */}
            </div>
        </Layout>
    );
};

export default PropertyDetailPage;