import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFoundPage = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <SEO
                title="Page Not Found | Real Estate Website"
                description="The page you are looking for could not be found."
            />

            <div className="max-w-md mx-auto">
                <h1 className="text-6xl font-bold text-gray-800 mb-8">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    The property or page you are looking for might have been removed,
                    is temporarily unavailable, or doesnt exist.
                </p>
        
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/properties"
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Browse Properties
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;