import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Layers, Cpu, GraduationCap, Rocket, ArrowUpRight } from 'lucide-react';

const differentiators = [
    {
        icon: Cloud,
        title: 'Industry-Powered Curriculum',
        description: 'Built with Google Cloud & IBM — not just textbooks.',
        number: '01',
        accent: '#3B82F6',
    },
    {
        icon: Layers,
        title: 'Project-First Learning',
        description: 'Hands-on projects from Year 1, not just final year.',
        number: '02',
        accent: '#8B5CF6',
    },
    {
        icon: Cpu,
        title: 'Future-Ready Tools',
        description: 'AI, data, cloud, design & no-code tools in every program.',
        number: '03',
        accent: '#EF4444',
    },
    {
        icon: GraduationCap,
        title: 'Structured Academics',
        description: 'Modern pedagogy backed by academic governance.',
        number: '04',
        accent: '#10B981',
    },
    {
        icon: Rocket,
        title: 'Careers Beyond Placements',
        description: 'Jobs, startups, higher studies — pathways, not just jobs.',
        number: '05',
        accent: '#F59E0B',
    },
];

const WhySoF = () => {
    return (
        <section className="py-20 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background grain texture */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Gradient orb */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/[0.06] rounded-full blur-[200px] pointer-events-none" />

            <div className="w-[90%] md:w-[70%] mx-auto relative z-10">
                {/* Header — Tighter & Centered for vertical compactness */}
                {/* Header — Tighter & Centered for vertical compactness */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 mb-4">
                            Why SoF
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
                            The Future{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                                Doesn't Wait.
                            </span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            We designed School of the Future for students who want clarity, relevance,
                            and direction — not outdated degrees or theory-heavy learning.
                        </p>
                    </motion.div>
                </div>

                {/* Compact Flex Layout for Centered Rows */}
                <div className="flex flex-wrap justify-center gap-4">
                    {differentiators.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className="group relative w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                            >
                                <div
                                    className="relative h-full flex flex-col p-6 rounded-2xl bg-[#0a0a0c] border border-white/[0.06] shadow-xl transition-all duration-300 hover:bg-[#111115] hover:border-white/[0.1] hover:-translate-y-1"
                                >
                                    {/* Hover sweep */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden"
                                        style={{
                                            background: `radial-gradient(circle at top right, ${item.accent}15, transparent 70%)`,
                                        }}
                                    />

                                    <div className="flex justify-between items-start mb-6">
                                        {/* Icon */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg"
                                            style={{
                                                background: `#000000`,
                                                border: `1px solid ${item.accent}40`,
                                                boxShadow: `inset 0 0 20px ${item.accent}10`
                                            }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: item.accent }} />
                                        </div>

                                        {/* Number */}
                                        <span className="text-white/[0.04] text-5xl font-black select-none group-hover:text-white/[0.08] transition-colors duration-300">
                                            {item.number}
                                        </span>
                                    </div>

                                    {/* Content (pushed to bottom if needed, but flex-col handles it) */}
                                    <div className="mt-auto">
                                        <h3 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-white transition-colors">
                                            {item.title}
                                        </h3>
                                        <div
                                            className="h-[2px] w-12 mb-4 opacity-70 rounded-full"
                                            style={{ background: item.accent }}
                                        />
                                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhySoF;
