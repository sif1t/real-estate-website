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

export default api;

// API functions with better error handling
export const fetchProperties = async () => {
    try {
        const response = await api.get('/properties');
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to mock data if in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Using mock property data as fallback');
            return getMockProperties();
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

// Mock data functions for fallback during development
const getMockProperties = () => [
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

const getMockAgents = () => [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '(555) 123-4567',
        photo: '/images/agents/agent1.jpg',
        bio: 'Sarah has over 10 years of experience in luxury real estate.',
        specialization: 'Luxury Properties',
        listings: 24
    },
    {
        id: 2,
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@example.com',
        phone: '(555) 987-6543',
        photo: '/images/agents/agent2.jpg',
        bio: 'Michael specializes in commercial properties and investment opportunities.',
        specialization: 'Commercial Real Estate',
        listings: 18
    },
    {
        id: 3,
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        phone: '(555) 234-5678',
        photo: '/images/agents/agent3.jpg',
        bio: 'Jennifer helps first-time homebuyers find their perfect starter homes.',
        specialization: 'Residential Properties',
        listings: 32
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