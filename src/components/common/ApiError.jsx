import React from 'react';

const ApiError = ({ error, retry = null }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-100 rounded-lg shadow-sm max-w-lg mx-auto my-8">
            <svg
                className="w-12 h-12 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <h3 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h3>

            <p className="text-red-700 text-center mb-4">
                {error?.message || 'Unable to connect to the server. Please check your internet connection and try again.'}
            </p>

            {retry && (
                <button
                    onClick={retry}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ApiError;