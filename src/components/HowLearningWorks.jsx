import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Wrench, Trophy, Users } from 'lucide-react';

const experiences = [
    { icon: BookOpen, label: 'Classroom learning supported by modern labs' },
    { icon: Wrench, label: 'Industry tools and real datasets' },
    { icon: Trophy, label: 'Hackathons, studios and challenges' },
    { icon: Users, label: 'Faculty mentorship and industry interaction' },
];

const galleryImages = [
    { src: '/images/learning-lab.jpg', alt: 'Students in a modern computer lab' },
    { src: '/images/learning-collab.jpg', alt: 'Collaborative project work' },
    { src: '/images/learning-mentor.jpg', alt: 'Faculty mentoring students' },
    { src: '/images/learning-hackathon.jpg', alt: 'Hackathon in progress' },
];

const HowLearningWorks = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        How Learning Works at the{' '}
                        <span className="text-[#FF0000]">School of the Future</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        Learning at SoF combines concepts, labs and projects to build long-term career readiness.
                    </p>
                </motion.div>

                {/* Experience Points */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                        >
                            <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                                <exp.icon className="text-[#FF0000]" size={20} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{exp.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Video Embed (lazy-loaded) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="aspect-video rounded-3xl overflow-hidden bg-gray-900 relative group cursor-pointer shadow-2xl">
                        {!videoLoaded ? (
                            <div
                                className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center"
                                onClick={() => setVideoLoaded(true)}
                            >
                                <div className="text-center">
                                    <motion.div
                                        className="inline-flex p-5 bg-[#FF0000] rounded-full mb-4"
                                        whileHover={{ scale: 1.1 }}
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Play className="text-white" size={36} fill="white" />
                                    </motion.div>
                                    <p className="text-white font-bold text-lg">How Learning Works at SoF</p>
                                    <p className="text-gray-400 text-sm mt-1">Watch the explainer (2-3 min)</p>
                                </div>
                            </div>
                        ) : (
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="How Learning Works at SoF"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        )}
                    </div>
                </motion.div>

                {/* Image Carousel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><span class="text-gray-400 text-xs text-center px-2">${img.alt}</span></div>`;
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowLearningWorks;
