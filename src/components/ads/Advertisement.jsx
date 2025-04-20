import React from 'react';
import { Link } from 'react-router-dom';
import { useAdContext } from '../../context/AdContext';

const Advertisement = () => {
    const { currentAd, showAd, closeAd } = useAdContext();

    if (!showAd || !currentAd) {
        return null;
    }

    const adTypeClasses = {
        property: 'bg-blue-50 border-blue-500',
        promotion: 'bg-green-50 border-green-500',
        agent: 'bg-purple-50 border-purple-500',
        investment: 'bg-amber-50 border-amber-500',
        service: 'bg-indigo-50 border-indigo-500'
    };

    const adBgClass = adTypeClasses[currentAd.type] || 'bg-gray-50 border-gray-500';

    return (
        <div className={`fixed bottom-5 right-5 z-50 max-w-sm w-full shadow-xl rounded-lg overflow-hidden transition-all transform ${showAd ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className={`p-4 border-l-4 ${adBgClass}`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                        <img
                            src={currentAd.image}
                            alt={currentAd.title}
                            className="h-16 w-16 object-cover rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {currentAd.title}
                            </h3>
                            <button
                                onClick={closeAd}
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Close advertisement"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                            {currentAd.description}
                        </p>
                        <div className="mt-3 flex justify-end">
                            <Link
                                to={currentAd.url}
                                onClick={closeAd}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Learn More →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;