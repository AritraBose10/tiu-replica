import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, BookOpen, Wrench, Trophy, Users } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const experiences = [
    { icon: BookOpen, label: 'Classroom learning supported by modern labs' },
    { icon: Wrench, label: 'Industry tools and real datasets' },
    { icon: Trophy, label: 'Hackathons, studios and challenges' },
    { icon: Users, label: 'Faculty mentorship and industry interaction' },
];



const HowLearningWorks = () => {
    const { getSetting } = useSettings();
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const isVideoInView = useInView(videoRef, { once: true, amount: 0.5 });

    const galleryImages = [
        { src: '/assets/images/f1.jpg', alt: 'Students in a modern computer lab' },
        { src: '/assets/images/f2.jpg', alt: 'Collaborative project work' },
        { src: '/assets/images/f3.jpg', alt: 'Faculty mentoring students' },
        { src: '/assets/images/f4.jpg', alt: 'Hackathon in progress' },
    ];

    return (
        <section className="py-24 px-0 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="w-[90%] md:w-[70%] mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    {/* Left Column: Header & Features */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                                How It Works
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                                How Learning Works at the{' '}
                                <span className="text-[#FF0000]">School of the Future</span>.
                            </h2>
                            <p className="text-lg text-gray-500 border-l-4 border-red-500 pl-6 py-1 leading-relaxed">
                                Learning at SoF combines concepts, labs and projects to build long-term career readiness.
                            </p>
                        </motion.div>

                        {/* Experience Points Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="p-2.5 bg-red-50 rounded-lg shrink-0">
                                        <exp.icon className="text-[#FF0000] w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 leading-snug pt-1">{exp.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Video (Autoplay) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white ring-1 ring-gray-100 relative" ref={videoRef}>
                            {isVideoInView ? (
                                <iframe
                                    src={(getSetting('learning_video_url') || "https://www.youtube.com/embed/oOYWAudEu5E") + "?autoplay=1&mute=1&controls=0&loop=1&playlist=oOYWAudEu5E&rel=0&modestbranding=1"}
                                    title="How Learning Works at SoF"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full opacity-90 scale-100 pointer-events-none"
                                />
                            ) : (
                                <div className="w-full h-full bg-black/80 flex items-center justify-center">
                                    <Play className="w-12 h-12 text-white/50" />
                                </div>
                            )}
                            {/* Overlay Gradient for integration */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                            <div className="bg-red-500 p-3 rounded-full">
                                <Play className="w-5 h-5 text-white fill-white" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 leading-none">Watch Explainer</p>
                                <p className="text-xs text-gray-500 mt-1">2 mins overview</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Image Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group relative"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-xs font-medium">{img.alt}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowLearningWorks;
