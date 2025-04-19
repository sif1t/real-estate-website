import React from 'react';
import { FaSearch } from 'react-icons/fa';

const AgentSearchFilter = ({ searchTerm, specializations, onSearchChange, onSpecializationChange, selectedSpecialization }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Find Your Agent</h3>

            {/* Search input */}
            <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name, expertise, or specialty..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1 ml-1">Search across agent profiles and specializations</p>
            </div>

            {/* Specialization filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                    value={selectedSpecialization}
                    onChange={(e) => onSpecializationChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
                >
                    <option value="">All Specializations</option>
                    {specializations.map((spec, index) => (
                        <option key={index} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default AgentSearchFilter;