import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSettings } from '../contexts/SettingsContext';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                // easeOutQuad
                const easeProgress = progress * (2 - progress);
                setCount(Math.floor(easeProgress * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    setCount(end); // Ensure we hit the exact end number
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [inView, end, duration]);

    return (
        <span ref={ref} className="font-mono">
            {count}{suffix}
        </span>
    );
};

const WhatIsSoF = () => {
    const { getSetting } = useSettings();
    const sofImage = getSetting('what_is_sof_image', '/images/classroom-candid.jpg');

    const stats = [
        { label: "Industry Partners", value: 50, suffix: "+" },
        { label: "Placement Rate", value: 95, suffix: "%" },
        { label: "Tech Labs", value: 12, suffix: "" },
        { label: "Active Startups", value: 20, suffix: "+" },
    ];

    return (
        <section className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full overflow-visible">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Text & Stats */}
                    <div className="lg:col-span-6 xl:col-span-5 space-y-8 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-red-500 text-sm font-semibold tracking-wide uppercase">The Future is Here</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                                Define Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                                    Own Direction.
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
                                We're not just a school in Kolkata; we're an innovation hub. Strong academics meet industry-powered curriculum, equipping you for careers that don't even exist yet.
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4 pt-4"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300 group">
                                    <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-red-500 transition-colors duration-300">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Interactive Image Gallery/Bento */}
                    <div className="lg:col-span-6 xl:col-span-7 lg:pl-12 z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group perspective-1000"
                        >
                            {/* Main Image Container */}
                            <div className="relative rounded-[2rem] overflow-hidden bg-black border border-white/10 aspect-[4/3] lg:aspect-auto lg:h-[600px] shadow-2xl shadow-red-500/10">
                                <img
                                    src={sofImage}
                                    alt="School of the Future Campus"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />

                                {/* Corner Accents inside image */}
                                <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-red-500/50" />
                                <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-red-500/50" />

                                {/* Floating Tag */}
                                <div className="absolute bottom-8 left-8 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-30 transition-all duration-500 ease-out">
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        Project-Based Learning
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">Real-world problem solving.</p>
                                </div>
                            </div>

                            {/* Decorative background blocks to make it look bento-ish */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-red-500/10 rounded-[2rem] -z-10 blur-xl group-hover:bg-red-500/20 transition-colors duration-500" />
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/5 rounded-[2rem] -z-10 border border-white/5 rotate-12 group-hover:rotate-6 transition-transform duration-700" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhatIsSoF;
