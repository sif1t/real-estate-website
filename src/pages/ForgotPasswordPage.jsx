import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [formError, setFormError] = useState('');
  const { resetPassword, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !validateEmail(email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setFormError(
        error.code === 'auth/user-not-found'
          ? 'No account found with this email address'
          : 'An error occurred. Please try again later.'
      );
    }
  };

  return (
    <Layout>
      <SEO title="Reset Password | Real Estate" description="Reset your password to regain access to your account" />
      
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
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/150x50?text=Real+Estate+Logo'}}
                  />
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                  Reset Your Password
                </h2>
                
                {emailSent ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                    <p className="font-medium">Reset email sent!</p>
                    <p className="text-sm mt-1">
                      Check your email inbox for instructions to reset your password. If you don't see it, check your spam folder.
                    </p>
                    <div className="mt-4 text-center">
                      <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Return to login
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                      Enter the email address associated with your account, and we'll email you a link to reset your password.
                    </p>
                    
                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                        <p className="text-sm">{formError}</p>
                      </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="name@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-6 text-center">
                      <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                        Back to login
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;