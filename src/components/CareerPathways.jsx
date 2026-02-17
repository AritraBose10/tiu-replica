import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Palette, HeartPulse, ArrowUpRight, Quote } from 'lucide-react';

const pathways = [
    {
        icon: Code,
        domain: 'Technology',
        roles: 'AI Engineer, Cloud Architect, Data Analyst, Full-Stack Developer',
        color: 'from-blue-500/10 to-blue-600/5',
        accent: 'text-blue-600',
        border: 'border-blue-200',
    },
    {
        icon: Briefcase,
        domain: 'Business',
        roles: 'Business Analyst, Product Manager, Strategy Consultant, Fintech Analyst',
        color: 'from-amber-500/10 to-amber-600/5',
        accent: 'text-amber-600',
        border: 'border-amber-200',
    },
    {
        icon: Palette,
        domain: 'Creative',
        roles: 'UX Designer, Filmmaker, Game Developer, Motion Graphics Artist',
        color: 'from-purple-500/10 to-purple-600/5',
        accent: 'text-purple-600',
        border: 'border-purple-200',
    },
    {
        icon: HeartPulse,
        domain: 'Healthcare',
        roles: 'Cardiovascular Technologist, Physiotherapist, Radiology Tech, Clinical Researcher',
        color: 'from-emerald-500/10 to-emerald-600/5',
        accent: 'text-emerald-600',
        border: 'border-emerald-200',
    },
];

const quotes = [
    { text: 'I build AI models at a startup I interned with during Year 3.', name: 'Arjun R.', program: 'B.Tech CSE' },
    { text: 'My design portfolio landed me a role before convocation.', name: 'Priya M.', program: 'B.Des' },
    { text: 'The MBA analytics track gave me confidence to lead data teams.', name: 'Rahul S.', program: 'MBA Analytics' },
];

const CareerPathways = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        Career Outcomes
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Careers After the{' '}
                        <span className="text-[#FF0000]">School of the Future</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Focus: long-term careers, not short-term hype.
                    </p>
                </motion.div>

                {/* Pathway Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {pathways.map((path, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            className={`bg-gradient-to-br ${path.color} rounded-2xl p-6 border ${path.border} hover:shadow-lg transition-all duration-300`}
                        >
                            <path.icon className={`${path.accent} mb-4`} size={32} strokeWidth={1.5} />
                            <h3 className="font-black text-black text-lg mb-2">{path.domain}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{path.roles}</p>
                            <ArrowUpRight className={`${path.accent} mt-4`} size={18} />
                        </motion.div>
                    ))}
                </div>

                {/* Student Quotes */}
                <div className="grid md:grid-cols-3 gap-6">
                    {quotes.map((quote, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                        >
                            <Quote className="text-[#FF0000]/30 mb-3" size={24} />
                            <p className="text-gray-700 text-sm italic mb-4">"{quote.text}"</p>
                            <div>
                                <p className="font-bold text-black text-sm">{quote.name}</p>
                                <p className="text-gray-400 text-xs">{quote.program}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerPathways;
