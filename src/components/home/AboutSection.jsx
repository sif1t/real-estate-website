import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
    // Using a reliable image URL
    const aboutImageUrl = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop";

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <img
                            src={aboutImageUrl}
                            alt="About Our Real Estate Agency"
                            className="rounded-lg shadow-xl w-full h-auto"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = 'https://placehold.co/600x400?text=About+Us';
                            }}
                        />
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">About Our Real Estate Agency</h2>

                        <p className="text-gray-600 mb-4">
                            With over 20 years of experience in the real estate market, we have built a reputation for excellence and trusted service. Our team of dedicated professionals is committed to helping you find the perfect property.
                        </p>

                        <p className="text-gray-600 mb-6">
                            Whether you&apos;re looking to buy, sell, or rent, our agents provide personalized guidance throughout the entire process, ensuring a smooth and successful transaction.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="font-medium">Trusted Agents</span>
                            </div>

                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="font-medium">Premium Properties</span>
                            </div>

                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="font-medium">Easy Process</span>
                            </div>

                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="font-medium">24/7 Support</span>
                            </div>
                        </div>

                        <Link to="/about" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-colors">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;