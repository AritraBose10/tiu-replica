import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, GraduationCap, ChevronRight, ArrowUpRight } from 'lucide-react';

const categories = [
    { id: 'engineering', label: 'Engineering & Tech' },
    { id: 'it_applied', label: 'IT & Applied Sciences' },
    { id: 'business', label: 'Business & Management' },
    { id: 'creative', label: 'Creative Arts & Design' },
    { id: 'health', label: 'Health & Allied Sciences' },
];

const courses = {
    engineering: [
        {
            id: 1,
            title: 'B.Tech in Computer Science & Engineering',
            subtitle: 'Powered by Google Cloud',
            partner: 'Google',
            duration: '4 Years',
            eligibility: '10+2 with PCM',
            badge: 'Bachelor',
        },
        {
            id: 2,
            title: 'B.Tech CSE - AI & Machine Learning',
            subtitle: 'Powered by Google Cloud',
            partner: 'Google',
            duration: '4 Years',
            eligibility: '10+2 with PCM',
            badge: 'Bachelor',
        },
        {
            id: 3,
            title: 'B.Tech CSE - Cloud Computing',
            subtitle: 'Powered by Google Cloud',
            partner: 'Google',
            duration: '4 Years',
            eligibility: '10+2 with PCM',
            badge: 'Bachelor',
        },
    ],
    it_applied: [
        {
            id: 4,
            title: 'BCA with Data Science & AI',
            subtitle: 'Powered by IBM',
            partner: 'IBM',
            duration: '3 Years',
            eligibility: '10+2 any stream',
            badge: 'Bachelor',
        },
        {
            id: 5,
            title: 'B.Sc (H) Cyber Security',
            subtitle: 'Powered by IBM',
            partner: 'IBM',
            duration: '3 Years',
            eligibility: '10+2 with Science',
            badge: 'Bachelor',
        },
        {
            id: 6,
            title: 'M.Sc in Data Science & AI',
            subtitle: 'Advanced Specialization',
            partner: 'Tech',
            duration: '2 Years',
            eligibility: 'Graduation',
            badge: 'Master',
        },
    ],
    business: [
        {
            id: 7,
            title: 'BBA Business Analytics & AI',
            subtitle: 'Powered by IBM',
            partner: 'IBM',
            duration: '3 Years',
            eligibility: '10+2 any stream',
            badge: 'Bachelor',
        },
        {
            id: 8,
            title: 'MBA Business Analytics & AI',
            subtitle: 'Powered by IBM',
            partner: 'IBM',
            duration: '2 Years',
            eligibility: 'Graduation',
            badge: 'Master',
        },
    ],
    creative: [
        {
            id: 9,
            title: 'B.Des Visual Communication',
            subtitle: 'Digital Design Focus',
            partner: 'Design',
            duration: '4 Years',
            eligibility: '10+2 any stream',
            badge: 'Bachelor',
        },
        {
            id: 10,
            title: 'B.Sc (H) Game Development',
            subtitle: 'Unity & Unreal Engine',
            partner: 'Gaming',
            duration: '3 Years',
            eligibility: '10+2 with Science',
            badge: 'Bachelor',
        },
    ],
    health: [
        {
            id: 11,
            title: 'B.Sc (H) Cardiovascular Tech',
            subtitle: 'Medical Specialization',
            partner: 'Health',
            duration: '4 Years',
            eligibility: '10+2 with PCB',
            badge: 'Bachelor',
        },
        {
            id: 12,
            title: 'Bachelor of Physiotherapy',
            subtitle: 'Clinical Practice',
            partner: 'Health',
            duration: '4.5 Years',
            eligibility: '10+2 with PCB',
            badge: 'Bachelor',
        },
    ],
};

const ProgramsSection = () => {
    const [activeCategory, setActiveCategory] = useState('engineering');

    return (
        <section className="bg-[#050510] py-24 px-4 overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-40 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-14">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#FF0000] text-sm font-bold tracking-wider uppercase bg-[#FF0000]/10 px-3 py-1 rounded-full">
                            Academic Excellence
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-4 flex items-center gap-4">
                            <span className="w-1.5 h-12 bg-[#FF0000] rounded-full"></span>
                            Explore Programs
                        </h2>
                    </motion.div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group ${activeCategory === category.id
                                ? 'text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="relative z-10">{category.label}</span>
                            {activeCategory === category.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[#FF0000]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Course Cards Grid */}
                <motion.div
                    layout
                    className="flex flex-wrap gap-8"
                >
                    <AnimatePresence mode='wait'>
                        {courses[activeCategory]?.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative bg-[#11111f] rounded-3xl p-1 overflow-hidden"
                                style={{ width: 'calc(33.333% - 22px)', minWidth: '280px', flexGrow: 0 }}
                            >
                                {/* Hover Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative bg-[#0a0a1a] h-full rounded-[20px] p-8 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                    {/* Badge */}
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-white/5 text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-wide">
                                            {course.badge}
                                        </span>
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 45 }}
                                            className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center cursor-pointer"
                                        >
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </motion.div>
                                    </div>

                                    {/* Title */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#FF0000] transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium">
                                            {course.subtitle}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-bold">
                                                <Clock className="w-3 h-3" />
                                                Duration
                                            </div>
                                            <p className="text-white font-semibold">{course.duration}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-bold">
                                                <GraduationCap className="w-3 h-3" />
                                                Eligibility
                                            </div>
                                            <p className="text-white font-semibold">{course.eligibility}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 flex justify-start"
                >
                    <Link
                        to="/courses"
                        className="group inline-flex items-center gap-3 text-white transition-colors font-semibold px-8 py-3 rounded-full border border-white/10 hover:bg-white/5"
                    >
                        View All Programs
                        <span className="bg-[#FF0000] rounded-full p-1 group-hover:translate-x-1 transition-transform">
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProgramsSection;
