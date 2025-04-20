import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown, FaSearch } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
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

    // Focus search input when search is shown
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignOut = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            setDropdownOpen(false);

            // Navigate to home page after logout
            history.push('/');
        } catch (error) {
            console.error('Failed to sign out:', error);
            alert('Failed to sign out. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            history.push(`/properties?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
            setShowSearch(false);
        }
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
                        {/* Search icon/form */}
                        <div className="relative">
                            <button
                                onClick={toggleSearch}
                                className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none"
                                aria-label="Search"
                            >
                                <FaSearch className="h-5 w-5" />
                            </button>

                            {showSearch && (
                                <div className="absolute right-0 top-10 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-20">
                                    <form onSubmit={handleSearch} className="flex">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search properties..."
                                            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark transition-colors"
                                        >
                                            <FaSearch />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

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
                                        <div
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                history.push('/profile');
                                            }}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                                            role="menuitem"
                                        >
                                            <FaUser className="mr-3 h-4 w-4" />
                                            My Profile
                                        </div>
                                        <div
                                            onClick={handleSignOut}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                                            role="menuitem"
                                        >
                                            <FaSignOutAlt className="mr-3 h-4 w-4" />
                                            {isLoggingOut ? 'Signing out...' : 'Sign out'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
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