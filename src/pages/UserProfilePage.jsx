import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { updateProfile, updateEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';
import useAuth from '../hooks/useAuth';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';
import { validateEmail, validatePhoneNumber } from '../utils/validators';

const UserProfilePage = () => {
    const { user, loading } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
    });
    const [formError, setFormError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError('');
    };

    const handleEdit = () => {
        setFormData({
            displayName: user?.displayName || '',
            email: user?.email || '',
            phone: user?.phoneNumber || '',
        });
        setIsEditing(true);
        setUpdateSuccess(false);
        setFormError('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormError('');
    };

    const validateForm = () => {
        if (!formData.displayName.trim()) {
            setFormError('Name is required');
            return false;
        }

        if (!formData.email || !validateEmail(formData.email)) {
            setFormError('Valid email is required');
            return false;
        }

        if (formData.phone && !validatePhoneNumber(formData.phone)) {
            setFormError('Please enter a valid phone number');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setUpdateLoading(true);
        setFormError('');

        try {
            const updates = [];

            // Update display name if changed
            if (formData.displayName !== user.displayName) {
                updates.push(updateProfile(auth.currentUser, {
                    displayName: formData.displayName
                }));
            }

            // Update email if changed
            if (formData.email !== user.email) {
                updates.push(updateEmail(auth.currentUser, formData.email));
            }

            // Store additional profile data in Firestore
            updates.push(setDoc(doc(db, 'users', user.uid), {
                displayName: formData.displayName,
                email: formData.email,
                phone: formData.phone,
                updatedAt: new Date(),
            }, { merge: true }));

            await Promise.all(updates);

            setUpdateSuccess(true);
            setIsEditing(false);
        } catch (error) {
            console.error('Profile update error:', error);
            setFormError(
                error.code === 'auth/email-already-in-use'
                    ? 'This email is already in use by another account'
                    : error.code === 'auth/requires-recent-login'
                        ? 'For security reasons, please sign out and sign in again to change your email'
                        : 'Failed to update profile. Please try again.'
            );
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-8">Please log in to view your profile</p>
                    <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Go to Login
                    </a>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO title="My Profile | Real Estate" description="Manage your account details and preferences" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="w-full">
                            <div className="p-8">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
                                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                                    {!isEditing && (
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <FaEdit className="mr-2" /> Edit Profile
                                        </button>
                                    )}
                                </div>

                                {updateSuccess && !isEditing && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6" role="alert">
                                        <p className="font-medium flex items-center">
                                            <FaCheck className="mr-2" /> Profile updated successfully
                                        </p>
                                    </div>
                                )}

                                {formError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
                                        <p className="text-sm">{formError}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaUser className="h-5 w-5 text-gray-400" />
                                                </div>
                                                {isEditing ? (
                                                    <input
                                                        name="displayName"
                                                        type="text"
                                                        value={formData.displayName}
                                                        onChange={handleChange}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                                        {user.displayName || 'Not set'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                                </div>
                                                {isEditing ? (
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                                        {user.email}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaPhone className="h-5 w-5 text-gray-400" />
                                                </div>
                                                {isEditing ? (
                                                    <input
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <div className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                                        {user.phoneNumber || 'Not set'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={updateLoading}
                                                    className={`flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${updateLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                                >
                                                    {updateLoading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancel}
                                                    disabled={updateLoading}
                                                    className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                >
                                                    <FaTimes className="mr-2" /> Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
                                    <div className="space-y-4">
                                        <a
                                            href="/change-password"
                                            className="block w-full sm:w-auto text-center sm:inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        >
                                            Change Password
                                        </a>
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

export default UserProfilePage;