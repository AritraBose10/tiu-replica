import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    // Generate random grid cell positions for animated highlights
    const [gridCells, setGridCells] = useState([]);

    useEffect(() => {
        const cells = [];
        const numCells = 15;
        for (let i = 0; i < numCells; i++) {
            cells.push({
                id: i,
                left: Math.floor(Math.random() * 12) * 80, // Snap to grid
                top: Math.floor(Math.random() * 8) * 80,
                delay: Math.random() * 3,
                duration: 2 + Math.random() * 2,
            });
        }
        setGridCells(cells);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden tiu-grid-bg pt-20 pb-40">
            {/* Animated Grid Cells - Checkerbox Effect */}
            {gridCells.map((cell) => (
                <motion.div
                    key={cell.id}
                    className="absolute w-20 h-20 pointer-events-none"
                    style={{
                        left: cell.left,
                        top: cell.top,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0, 0.15, 0.25, 0.15, 0],
                        scale: [0.8, 1, 1.05, 1, 0.8],
                        backgroundColor: ['rgba(255,0,0,0)', 'rgba(255,0,0,0.15)', 'rgba(255,0,0,0.2)', 'rgba(255,0,0,0.15)', 'rgba(255,0,0,0)']
                    }}
                    transition={{
                        delay: cell.delay,
                        duration: cell.duration,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                    }}
                />
            ))}

            {/* Floating Graduation Cap - Top Right */}
            <motion.div
                className="absolute top-32 right-[18%] z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-[#FF0000]/20"
                >
                    <GraduationCap className="w-7 h-7 text-[#FF0000]" />
                </motion.div>
            </motion.div>

            {/* Floating Icon - Left Side */}
            <motion.div
                className="absolute top-1/2 left-[8%] z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100"
                >
                    <svg className="w-6 h-6 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-black text-black leading-tight mb-6">
                        Shape Your{' '}
                        <span className="bg-[#FF0000] text-white px-4 py-1 inline-block">
                            Future
                        </span>{' '}
                        at
                        <br />
                        Techno India{' '}
                        <span className="text-[#FF0000]">University</span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        The School of the Future offers interdisciplinary programs that blend modern
                        technologies and innovation, equipping students to excel in a rapidly changing world.
                    </motion.p>

                    {/* CTA Buttons - Fixed alignment */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link
                            to="/admissions"
                            className="bg-[#FF0000] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#CC0000] transition-all duration-300 hover:shadow-xl hover:scale-105 inline-block"
                        >
                            Apply Now
                        </Link>

                        <Link
                            to="/courses"
                            className="flex items-center gap-2 text-black font-medium text-lg hover:text-[#FF0000] transition-colors group"
                        >
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Explore Programs</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Video/Image preview - Fixed positioning */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                {/* TIU Logo Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                        className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg className="w-7 h-7 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
                        </svg>
                    </motion.div>
                </div>


                <div className="rounded-t-2xl overflow-hidden shadow-2xl border-t-4 border-x-4 border-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
                        alt="TIU Campus"
                        className="w-full h-56 object-cover"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
