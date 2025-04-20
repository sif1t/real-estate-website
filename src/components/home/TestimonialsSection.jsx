import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
    // State to track which testimonial is hovered
    const [hoveredId, setHoveredId] = useState(null);

    const testimonials = [
        {
            id: 1,
            name: 'Jennifer Rodriguez',
            role: 'Home Buyer',
            testimonial: 'Working with this real estate agency was the best decision I made. They understood exactly what I was looking for and found my dream home within my budget.',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Property Investor',
            testimonial: "As a property investor, I appreciate their market knowledge and attention to detail. They've helped me build a profitable portfolio of properties over the years.",
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 3,
            name: 'Sarah Thompson',
            role: 'Home Seller',
            testimonial: 'They sold my house for above asking price in less than two weeks! Their marketing strategy and professional photography made all the difference.',
            image: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
    ];

    // Animation variants
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Animation for stars
    const starVariants = {
        initial: { scale: 0, rotate: -10 },
        animate: (i) => ({
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                delay: i * 0.1
            }
        })
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={headerVariants}
                >
                    <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience with us.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {testimonials.map(testimonial => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-gray-50 p-6 rounded-lg shadow"
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}
                            onHoverStart={() => setHoveredId(testimonial.id)}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <motion.div
                                className="flex items-center mb-4"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover mr-4"
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop
                                        e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=0D8ABC&color=fff`;
                                    }}
                                />
                                <div>
                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </motion.div>

                            <motion.p
                                className="text-gray-600 italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                &ldquo;{testimonial.testimonial}&rdquo;
                            </motion.p>

                            <div className="mt-4 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <motion.svg
                                        key={i}
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        custom={i}
                                        variants={starVariants}
                                        initial="initial"
                                        animate={hoveredId === testimonial.id ? "animate" : ""}
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </motion.svg>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;