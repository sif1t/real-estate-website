import React from 'react';
import Layout from '../components/common/Layout';

const FaqPage = () => {
    const faqs = [
        {
            question: "What is the process of buying a property?",
            answer: "The process typically involves finding a property, making an offer, securing financing, and closing the sale."
        },
        {
            question: "How do I know if a property is a good investment?",
            answer: "Consider factors like location, market trends, property condition, and potential rental income."
        },
        {
            question: "What are closing costs?",
            answer: "Closing costs are fees associated with finalizing a real estate transaction, including taxes, insurance, and lender fees."
        },
        {
            question: "How can I sell my property quickly?",
            answer: "To sell quickly, price it competitively, stage it well, and market it effectively."
        },
        {
            question: "What should I look for in a real estate agent?",
            answer: "Look for experience, local market knowledge, good communication skills, and positive reviews."
        }
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4">
                            <h2 className="text-xl font-semibold">{faq.question}</h2>
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default FaqPage;