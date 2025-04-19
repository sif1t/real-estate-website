// API endpoints for property-related operations
// Import api but mark it as unused to avoid ESLint warning
// eslint-disable-next-line no-unused-vars
import { api } from './api';

// Sample properties data for development and testing
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
            // In a real app, this would be an API call
            // For now, we're using our sample data and filtering it
            let properties = [...sampleProperties];

            if (filters) {
                // Apply filters
                if (filters.propertyType && filters.propertyType !== 'Any') {
                    properties = properties.filter(p => p.type === filters.propertyType.toLowerCase());
                }

                if (filters.status && filters.status !== 'Any') {
                    properties = properties.filter(p => p.status === filters.status);
                }

                if (filters.minPrice) {
                    properties = properties.filter(p => p.price >= filters.minPrice);
                }

                if (filters.maxPrice) {
                    properties = properties.filter(p => p.price <= filters.maxPrice);
                }

                if (filters.bedrooms && filters.bedrooms !== 'Any') {
                    const minBeds = parseInt(filters.bedrooms);
                    properties = properties.filter(p => p.bedrooms >= minBeds);
                }

                if (filters.bathrooms && filters.bathrooms !== 'Any') {
                    const minBaths = parseInt(filters.bathrooms);
                    properties = properties.filter(p => p.bathrooms >= minBaths);
                }

                if (filters.location) {
                    const location = filters.location.toLowerCase();
                    properties = properties.filter(p =>
                        p.location.toLowerCase().includes(location)
                    );
                }
            }

            return properties;

            // If we were using a real API:
            // return await api.get('/properties', { params: filters });
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get a single property by ID
    async getPropertyById(id) {
        try {
            // In a real app, this would be an API call
            // For now, return the property from our sample data
            const property = sampleProperties.find(p => p.id === id);

            if (!property) {
                throw new Error('Property not found');
            }

            return property;

            // If we were using a real API:
            // return await api.get(`/properties/${id}`);
        } catch (error) {
            console.error(`Error fetching property ${id}:`, error);
            throw error;
        }
    },

    // Get featured properties
    async getFeaturedProperties(limit = 4) {
        try {
            // For demo purposes, just return the first few properties
            return sampleProperties.slice(0, limit);

            // If we were using a real API:
            // return await api.get('/properties/featured', { params: { limit } });
        } catch (error) {
            console.error('Error fetching featured properties:', error);
            throw error;
        }
    }
};

// Add missing exported functions to match import statements in components
export const fetchProperties = propertyService.getFeaturedProperties;
export const fetchPropertyDetails = propertyService.getPropertyById;
export const fetchPropertyById = propertyService.getPropertyById;
export const searchProperties = propertyService.getProperties;

export default propertyService;