import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default Loading;