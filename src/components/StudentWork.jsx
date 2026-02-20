import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Trophy, Building, Award, Laptop, FileCheck, Lightbulb, Users, ArrowUpRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const StudentWork = () => {
    const { getSetting } = useSettings();

    const tiles = [
        {
            id: 'coding',
            icon: Code2,
            title: 'Live Coding Projects',
            description: 'Real applications built using industry tools like React, Node.js & Python.',
            size: 'col-span-1 md:col-span-2 row-span-2', // Large Feature
            gradient: 'from-blue-600 to-indigo-600',
            image: getSetting('student_work_coding_image') || "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=3540&auto=format&fit=crop"
        },
        {
            id: 'hackathon',
            icon: Trophy,
            title: 'Hackathon Wins',
            description: 'National winners at Smart India Hackathon & more.',
            size: 'col-span-1 row-span-1',
            gradient: 'from-amber-500 to-orange-500',
            image: getSetting('student_work_hackathon_image') || "https://images.unsplash.com/photo-1504384308090-c54be3855485?q=80&w=2669&auto=format&fit=crop"
        },
        {
            id: 'visits',
            icon: Building,
            title: 'Industry Visits',
            description: 'On-site exposure at Google, IBM & Microsoft campuses.',
            size: 'col-span-1 row-span-1',
            gradient: 'from-emerald-500 to-teal-500',
            image: getSetting('student_work_visits_image') || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
        },
        {
            id: 'startup',
            icon: Lightbulb,
            title: 'Startup Incubation',
            description: '3 student startups funded in 2024 alone.',
            size: 'col-span-1 md:col-span-2 row-span-1', // Wide
            gradient: 'from-purple-600 to-pink-600',
            image: getSetting('student_work_startup_image') || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 'research',
            icon: FileCheck,
            title: 'Research Pubs',
            description: 'Papers in IEEE & Springer conferences.',
            size: 'col-span-1 row-span-1',
            gradient: 'from-cyan-500 to-blue-500',
            image: getSetting('student_work_research_image') || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 'community',
            icon: Users,
            title: 'Tech Community',
            description: 'Leading GDSC and other tech clubs.',
            size: 'col-span-1 row-span-1',
            gradient: 'from-rose-500 to-red-500',
            image: getSetting('student_work_community_image') || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2668&auto=format&fit=crop"
        },
    ];

    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="w-[90%] md:w-[70%] mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16"
                >
                    <div className="max-w-2xl">
                        <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                            Student Outcomes
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Proof, Not Just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                Promises.
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left">
                        Our students don't just study theory. They build, ship, and launch real-world projects from Day 1.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
                    {tiles.map((tile, i) => {
                        const Icon = tile.icon;
                        return (
                            <motion.div
                                key={tile.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] transition-colors duration-500 ${tile.size}`}
                            >
                                {/* Image Placeholder / Background */}
                                <div className="absolute inset-0 z-0">
                                    {/* If image exists, render it: */}
                                    {tile.image && (
                                        <img
                                            src={tile.image}
                                            alt={tile.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                        />
                                    )}

                                    {/* Fallback Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${tile.image ? 'mix-blend-overlay' : ''}`} />

                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent opacity-90" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                    <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>

                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${tile.gradient} shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {tile.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-[90%] group-hover:text-gray-200 transition-colors">
                                        {tile.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StudentWork;
