import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, BadgeCheck, Globe, ArrowRight } from 'lucide-react';
import logo from '../../assets/tiulogo.png';

const recognitions = [
    {
        icon: Award,
        title: 'UGC-Recognised University',
        description: 'Degrees are issued by Techno India University, a UGC-recognised private university in West Bengal.',
    },
    {
        icon: Shield,
        title: 'NAAC / NBA (Applied)',
        description: 'Quality assurance frameworks being pursued for continuous institutional improvement.',
    },
    {
        icon: BadgeCheck,
        title: 'Legitimate Private University',
        description: 'Established under the West Bengal State Legislature — not an affiliated college or autonomous institute.',
    },
    {
        icon: Globe,
        title: 'Degrees Valid Nationwide & Abroad',
        description: 'All degrees are valid for higher education, government exams, and employment in India and internationally.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const DegreeRecognition = () => {
    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-1/4 -right-[10%] w-[35vw] h-[35vw] bg-emerald-600/5 rounded-full blur-[180px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                                Academic Assurance
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
                                Is This a{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                    Recognised Degree?
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                One of the first questions students ask — and it deserves a clear, transparent answer.
                                Your degree comes from a recognised university, not a certificate program or bootcamp.
                            </p>
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {recognitions.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right — Trust Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-10 md:p-14 text-center">
                            {/* Central emblem */}
                            <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center p-3">
                                <img src={logo} alt="Techno India University" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Techno India University</h3>


                            <div className="flex flex-wrap gap-3 justify-center">
                                <span className="px-4 py-2 rounded-full bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 text-sm font-semibold">
                                    UGC Recognised
                                </span>
                                <span className="px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-semibold">
                                    State University Act
                                </span>
                                <span className="px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-400 text-sm font-semibold">
                                    Valid Nationwide
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DegreeRecognition;
