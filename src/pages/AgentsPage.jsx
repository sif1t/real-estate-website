import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import AgentCard from '../components/agent/AgentCard';
import AgentSearchFilter from '../components/agent/AgentSearchFilter';
import AgentsHero from '../components/agent/AgentsHero';
import TeamStats from '../components/agent/TeamStats';
import { fetchAgents } from '../services/api';
import SEO from '../components/common/SEO';

const AgentsPage = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');

    useEffect(() => {
        const getAgents = async () => {
            try {
                const data = await fetchAgents();
                setAgents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAgents();
    }, []);

    // Extract unique specializations for filter dropdown
    const specializations = agents
        ? [...new Set(agents.map(agent => agent.specialization))]
        : [];

    // Filter agents based on search term and selected specialization
    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization = selectedSpecialization === '' ||
            agent.specialization === selectedSpecialization;

        return matchesSearch && matchesSpecialization;
    });

    if (loading) return <Layout><Loading /></Layout>;
    if (error) return <Layout><div className="container mx-auto px-4 py-16 text-center">Error: {error}</div></Layout>;

    return (
        <Layout>
            <SEO
                title="Our Real Estate Agents | Find Your Perfect Agent"
                description="Meet our team of experienced real estate professionals dedicated to helping you find your dream property."
            />

            <AgentsHero />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar with filters */}
                    <div className="lg:col-span-1">
                        <AgentSearchFilter
                            searchTerm={searchTerm}
                            specializations={specializations}
                            onSearchChange={setSearchTerm}
                            selectedSpecialization={selectedSpecialization}
                            onSpecializationChange={setSelectedSpecialization}
                        />

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mt-6">
                            <h4 className="font-semibold text-blue-800 mb-2">Looking to join our team?</h4>
                            <p className="text-blue-700 text-sm mb-3">
                                Were always looking for talented real estate professionals to join our growing team.
                            </p>
                            <a
                                href="/careers"
                                className="inline-block text-sm text-blue-700 font-medium hover:text-blue-900"
                            >
                                View open positions →
                            </a>
                        </div>
                    </div>

                    {/* Main content with agent cards */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Our Agents</h2>
                            <p className="text-gray-600">
                                Showing {filteredAgents.length} of {agents.length} agents
                            </p>
                        </div>

                        {filteredAgents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredAgents.map(agent => (
                                    <AgentCard key={agent.id} agent={agent} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">No agents match your search criteria.</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedSpecialization('');
                                    }}
                                    className="mt-4 text-primary hover:text-primary-dark"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TeamStats />

            {/* Call to action section */}
            <div className="bg-primary text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Our agents are ready to help you navigate the real estate market and find your perfect property.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors duration-300"
                        >
                            Contact an Agent
                        </a>
                        <a
                            href="/properties"
                            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md transition-colors duration-300"
                        >
                            Browse Properties
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AgentsPage;