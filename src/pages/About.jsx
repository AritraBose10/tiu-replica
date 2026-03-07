import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Lightbulb, Users, Globe, Rocket, Award, Building, ChevronRight, Play, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';
import { useSettings } from '../contexts/SettingsContext';

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, suffix = '' }) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const end = parseInt(value);
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isVisible, value]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// --- 3D Tilt Feature Card Component (Premium Dark Design) ---
const TiltFeatureCard = ({ icon: Icon, title, description, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative cursor-pointer h-full"
        >
            {/* Hover Glow Effect - Subtle Red */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl" />

            {/* Card Content */}
            <div className="relative h-full bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden group-hover:border-[#FF0000]/30 transition-colors duration-500" style={{ transform: "translateZ(20px)" }}>

                {/* Background Gradient Mesh */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF0000]/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                    {/* Icon Container */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a12] rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg group-hover:shadow-[0_0_20px_rgba(255,0,0,0.2)] group-hover:border-[#FF0000]/30 transition-all duration-300"
                    >
                        <Icon className="w-7 h-7 text-white group-hover:text-[#FF0000] transition-colors duration-300" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF0000] transition-colors duration-300 flex items-center gap-2">
                        {title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed flex-grow">
                        {description}
                    </p>

                    {/* Bottom Action Area */}
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase group-hover:text-white transition-colors duration-300">Learn More</span>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="bg-white/5 p-2 rounded-full group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-300"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Floating Background Component ---
const FloatingBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[#FF0000]/5 rounded-full blur-[120px]"
        />
        <motion.div
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]"
        />
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px]"
        />
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
    </div>
);

// --- Main About Page ---
const About = () => {
    const { getSetting } = useSettings();
    const heroBg = getSetting('about_hero_bg', '');
    const campusImg = getSetting('about_campus_image', '');

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const features = [
        { icon: Lightbulb, title: 'Built for Innovation', description: 'Curriculum designed to foster creative thinking and problem-solving skills for the modern world.' },
        { icon: Users, title: 'Expert Faculty', description: 'Learn from industry veterans and academic pioneers who bring real-world experience to the classroom.' },
        { icon: Globe, title: 'Real-World Exposure', description: 'Internships, industry projects, and global collaborations prepare you for success anywhere.' },
        { icon: Rocket, title: 'Entrepreneurial Mindset', description: 'We nurture innovators, risk-takers, and future business leaders through dedicated programs.' },
    ];

    const stats = [
        { value: '25', suffix: '+', label: 'Years of Excellence' },
        { value: '15000', suffix: '+', label: 'Students Enrolled' },
        { value: '500', suffix: '+', label: 'Expert Faculty' },
        { value: '50', suffix: '+', label: 'Global Partners' },
    ];

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <SEO
                title="About School Of The Future | Legacy of Innovation & Learning"
                description="Discover the School of the Future’s mission and vision. Backed by seasoned industry experts and academic leaders, 15,000+ students and global partners drive innovation-led education."
            />
            <SchemaInjector schema={{
                "@context": "https://schema.org",
                "@type": "CollegeOrUniversity",
                "name": "School of the Future — Techno India University",
                "alternateName": "SoF TIU",
                "url": "https://www.technoindiauniversity.ai",
                "logo": "https://www.technoindiauniversity.ai/image.png",
                "description": "School of the Future is a future-focused academic school under Techno India University offering Google Cloud & IBM-powered programs in AI, Cloud, Data Science, Business, Design and Allied Health Sciences.",
                "foundingDate": "2001",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "EM-4, Sector V, Salt Lake",
                    "addressLocality": "Kolkata",
                    "addressRegion": "West Bengal",
                    "postalCode": "700091",
                    "addressCountry": "IN"
                },
                "telephone": "+91-8062642222",
                "hasCredential": [
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "UGC Recognition" },
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "NAAC Accreditation" },
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "AICTE Approval" }
                ]
            }} />
            <FloatingBackground />

            {/* === HERO SECTION === */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={heroBg}
                        alt="Students"
                        className="w-full h-[120%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/80 to-[#020205]/40" />
                </motion.div>

                {/* Large Background Text */}
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-[20vw] font-black text-white/[0.03] tracking-tighter select-none">
                        TIU
                    </span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/20 shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 text-[#FF0000]" />
                            Established in 2000
                            <Award className="w-4 h-4 text-yellow-400" />
                        </motion.span>

                        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
                            <motion.span
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Shaping
                            </motion.span> <br />
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                                className="relative inline-block"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-500 to-[#FF0000] animate-gradient-x">Tomorrow</span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left rounded-full"
                                />
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                , Today
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
                        >
                            Techno India University is a beacon of innovation in West Bengal, committed to transforming lives through world-class education and research.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,0,0,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/apply"
                                    className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(255,0,0,0.4)] border border-white/10"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Discover More
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 border border-white/20"
                            >
                                <Play className="w-5 h-5" />
                                Watch Video
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-7 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 backdrop-blur-sm">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-2 h-3 bg-[#FF0000] rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* === STATS SECTION === */}
            <section className="py-24 bg-[#050510] relative overflow-hidden">
                {/* Animated Grid Lines */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer"
                            >
                                <motion.div
                                    className="text-5xl md:text-7xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-2"
                                    whileHover={{ textShadow: "0 0 30px rgba(255,0,0,0.5)" }}
                                >
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </motion.div>
                                <p className="text-gray-500 font-medium group-hover:text-[#FF0000] transition-colors">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === FEATURE CARDS SECTION === */}
            <section id="features" className="py-28 px-4 bg-[#020205] relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20"
                        >
                            Why Choose Us
                        </motion.span>
                        <h2 className="text-4xl md:text-7xl font-black text-white mt-4">
                            The TIU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Difference</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10" style={{ perspective: "1000px" }}>
                        {features.map((feature, i) => (
                            <TiltFeatureCard key={i} {...feature} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* === MISSION & VISION === */}
            <section className="py-28 px-4 bg-gradient-to-b from-[#020205] via-[#0a0a1a] to-[#020205] relative overflow-hidden">
                {/* Floating Orb */}
                <motion.div
                    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 right-20 w-80 h-80 bg-[#FF0000]/10 rounded-full blur-[100px]"
                />

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">Our Purpose</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8">Mission & Vision</h2>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ x: 10, borderColor: "rgba(255,0,0,0.5)" }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-[#FF0000] mb-3 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" /> Our Mission
                                </h3>
                                <p className="text-gray-400 leading-relaxed">To provide accessible, high-quality education that empowers students to become innovative thinkers, responsible citizens, and global leaders.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ x: 10, borderColor: "rgba(255,0,0,0.5)" }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-[#FF0000] mb-3 flex items-center gap-2">
                                    <Rocket className="w-5 h-5" /> Our Vision
                                </h3>
                                <p className="text-gray-400 leading-relaxed">To be a world-class university recognized for academic excellence, cutting-edge research, and its contribution to society.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -inset-4 bg-gradient-to-r from-[#FF0000]/30 to-blue-500/30 rounded-3xl blur-3xl opacity-50"
                        />
                        <img
                            src={campusImg}
                            alt="Campus"
                            className="relative rounded-3xl shadow-2xl border border-white/10"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute -bottom-8 -right-8 bg-gradient-to-br from-[#FF0000] to-[#990000] text-white p-6 rounded-2xl shadow-xl border border-white/10"
                        >
                            <Building className="w-8 h-8 mb-2" />
                            <p className="font-bold">State-of-the-Art Campus</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === CTA SECTION === */}
            <section className="py-32 px-4 bg-[#020205] relative overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0000]/20 rounded-full blur-[150px]"
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-block mb-6"
                        >
                            <Sparkles className="w-12 h-12 text-[#FF0000]" />
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6">
                            Ready to Begin <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Your Journey?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                            Join thousands of students who are shaping their future at Techno India University.
                        </p>
                        <motion.div
                            className="inline-flex"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/apply"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-12 py-6 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,0,0,0.6)] border border-white/10 transition-shadow duration-300"
                            >
                                Apply for Admissions
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    <ArrowUpRight className="w-6 h-6" />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
