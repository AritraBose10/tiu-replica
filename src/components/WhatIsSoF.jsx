import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';

const WhatIsSoF = () => {
    const { getSetting } = useSettings();
    const sofImage = getSetting('what_is_sof_image', '/images/classroom-candid.jpg');

    return (
        <section className="py-20 px-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                            About SoF
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                            What Is the School{' '}
                            <span className="text-[#FF0000]">of the Future</span>?
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                The School of the Future is a next-generation academic school created to prepare students
                                for emerging careers, not outdated job roles.
                            </p>
                            <p>
                                At SoF, strong academics meet industry-powered curriculum, project-based learning, and
                                real-world exposure across technology, business, creative disciplines and applied sciences.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-1 h-12 bg-[#FF0000] rounded-full" />
                            <p className="text-xl font-bold text-black italic">
                                Not just a degree. A direction.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                            <img
                                src={sofImage}
                                alt="Students collaborating in a modern classroom at School of the Future"
                                className="w-full h-full object-cover"
                            />
                            {/* Fallback gradient overlay if no image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FF0000]/10 rounded-2xl -z-10" />
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FF0000]/5 rounded-xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhatIsSoF;
