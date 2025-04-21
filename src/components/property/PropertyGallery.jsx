import React, { useState } from 'react';

const PropertyGallery = ({ images = [] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoadError, setImageLoadError] = useState({});

    // Fallback image if none provided
    const fallbackImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&h=600&q=80';

    // Use provided images or fallback
    const displayImages = images.length > 0 ? images : [fallbackImage];

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const handleImageError = (index) => {
        setImageLoadError(prev => ({ ...prev, [index]: true }));
    };

    return (
        <div className="property-gallery mb-8">
            {/* Main Image Display */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-md">
                <img
                    src={imageLoadError[currentImageIndex] ? fallbackImage : displayImages[currentImageIndex]}
                    alt={`Property view ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(currentImageIndex)}
                    loading="lazy"
                    crossOrigin="anonymous"
                />

                {/* Navigation arrows - only show if more than one image */}
                {displayImages.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                            onClick={goToPreviousImage}
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                            onClick={goToNextImage}
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {displayImages.length}
                </div>
            </div>

            {/* Thumbnails - only show if more than one image */}
            {displayImages.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                    {displayImages.map((image, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer flex-shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-md overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-primary' : 'border-transparent'
                                }`}
                            onClick={() => goToImage(index)}
                        >
                            <img
                                src={imageLoadError[index] ? fallbackImage : image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(index)}
                                loading="lazy"
                                crossOrigin="anonymous"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyGallery;