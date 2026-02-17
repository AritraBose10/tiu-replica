import React from 'react';
import { motion } from 'framer-motion';
import { useSanity } from '../hooks/useSanity';
import { PARTNERS_QUERY } from '../lib/queries';

const fallbackPartners = [
    { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
    { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
];

const PartnersCarousel = () => {
    const { data: sanityPartners } = useSanity(PARTNERS_QUERY, null);
    const partners = sanityPartners
        ? sanityPartners.map(p => ({ name: p.name, logo: p.logoUrl }))
        : fallbackPartners;
    return (
        <section className="py-16 bg-white">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Learn & Get Hired By The Best
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                    Our Industry & Placement Partners
                </h2>
            </motion.div>

            {/* Infinite Marquee */}
            <div className="relative overflow-hidden">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling track - uses CSS animation */}
                <div className="flex w-max animate-scroll-left">
                    {/* Triple the logos for seamless infinite scroll */}
                    {[...partners, ...partners, ...partners].map((partner, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-10 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-full w-auto object-contain min-w-[100px]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersCarousel;
