import React from 'react';

const AgentsHero = () => {
    return (
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white">
            {/* Decorative overlay pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            </div>

            <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expert Real Estate Agents</h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-8">
                        Meet our team of dedicated professionals committed to helping you find your perfect property
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="badge bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            Local Market Expertise
                        </div>
                        <div className="badge bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            Negotiation Specialists
                        </div>
                        <div className="badge bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            Personalized Service
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentsHero;