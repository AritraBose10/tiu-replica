import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase, BrainCircuit, Play, X } from 'lucide-react';

const differentiators = [
    {
        icon: Cpu,
        title: 'Industry-Powered Curriculum',
        description: 'Curriculum designed with Google Cloud and IBM — not a generic syllabus updated years later.',
        gradient: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/20',
    },
    {
        icon: BrainCircuit,
        title: 'Project-Based Learning from Year One',
        description: 'Students build, create and solve real problems from the very first semester — not just in final year.',
        gradient: 'from-violet-500/20 to-purple-500/20',
        border: 'border-violet-500/20',
    },
    {
        icon: Users,
        title: 'Clear Academic Structure',
        description: 'Structured academic governance, transparent evaluation and a recognised degree — not a bootcamp certificate.',
        gradient: 'from-emerald-500/20 to-teal-500/20',
        border: 'border-emerald-500/20',
    },
    {
        icon: Briefcase,
        title: 'A Degree with Long-Term Value',
        description: 'Nationally recognised university degree valid for careers and higher studies in India and abroad.',
        gradient: 'from-orange-500/20 to-amber-500/20',
        border: 'border-orange-500/20',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const WhySOF = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Why Students Choose Us
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-3 leading-tight">
                        Because the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Future
                        </span>
                        <br />
                        Won't Wait
                    </h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        The School of the Future is built for students who want clarity, relevance and direction — not outdated degrees, unclear career paths or theory-heavy learning.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Differentiator Cards */}
                    <motion.div
                        className="grid gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {differentiators.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={cardVariants}
                                    className={`group relative p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border ${item.border} hover:bg-white/[0.07] transition-all duration-500 cursor-default`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center border ${item.border}`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Hover glow */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Right: Video Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative rounded-3xl overflow-hidden group"
                    >
                        {!isPlaying ? (
                            <>
                                {/* Poster Image */}
                                <div className="relative aspect-[16/10]">
                                    <img
                                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                                        alt="School of the Future"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-[#020205]/30" />

                                    {/* Play Button */}
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <motion.div
                                            className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)] group-hover:shadow-[0_0_60px_rgba(255,0,0,0.6)] transition-shadow"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                        </motion.div>
                                    </button>

                                    {/* Caption */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white font-semibold text-lg">
                                            Watch: The Future of Education
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            3 min · See how we're redefining learning
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative border */}
                                <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                            </>
                        ) : (
                            <div className="relative aspect-[16/10] bg-black">
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                                    title="School of the Future"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <button
                                    onClick={() => setIsPlaying(false)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhySOF;
