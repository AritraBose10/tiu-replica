import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Building, Award, Laptop, FileCheck, Lightbulb, Users } from 'lucide-react';

const tiles = [
    {
        icon: Code2,
        title: 'Live Coding Projects',
        description: 'Real applications built using industry tools and frameworks.',
        color: 'from-blue-500/10 to-blue-600/5',
        accent: 'text-blue-600',
    },
    {
        icon: Trophy,
        title: 'Hackathon Wins',
        description: 'Students competing and winning at state and national hackathons.',
        color: 'from-amber-500/10 to-amber-600/5',
        accent: 'text-amber-600',
    },
    {
        icon: Building,
        title: 'Industry Visits',
        description: 'On-site exposure to how top companies build and operate.',
        color: 'from-emerald-500/10 to-emerald-600/5',
        accent: 'text-emerald-600',
    },
    {
        icon: Award,
        title: 'Certifications',
        description: 'Google Cloud, IBM, and industry-recognised credentials.',
        color: 'from-purple-500/10 to-purple-600/5',
        accent: 'text-purple-600',
    },
    {
        icon: Laptop,
        title: 'Portfolio Showcases',
        description: 'Design, film, and tech portfolios reviewed by industry mentors.',
        color: 'from-rose-500/10 to-rose-600/5',
        accent: 'text-rose-600',
    },
    {
        icon: FileCheck,
        title: 'Research Papers',
        description: 'Student-led research published in journals and conferences.',
        color: 'from-cyan-500/10 to-cyan-600/5',
        accent: 'text-cyan-600',
    },
    {
        icon: Lightbulb,
        title: 'Startup Ideas',
        description: 'Ideas incubated and pitched during entrepreneurship modules.',
        color: 'from-orange-500/10 to-orange-600/5',
        accent: 'text-orange-600',
    },
    {
        icon: Users,
        title: 'Community Events',
        description: 'Tech talks, workshops, and student-led community meetups.',
        color: 'from-indigo-500/10 to-indigo-600/5',
        accent: 'text-indigo-600',
    },
];

const StudentWork = () => {
    return (
        <section className="py-20 px-4 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block bg-[#FF0000]/20 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        Proof, Not Promises
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        What Students Actually{' '}
                        <span className="text-[#FF0000]">Build</span> at SoF
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        From live projects and showcases to industry visits and certifications —
                        students at SoF build real work, not just resumes.
                    </p>
                </motion.div>

                {/* Tile Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tiles.map((tile, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className={`bg-gradient-to-br ${tile.color} rounded-2xl p-6 border border-white/5 backdrop-blur-sm hover:border-white/15 transition-all duration-300 cursor-default`}
                        >
                            <tile.icon className={`${tile.accent} mb-4`} size={28} strokeWidth={1.5} />
                            <h3 className="font-bold text-white text-sm mb-2">{tile.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{tile.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentWork;
