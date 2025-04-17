import React from 'react';
import Layout from '../components/common/Layout';
import SEO from '../components/common/SEO';

const AboutPage = () => {
    return (
        <Layout>
            <SEO title="About Us" description="Learn more about our real estate agency, our team, values and mission." />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                        We&apos;re a team of dedicated professionals committed to excellence in real estate services,
                        helping our clients make informed decisions since 2005.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Welcome to our premier real estate agency! Founded in 2005, we&apos;ve built our reputation on a foundation of trust,
                            expertise, and exceptional client service. What began as a small local agency has grown into a respected name in the real estate market.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            With decades of combined experience in the industry, our team understands the nuances of buying and selling properties
                            in today&apos;s dynamic market. Our mission is to transform the often complex real estate process into a seamless and rewarding journey.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We bring together market insight, negotiation expertise, and personalized service to ensure our clients achieve their real estate goals,
                            whether finding a dream home or maximizing investment returns.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="bg-gray-200 h-80 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                                alt="Modern office building"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-100 rounded-xl p-10 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-blue-700 mb-2">1500+</div>
                            <div className="text-gray-600">Properties Sold</div>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-blue-700 mb-2">98%</div>
                            <div className="text-gray-600">Client Satisfaction</div>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-blue-700 mb-2">20</div>
                            <div className="text-gray-600">Years Experience</div>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-blue-700 mb-2">42</div>
                            <div className="text-gray-600">Expert Agents</div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Integrity</h3>
                            <p className="text-gray-600">We operate with honesty and transparency in all our dealings, prioritizing ethical practices above all else.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Excellence</h3>
                            <p className="text-gray-600">We strive for excellence in every aspect of our service, continuously improving to exceed expectations.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Client Focus</h3>
                            <p className="text-gray-600">Our clients&apos; needs are at the center of everything we do, guiding our approach to personalized service.</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Meet Our Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt="CEO"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1 text-gray-800">Jonathan Wilson</h3>
                                <p className="text-blue-700 mb-3">Chief Executive Officer</p>
                                <p className="text-gray-600">With over 20 years of experience in real estate, Jonathan leads our company with vision and integrity.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                                    alt="COO"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1 text-gray-800">Sarah Martinez</h3>
                                <p className="text-blue-700 mb-3">Chief Operations Officer</p>
                                <p className="text-gray-600">Sarah ensures our day-to-day operations run smoothly while maintaining our high standards of service.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                    alt="Sales Director"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1 text-gray-800">Michael Chang</h3>
                                <p className="text-blue-700 mb-3">Director of Sales</p>
                                <p className="text-gray-600">Michael&apos;s market expertise and leadership drive our sales team to consistently exceed client expectations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-700 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        Our team of expert agents is ready to help you navigate the real estate market
                        and find the perfect property for your needs.
                    </p>
                    <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors">
                        Contact Us Today
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;