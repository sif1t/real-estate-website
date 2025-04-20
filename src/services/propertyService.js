// API endpoints for property-related operations
// Import api but mark it as unused to avoid ESLint warning
// eslint-disable-next-line no-unused-vars
import { api } from './api';

import {
    fetchProperties as apiFetchProperties,
    fetchPropertyById as apiFetchPropertyById,
    setupRealTimeUpdates,
    cleanupRealTimeUpdates
} from './api';

// Cache for properties to optimize performance
let propertiesCache = {
    all: null,
    featured: null,
    byId: {},
    lastUpdate: null,
};

// Sample properties data for development and testing
// eslint-disable-next-line no-unused-vars
const sampleProperties = [
    {
        id: 'prop-001',
        title: 'Modern Apartment with Ocean View',
        price: 420000,
        location: 'Miami Beach, FL',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        type: 'apartment',
        status: 'For Sale',
        description: 'Beautiful modern apartment with stunning ocean views. Features high-end finishes, open concept living area, and a spacious balcony.',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-002',
        title: 'Luxury Villa with Pool',
        price: 1250000,
        location: 'Beverly Hills, CA',
        bedrooms: 5,
        bathrooms: 4.5,
        area: 4500,
        type: 'villa',
        status: 'For Sale',
        description: 'Spectacular luxury villa in exclusive gated community. Features include infinity pool, home theater, chef\'s kitchen, and expansive outdoor living space.',
        images: ['https://images.unsplash.com/photo-1613977257363-707004c259fc?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-003',
        title: 'Cozy Downtown Condo',
        price: 2800,
        location: 'Seattle, WA',
        bedrooms: 1,
        bathrooms: 1,
        area: 850,
        type: 'condo',
        status: 'For Rent',
        description: 'Modern downtown condo in the heart of Seattle. Walking distance to shops, restaurants, and public transportation.',
        images: ['https://images.unsplash.com/photo-1594484208280-efa00f96fc21?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-004',
        title: 'Charming Brownstone Townhouse',
        price: 875000,
        location: 'Brooklyn, NY',
        bedrooms: 3,
        bathrooms: 2,
        area: 2200,
        type: 'brownstone',
        status: 'For Sale',
        description: 'Historic brownstone with original details throughout. Recently renovated with modern amenities while preserving its classic charm.',
        images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-005',
        title: 'Waterfront Penthouse',
        price: 3500,
        location: 'San Francisco, CA',
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        type: 'penthouse',
        status: 'For Rent',
        description: 'Exclusive penthouse apartment with breathtaking waterfront views. Features include floor-to-ceiling windows, private terrace, and luxury finishes.',
        images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-006',
        title: 'Suburban Family Home',
        price: 550000,
        location: 'Austin, TX',
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        type: 'house',
        status: 'For Sale',
        description: 'Spacious family home in a quiet suburban neighborhood. Features large backyard, updated kitchen, and finished basement.',
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-007',
        title: 'Urban Studio Apartment',
        price: 1800,
        location: 'Chicago, IL',
        bedrooms: 0,
        bathrooms: 1,
        area: 550,
        type: 'apartment',
        status: 'For Rent',
        description: 'Trendy studio apartment in vibrant downtown district. Modern design with efficient layout and building amenities.',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&h=800&q=80']
    },
    {
        id: 'prop-008',
        title: 'Mountain View Cabin',
        price: 320000,
        location: 'Aspen, CO',
        bedrooms: 2,
        bathrooms: 1,
        area: 1100,
        type: 'house',
        status: 'For Sale',
        description: 'Rustic cabin with stunning mountain views. Perfect getaway spot with hiking trails and ski resorts nearby.',
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&h=800&q=80']
    }
];

// Functions for property operations
export const propertyService = {
    // Get all properties with optional filtering
    async getProperties(filters = {}) {
        try {
            // Check cache first if no specific filters are applied
            const isCacheable = Object.keys(filters).length === 0;
            if (isCacheable && propertiesCache.all && Date.now() - propertiesCache.lastUpdate < 60000) { // 1 minute cache
                return propertiesCache.all;
            }

            // Fetch from API
            const properties = await apiFetchProperties(filters);

            // Update cache if no specific filters
            if (isCacheable) {
                propertiesCache.all = properties;
                propertiesCache.lastUpdate = Date.now();
            }

            return properties;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get a single property by ID
    async getPropertyById(id) {
        try {
            // Check cache first
            if (propertiesCache.byId[id] && Date.now() - propertiesCache.byId[id].timestamp < 300000) { // 5 minute cache
                return propertiesCache.byId[id].data;
            }

            // Fetch from API
            const property = await apiFetchPropertyById(id);

            // Update cache
            propertiesCache.byId[id] = {
                data: property,
                timestamp: Date.now()
            };

            return property;
        } catch (error) {
            console.error(`Error fetching property ${id}:`, error);
            throw error;
        }
    },

    // Get featured properties
    async getFeaturedProperties(limit = 4) {
        try {
            // Check cache first
            if (propertiesCache.featured && Date.now() - propertiesCache.lastUpdate < 60000) { // 1 minute cache
                return propertiesCache.featured.slice(0, limit);
            }

            // Fetch from API with featured filter
            const properties = await apiFetchProperties({ featured: true, limit });

            // Update cache
            propertiesCache.featured = properties;
            propertiesCache.lastUpdate = Date.now();

            return properties;
        } catch (error) {
            console.error('Error fetching featured properties:', error);
            throw error;
        }
    },

    // Setup real-time property updates
    setupRealTimePropertyUpdates(onUpdate) {
        // Handler for property updates
        const handlePropertyUpdate = (updatedProperties) => {
            // Refresh the properties in cache
            if (updatedProperties && updatedProperties.length > 0) {
                // Update the 'all' cache if it exists
                if (propertiesCache.all) {
                    // Merge updated properties with existing cache
                    const updatedIds = new Set(updatedProperties.map(p => p.id));
                    propertiesCache.all = [
                        ...propertiesCache.all.filter(p => !updatedIds.has(p.id)),
                        ...updatedProperties
                    ];
                }

                // Update the 'featured' cache if it exists
                if (propertiesCache.featured) {
                    const featuredUpdates = updatedProperties.filter(p => p.featured === true);
                    if (featuredUpdates.length > 0) {
                        const updatedIds = new Set(featuredUpdates.map(p => p.id));
                        propertiesCache.featured = [
                            ...propertiesCache.featured.filter(p => !updatedIds.has(p.id)),
                            ...featuredUpdates
                        ];
                    }
                }

                // Update individual property cache entries
                updatedProperties.forEach(property => {
                    propertiesCache.byId[property.id] = {
                        data: property,
                        timestamp: Date.now()
                    };
                });

                // Update timestamp
                propertiesCache.lastUpdate = Date.now();

                // Notify components of the update
                if (onUpdate && typeof onUpdate === 'function') {
                    onUpdate(updatedProperties);
                }
            }
        };

        // Setup real-time updates
        setupRealTimeUpdates(handlePropertyUpdate, null, null);
    },

    // Clean up real-time property updates
    cleanupRealTimePropertyUpdates() {
        cleanupRealTimeUpdates();
    },

    // Invalidate cache to force fresh data
    invalidateCache() {
        propertiesCache = {
            all: null,
            featured: null,
            byId: {},
            lastUpdate: null
        };
    }
};

// Export functions to match import statements in components
export const fetchProperties = propertyService.getProperties;
export const fetchPropertyDetails = propertyService.getPropertyById;
export const fetchPropertyById = propertyService.getPropertyById;
export const searchProperties = propertyService.getProperties;
export const getFeaturedProperties = propertyService.getFeaturedProperties;
export const setupPropertyUpdates = propertyService.setupRealTimePropertyUpdates;
export const cleanupPropertyUpdates = propertyService.cleanupRealTimePropertyUpdates;
export const invalidatePropertyCache = propertyService.invalidateCache;

export default propertyService;