import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    // Use a guaranteed working background image from a remote source
    const heroBackgroundUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop";

    return (
        <section className="relative bg-cover bg-center h-[80vh]"
            style={{ backgroundImage: `url('${heroBackgroundUrl}')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
                    <p className="text-xl mb-8">Discover the perfect property that fits your lifestyle and budget</p>

                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800">
                                <option value="all">All Categories</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial</option>
                            </select>

                            <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800">
                                <option value="all">All Locations</option>
                                <option value="new-york">New York</option>
                                <option value="los-angeles">Los Angeles</option>
                                <option value="chicago">Chicago</option>
                                <option value="miami">Miami</option>
                            </select>

                            <select className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-800">
                                <option value="all">Price Range</option>
                                <option value="0-100000">$0 - $100,000</option>
                                <option value="100000-300000">$100,000 - $300,000</option>
                                <option value="300000-500000">$300,000 - $500,000</option>
                                <option value="500000+">$500,000+</option>
                            </select>
                        </div>

                        <Link to="/properties" className="w-full block text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition-colors">
                            Search Properties
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;