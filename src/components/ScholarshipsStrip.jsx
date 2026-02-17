import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScholarshipsStrip = () => {
    return (
        <section className="py-16 px-4 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden relative">
            {/* Subtle red glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.08)_0%,_transparent_70%)]" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#FF0000]/20 rounded-2xl">
                            <Sparkles className="text-[#FF0000]" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white">
                                Scholarships & Financial Support Available
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Merit-based scholarships, need-based support and flexible financing options for eligible students.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/admissions#scholarships"
                        className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#CC0000] transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0"
                    >
                        Explore Scholarships & Fees
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ScholarshipsStrip;
