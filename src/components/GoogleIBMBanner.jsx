import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const MotionLink = motion.create(Link);

const highlights = [
    'Curriculum co-designed with industry partners',
    'Students work with real tools, frameworks & cloud platforms',
    'Google Cloud & IBM certifications embedded in programs',
    'Industry mentors & guest lectures from practitioners',
];

const GoogleIBMBanner = () => {
    const { getSetting } = useSettings();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        getSetting('admissions_google_ibm_bg') || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
        getSetting('admissions_google_ibm_bg_2') || "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3500); // Change image every 3.5 seconds
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="py-20 px-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <div className="w-[90%] md:w-[70%] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 max-w-4xl"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6 relative border border-red-500/20 shadow-sm">
                        Industry Partnership
                        <span className="absolute inset-0 rounded-full animate-pulse bg-red-500/10"></span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                        Industry-Powered Learning with{' '}
                        <span className="text-[#FF0000]">Global Technology Leaders</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl border-l-4 border-red-500 pl-6 py-1">
                        At SoF, industry collaboration is embedded into the curriculum — not added as a marketing layer.
                        Students learn using real tools, real frameworks and real-world problems.
                    </p>
                </motion.div>

                {/* Two-Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Left — Content Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg flex flex-col"
                    >
                        {/* Partner Logos */}
                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                            <img
                                src={getSetting('logo_google_cloud') || "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"}
                                alt="Google Cloud"
                                className="h-7 object-contain"
                            />
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-2">
                                <img src={getSetting('logo_ibm') || "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"} alt="IBM" className="h-8 object-contain" />
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-4 flex-1">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="text-[#FF0000] flex-shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-8">
                            <MotionLink
                                to="/cloud-ai-certification-courses-kolkata"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#CC0000] transition-colors w-max"
                            >
                                Explore Industry Programs
                                <ArrowRight className="w-5 h-5" />
                            </MotionLink>
                        </div>
                    </motion.div>

                    {/* Right — Image + Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4"
                    >
                        {/* Main Image Slider */}
                        <div className="flex-1 rounded-3xl overflow-hidden bg-gray-100 relative min-h-[280px]">
                            <AnimatePresence mode="popLayout">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt="Students working with industry tools"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 right-4 z-20">
                                <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                    Real tools. Real frameworks. Real projects.
                                </span>
                            </div>
                        </div>

                        {/* Bottom stats strip */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: '10+', label: 'Certifications' },
                                { value: '50+', label: 'Live Projects' },
                                { value: '2', label: 'Tech Partners' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="bg-black rounded-2xl p-4 text-center z-10 relative"
                                >
                                    <div className="text-2xl font-black text-[#FF0000]">{stat.value}</div>
                                    <div className="text-xs text-gray-400 font-medium mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GoogleIBMBanner;
