import { fetchProperties as fetchPropertiesApi, fetchPropertyById as fetchPropertyByIdApi } from './api';

export const fetchProperties = async () => {
    try {
        const data = await fetchPropertiesApi();
        return data;
    } catch (error) {
        console.error('Error in propertyService.fetchProperties:', error);
        throw new Error('Failed to fetch properties. Please try again later.');
    }
};

export const fetchPropertyById = async (id) => {
    try {
        const data = await fetchPropertyByIdApi(id);
        return data;
    } catch (error) {
        console.error(`Error in propertyService.fetchPropertyById(${id}):`, error);
        throw new Error(`Failed to fetch property details for ID ${id}. Please try again later.`);
    }
};

export const fetchPropertyDetails = async (id) => {
    try {
        return await fetchPropertyById(id);
    } catch (error) {
        console.error(`Error in propertyService.fetchPropertyDetails(${id}):`, error);
        throw new Error(`Failed to fetch detailed property information for ID ${id}. Please try again later.`);
    }
};

export const searchProperties = async (query) => {
    try {
        const data = await fetchPropertiesApi();
        // Filter properties based on query
        return data.filter(property =>
            property.title.toLowerCase().includes(query.toLowerCase()) ||
            property.description.toLowerCase().includes(query.toLowerCase()) ||
            property.location.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error(`Error in propertyService.searchProperties(${query}):`, error);
        throw new Error('Failed to search properties. Please try again later.');
    }
};