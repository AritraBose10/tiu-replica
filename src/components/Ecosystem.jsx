import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';

const levels = [
    {
        icon: Building2,
        label: 'Techno India Group',
        sublabel: 'Institutional Legacy & Stability',
        color: 'from-gray-800 to-gray-900',
        textColor: 'text-white',
        width: 'max-w-lg',
    },
    {
        icon: GraduationCap,
        label: 'Techno India University',
        sublabel: 'UGC-Recognised University',
        color: 'from-gray-700 to-gray-800',
        textColor: 'text-white',
        width: 'max-w-md',
    },
    {
        icon: Sparkles,
        label: 'School of the Future',
        sublabel: 'Future-Ready Learning Without Compromising Credibility',
        color: 'from-[#FF0000] to-[#CC0000]',
        textColor: 'text-white',
        width: 'max-w-sm',
    },
];

const ensures = [
    'Institutional legacy and stability',
    'Degrees awarded by a recognised university',
    'Future-ready learning without compromising credibility',
];

const Ecosystem = () => {
    return (
        <section className="py-20 px-4 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        The Ecosystem
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">
                        One Legacy. One University.<br />
                        <span className="text-[#FF0000]">One Future-Focused School.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        The School of the Future operates within a strong academic ecosystem.
                    </p>
                </motion.div>

                {/* Hierarchy Diagram */}
                <div className="flex flex-col items-center gap-4 mb-16">
                    {levels.map((level, index) => (
                        <React.Fragment key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`${level.width} w-full bg-gradient-to-r ${level.color} ${level.textColor} rounded-2xl px-8 py-6 text-center shadow-lg`}
                            >
                                <div className="flex items-center justify-center gap-3 mb-1">
                                    <level.icon size={22} />
                                    <span className="font-bold text-lg">{level.label}</span>
                                </div>
                                <p className="text-sm opacity-80">{level.sublabel}</p>
                            </motion.div>
                            {index < levels.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + 0.1 }}
                                >
                                    <ArrowRight className="rotate-90 text-gray-300" size={24} />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Ensures */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-2xl p-8 text-center"
                >
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">This ensures</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        {ensures.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 bg-[#FF0000] rounded-full flex-shrink-0" />
                                <span className="text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Ecosystem;
