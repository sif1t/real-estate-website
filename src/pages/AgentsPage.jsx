import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import PropertyCard from '../components/property/PropertyCard';
import { fetchAgents } from '../services/api';

const AgentsPage = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Our Agents</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map(agent => (
                    <PropertyCard key={agent.id} agent={agent} />
                ))}
            </div>
        </Layout>
    );
};

export default AgentsPage;