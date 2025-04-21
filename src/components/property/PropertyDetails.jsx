import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const PropertyDetails = ({ property }) => {
    // Handle case when property is not provided
    if (!property) {
        return <div className="text-center py-8">Property information not available</div>;
    }

    // Destructure property data with defaults
    const {
        price = 0,
        bedrooms = 0,
        bathrooms = 0,
        area = 0,
        type = 'Unknown type',
        status = 'Unknown status',
        description = 'No description available',
        features = []
    } = property;

    // Format price based on rental or sale property
    const formattedPrice = status === 'For Rent'
        ? `${formatCurrency(price)}/month`
        : formatCurrency(price);

    return (
        <div>
            <div className="text-2xl font-bold text-primary mb-6">
                {formattedPrice}
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 mb-1">Type</div>
                    <div className="font-semibold">{type}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 mb-1">Bedrooms</div>
                    <div className="font-semibold">{bedrooms}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 mb-1">Bathrooms</div>
                    <div className="font-semibold">{bathrooms}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-gray-500 mb-1">Area</div>
                    <div className="font-semibold">{area} sq ft</div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Features</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Contact Info or Inquiry Form could go here */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-medium text-primary">Interested in this property?</div>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
                        Contact Agent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;