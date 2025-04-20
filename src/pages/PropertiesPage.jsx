import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';
import { PropertyCardGrid } from '../components/property/PropertyCard';
import PropertyFilters from '../components/property/PropertyFilters';
import propertyService from '../services/propertyService';
import Loading from '../components/common/Loading';

const PropertiesPage = () => {
    const location = useLocation();
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
        searchQuery: '',
    });

    // Apply URL search parameters on initial load
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlCategory = queryParams.get('category');
        const urlLocation = queryParams.get('location');
        const urlPriceRange = queryParams.get('priceRange');
        const searchQuery = queryParams.get('q'); // Get the general search query

        const updatedFilters = { ...filters };

        // Apply category filter from URL
        if (urlCategory) {
            updatedFilters.propertyType = urlCategory;
        }

        // Apply location filter from URL
        if (urlLocation) {
            // Convert URL slug format to readable location
            const locationMap = {
                'new-york': 'New York',
                'los-angeles': 'Los Angeles',
                'chicago': 'Chicago',
                'miami': 'Miami',
                'san-francisco': 'San Francisco',
                'seattle': 'Seattle',
                'austin': 'Austin',
                'brooklyn': 'Brooklyn',
                'beverly-hills': 'Beverly Hills'
            };
            updatedFilters.location = locationMap[urlLocation] || urlLocation;
        }

        // Apply price range filter from URL
        if (urlPriceRange) {
            if (urlPriceRange.includes('-rent')) {
                // Handle rental price ranges
                updatedFilters.status = 'For Rent';
                const priceParts = urlPriceRange.replace('-rent', '').split('-');
                if (priceParts.length === 2) {
                    updatedFilters.minPrice = priceParts[0];
                    updatedFilters.maxPrice = priceParts[1] === '+' ? '' : priceParts[1];
                }
            } else {
                // Handle sale price ranges
                updatedFilters.status = 'For Sale';
                const priceParts = urlPriceRange.split('-');
                if (priceParts.length === 2) {
                    updatedFilters.minPrice = priceParts[0];
                    updatedFilters.maxPrice = priceParts[1] === '+' ? '' : priceParts[1];
                } else if (urlPriceRange.includes('+')) {
                    updatedFilters.minPrice = urlPriceRange.replace('+', '');
                }
            }
        }

        // Apply search query from header search
        if (searchQuery) {
            updatedFilters.searchQuery = searchQuery;
        }

        // Only update filters if we have search params
        if (urlCategory || urlLocation || urlPriceRange || searchQuery) {
            setFilters(updatedFilters);
        }
    }, [location.search]);

    // Fetch properties based on current filters
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                // Added searchQuery to the filters passed to getProperties
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

    // Handle filter updates from the PropertyFilters component
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

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
                        setFilters={handleFilterChange}
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
                                {filters.location && ` in ${filters.location}`}
                                {filters.propertyType !== 'Any' && ` of type ${filters.propertyType}`}
                                {filters.status !== 'Any' && ` ${filters.status.toLowerCase()}`}
                                {filters.searchQuery && ` matching "${filters.searchQuery}"`}
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