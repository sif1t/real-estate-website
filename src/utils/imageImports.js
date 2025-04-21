// filepath: d:\All Test File\New folder\real-estate-website\src\utils\imageImports.js

/**
 * Auto-imports property images based on type and ID
 * This utility automatically imports property images from the assets directory
 */

// Property type to image mapping with high-quality placeholder URLs
const propertyTypePlaceholders = {
    apartment: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    villa: 'https://images.unsplash.com/photo-1613977257363-707004c259fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    house: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    condo: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    brownstone: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    penthouse: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80',
    default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80'
};

// High-quality property images with multiple photos per type (for carousels, galleries, etc.)
const highQualityPropertyImages = {
    apartment: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    villa: [
        'https://images.unsplash.com/photo-1613977257363-707004c259fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    house: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    condo: [
        'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1594484247201-e932ae3f9508?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1559599238-308997c787a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    penthouse: [
        'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    brownstone: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1582249522049-0f967baccf3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1580216367844-8a985c3a9769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    commercial: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ],
    default: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80'
    ]
};

// Import all property images dynamically
const importAll = (r) => {
    let images = {};
    try {
        r.keys().forEach((item) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    } catch (error) {
        console.error("Error importing images:", error);
        return {};
    }
};

// Import property images
let propertyImages = {};

// Using dynamic imports with webpack's require.context
// This will be populated once we have images in the assets folder
try {
    // Try to import all images from the properties directory
    propertyImages = importAll(require.context('../assets/images/properties', false, /\.(png|jpe?g|svg)$/));
} catch (error) {
    // If no images are found, we'll use placeholder images
    console.warn("No local property images found, using placeholders");
}

/**
 * Get the image URL for a property, falling back to placeholders if needed
 * @param {Object} property - The property object
 * @param {number} index - Optional index for multiple images of the same property
 * @returns {string} - URL to the property image
 */
export const getPropertyImage = (property, index = 0) => {
    if (!property) return getPlaceholderImage('property');

    try {
        const { id, type = 'property' } = property;
        const typeKey = type.toLowerCase();

        // First check if property has images array
        if (property.images && property.images.length > index) {
            return property.images[index];
        }

        // Check if we have an image for this property type and ID
        const imageKey = `${typeKey}-${id}${index > 0 ? `-${index}` : ''}.jpg`;
        const backupImageKey = `${typeKey}-${id}.jpg`;
        const genericTypeImageKey = `${typeKey}.jpg`;

        // Try to find the best match for the image
        if (propertyImages[imageKey]) {
            return propertyImages[imageKey];
        } else if (propertyImages[backupImageKey]) {
            return propertyImages[backupImageKey];
        } else if (propertyImages[genericTypeImageKey]) {
            return propertyImages[genericTypeImageKey];
        }

        // Fallback to placeholder images by type
        return getPlaceholderImage(typeKey);
    } catch (error) {
        console.error('Error in getPropertyImage:', error);
        return propertyTypePlaceholders.default;
    }
};

/**
 * Get a placeholder image for a property type
 * @param {string} type - Property type (apartment, house, villa, etc.)
 * @returns {string} - URL to a placeholder image
 */
export const getPlaceholderImage = (type = 'property') => {
    // First check if we have a generic type image
    const genericTypeImageKey = `${type}.jpg`;
    const normalizedType = type.toLowerCase();

    if (propertyImages[genericTypeImageKey]) {
        return propertyImages[genericTypeImageKey];
    }

    // Check if we have a predefined placeholder for this type
    if (propertyTypePlaceholders[normalizedType]) {
        return propertyTypePlaceholders[normalizedType];
    }

    // Default to the general property placeholder
    return propertyTypePlaceholders.default;
};

/**
 * Get all images for a property
 * @param {Object} property - The property object
 * @returns {Array<string>} - Array of image URLs
 */
export const getPropertyGalleryImages = (property) => {
    if (!property) return [];

    // If the property already has valid image URLs, use those
    if (property.images && property.images.length > 0 &&
        (property.images[0].startsWith('http') || property.images[0].startsWith('/'))) {
        return property.images;
    }

    // Try to find images for this property
    const { id, type = 'property' } = property;
    const typeKey = type.toLowerCase();
    const images = [];

    // Look for up to 5 images for this property
    for (let i = 0; i < 5; i++) {
        const imageKey = `${typeKey}-${id}-${i}.jpg`;
        if (propertyImages[imageKey]) {
            images.push(propertyImages[imageKey]);
        } else if (i === 0) {
            // Add the main image if we don't have any specific images
            images.push(getPropertyImage(property));
            break; // Don't add more placeholder images
        }
    }

    // If no images were found, use a placeholder
    if (images.length === 0) {
        images.push(getPlaceholderImage(typeKey));
    }

    return images;
};

/**
 * Get high-quality property images based on property type
 * @param {string} type - Property type (apartment, house, villa, etc.)
 * @returns {Array<string>} - Array of high-quality image URLs
 */
export const getHighQualityPropertyImages = (type = 'default') => {
    const normalizedType = typeof type === 'string' ? type.toLowerCase() : 'default';
    return highQualityPropertyImages[normalizedType] || highQualityPropertyImages.default;
};

// Export the placeholder images for direct access if needed
export { propertyTypePlaceholders, highQualityPropertyImages };
