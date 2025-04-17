import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import AboutSection from '../components/home/AboutSection';
import Services from '../components/home/Services';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';
import SEO from '../components/common/SEO';
import Layout from '../components/common/Layout';

const HomePage = () => {
    return (
        <Layout>
            <SEO
                title="Real Estate - Find Your Dream Home"
                description="Browse our selection of premium properties and find your dream home today."
            />
            <Hero />
            <FeaturedProperties />
            <AboutSection />
            <Services />
            <TestimonialsSection />
            <CtaSection />
        </Layout>
    );
};

export default HomePage;