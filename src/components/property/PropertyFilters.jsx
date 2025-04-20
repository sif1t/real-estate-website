import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const PropertyFilters = ({ filters, onChange, onReset, setFilters, className = '' }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Update local filters when parent filters change
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle both callback and direct state setter pattern
        if (onChange) {
            onChange(localFilters);
        } else if (setFilters) {
            setFilters(localFilters);
        }
    };

    const handleReset = () => {
        const emptyFilters = {
            propertyType: 'Any',
            minPrice: '',
            maxPrice: '',
            bedrooms: 'Any',
            bathrooms: 'Any',
            location: '',
            priceRange: [0, 2000000],
            status: 'Any',
            searchQuery: ''
        };
        setLocalFilters(emptyFilters);

        // Handle both callback and direct state setter pattern
        if (onReset) {
            onReset();
        } else if (setFilters) {
            setFilters(emptyFilters);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
            <h3 className="text-xl font-semibold mb-4">Filter Properties</h3>

            <form onSubmit={handleSubmit}>
                {/* Search query field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="searchQuery"
                            value={localFilters.searchQuery || ''}
                            onChange={handleChange}
                            placeholder="Keywords, property name, features..."
                            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Property Type</label>
                        <select
                            name="propertyType"
                            value={localFilters.propertyType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Any">All Types</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="villa">Villa</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="land">Land</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                        <select
                            name="status"
                            value={localFilters.status}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Any">Any Status</option>
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                            <option value="Sold">Sold</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={localFilters.location || ''}
                            onChange={handleChange}
                            placeholder="City, state, or zip code"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Min Price ($)</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={localFilters.minPrice || ''}
                            onChange={handleChange}
                            placeholder="Min"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Max Price ($)</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={localFilters.maxPrice || ''}
                            onChange={handleChange}
                            placeholder="Max"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Bedrooms</label>
                        <select
                            name="bedrooms"
                            value={localFilters.bedrooms}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Any">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Bathrooms</label>
                        <select
                            name="bathrooms"
                            value={localFilters.bathrooms}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Any">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Apply Filters
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyFilters;