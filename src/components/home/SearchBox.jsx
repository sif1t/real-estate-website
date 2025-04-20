import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
    const history = useHistory();
    const [category, setCategory] = useState('all');
    const [location, setLocation] = useState('all');
    const [priceRange, setPriceRange] = useState('all');

    const handleSearch = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();

        if (category !== 'all') queryParams.set('category', category);
        if (location !== 'all') queryParams.set('location', location);
        if (priceRange !== 'all') queryParams.set('priceRange', priceRange);

        history.push(`/properties?${queryParams.toString()}`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <select
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="commercial">Commercial</option>
                    </select>

                    <select
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="all">All Locations</option>
                        <option value="new-york">New York, NY</option>
                        <option value="los-angeles">Los Angeles, CA</option>
                        <option value="chicago">Chicago, IL</option>
                        <option value="miami">Miami, FL</option>
                        <option value="san-francisco">San Francisco, CA</option>
                        <option value="seattle">Seattle, WA</option>
                        <option value="austin">Austin, TX</option>
                        <option value="brooklyn">Brooklyn, NY</option>
                    </select>

                    <select
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    >
                        <option value="all">Price Range</option>
                        <option value="0-100000">$0 - $100,000</option>
                        <option value="100000-300000">$100,000 - $300,000</option>
                        <option value="300000-500000">$300,000 - $500,000</option>
                        <option value="500000-1000000">$500,000 - $1,000,000</option>
                        <option value="1000000+">$1,000,000+</option>
                        <option value="0-2000-rent">$0 - $2,000 /month</option>
                        <option value="2000-4000-rent">$2,000 - $4,000 /month</option>
                        <option value="4000+-rent">$4,000+ /month</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                >
                    Search Properties
                </button>
            </form>
        </div>
    );
};

export default SearchBox;