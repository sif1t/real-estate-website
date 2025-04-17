// filepath: d:\All Test File\New folder\real-estate-website\src\utils\imageImports.js

/**
 * Auto-imports property images based on type and ID
 * This utility automatically imports property images from the assets directory
 */

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

    const { id, type = 'property' } = property;
    const typeKey = type.toLowerCase();

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
    } else if (property.images && property.images.length > index) {
        // Use the image URL from the property data if available
        return property.images[index];
    }

    // Fallback to a placeholder
    return getPlaceholderImage(typeKey, id);
};

/**
 * Get a placeholder image for a property type
 * @param {string} type - Property type (apartment, house, villa, etc.)
 * @param {number|string} id - Optional ID to make the placeholder unique
 * @returns {string} - URL to a placeholder image
 */
export const getPlaceholderImage = (type = 'property', id = '') => {
    // First check if we have a generic type image
    const genericTypeImageKey = `${type}.jpg`;

    if (propertyImages[genericTypeImageKey]) {
        return propertyImages[genericTypeImageKey];
    }

    // Otherwise, generate a placeholder URL
    const idSuffix = id ? `+${id}` : '';
    return `https://placehold.co/800x600?text=${type}${idSuffix}`;
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
        images.push(getPlaceholderImage(typeKey, id));
    }

    return images;
};
