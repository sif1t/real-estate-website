import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import SEO from '../components/common/SEO';
import { fetchBlogPosts } from '../services/api';

const BlogPage = () => {
    // Helper function to get high-quality images based on category
    const getCategoryImage = (category, postId) => {
        const categoryImages = {
            'Buying': [
                'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            'Selling': [
                'https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            'Investment': [
                'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80'
            ],
            'default': [
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80',
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80'
            ]
        };

        // Get images for the specific category or use default
        const images = categoryImages[category] || categoryImages['default'];

        // Use post ID to determine which image to use (ensures consistency for same post)
        return images[postId % images.length];
    };

    // Function to get author images from a more reliable source
    const getAuthorImage = (author, authorImage) => {
        if (authorImage && authorImage.startsWith('http')) {
            return authorImage;
        }

        // Fallback to a better quality placeholder with author's initial
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=0D8ABC&color=fff&size=150&font-size=0.6&rounded=true&bold=true`;
    };

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [imgLoaded, setImgLoaded] = useState({});

    // Function to handle image load events
    const handleImageLoaded = (id) => {
        setImgLoaded(prev => ({ ...prev, [id]: true }));
    };

    useEffect(() => {
        const getBlogPosts = async () => {
            try {
                const data = await fetchBlogPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getBlogPosts();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4" role="alert">Error: {error}</div>;

    // Get unique categories from posts
    const categories = ['All', ...new Set(posts.map(post => post.category))];

    // Find featured post (first post)
    const featuredPost = posts.length > 0 ? posts[0] : null;

    // Filter remaining posts
    const filteredPosts = posts
        .filter(post => post.id !== featuredPost?.id)
        .filter(post =>
            (activeCategory === 'All' || post.category === activeCategory) &&
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Layout>
            <SEO title="Real Estate Blog" description="Latest insights, trends and tips about the real estate market" />

            {/* Page Header */}
            <div className="bg-gray-100 py-10 mb-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800">Our Blog</h1>
                    <p className="text-lg text-center text-gray-600 mt-4 max-w-2xl mx-auto">
                        Stay updated with the latest trends, insights, and tips about the real estate market.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full ${activeCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    } transition-colors duration-200`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {featuredPost && activeCategory === 'All' && searchTerm === '' && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">Featured Article</h2>
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                            <div className="md:flex">
                                <div className="md:w-1/2 relative overflow-hidden group">
                                    <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imgLoaded[featuredPost.id] ? 'hidden' : 'flex'}`}></div>
                                    <img
                                        src={getCategoryImage(featuredPost.category, featuredPost.id)}
                                        alt={featuredPost.title}
                                        className={`w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded[featuredPost.id] ? 'opacity-100' : 'opacity-0'}`}
                                        onLoad={() => handleImageLoaded(featuredPost.id)}
                                        onError={(e) => {
                                            e.target.src = getCategoryImage('default', featuredPost.id);
                                            handleImageLoaded(featuredPost.id);
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 md:w-1/2">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {featuredPost.category}
                                        </span>
                                        <span className="text-gray-600 text-sm ml-2">
                                            {formatDate(featuredPost.date)}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{featuredPost.title}</h3>
                                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3 border-2 border-white shadow">
                                            {featuredPost.authorImage ? (
                                                <img
                                                    src={featuredPost.authorImage}
                                                    alt={featuredPost.author}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                    {featuredPost.author ? featuredPost.author.charAt(0).toUpperCase() : 'A'}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-700 font-medium">By {featuredPost.author}</span>
                                    </div>
                                    <a
                                        href={`/blog/${featuredPost.id}`}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Read Full Article
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Posts Grid */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
                        {activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}
                    </h2>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-semibold text-gray-800">No articles found</h3>
                            <p className="text-gray-600">Try changing your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map(post => (
                                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200 hover:translate-y-[-5px]">
                                    <a href={`/blog/${post.id}`} className="block relative h-56 overflow-hidden group">
                                        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imgLoaded[post.id] ? 'hidden' : 'flex'}`}></div>
                                        <img
                                            src={getCategoryImage(post.category, post.id)}
                                            alt={post.title}
                                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded[post.id] ? 'opacity-100' : 'opacity-0'}`}
                                            onLoad={() => handleImageLoaded(post.id)}
                                            onError={(e) => {
                                                e.target.src = getCategoryImage('default', post.id);
                                                handleImageLoaded(post.id);
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                            <span className="text-white font-bold text-lg px-4 pb-4 transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                                View Article
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </a>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                                            <a href={`/blog/${post.id}`}>{post.title}</a>
                                        </h3>
                                        <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center">
                                                <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden mr-2 border-2 border-white shadow">
                                                    {post.authorImage ? (
                                                        <img
                                                            src={getAuthorImage(post.author, post.authorImage)}
                                                            alt={post.author}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                                            {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                                            </div>
                                            <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group">
                                                Read More <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-blue-600 text-white rounded-lg p-8 my-12">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mb-6 md:mb-0 md:w-2/3">
                            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                            <p className="text-blue-100">
                                Get the latest real estate news and insights delivered directly to your inbox.
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full rounded-l-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-r-lg transition-colors duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogPage;