import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Wrench, Languages, Users, Globe, Lightbulb } from 'lucide-react';

const profiles = [
    {
        icon: GraduationCap,
        title: '10+2 or Equivalent (Any Stream)',
        description: 'Students completing their senior secondary education from any recognised board.',
    },
    {
        icon: Wrench,
        title: 'Diploma Holders',
        description: 'Lateral entry available for polytechnic diploma graduates seeking direct second-year admission.',
    },
    {
        icon: Languages,
        title: 'Graduates Seeking PG Programs',
        description: 'Degree holders looking for M.Tech, MBA, M.Sc, M.Des or Ph.D programs.',
    },
    {
        icon: Users,
        title: 'Working Professionals',
        description: 'Executive MBA and weekend programs designed for professionals looking to upskill.',
    },
    {
        icon: Globe,
        title: 'International Students',
        description: 'Indian and international students with equivalent qualifications are welcome to apply.',
    },
    {
        icon: Lightbulb,
        title: 'Creative & Design Aspirants',
        description: 'Visual arts, game design, film, sound engineering — no mandatory portfolio for most programs.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const EligibilitySection = () => {
    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vw] bg-purple-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Eligibility
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-3 mb-4">
                        Who Should{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Apply?
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        SoF programs are designed for students who want an industry-relevant, university-recognised
                        education — not just a degree, but a direction.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {profiles.map((profile, i) => {
                        const Icon = profile.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">{profile.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{profile.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>


            </div>
        </section>
    );
};

export default EligibilitySection;
