import axios from 'axios';

// Unsplash API for high-quality real estate images
const UNSPLASH_API_KEY = 'your-unsplash-api-key'; // Replace with your actual API key
const UNSPLASH_API = 'https://api.unsplash.com';

// Backup services in case the primary one fails
const PEXELS_API_KEY = 'your-pexels-api-key'; // Replace with your actual API key
const PEXELS_API = 'https://api.pexels.com/v1';

// Fallback to free placeholder service that doesn't require API keys
const PLACEHOLDER_SERVICE = 'https://placehold.co';

/**
 * Get property images from Unsplash API based on property type and features
 * @param {Object} property - The property object with details
 * @returns {Promise<Array>} - Array of image URLs
 */
export const fetchPropertyImages = async (property) => {
    // If property already has images, just return those
    if (property.images && property.images.length > 0 && property.images[0].startsWith('http')) {
        return property.images;
    }

    try {
        // Create a search query based on property attributes
        const searchQuery = createSearchQuery(property);

        // Try Unsplash first
        const response = await axios.get(`${UNSPLASH_API}/search/photos`, {
            headers: {
                Authorization: `Client-ID ${UNSPLASH_API_KEY}`
            },
            params: {
                query: searchQuery,
                per_page: 3,
                orientation: 'landscape'
            }
        });

        if (response.data && response.data.results && response.data.results.length > 0) {
            return response.data.results.map(image => image.urls.regular);
        }

        // Fallback to using property mock images
        return getDefaultImages(property);
    } catch (error) {
        console.error('Error fetching property images:', error);
        return getDefaultImages(property);
    }
};

/**
 * Alternative method using Pexels API
 * @param {Object} property - The property object
 * @returns {Promise<Array>} - Array of image URLs
 */
export const fetchPexelsImages = async (property) => {
    try {
        const searchQuery = createSearchQuery(property);

        const response = await axios.get(`${PEXELS_API}/search`, {
            headers: {
                Authorization: PEXELS_API_KEY
            },
            params: {
                query: searchQuery,
                per_page: 3
            }
        });

        if (response.data && response.data.photos && response.data.photos.length > 0) {
            return response.data.photos.map(photo => photo.src.large);
        }

        return getDefaultImages(property);
    } catch (error) {
        console.error('Error fetching Pexels images:', error);
        return getDefaultImages(property);
    }
};

/**
 * Get a single property image for card display
 * @param {Object} property - The property object
 * @returns {Promise<string>} - URL of the image
 */
export const getPropertyCardImage = async (property) => {
    try {
        // If the property already has images, use the first one
        if (property.images && property.images.length > 0) {
            // Check if it's a full URL or a relative path
            if (property.images[0].startsWith('http')) {
                return property.images[0];
            } else {
                // Handle relative paths
                return property.images[0].startsWith('/')
                    ? property.images[0]
                    : `/${property.images[0]}`;
            }
        }

        // Otherwise fetch a new image based on property type
        const images = await fetchPropertyImages(property);
        return images[0];
    } catch (error) {
        console.error('Error getting property card image:', error);
        return getDefaultPropertyImage(property);
    }
};

/**
 * Helper function to create a relevant search query based on property details
 */
const createSearchQuery = (property) => {
    const { type = '', location = '', bedrooms = 0 } = property;
    // Removed unused 'status' variable from destructuring

    let query = `${type} real estate`;

    // Add more specificity based on property attributes
    if (type.toLowerCase().includes('luxury') || property.price > 1000000) {
        query = `luxury ${query}`;
    }

    // Add location if it's a major city
    const majorCities = ['new york', 'los angeles', 'chicago', 'miami', 'san francisco'];
    if (majorCities.some(city => location.toLowerCase().includes(city))) {
        query += ` ${location.split(',')[0]}`;
    }

    // Add interior/exterior based on if we want inside or outside shot
    if (bedrooms >= 3) {
        query += ' house';
    }

    // Trim and limit length
    return query.trim().substring(0, 50);
};

/**
 * Fallback function to get default image URLs when API calls fail
 */
const getDefaultImages = (property) => {
    const { type = 'property', id = '1' } = property;
    const defaultType = type.toLowerCase() || 'property';

    // Return multiple placeholder images with property-specific text
    return [
        `${PLACEHOLDER_SERVICE}/800x600?text=${defaultType}+${id}+Image+1`,
        `${PLACEHOLDER_SERVICE}/800x600?text=${defaultType}+${id}+Image+2`,
        `${PLACEHOLDER_SERVICE}/800x600?text=${defaultType}+${id}+Image+3`
    ];
};

/**
 * Get a single default property image for cards
 */
const getDefaultPropertyImage = (property) => {
    const { type = 'property', id = '1' } = property;
    const defaultType = type.toLowerCase() || 'property';

    return `${PLACEHOLDER_SERVICE}/800x600?text=${defaultType}+${id}`;
};