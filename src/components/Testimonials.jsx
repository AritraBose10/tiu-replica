import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote, Star, GraduationCap, Sparkles } from 'lucide-react';

// ─── Mock Testimonials ───────────────────────────────────────
const testimonialsRow1 = [
    {
        name: 'Aarav Sharma',
        course: 'B.Tech CSE, Batch 2024',
        quote: 'TIU transformed my career trajectory. The AI/ML lab and mentorship from professors helped me land a role at Google right after graduation.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        company: 'Google',
    },
    {
        name: 'Priya Patel',
        course: 'MBA, Batch 2023',
        quote: 'The industry exposure at TIU is unmatched. From internships at top MNCs to a vibrant campus life, every moment here was invaluable.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        company: 'Microsoft',
    },
    {
        name: 'Rohit Das',
        course: 'B.Tech ECE, Batch 2025',
        quote: 'The robotics club and the IoT lab gave me hands-on experience that no textbook could. I built my first startup prototype here.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        company: 'Startup Founder',
    },
    {
        name: 'Ananya Roy',
        course: 'B.Sc Data Science, Batch 2024',
        quote: 'TIU\'s data science program is world-class. The curriculum is constantly updated and the placement cell worked tirelessly for us.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        company: 'Amazon',
    },
    {
        name: 'Vikram Singh',
        course: 'M.Tech AI, Batch 2023',
        quote: 'Publishing two research papers during my M.Tech was possible because of the incredible faculty support and state-of-the-art labs.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        company: 'DeepMind',
    },
];

const testimonialsRow2 = [
    {
        name: 'Sneha Mukherjee',
        course: 'BBA, Batch 2024',
        quote: 'The entrepreneurship incubator at TIU helped me launch my e-commerce brand while still in college. The mentorship ecosystem is phenomenal.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        company: 'Founder, ShopEase',
    },
    {
        name: 'Arjun Nair',
        course: 'B.Tech CSE, Batch 2025',
        quote: 'The hackathon culture here is electrifying. I\'ve won 3 national hackathons and the coding community is incredibly supportive.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        company: 'Flipkart',
    },
    {
        name: 'Diya Ghosh',
        course: 'M.Sc Biotechnology, Batch 2023',
        quote: 'TIU\'s biotech labs are equipped with the latest instruments. My research on gene editing was recognized at an international conference.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        company: 'Biocon',
    },
    {
        name: 'Kabir Ahmed',
        course: 'B.Tech Mechanical, Batch 2024',
        quote: 'From Formula Student racing to industry internships in Germany, TIU gave me global exposure I never imagined possible.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
        company: 'Bosch',
    },
    {
        name: 'Riya Chatterjee',
        course: 'B.Tech IT, Batch 2025',
        quote: 'The Google and IBM certification programs integrated into the curriculum gave me an edge that no other university offers.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        company: 'IBM',
    },
];

// ─── Marquee Row ──────────────────────────────────────────────
const MarqueeRow = ({ testimonials, direction = 'left', speed = 35 }) => {
    const containerRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    // Duplicate items for seamless loop
    const items = [...testimonials, ...testimonials];

    useEffect(() => {
        if (containerRef.current) {
            // Width of one set of items
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    return (
        <div className="overflow-hidden relative py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={containerRef}
                className="flex gap-6 w-max"
                animate={{
                    x: direction === 'left' ? [0, -contentWidth] : [-contentWidth, 0],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: speed,
                        ease: 'linear',
                    },
                }}
            >
                {items.map((t, i) => (
                    <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
                ))}
            </motion.div>
        </div>
    );
};

// ─── 3D Tilt Testimonial Card ─────────────────────────────────
const TestimonialCard = ({ testimonial }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex-shrink-0 w-[380px] cursor-pointer"
        >
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl" />

            <div
                className="relative bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-7 h-full group-hover:border-[#FF0000]/30 transition-colors duration-500 overflow-hidden"
                style={{ transform: 'translateZ(20px)' }}
            >
                {/* Background gradient mesh */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF0000]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF0000]/10 transition-colors duration-500" />

                {/* Quote icon */}
                <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-10 h-10 text-[#FF0000]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10 line-clamp-4" style={{ transform: 'translateZ(25px)' }}>
                    "{testimonial.quote}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <div className="relative">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-white/10 group-hover:border-[#FF0000]/40 transition-colors duration-300"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a12]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm group-hover:text-[#FF0000] transition-colors duration-300 truncate">
                            {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-xs truncate">{testimonial.course}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 flex-shrink-0">
                        {testimonial.company}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main Section ─────────────────────────────────────────────
const Testimonials = () => {
    return (
        <section className="py-24 bg-[#020205] relative overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Floating orbs */}
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-[#FF0000]/5 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-purple-600/5 rounded-full blur-[100px]"
            />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 mb-14 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20"
                    >
                        <GraduationCap className="w-4 h-4" />
                        Student Voices
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-black text-white mt-4">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-500 to-[#FF0000]">
                            Students
                        </span>{' '}
                        Say
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                        Hear from the brilliant minds who shaped their future at Techno India University.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Rows */}
            <div className="relative z-10 space-y-4">
                <MarqueeRow testimonials={testimonialsRow1} direction="left" speed={40} />
                <MarqueeRow testimonials={testimonialsRow2} direction="right" speed={45} />
            </div>

            {/* Bottom stat bar */}
            <div className="max-w-5xl mx-auto px-4 mt-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { value: '4.8/5', label: 'Student Satisfaction' },
                        { value: '95%', label: 'Would Recommend' },
                        { value: '10,000+', label: 'Happy Alumni' },
                        { value: '50+', label: 'Companies Hire From Us' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="text-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer group"
                        >
                            <p className="text-3xl md:text-4xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </p>
                            <p className="text-gray-500 text-xs font-medium group-hover:text-[#FF0000] transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
