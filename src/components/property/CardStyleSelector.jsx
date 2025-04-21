import React from 'react';
import { useCardStyle, CARD_STYLES } from '../../context/CardStyleContext';

const CardStyleSelector = ({ className = '' }) => {
    const { currentStyle, changeCardStyle, getAvailableStyles } = useCardStyle();
    const styles = getAvailableStyles();

    const styleNames = {
        [CARD_STYLES.STANDARD]: 'Standard',
        [CARD_STYLES.COMPACT]: 'Compact',
        [CARD_STYLES.MODERN]: 'Modern',
        [CARD_STYLES.ELEGANT]: 'Elegant',
    };

    return (
        <div className={`card-style-selector ${className}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-gray-700 font-medium whitespace-nowrap">Property Card Style:</span>
                <div className="flex gap-2 flex-wrap justify-center">
                    {styles.map(style => (
                        <button
                            key={style}
                            onClick={() => changeCardStyle(style)}
                            className={`px-4 py-2 rounded-md text-sm transition-colors ${currentStyle === style
                                    ? 'bg-primary text-white font-medium'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            aria-current={currentStyle === style}
                        >
                            {styleNames[style] || style}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardStyleSelector;