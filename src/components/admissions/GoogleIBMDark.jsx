import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, Cloud, Shield } from 'lucide-react';

const MotionLink = motion.create(Link);

const certifications = [
    { icon: Cloud, label: 'Google Cloud', color: 'text-blue-400' },
    { icon: Shield, label: 'IBM Cybersecurity', color: 'text-green-400' },
    { icon: BookOpen, label: 'AI & ML', color: 'text-purple-400' },
    { icon: Award, label: 'Data Science', color: 'text-amber-400' },
];

const GoogleIBMDark = () => {
    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.05)]"
                >
                    <div className="grid md:grid-cols-2 items-center">
                        {/* Left Content */}
                        <div className="p-10 md:p-14 relative z-10">
                            {/* Partner Logos */}
                            <div className="flex items-center gap-5 mb-8">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
                                    alt="Google Cloud"
                                    className="h-7 object-contain"
                                />
                                <div className="w-px h-8 bg-white/20" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 object-contain brightness-0 invert" />
                            </div>

                            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                                Embedded Partnership
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
                                Industry-Powered Learning,
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                    Not Just Classroom Teaching
                                </span>
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                                Programs at the School of the Future are designed with Google Cloud and IBM to ensure
                                industry-aligned curriculum, exposure to real tools and platforms, and applied learning
                                instead of outdated theory. Industry collaboration is embedded into the curriculum — not added later.
                            </p>

                            {/* Certification Badges */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {certifications.map((cert, i) => {
                                    const Icon = cert.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                                        >
                                            <Icon className={`w-4 h-4 ${cert.color}`} />
                                            <span className="text-white text-sm font-medium">{cert.label}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <MotionLink
                                to="/courses"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] transition-shadow"
                            >
                                Explore Programs
                                <ArrowRight className="w-5 h-5" />
                            </MotionLink>
                        </div>

                        {/* Right Image Section */}
                        <div className="relative h-full min-h-[450px] overflow-hidden">
                            {/* Red accent bar */}
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-red-600 via-orange-500 to-red-600 z-10" />

                            {/* Student image */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                    alt="Students collaborating"
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient fades */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/60 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/80 via-transparent to-[#020205]/40" />
                            </div>

                            {/* Floating stat badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute bottom-8 left-8 right-8 flex gap-4 z-10"
                            >
                                <div className="flex-1 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                                    <p className="text-red-500 text-2xl font-black">20+</p>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Certifications</p>
                                </div>
                                <div className="flex-1 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                                    <p className="text-red-500 text-2xl font-black">50+</p>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Industry Courses</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GoogleIBMDark;
