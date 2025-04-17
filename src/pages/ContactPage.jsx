import React from 'react';
import Layout from '../components/common/Layout';
import ContactForm from '../components/forms/ContactForm';

const ContactPage = () => {
    return (
        <Layout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                <p className="mb-4">We would love to hear from you! Please fill out the form below to get in touch.</p>
                <ContactForm />
            </div>
        </Layout>
    );
};

export default ContactPage;