import axios from 'axios';

// Setting a more reliable API base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Creating axios instance with better timeout and error handling
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for logging
api.interceptors.request.use(config => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
}, error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(response => {
    return response;
}, error => {
    // Network errors handling
    if (error.message === 'Network Error') {
        console.error('Network Error: Unable to connect to the API server. Please check your connection or the server might be down.');
        // Return mock data for development if needed
        if (process.env.NODE_ENV === 'development') {
            const url = error.config.url;
            if (url.includes('/properties')) {
                return Promise.resolve({ data: getMockProperties() });
            } else if (url.includes('/agents')) {
                return Promise.resolve({ data: getMockAgents() });
            } else if (url.includes('/blog')) {
                return Promise.resolve({ data: getMockBlogPosts() });
            }
        }
    }

    return Promise.reject(error);
});

// Setup WebSocket connection for real-time updates (if supported by backend)
let websocket = null;
let websocketReconnectInterval = null;

export const setupRealTimeUpdates = (onPropertyUpdate, onAgentUpdate, onBlogUpdate) => {
    // Only setup if we're in a browser environment
    if (typeof window !== 'undefined') {
        const WS_URL = process.env.REACT_APP_WS_URL || `ws://${window.location.hostname}:3001/updates`;

        try {
            websocket = new WebSocket(WS_URL);

            websocket.onopen = () => {
                console.log('WebSocket connection established for real-time updates');
                // Clear any reconnection interval if we successfully connected
                if (websocketReconnectInterval) {
                    clearInterval(websocketReconnectInterval);
                    websocketReconnectInterval = null;
                }
            };

            websocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Real-time update received:', data);

                    // Route updates to appropriate handlers
                    if (data.type === 'property' && onPropertyUpdate) {
                        onPropertyUpdate(data.payload);
                    } else if (data.type === 'agent' && onAgentUpdate) {
                        onAgentUpdate(data.payload);
                    } else if (data.type === 'blog' && onBlogUpdate) {
                        onBlogUpdate(data.payload);
                    }
                } catch (err) {
                    console.error('Error handling WebSocket message:', err);
                }
            };

            websocket.onclose = () => {
                console.log('WebSocket connection closed. Attempting to reconnect...');
                // Setup reconnection attempt
                if (!websocketReconnectInterval) {
                    websocketReconnectInterval = setInterval(() => {
                        setupRealTimeUpdates(onPropertyUpdate, onAgentUpdate, onBlogUpdate);
                    }, 5000);
                }
            };

            websocket.onerror = (err) => {
                console.error('WebSocket error:', err);
            };
        } catch (err) {
            console.error('Error setting up WebSocket:', err);

            // Fallback to polling if WebSocket isn't available
            setupPollingUpdates(onPropertyUpdate, onAgentUpdate, onBlogUpdate);
        }
    } else {
        // Fallback to polling if we're not in a browser environment
        setupPollingUpdates(onPropertyUpdate, onAgentUpdate, onBlogUpdate);
    }
};

// Fallback to polling for updates if WebSockets are not supported
const setupPollingUpdates = (onPropertyUpdate, onAgentUpdate, onBlogUpdate) => {
    console.log('Setting up polling for updates (WebSocket not available)');

    // Check for property updates every 30 seconds
    setInterval(async () => {
        try {
            if (onPropertyUpdate) {
                const response = await api.get('/properties/updates');
                if (response.data && response.data.length > 0) {
                    onPropertyUpdate(response.data);
                }
            }
        } catch (err) {
            console.error('Error polling for property updates:', err);
        }
    }, 30000);

    // Check for agent updates every 60 seconds
    setInterval(async () => {
        try {
            if (onAgentUpdate) {
                const response = await api.get('/agents/updates');
                if (response.data && response.data.length > 0) {
                    onAgentUpdate(response.data);
                }
            }
        } catch (err) {
            console.error('Error polling for agent updates:', err);
        }
    }, 60000);

    // Check for blog updates every 5 minutes
    setInterval(async () => {
        try {
            if (onBlogUpdate) {
                const response = await api.get('/blog/updates');
                if (response.data && response.data.length > 0) {
                    onBlogUpdate(response.data);
                }
            }
        } catch (err) {
            console.error('Error polling for blog updates:', err);
        }
    }, 300000);
};

// Cleanup function for WebSocket connection
export const cleanupRealTimeUpdates = () => {
    if (websocket) {
        websocket.close();
        websocket = null;
    }

    if (websocketReconnectInterval) {
        clearInterval(websocketReconnectInterval);
        websocketReconnectInterval = null;
    }
};

export default api;

// Enhanced API functions with better error handling
export const fetchProperties = async (filters = {}) => {
    try {
        const response = await api.get('/properties', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to mock data if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Using mock property data as fallback');
            return getMockProperties(filters);
        }
        throw error;
    }
};

export const fetchPropertyById = async (id) => {
    try {
        const response = await api.get(`/properties/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching property with id ${id}:`, error);
        // Fallback to mock data if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log(`Using mock data for property ${id} as fallback`);
            const mockProperties = getMockProperties();
            return mockProperties.find(p => p.id === parseInt(id)) || mockProperties[0];
        }
        throw error;
    }
};

export const fetchImages = async (propertyId) => {
    try {
        const response = await api.get(`/properties/${propertyId}/images`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for property ${propertyId}:`, error);
        // Fallback to mock images if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log(`Using mock images for property ${propertyId} as fallback`);
            return getMockImages(propertyId);
        }
        throw error;
    }
};

export const fetchAgents = async () => {
    try {
        const response = await api.get('/agents');
        return response.data;
    } catch (error) {
        console.error('Error fetching agents:', error);
        // Fallback to mock agents if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Using mock agent data as fallback');
            return getMockAgents();
        }
        throw error;
    }
};

export const fetchBlogPosts = async () => {
    try {
        const response = await api.get('/blog');
        return response.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock blog posts if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Using mock blog data as fallback');
            return getMockBlogPosts();
        }
        throw error;
    }
};

// Enhanced mock data functions with filtering support
const getMockProperties = (filters = {}) => {
    let properties = [
        {
            id: 1,
            title: 'Modern Apartment in Downtown',
            price: 450000,
            location: 'New York, NY',
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            description: 'Beautiful modern apartment in the heart of downtown with amazing city views. Features include hardwood floors, stainless steel appliances, and a private balcony.',
            images: ['/images/property1.jpg', '/images/property1-2.jpg'],
            featured: true,
            type: 'Apartment',
            status: 'For Sale'
        },
        {
            id: 2,
            title: 'Luxury Villa with Pool',
            price: 1250000,
            location: 'Miami, FL',
            bedrooms: 4,
            bathrooms: 3,
            area: 3500,
            description: 'Stunning luxury villa with private pool and garden in an exclusive neighborhood. Perfect for entertaining with a gourmet kitchen and spacious outdoor living area.',
            images: ['/images/property2.jpg', '/images/property2-2.jpg'],
            featured: true,
            type: 'Villa',
            status: 'For Sale'
        },
        {
            id: 3,
            title: 'Cozy Studio for Rent',
            price: 1800,
            location: 'San Francisco, CA',
            bedrooms: 1,
            bathrooms: 1,
            area: 650,
            description: 'Cozy studio apartment available for rent in a great location. Walking distance to public transportation, restaurants, and shops.',
            images: ['/images/property3.jpg'],
            featured: false,
            type: 'Studio',
            status: 'For Rent'
        },
        {
            id: 4,
            title: 'Spacious Family Home',
            price: 750000,
            location: 'Austin, TX',
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            description: 'Beautiful family home in a quiet suburban neighborhood with excellent schools. Features include a large backyard, finished basement, and updated kitchen.',
            images: ['/images/property4.jpg', '/images/property4-2.jpg'],
            featured: true,
            type: 'House',
            status: 'For Sale'
        },
        {
            id: 5,
            title: 'Downtown Loft with City Views',
            price: 525000,
            location: 'Chicago, IL',
            bedrooms: 2,
            bathrooms: 2,
            area: 1800,
            description: 'Modern loft in the heart of downtown with floor-to-ceiling windows and breathtaking city views. Open floor plan with high ceilings and exposed brick walls.',
            images: ['/images/property5.jpg'],
            featured: false,
            type: 'Loft',
            status: 'For Sale'
        },
        {
            id: 6,
            title: 'Beachfront Condo',
            price: 3200,
            location: 'San Diego, CA',
            bedrooms: 3,
            bathrooms: 2,
            area: 1600,
            description: 'Luxury beachfront condo with stunning ocean views. Fully furnished with modern amenities and direct beach access.',
            images: ['/images/property6.jpg'],
            featured: true,
            type: 'Condo',
            status: 'For Rent'
        },
        {
            id: 7,
            title: 'Mountain Cabin Retreat',
            price: 380000,
            location: 'Denver, CO',
            bedrooms: 3,
            bathrooms: 2,
            area: 1400,
            description: 'Charming cabin surrounded by nature with beautiful mountain views. Perfect for weekend getaways or year-round living.',
            images: ['/images/property7.jpg'],
            featured: false,
            type: 'Cabin',
            status: 'For Sale'
        },
        {
            id: 8,
            title: 'Modern Office Space',
            price: 4500,
            location: 'Seattle, WA',
            bedrooms: 0,
            bathrooms: 2,
            area: 2200,
            description: 'Contemporary office space in a prime location. Open floor plan with private conference rooms and kitchen area.',
            images: ['/images/property8.jpg'],
            featured: false,
            type: 'Commercial',
            status: 'For Rent'
        },
        {
            id: 9,
            title: 'Historic Brownstone',
            price: 1650000,
            location: 'Boston, MA',
            bedrooms: 4,
            bathrooms: 3,
            area: 3200,
            description: 'Beautifully restored historic brownstone with original architectural details and modern updates. Located in a prime neighborhood.',
            images: ['/images/property9.jpg'],
            featured: true,
            type: 'House',
            status: 'For Sale'
        },
        {
            id: 10,
            title: 'Lakefront Property',
            price: 950000,
            location: 'Minneapolis, MN',
            bedrooms: 3,
            bathrooms: 2,
            area: 2400,
            description: 'Stunning lakefront property with private dock and panoramic water views. Perfect as a primary residence or vacation home.',
            images: ['/images/property10.jpg'],
            featured: false,
            type: 'House',
            status: 'For Sale'
        },
        {
            id: 11,
            title: 'Luxury Penthouse',
            price: 8500,
            location: 'Los Angeles, CA',
            bedrooms: 3,
            bathrooms: 3.5,
            area: 3000,
            description: 'Spectacular penthouse with panoramic city and ocean views. Features include a private roof terrace, home theater, and gourmet kitchen.',
            images: ['/images/property11.jpg'],
            featured: true,
            type: 'Penthouse',
            status: 'For Rent'
        },
        {
            id: 12,
            title: 'Retail Space in Shopping Center',
            price: 3800,
            location: 'Atlanta, GA',
            bedrooms: 0,
            bathrooms: 1,
            area: 1800,
            description: 'Prime retail space in a busy shopping center with high foot traffic. Excellent visibility and parking available.',
            images: ['/images/property12.jpg'],
            featured: false,
            type: 'Commercial',
            status: 'For Rent'
        }
    ];

    // Apply filters if provided
    if (filters) {
        if (filters.featured === true) {
            properties = properties.filter(p => p.featured === true);
        }

        if (filters.minPrice) {
            properties = properties.filter(p => p.price >= filters.minPrice);
        }

        if (filters.maxPrice) {
            properties = properties.filter(p => p.price <= filters.maxPrice);
        }

        if (filters.propertyType && filters.propertyType !== 'Any') {
            properties = properties.filter(p => p.type.toLowerCase() === filters.propertyType.toLowerCase());
        }

        if (filters.location) {
            properties = properties.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
        }

        if (filters.bedrooms && filters.bedrooms !== 'Any') {
            const minBeds = parseInt(filters.bedrooms);
            properties = properties.filter(p => p.bedrooms >= minBeds);
        }

        if (filters.bathrooms && filters.bathrooms !== 'Any') {
            const minBaths = parseInt(filters.bathrooms);
            properties = properties.filter(p => p.bathrooms >= minBaths);
        }

        if (filters.status && filters.status !== 'Any') {
            properties = properties.filter(p => p.status === filters.status);
        }

        if (filters.limit) {
            properties = properties.slice(0, filters.limit);
        }
    }

    return properties;
};

// Mock data functions remain the same as before
const getMockAgents = () => [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '(555) 123-4567',
        photo: 'https://randomuser.me/api/portraits/women/32.jpg',
        bio: 'Sarah has over 10 years of experience in luxury real estate.',
        specialization: 'Luxury Properties',
        listings: 24
    },
    {
        id: 2,
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@example.com',
        phone: '(555) 987-6543',
        photo: 'https://randomuser.me/api/portraits/men/45.jpg',
        bio: 'Michael specializes in commercial properties and investment opportunities.',
        specialization: 'Commercial Real Estate',
        listings: 18
    },
    {
        id: 3,
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        phone: '(555) 234-5678',
        photo: 'https://randomuser.me/api/portraits/women/18.jpg',
        bio: 'Jennifer helps first-time homebuyers find their perfect starter homes.',
        specialization: 'Residential Properties',
        listings: 32
    },
    {
        id: 4,
        name: 'David Martinez',
        email: 'david.martinez@example.com',
        phone: '(555) 456-7890',
        photo: 'https://randomuser.me/api/portraits/men/33.jpg',
        bio: 'David is an expert in urban development and modern city living options.',
        specialization: 'Urban Properties',
        listings: 27
    },
    {
        id: 5,
        name: 'Emily Wilson',
        email: 'emily.wilson@example.com',
        phone: '(555) 567-8901',
        photo: 'https://randomuser.me/api/portraits/women/27.jpg',
        bio: 'Emily specializes in vacation rentals and second homes in desirable locations.',
        specialization: 'Vacation Properties',
        listings: 21
    },
    {
        id: 6,
        name: 'Robert Chen',
        email: 'robert.chen@example.com',
        phone: '(555) 678-9012',
        photo: 'https://randomuser.me/api/portraits/men/77.jpg',
        bio: 'Robert has 15 years of experience helping clients with luxury estate investments.',
        specialization: 'Estate Properties',
        listings: 15
    },
    {
        id: 7,
        name: 'Sophia Patel',
        email: 'sophia.patel@example.com',
        phone: '(555) 789-0123',
        photo: 'https://randomuser.me/api/portraits/women/23.jpg',
        bio: 'Sophia is an expert in sustainable and eco-friendly housing options.',
        specialization: 'Green Properties',
        listings: 22
    },
    {
        id: 8,
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        phone: '(555) 890-1234',
        photo: 'https://randomuser.me/api/portraits/men/42.jpg',
        bio: 'James focuses on helping families find the perfect home in top school districts.',
        specialization: 'Family Homes',
        listings: 29
    },
    {
        id: 9,
        name: 'Olivia Rodriguez',
        email: 'olivia.rodriguez@example.com',
        phone: '(555) 901-2345',
        photo: 'https://randomuser.me/api/portraits/women/36.jpg',
        bio: 'Olivia specializes in historic properties and heritage renovations.',
        specialization: 'Historic Properties',
        listings: 17
    },
    {
        id: 10,
        name: 'Benjamin Kim',
        email: 'benjamin.kim@example.com',
        phone: '(555) 012-3456',
        photo: 'https://randomuser.me/api/portraits/men/51.jpg',
        bio: 'Benjamin has extensive experience in luxury apartment and penthouse sales.',
        specialization: 'Luxury Apartments',
        listings: 26
    },
    {
        id: 11,
        name: 'Isabella Morgan',
        email: 'isabella.morgan@example.com',
        phone: '(555) 123-4560',
        photo: 'https://randomuser.me/api/portraits/women/49.jpg',
        bio: 'Isabella is a specialist in waterfront properties and maritime living.',
        specialization: 'Waterfront Properties',
        listings: 14
    },
    {
        id: 12,
        name: 'Ethan Thompson',
        email: 'ethan.thompson@example.com',
        phone: '(555) 234-5671',
        photo: 'https://randomuser.me/api/portraits/men/22.jpg',
        bio: 'Ethan focuses on rural properties, farms, and ranches for buyers seeking a countryside lifestyle.',
        specialization: 'Rural Properties',
        listings: 19
    }
];

const getMockBlogPosts = () => [
    {
        id: 1,
        title: '10 Tips for First-Time Home Buyers',
        excerpt: 'Buying your first home can be overwhelming. Here are some essential tips to help you navigate the process.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        author: 'Sarah Johnson',
        date: '2023-03-15',
        image: '/images/blog/blog1.jpg',
        category: 'Buying'
    },
    {
        id: 2,
        title: 'How to Stage Your Home for a Quick Sale',
        excerpt: 'Learn the secrets of professional home staging to help your property sell faster and for a better price.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        author: 'Michael Rodriguez',
        date: '2023-02-28',
        image: '/images/blog/blog2.jpg',
        category: 'Selling'
    },
    {
        id: 3,
        title: 'Real Estate Investment Strategies for 2023',
        excerpt: 'Discover the most promising real estate investment approaches for the current market conditions.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
        author: 'Jennifer Lee',
        date: '2023-01-10',
        image: '/images/blog/blog3.jpg',
        category: 'Investment'
    },
    {
        id: 4,
        title: 'Understanding Mortgage Pre-Approval: Why It Matters',
        excerpt: 'Learn why getting pre-approved for a mortgage can give you a competitive edge in today\'s real estate market.',
        content: 'Getting pre-approved for a mortgage is a crucial first step in the home buying process. It gives you a clear understanding of your budget, demonstrates to sellers that youre a serious buyer, and can help expedite the closing process once your offer is accepted.This article explores the pre- approval process and its benefits.',
        author: 'David Martinez',
        date: '2023-04-05',
        image: '/images/blog/blog4.jpg',
        category: 'Buying'
    },
    {
        id: 5,
        title: 'How to Spot a Good Neighborhood for Long-Term Value',
        excerpt: 'Discover the key indicators that a neighborhood will maintain or increase in value over time.',
        content: 'When buying a home, the location is just as important as the property itself. This guide helps you identify neighborhoods with strong prospects for long-term appreciation, including factors like school quality, infrastructure development, and economic indicators.',
        author: 'Emily Wilson',
        date: '2023-05-12',
        image: '/images/blog/blog5.jpg',
        category: 'Buying'
    },
    {
        id: 6,
        title: 'The Hidden Costs of Buying a Home',
        excerpt: 'Beyond the down payment and mortgage, learn about the additional expenses that come with homeownership.',
        content: 'Many first-time homebuyers focus solely on the purchase price, but owning a home involves numerous additional expenses. From closing costs and property taxes to maintenance and homeowners insurance, this article breaks down all the costs you should budget for.',
        author: 'Robert Chen',
        date: '2023-06-20',
        image: '/images/blog/blog6.jpg',
        category: 'Buying'
    },
    {
        id: 7,
        title: 'When Is the Best Time to Sell Your Home?',
        excerpt: 'A data-driven analysis of seasonal trends in the real estate market to maximize your selling price.',
        content: 'Timing can significantly impact your home selling success. This article examines historical market data to identify the optimal seasons and months for listing your property, accounting for factors like inventory levels, buyer activity, and regional differences.',
        author: 'Sophia Patel',
        date: '2023-02-18',
        image: '/images/blog/blog7.jpg',
        category: 'Selling'
    },
    {
        id: 8,
        title: 'Renovations That Boost Your Home\'s Value',
        excerpt: 'Not all improvements offer equal returns. Discover which upgrades give you the best ROI when selling.',
        content: 'Before putting your home on the market, strategic renovations can significantly increase its value. This guide explores the most cost-effective improvements, from kitchen updates and bathroom remodels to simple cosmetic changes that make a big difference.',
        author: 'James Wilson',
        date: '2023-03-25',
        image: '/images/blog/blog8.jpg',
        category: 'Selling'
    },
    {
        id: 9,
        title: 'Pricing Your Home to Sell: Strategies That Work',
        excerpt: 'Learn how to set the optimal asking price for your property to attract buyers without leaving money on the table.',
        content: 'Determining the right price for your home is both an art and a science. This article covers crucial pricing strategies, including comparative market analysis, pricing psychology, and how to anticipate buyer behavior in different market conditions.',
        author: 'Olivia Rodriguez',
        date: '2023-05-05',
        image: '/images/blog/blog9.jpg',
        category: 'Selling'
    },
    {
        id: 10,
        title: 'REITs vs. Direct Property Ownership: Pros and Cons',
        excerpt: 'Compare these two popular real estate investment approaches to determine which best suits your goals and resources.',
        content: 'Real estate investors have multiple options for adding property to their portfolios. This comparison examines the advantages and disadvantages of Real Estate Investment Trusts (REITs) versus directly owning investment properties, considering factors like liquidity, management requirements, and potential returns.',
        author: 'Benjamin Kim',
        date: '2023-02-02',
        image: '/images/blog/blog10.jpg',
        category: 'Investment'
    },
    {
        id: 11,
        title: 'Commercial Real Estate Investment Fundamentals',
        excerpt: 'A beginner\'s guide to investing in commercial properties and understanding the key metrics for success.',
        content: 'Commercial real estate can offer attractive investment returns but requires specialized knowledge. This comprehensive guide covers property types, valuation methods, financing options, and the essential metrics investors should analyze before committing to a commercial property.',
        author: 'Isabella Morgan',
        date: '2023-04-15',
        image: '/images/blog/blog11.jpg',
        category: 'Investment'
    },
    {
        id: 12,
        title: 'Building a Profitable Rental Property Portfolio',
        excerpt: 'Learn the strategies professional investors use to create sustainable income through rental properties.',
        content: 'Creating a successful rental property portfolio requires careful planning and strategic execution. This article outlines the step-by-step process for building a profitable portfolio, from identifying promising markets and properties to efficient management practices and scaling your investments over time.',
        author: 'Ethan Thompson',
        date: '2023-05-30',
        image: '/images/blog/blog12.jpg',
        category: 'Investment'
    }
];

const getMockImages = (propertyId) => {
    const baseImages = [
        '/images/property-detail1.jpg',
        '/images/property-detail2.jpg',
        '/images/property-detail3.jpg',
        '/images/property-detail4.jpg'
    ];

    // Return different combinations based on propertyId to simulate variety
    return baseImages.slice(0, (propertyId % 4) + 1);
};