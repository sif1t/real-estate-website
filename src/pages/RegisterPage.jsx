import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const { register, loading } = useAuth();
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear specific validation error when the user starts typing
        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await register(formData.email, formData.password, formData.fullName);
            history.push('/'); // Redirect to homepage after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            setFormError(
                error.code === 'auth/email-already-in-use'
                    ? 'This email is already registered'
                    : 'Failed to register. Please try again later.'
            );
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Layout>
            <SEO title="Register | Real Estate" description="Create an account to save favorite properties and get personalized recommendations" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                        <div className="w-full">
                            <div className="p-8">
                                <div className="flex justify-center">
                                    <img
                                        className="h-16 w-auto mb-4"
                                        src="/logo.png"
                                        alt="Logo"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150x50?text=Real+Estate+Logo' }}
                                    />
                                </div>
                                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                                    Create your account
                                </h2>

                                {formError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                                        <p className="text-sm">{formError}</p>
                                    </div>
                                )}

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                autoComplete="name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full pl-10 pr-3 py-2 border ${validationErrors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        {validationErrors.fullName && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full pl-10 pr-3 py-2 border ${validationErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                        {validationErrors.email && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number (optional)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaPhone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full pl-10 pr-10 py-2 border ${validationErrors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                                >
                                                    {showPassword ? (
                                                        <FaEyeSlash className="h-5 w-5" />
                                                    ) : (
                                                        <FaEye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {validationErrors.password && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`appearance-none block w-full pl-10 pr-10 py-2 border ${validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="••••••••"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button
                                                    type="button"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                                >
                                                    {showConfirmPassword ? (
                                                        <FaEyeSlash className="h-5 w-5" />
                                                    ) : (
                                                        <FaEye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {validationErrors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? 'Creating account...' : 'Create account'}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Link
                                            to="/login"
                                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage;