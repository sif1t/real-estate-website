import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown, FaSearch, FaHome, FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import { BiBuildings, BiInfoCircle } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [propertiesDropdown, setPropertiesDropdown] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const propertiesDropdownRef = useRef(null);
    const searchInputRef = useRef(null);
    const history = useHistory();
    const location = useLocation();

    // Track scrolling to change navbar style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Handle click outside to close dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (propertiesDropdownRef.current && !propertiesDropdownRef.current.contains(event.target)) {
                setPropertiesDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Focus search input when search is shown
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const togglePropertiesDropdown = (e) => {
        e.preventDefault();
        setPropertiesDropdown(!propertiesDropdown);
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

    const isActive = (path) => {
        return location.pathname === path ? 'text-primary font-medium' : 'text-gray-600';
    };

    return (
        <>
            {/* Top Bar with Contact Info */}
            <div className="hidden lg:block bg-gray-100 text-gray-600 py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <FaPhoneAlt className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-sm">(123) 456-7890</span>
                            </div>
                            <div className="flex items-center">
                                <MdEmail className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-sm">info@yourealestate.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!user && (
                                <>
                                    <Link to="/login" className="text-sm hover:text-primary transition-colors">Sign in</Link>
                                    <span className="text-gray-300">|</span>
                                    <Link to="/register" className="text-sm hover:text-primary transition-colors">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <header className={`${scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'} sticky top-0 z-50 transition-all duration-300 ease-in-out`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <div className="text-primary font-extrabold text-2xl mr-2">LUXE</div>
                                <div className="text-gray-800 font-light text-lg">ESTATES</div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            <Link to="/" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/')}`}>
                                <FaHome className="mr-1 h-4 w-4" />
                                <span>Home</span>
                            </Link>

                            <div className="relative" ref={propertiesDropdownRef}>
                                <button
                                    onClick={togglePropertiesDropdown}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/properties')}`}
                                >
                                    <BiBuildings className="mr-1 h-4 w-4" />
                                    <span>Properties</span>
                                    <FaChevronDown className={`ml-1 h-3 w-3 transition-transform ${propertiesDropdown ? 'transform rotate-180' : ''}`} />
                                </button>

                                {propertiesDropdown && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-20 py-1 border border-gray-100 overflow-hidden">
                                        <Link
                                            to="/properties?type=residential"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            Residential
                                        </Link>
                                        <Link
                                            to="/properties?type=commercial"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            Commercial
                                        </Link>
                                        <Link
                                            to="/properties?type=luxury"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            Luxury
                                        </Link>
                                        <Link
                                            to="/properties"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            All Properties
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/agents" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/agents')}`}>
                                <BsPeople className="mr-1 h-4 w-4" />
                                <span>Agents</span>
                            </Link>

                            <Link to="/blog" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/blog')}`}>
                                <IoDocumentTextOutline className="mr-1 h-4 w-4" />
                                <span>Blog</span>
                            </Link>

                            <Link to="/about" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/about')}`}>
                                <BiInfoCircle className="mr-1 h-4 w-4" />
                                <span>About</span>
                            </Link>

                            <Link to="/contact" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-primary transition-colors ${isActive('/contact')}`}>
                                <MdEmail className="mr-1 h-4 w-4" />
                                <span>Contact</span>
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            {/* Search icon/form */}
                            <div className="relative">
                                <button
                                    onClick={toggleSearch}
                                    className="p-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors"
                                    aria-label="Search"
                                >
                                    <FaSearch className="h-5 w-5" />
                                </button>

                                {showSearch && (
                                    <div className="absolute right-0 top-12 mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-20">
                                        <form onSubmit={handleSearch} className="flex">
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="Search properties..."
                                                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <button
                                                type="submit"
                                                className="bg-primary text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors"
                                            >
                                                <FaSearch />
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* CTA Button - visible on desktop only */}
                            <Link
                                to="/contact"
                                className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 shadow transition-colors"
                            >
                                Get a Free Consultation
                            </Link>

                            {/* User Account Menu */}
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex items-center space-x-1 bg-gray-100 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:bg-gray-200"
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
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-100"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <div
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    history.push('/profile');
                                                }}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full text-left cursor-pointer transition-colors"
                                                role="menuitem"
                                            >
                                                <FaUser className="mr-3 h-4 w-4" />
                                                My Profile
                                            </div>
                                            <div
                                                onClick={handleSignOut}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary w-full text-left cursor-pointer transition-colors"
                                                role="menuitem"
                                            >
                                                <FaSignOutAlt className="mr-3 h-4 w-4" />
                                                {isLoggingOut ? 'Signing out...' : 'Sign out'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex space-x-2">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <FaTimes className="h-6 w-6" />
                                ) : (
                                    <FaBars className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <FaHome className="mr-3 h-5 w-5" />
                            Home
                        </Link>

                        <Link
                            to="/properties"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <BiBuildings className="mr-3 h-5 w-5" />
                            Properties
                        </Link>

                        <Link
                            to="/agents"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <BsPeople className="mr-3 h-5 w-5" />
                            Agents
                        </Link>

                        <Link
                            to="/blog"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <IoDocumentTextOutline className="mr-3 h-5 w-5" />
                            Blog
                        </Link>

                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <BiInfoCircle className="mr-3 h-5 w-5" />
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center"
                        >
                            <MdEmail className="mr-3 h-5 w-5" />
                            Contact
                        </Link>

                        {!user && (
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-3">
                                    <div className="flex-shrink-0">
                                        <FaUser className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">Account</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link
                                        to="/login"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Mobile Call to Action */}
                        <Link
                            to="/contact"
                            className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 shadow transition-colors mt-4"
                        >
                            Get a Free Consultation
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;