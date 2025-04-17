import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Real Estate Agency. All rights reserved.</p>
                <div className="mt-4">
                    <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
                    <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
                    <a href="/faq" className="text-gray-400 hover:text-white mx-2">FAQ</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;