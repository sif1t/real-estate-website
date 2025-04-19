import React from 'react';
import { FaHome, FaHandshake, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const TeamStats = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Team Achievements</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaHome className="text-primary text-3xl" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-800">250+</h3>
                        <p className="text-gray-600 mt-2">Properties Sold</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaHandshake className="text-primary text-3xl" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-800">98%</h3>
                        <p className="text-gray-600 mt-2">Client Satisfaction</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaTrophy className="text-primary text-3xl" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-800">15+</h3>
                        <p className="text-gray-600 mt-2">Industry Awards</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaCalendarAlt className="text-primary text-3xl" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-800">12</h3>
                        <p className="text-gray-600 mt-2">Years of Experience</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamStats;