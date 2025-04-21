import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
    return (
        <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="mb-8 lg:mb-0 lg:mr-8 lg:w-2/3">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Find Your Dream Home?
                        </h2>
                        <p className="text-lg opacity-90">
                            Contact our team of experts today and let us help you navigate the real estate market.
                            Whether you&apos;re buying, selling, or renting, we&apos;re here to make the process smooth and successful.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <Link to="/properties" className="bg-white text-primary hover:bg-gray-100 py-3 px-6 rounded-md font-semibold text-center block">
                                Browse Properties
                            </Link>
                        </div>

                        <div>
                            <Link to="/contact" className="bg-transparent hover:bg-white/20 border-2 border-white py-3 px-6 rounded-md font-semibold text-center block">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;