import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const history = useHistory();

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        // Add event listener when dropdown is open
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setDropdownOpen(false);
            history.push('/'); // Explicitly navigate to home page after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleProfileClick = () => {
        setDropdownOpen(false);
        history.push('/profile'); // Navigate to profile dashboard
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
                            Real Estate
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                        <Link to="/properties" className="text-gray-600 hover:text-gray-900 transition-colors">Properties</Link>
                        <Link to="/agents" className="text-gray-600 hover:text-gray-900 transition-colors">Agents</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
                        <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-1 bg-gray-100 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <span className="text-gray-800 font-medium truncate max-w-[100px]">
                                        {user.displayName || 'Account'}
                                    </span>
                                    <FaChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={handleProfileClick}
                                            role="menuitem"
                                        >
                                            <FaUser className="mr-3 h-4 w-4" />
                                            My Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                        >
                                            <FaSignOutAlt className="mr-3 h-4 w-4" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;