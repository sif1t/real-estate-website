import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Removing unused import
import PropertyList from '../components/property/PropertyList';
import Loading from '../components/common/Loading';
import SEO from '../components/common/SEO';
import { searchProperties } from '../services/propertyService';
import { getPropertyGalleryImages } from '../utils/imageImports';

const SearchResultsPage = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q') || '';
        setSearchQuery(query);

        const fetchResults = async () => {
            try {
                setLoading(true);
                const results = await searchProperties(query);

                // Add images to each property in search results
                const resultsWithImages = results.map(property => {
                    const images = getPropertyGalleryImages(property);
                    return { ...property, images };
                });

                setSearchResults(resultsWithImages);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchResults();
    }, [location.search]);

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto p-4">Error fetching results: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <SEO
                title={`Search Results for "${searchQuery}"`}
                description={`View properties matching your search for &ldquo;${searchQuery}&rdquo;`}
            />
            <h1 className="text-3xl font-bold mb-6">Search Results for &ldquo;{searchQuery}&rdquo;</h1>

            {searchResults.length > 0 ? (
                <PropertyList properties={searchResults} />
            ) : (
                <p className="text-lg">No properties found matching your search criteria.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;