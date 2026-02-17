import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Layers, Cpu, GraduationCap, Rocket } from 'lucide-react';

const differentiators = [
    {
        icon: Cloud,
        title: 'Industry-Powered Curriculum',
        description: 'Built with Google Cloud & IBM — not just textbooks.',
    },
    {
        icon: Layers,
        title: 'Project-First Learning',
        description: 'Hands-on projects from Year 1, not just final year.',
    },
    {
        icon: Cpu,
        title: 'Future-Ready Tools',
        description: 'AI, data, cloud, design & no-code tools in every program.',
    },
    {
        icon: GraduationCap,
        title: 'Structured Academics',
        description: 'Modern pedagogy backed by academic governance.',
    },
    {
        icon: Rocket,
        title: 'Careers Beyond Placements',
        description: 'Jobs, startups, higher studies — pathways, not just jobs.',
    },
];

const WhySoF = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        Why SoF
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Why Students Choose the{' '}
                        <span className="text-[#FF0000]">School of the Future</span>
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">
                        Because the future doesn't reward rote learning.
                    </p>
                </motion.div>

                {/* Icon Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF0000]/20 transition-all duration-300 text-center"
                        >
                            <motion.div
                                className="inline-flex p-4 bg-red-50 text-[#FF0000] rounded-2xl mb-4 group-hover:bg-[#FF0000] group-hover:text-white transition-colors duration-300"
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.4 }}
                            >
                                <item.icon size={28} strokeWidth={1.5} />
                            </motion.div>
                            <h3 className="font-bold text-black text-sm mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySoF;
