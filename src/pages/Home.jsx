import React from 'react';
import Hero from '../components/Hero';
import PartnersCarousel from '../components/PartnersCarousel';
import ProgramsSection from '../components/ProgramsSection';
import GoogleIBMBanner from '../components/GoogleIBMBanner';
import HowToApply from '../components/HowToApply';
import FAQSection from '../components/FAQSection';
import ApprovalsSection from '../components/ApprovalsSection';
import { motion } from 'framer-motion';
import { Users, Award, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
    { icon: Users, value: "5 Lakh+", label: "Alumni Network" },
    { icon: Award, value: "1st", label: "Private Uni in WB" },
    { icon: Globe, value: "100+", label: "Global Partners" },
    { icon: BookOpen, value: "50+", label: "Courses" }
];

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <Hero />

            {/* Partners Carousel */}
            <PartnersCarousel />

            {/* Programs Section - Dark themed with tabs */}
            <ProgramsSection />

            {/* Stats Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex p-3 bg-[#FF0000]/20 text-[#FF0000] rounded-full mb-3">
                                    <stat.icon size={28} />
                                </div>
                                <div className="text-4xl font-black mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google & IBM Feature Banner */}
            <GoogleIBMBanner />

            {/* How to Apply Timeline */}
            <HowToApply />

            {/* FAQ Section */}
            <FAQSection />

            {/* Approvals & Affiliations */}
            <ApprovalsSection />

            {/* CTA Section */}
            <section className="py-24 bg-black relative overflow-hidden text-center text-white">
                {/* Red glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.3)_0%,_transparent_70%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Applications{' '}
                            <span className="bg-[#FF0000] px-4 py-1">Open</span>{' '}
                            Now
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Secure your spot in the School of the Future. Admissions open for 2026 batch.
                        </p>
                        <Link
                            to="/admissions"
                            className="inline-block bg-[#FF0000] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#CC0000] transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            Apply Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
