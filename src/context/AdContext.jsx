import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample advertisement data
const sampleAds = [
    {
        id: 'ad-001',
        title: 'Exclusive New Properties',
        description: 'Be the first to see our newest luxury listings',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=80',
        url: '/properties?category=luxury',
        type: 'property'
    },
    {
        id: 'ad-002',
        title: 'Spring Sale: 5% Off',
        description: 'Limited time offer on selected properties',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
        url: '/properties?sale=true',
        type: 'promotion'
    },
    {
        id: 'ad-003',
        title: 'Meet Our Top Agents',
        description: 'Expert guidance for your real estate journey',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
        url: '/agents',
        type: 'agent'
    },
    {
        id: 'ad-004',
        title: 'Investment Opportunities',
        description: 'High-yield properties with great ROI potential',
        image: 'https://images.unsplash.com/photo-1434434319959-1f886517e1fe?w=500&auto=format&fit=crop&q=80',
        url: '/properties?category=investment',
        type: 'investment'
    },
    {
        id: 'ad-005',
        title: 'Virtual Tours Available',
        description: 'Explore properties from the comfort of your home',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80',
        url: '/properties?virtualTour=true',
        type: 'service'
    },
];

// Create the context
const AdContext = createContext();

// Custom hook to use the ad context
export const useAdContext = () => {
    const context = useContext(AdContext);
    if (!context) {
        throw new Error('useAdContext must be used within an AdProvider');
    }
    return context;
};

// Ad provider component
export const AdProvider = ({ children }) => {
    const [currentAd, setCurrentAd] = useState(null);
    const [showAd, setShowAd] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [adHistory, setAdHistory] = useState([]);

    // Function to select a random ad that hasn't been shown recently
    const selectRandomAd = () => {
        // Filter out ads that were recently shown (using last 2 ads in history)
        const recentAdIds = adHistory.slice(-2).map(ad => ad.id);
        const availableAds = sampleAds.filter(ad => !recentAdIds.includes(ad.id));

        // If all ads were recently shown, reset and use all ads
        const adPool = availableAds.length > 0 ? availableAds : sampleAds;

        // Select a random ad from the pool
        const randomIndex = Math.floor(Math.random() * adPool.length);
        return adPool[randomIndex];
    };

    // Function to display an ad
    const displayAd = () => {
        const newAd = selectRandomAd();
        setCurrentAd(newAd);
        setShowAd(true);

        // Add to history
        setAdHistory(prev => [...prev, newAd]);

        // Auto-hide ad after a period
        setTimeout(() => {
            setShowAd(false);
        }, 10000); // Show for 10 seconds
    };

    // Function to manually close an ad
    const closeAd = () => {
        setShowAd(false);
    };

    // Function to display a notification when an ad appears
    const showAdNotification = (ad) => {
        setNotification({
            title: 'New Offer',
            message: ad.title,
            type: ad.type,
            timestamp: new Date()
        });
        setShowNotification(true);

        // Auto-hide notification after a period
        setTimeout(() => {
            setShowNotification(false);
        }, 5000); // Show for 5 seconds
    };

    // Function to dismiss a notification
    const dismissNotification = () => {
        setShowNotification(false);
    };

    // Set up a timer to display ads periodically
    useEffect(() => {
        // Initial ad display after 5 seconds
        const initialTimer = setTimeout(() => {
            const newAd = selectRandomAd();
            setCurrentAd(newAd);
            setShowAd(true);
            showAdNotification(newAd);

            setAdHistory(prev => [...prev, newAd]);

            // Auto-hide after display period
            setTimeout(() => setShowAd(false), 10000);
        }, 5000);

        // Set up recurring timer (every 45-90 seconds)
        const recurringTimer = setInterval(() => {
            // Random time between 45-90 seconds for natural feel
            const newAd = selectRandomAd();
            setCurrentAd(newAd);
            setShowAd(true);
            showAdNotification(newAd);

            setAdHistory(prev => [...prev, newAd]);

            // Auto-hide after display period
            setTimeout(() => setShowAd(false), 10000);
        }, Math.floor(Math.random() * (90000 - 45000) + 45000));

        // Cleanup
        return () => {
            clearTimeout(initialTimer);
            clearInterval(recurringTimer);
        };
    }, []);

    // Value to provide through context
    const value = {
        currentAd,
        showAd,
        notification,
        showNotification,
        displayAd,
        closeAd,
        dismissNotification
    };

    return (
        <AdContext.Provider value={value}>
            {children}
        </AdContext.Provider>
    );
};

export default AdContext;