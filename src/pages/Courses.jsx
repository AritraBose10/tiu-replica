import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Search, Filter, Sparkles, ArrowUpRight, Zap, Code, Database, Palette, Microscope, ChevronLeft, ChevronRight } from 'lucide-react';
import coursesData from '../data/mock_courses.json';
import { useSanity } from '../hooks/useSanity';
import { COURSES_QUERY } from '../lib/queries';
import SEO from '../components/SEO';

// --- 3D Tilt Card Component ---
const TiltCard = ({ course, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const getIcon = (cat) => {
        if (cat.includes('Engineering')) return <Code className="w-6 h-6" />;
        if (cat.includes('Data') || cat.includes('Computer')) return <Database className="w-6 h-6" />;
        if (cat.includes('Design')) return <Palette className="w-6 h-6" />;
        return <Zap className="w-6 h-6" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[420px] w-full rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 p-1 group perspective-1000 cursor-pointer"
        >
            {/* Neon Glow Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ transform: "translateZ(-50px)" }}
            />

            <div className="relative h-full w-full bg-[#0a0a0f] rounded-[22px] overflow-hidden p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>

                {/* Top Section */}
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className="bg-white/5 text-white/80 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                            {getIcon(course.category)}
                            {course.category}
                        </span>
                        {course.title.includes('Google') && (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-5 opacity-80 grayscale group-hover:grayscale-0 transition-all" />
                        )}
                        {course.title.includes('IBM') && (
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                        )}
                    </div>

                    <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#FF0000] transition-colors duration-300">
                        {course.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {course.description}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="relative pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center">
                        <div className="text-white/60 text-sm">
                            <span className="block text-xs uppercase tracking-wider text-[#FF0000] font-bold mb-0.5">Duration</span>
                            4 Years
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/10 group-hover:bg-[#FF0000] group-hover:border-[#FF0000] transition-all duration-300"
                        >
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Helper to determine degree level ---
const getDegreeLevel = (title) => {
    const ugKeywords = ['B.Tech', 'BCA', 'BBA', 'B.Des', 'B.Sc', 'Bachelor'];
    const pgKeywords = ['M.Tech', 'MBA', 'MCA', 'M.Sc', 'Master', 'Ph.D'];

    if (ugKeywords.some(keyword => title.includes(keyword))) return 'UG';
    if (pgKeywords.some(keyword => title.includes(keyword))) return 'PG';
    return 'UG'; // Default
};

// --- Main Page Component ---
const Courses = () => {
    const { data: allCourses } = useSanity(COURSES_QUERY, coursesData);
    const [filteredCourses, setFilteredCourses] = useState(allCourses);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [degreeType, setDegreeType] = useState('UG'); // New State: UG or PG
    const scrollContainerRef = useRef(null);

    const degreeTabs = ['UG', 'PG'];
    const categoryTabs = ['All', 'School of Engineering & Technology', 'Information Technology & Applied Sciences', 'School of Business & Management', 'Creative Arts & Design', 'Health & Allied Sciences'];

    const scroll = (offset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        let results = allCourses;

        // 1. Filter by Degree Level (UG/PG)
        results = results.filter(c => getDegreeLevel(c.title) === degreeType);

        // 2. Filter by Category
        if (activeTab !== 'All') {
            results = results.filter(c => c.category.includes(activeTab));
        }

        // 3. Filter by Search
        if (searchTerm) {
            results = results.filter(c =>
                c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCourses(results);
    }, [searchTerm, activeTab, degreeType, allCourses]);

    return (
        <div className="min-h-screen bg-[#020205] text-white relative overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <SEO
                title="Future-Ready Programs After 12th & Graduation | School of the Future"
                description="Explore UG, PG & PhD programs in AI, Data Science, Business Analytics, Design, Media & Allied Health at the School of the Future."
            />

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">

                {/* Hero Header */}
                <div className="mb-20 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
                    >
                        FUTURE READY
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF0000] to-pink-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(255,0,0,0.4)] mb-6">
                            <Sparkles className="w-4 h-4 text-white" />
                            World Class Education
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                            Discover Your <br />
                            <span className="text-white relative">
                                Potential
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute -bottom-2 nav-underline left-0 w-full"
                                    viewBox="0 0 100 10" // Adjusted viewBox
                                    preserveAspectRatio="none"
                                >
                                    <path d="M0 5 Q 50 10 100 5" stroke="#FF0000" strokeWidth="3" fill="none" />
                                </motion.svg>
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Explore our wide range of industry-aligned programs designed to launch your career in the digital age.
                        </p>
                    </motion.div>
                </div>

                {/* Search & Filter Bar */}
                <div className="sticky top-24 z-50 mb-16 space-y-6">
                    <div className="glass-panel bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl space-y-6">

                        {/* Top Section: UG/PG Selector & Search */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">

                            {/* Level 1: UG / PG Selector */}
                            <div className="inline-flex bg-black/20 p-1 rounded-full relative">
                                {degreeTabs.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setDegreeType(type)}
                                        className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10 ${degreeType === type ? 'text-white' : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {type === 'UG' ? 'Undergraduate' : 'Postgraduate'}
                                        {degreeType === type && (
                                            <motion.div
                                                layoutId="activeDegree"
                                                className="absolute inset-0 bg-[#FF0000] rounded-full shadow-lg"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                style={{ zIndex: -1 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Search (Moved to Top) */}
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF0000] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search programs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-full pl-12 pr-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Bottom Section: Categories with Scroll Arrows */}
                        <div className="relative flex items-center gap-3">

                            {/* Left Scroll Arrow */}
                            <button
                                onClick={() => scroll(-200)}
                                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white text-gray-400 transition-all duration-300 flex-shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Level 2: Category Tabs */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full scrollbar-hide scroll-smooth"
                            >
                                {categoryTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activePill"
                                                className="absolute inset-0 bg-[#FF0000] rounded-full shadow-[0_0_15px_#FF0000]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Right Scroll Arrow */}
                            <button
                                onClick={() => scroll(200)}
                                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white text-gray-400 transition-all duration-300 flex-shrink-0"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredCourses.map((course, index) => (
                            <TiltCard key={course.id} course={course} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCourses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex bg-white/5 p-6 rounded-full mb-6">
                            <Search className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No programs found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search query</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default Courses;
