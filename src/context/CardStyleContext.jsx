import React, { createContext, useState, useContext } from 'react';

// Define the available card styles
export const CARD_STYLES = {
    STANDARD: 'standard',
    COMPACT: 'compact',
    MODERN: 'modern',
    ELEGANT: 'elegant',
};

// Create the context
const CardStyleContext = createContext();

// Create provider component
export const CardStyleProvider = ({ children }) => {
    const [currentStyle, setCurrentStyle] = useState(CARD_STYLES.STANDARD);

    // Change the card style
    const changeCardStyle = (style) => {
        if (CARD_STYLES[style]) {
            setCurrentStyle(CARD_STYLES[style]);
        } else if (Object.values(CARD_STYLES).includes(style)) {
            setCurrentStyle(style);
        } else {
            console.warn(`Style ${style} is not supported. Using standard style.`);
            setCurrentStyle(CARD_STYLES.STANDARD);
        }
    };

    // Get all available styles
    const getAvailableStyles = () => {
        return Object.values(CARD_STYLES);
    };

    const value = {
        currentStyle,
        changeCardStyle,
        getAvailableStyles,
        CARD_STYLES
    };

    return (
        <CardStyleContext.Provider value={value}>
            {children}
        </CardStyleContext.Provider>
    );
};

// Custom hook for using the card style context
export const useCardStyle = () => {
    const context = useContext(CardStyleContext);
    if (context === undefined) {
        throw new Error('useCardStyle must be used within a CardStyleProvider');
    }
    return context;
};

export default CardStyleContext;