import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ location, propertyType, priceRange });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
            </select>
            <input
                type="text"
                placeholder="Price Range"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchForm;