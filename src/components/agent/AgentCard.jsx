import React from 'react';
import { FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgentCard = ({ agent }) => {
    const { id, name, email, phone, photo, bio, specialization, listings } = agent;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img
                    src={photo || 'https://via.placeholder.com/400x500?text=Agent+Photo'}
                    alt={name}
                    className="w-full h-64 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-sm text-white/80">{specialization}</p>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <p className="text-gray-600 line-clamp-2 h-12">{bio}</p>

                <div className="flex items-center text-sm text-gray-600 mt-2">
                    <FaHome className="mr-2 text-primary" />
                    <span><strong>{listings}</strong> Properties</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                        <FaPhone className="mr-2 text-primary" />
                        <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
                    </div>

                    <div className="flex items-center text-sm">
                        <FaEnvelope className="mr-2 text-primary" />
                        <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                    </div>
                </div>

                <Link
                    to={`/agents/${id}`}
                    className="block w-full mt-4 bg-primary hover:bg-primary-dark text-white text-center py-2 rounded transition-colors duration-300"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default AgentCard;