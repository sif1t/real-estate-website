// filepath: d:\All Test File\New folder\real-estate-website\src\context\PropertyContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    fetchProperties,
    getFeaturedProperties,
    fetchPropertyById,
    setupPropertyUpdates,
    cleanupPropertyUpdates
} from '../services/propertyService';
import { getPropertyGalleryImages } from '../utils/imageImports';

// Create the context
const PropertyContext = createContext();

// Custom hook to use the property context
export const usePropertyContext = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('usePropertyContext must be used within a PropertyProvider');
    }
    return context;
};

// Property provider component
export const PropertyProvider = ({ children }) => {
    const [allProperties, setAllProperties] = useState([]);
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [propertiesById, setPropertiesById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load all properties
    const loadAllProperties = async () => {
        try {
            setLoading(true);
            const data = await fetchProperties();

            // Enhance properties with images
            const enhancedProperties = data.map(property => {
                const images = getPropertyGalleryImages(property);
                return { ...property, images };
            });

            setAllProperties(enhancedProperties);

            // Create a lookup map by ID
            const byIdMap = {};
            enhancedProperties.forEach(property => {
                byIdMap[property.id] = property;
            });
            setPropertiesById(byIdMap);

            setError(null);
        } catch (err) {
            console.error("Error loading all properties:", err);
            setError(err.message || "Failed to load properties");
        } finally {
            setLoading(false);
        }
    };

    // Load featured properties
    const loadFeaturedProperties = async () => {
        try {
            const data = await getFeaturedProperties(6);

            // Enhance properties with images
            const enhancedProperties = data.map(property => {
                const images = getPropertyGalleryImages(property);
                return { ...property, images };
            });

            setFeaturedProperties(enhancedProperties);
        } catch (err) {
            console.error("Error loading featured properties:", err);
            // Don't set global error for this, as it's not critical
        }
    };

    // Get a specific property by ID
    const getPropertyById = async (id) => {
        // First check if we already have this property in our state
        if (propertiesById[id]) {
            return propertiesById[id];
        }

        // Otherwise fetch it
        try {
            const property = await fetchPropertyById(id);

            if (!property) {
                throw new Error("Property not found");
            }

            // Enhance with images
            const images = getPropertyGalleryImages(property);
            const enhancedProperty = { ...property, images };

            // Update our state
            setPropertiesById(prev => ({
                ...prev,
                [id]: enhancedProperty
            }));

            return enhancedProperty;
        } catch (err) {
            console.error(`Error fetching property ${id}:`, err);
            throw err;
        }
    };

    // Handle real-time property updates
    const handlePropertyUpdate = (updatedProperties) => {
        if (!updatedProperties || updatedProperties.length === 0) return;

        console.log('PropertyContext received real-time updates:', updatedProperties.length);

        // Enhance updated properties with images
        const enhancedUpdates = updatedProperties.map(property => {
            const images = getPropertyGalleryImages(property);
            return { ...property, images };
        });

        // Update allProperties state
        setAllProperties(prevProperties => {
            const updatedIds = new Set(enhancedUpdates.map(p => p.id));
            const filteredProperties = prevProperties.filter(p => !updatedIds.has(p.id));
            return [...filteredProperties, ...enhancedUpdates];
        });

        // Update featuredProperties state
        setFeaturedProperties(prevFeatured => {
            // Only update featured properties with properties that should be featured
            const featuredUpdates = enhancedUpdates.filter(p => p.featured === true);

            if (featuredUpdates.length > 0) {
                const updatedIds = new Set(featuredUpdates.map(p => p.id));
                const filteredFeatured = prevFeatured.filter(p => !updatedIds.has(p.id));
                return [...filteredFeatured, ...featuredUpdates]
                    .sort((a, b) => a.price - b.price)
                    .slice(0, 6); // Keep max 6 featured properties
            }

            return prevFeatured;
        });

        // Update propertiesById state
        setPropertiesById(prev => {
            const updated = { ...prev };
            enhancedUpdates.forEach(property => {
                updated[property.id] = property;
            });
            return updated;
        });
    };

    // Initialize data loading and real-time updates
    useEffect(() => {
        // Load initial property data
        loadAllProperties();
        loadFeaturedProperties();

        // Setup real-time property updates
        setupPropertyUpdates(handlePropertyUpdate);

        // Cleanup on unmount
        return () => {
            cleanupPropertyUpdates();
        };
    }, []);

    // Value to provide through context
    const value = {
        allProperties,
        featuredProperties,
        loading,
        error,
        getPropertyById,
        refreshProperties: loadAllProperties,
        refreshFeaturedProperties: loadFeaturedProperties,
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};

export default PropertyContext;