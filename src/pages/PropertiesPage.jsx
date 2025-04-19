import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../services/propertyService';
import PropertyList from '../components/property/PropertyList';
import PropertyFilters from '../components/property/PropertyFilters';
import SEO from '../components/common/SEO';
import { getPropertyGalleryImages } from '../utils/imageImports';

const PropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all',
        priceRange: 'all',
        bedrooms: 'all',
        location: 'all'
    });

    const loadProperties = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProperties();

            if (!data) {
                throw new Error("No property data received from the server");
            }

            // Add images to each property
            const propertiesWithImages = data.map(property => {
                // Get the property images using our utility
                const images = getPropertyGalleryImages(property);
                return { ...property, images };
            });

            setProperties(propertiesWithImages);
            setFilteredProperties(propertiesWithImages);
        } catch (err) {
            console.error("Failed to load properties:", err);
            setError(err.message || "Failed to load properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    useEffect(() => {
        if (!properties.length) return;

        let results = [...properties];

        if (filters.type !== 'all') {
            results = results.filter(property => property.type === filters.type);
        }

        if (filters.location !== 'all') {
            results = results.filter(property =>
                property.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            results = results.filter(property => {
                if (max) {
                    return property.price >= min && property.price <= max;
                } else {
                    return property.price >= min;
                }
            });
        }

        if (filters.bedrooms !== 'all') {
            const minBeds = parseInt(filters.bedrooms);
            results = results.filter(property => property.bedrooms >= minBeds);
        }

        setFilteredProperties(results);
    }, [filters, properties]);

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SEO
                title="Browse Properties | Real Estate Website"
                description="Explore our collection of premium properties for sale and rent."
            />

            <h1 className="text-3xl font-bold mb-8">Available Properties</h1>

            <PropertyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                propertyCount={filteredProperties.length}
            />

            {!loading && filteredProperties.length === 0 && !error && (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-2">No properties found</h3>
                    <p className="text-yellow-700">
                        No properties match your current filter criteria. Try adjusting your filters or browse our full collection.
                    </p>
                    <button
                        onClick={() => setFilters({
                            type: 'all',
                            priceRange: 'all',
                            bedrooms: 'all',
                            location: 'all'
                        })}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            <PropertyList
                properties={filteredProperties}
                loading={loading}
                error={error}
                retry={loadProperties}
            />
        </div>
    );
};

export default PropertiesPage;