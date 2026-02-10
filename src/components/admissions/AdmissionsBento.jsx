import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Code, Database, Globe, Zap } from 'lucide-react';

const programs = [
    {
        id: 1,
        title: "B.Tech Computer Science",
        subtitle: "Flagship Program",
        description: "Comprehensive curriculum covering algorithms, data structures, and modern software engineering practices.",
        icon: Cpu,
        tags: ["AI & ML", "Cloud Computing", "Full Stack"],
        size: "large",
        color: "from-blue-500 to-cyan-500",
        partner: "Intel"
    },
    {
        id: 2,
        title: "B.Tech Electronics & Comm.",
        subtitle: "Core Engineering",
        description: "Focus on embedded systems, VLSI design, and communication networks.",
        icon: Zap,
        tags: ["IoT", "Robotics", "VLSI"],
        size: "normal",
        color: "from-amber-500 to-orange-500",
        partner: "Texas Instruments"
    },
    {
        id: 3,
        title: "BCA / MCA",
        subtitle: "Application Focus",
        description: "Practical approach to software development and application management.",
        icon: Code,
        tags: ["App Dev", "Web Tech", "Database"],
        size: "normal",
        color: "from-emerald-500 to-teal-500",
        partner: "Oracle"
    },
    {
        id: 4,
        title: "M.Sc Data Science",
        subtitle: "Advanced Studies",
        description: "Deep dive into big data analytics, machine learning models, and statistical inference.",
        icon: Database,
        tags: ["Big Data", "Analytics", "Python"],
        size: "wide",
        color: "from-purple-500 to-pink-500",
        partner: "IBM"
    },
    {
        id: 5,
        title: "B.BA / MBA",
        subtitle: "Business Leadership",
        description: "Developing future managers with strong analytical and leadership skills.",
        icon: Globe,
        tags: ["Finance", "Marketing", "HR"],
        size: "normal",
        color: "from-rose-500 to-red-500",
        partner: "HDFC"
    }
];

const BentoCard = ({ program }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getSizeClasses = (size) => {
        switch (size) {
            case 'large': return 'col-span-1 md:col-span-2 md:row-span-2 h-[400px] md:h-auto';
            case 'wide': return 'col-span-1 md:col-span-2 h-[200px]';
            default: return 'col-span-1 h-[200px]';
        }
    };

    return (
        <motion.div
            // Removed layoutId to prevent layout position issues
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative group rounded-3xl overflow-hidden cursor-pointer ${getSizeClasses(program.size)}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-[#0a0a0f] opacity-90" />

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/20 transition-colors duration-500" />

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${program.color} bg-opacity-20`}>
                        <program.icon className="w-6 h-6 text-white" />
                    </div>
                    {program.partner && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 backdrop-blur-md text-gray-300">
                            {program.partner}
                        </span>
                    )}
                </div>

                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-gray-400 mb-1">{program.subtitle}</h4>
                    <h3 className={`font-bold text-white mb-2 leading-tight ${program.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                        {program.title}
                    </h3>

                    {(program.size === 'large' || program.size === 'wide') && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{program.description}</p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                            {program.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
                        >
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AdmissionsBento = () => {
    return (
        <section className="py-24 px-4 bg-[#020205] relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Programs <span className="text-transparent stroke-white/20" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)' }}>Designed</span> <br />
                        For The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Industry</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {programs.map(program => (
                        <BentoCard key={program.id} program={program} />
                    ))}

                    {/* CTA Card to fill remaining space - NOW LINKED */}
                    <a href="/courses" className="col-span-1 md:col-span-1 h-[200px] relative group rounded-3xl overflow-hidden cursor-pointer bg-white text-black flex items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-shadow duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-bold relative z-10 text-black">View All 50+ Programs</h3>
                        <ArrowUpRight className="absolute bottom-6 right-6 w-6 h-6 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AdmissionsBento;
