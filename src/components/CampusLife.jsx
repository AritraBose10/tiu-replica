import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Music, Users, Palette, BookOpen, Trophy } from 'lucide-react';
const CampusLife = () => {

    const campusItems = [
        {
            icon: Trophy,
            title: 'Tech Fests & Hackathons',
            span: 'col-span-2 row-span-2',
            gradient: 'from-[#FF0000]/20 to-orange-600/10',
            imageSrc: '/assets/images/TechFests.JPG',
        },
        {
            icon: Music,
            title: 'Cultural Events',
            span: 'col-span-1 row-span-1',
            gradient: 'from-purple-500/20 to-pink-600/10',
            imageSrc: '/assets/images/Cultural.jpg',
        },
        {
            icon: Users,
            title: 'Student Clubs',
            span: 'col-span-1 row-span-1',
            gradient: 'from-blue-500/20 to-cyan-600/10',
            imageSrc: '/assets/images/Student.jpg',
        },
        {
            icon: Palette,
            title: 'Design Studios',
            span: 'col-span-1 row-span-1',
            gradient: 'from-amber-500/20 to-yellow-600/10',
            imageSrc: '/assets/images/design.jpg',
        },
        {
            icon: BookOpen,
            title: 'Workshops & Seminars',
            span: 'col-span-1 row-span-1',
            gradient: 'from-emerald-500/20 to-green-600/10',
            imageSrc: '/assets/images/seminar.jpg',
        },
        {
            icon: Camera,
            title: 'Industry Exposure',
            span: 'col-span-2 row-span-1',
            gradient: 'from-indigo-500/20 to-violet-600/10',
            imageSrc: '/assets/images/industryexposure.jpg',
        },
    ];

    return (
        <section className="py-20 px-0 bg-white overflow-hidden">
            <div className="w-[90%] md:w-[70%] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
                        Student Life
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Campus Life That Builds{' '}
                        <span className="text-[#FF0000]">Confidence</span>,<br />
                        Not Just Attendance
                    </h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        At SoF, learning continues beyond classrooms — through clubs, events, industry exposure
                        and campus communities that shape confident professionals.
                    </p>
                </motion.div>

                {/* Instagram-Style Grid */}
                <div className="grid grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-4">
                    {campusItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ scale: 1.03 }}
                            className={`${item.span} rounded-2xl overflow-hidden relative group cursor-pointer`}
                        >
                            {/* Background Image / Gradient Fallback */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                            <img
                                src={item.imageSrc}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
                                <item.icon className="text-white" size={18} />
                                <span className="text-white font-bold text-sm">{item.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CampusLife;
