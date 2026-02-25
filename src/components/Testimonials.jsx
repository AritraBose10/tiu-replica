import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote, Star, GraduationCap } from 'lucide-react';
import { getDriveImageUrl } from '../utils/driveImage';


// ─── Marquee Row ──────────────────────────────────────────────
const MarqueeRow = ({ testimonials, direction = 'left', speed = 35 }) => {
    const containerRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    // Duplicate items for seamless loop
    const items = [...testimonials, ...testimonials];

    useEffect(() => {
        if (containerRef.current && items.length > 0) {
            // Re-measure whenever items change (e.g. after async API load)
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, [items.length]);

    return (
        <div className="overflow-hidden relative py-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />

            <motion.div
                key={contentWidth}
                ref={containerRef}
                className="flex gap-6 w-max items-start py-8 px-4"
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
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['5deg', '-5deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-5deg', '5deg']);

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            layout
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="group relative flex-shrink-0 w-[380px] cursor-pointer"
        >
            {/* Hover glow */}
            <motion.div layout className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl" />

            <motion.div
                layout
                className="relative bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-7 h-full group-hover:border-[#FF0000]/30 transition-colors duration-500 overflow-hidden flex flex-col"
                style={{ transform: 'translateZ(20px)' }}
            >
                {/* Background gradient mesh */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF0000]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF0000]/10 transition-colors duration-500" />

                {/* Quote icon */}
                <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-10 h-10 text-[#FF0000]" />
                </div>

                {/* Stars */}
                <motion.div layout className="flex gap-1 mb-4 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                </motion.div>

                {/* Quote text */}
                <motion.div
                    layout
                    className="relative z-10 flex-1 mb-6"
                    style={{ transform: 'translateZ(25px)' }}
                >
                    <motion.p
                        layout
                        className={`text-gray-300 text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white' : 'line-clamp-4'}`}
                    >
                        "{testimonial.quote}"
                    </motion.p>
                </motion.div>

                {/* Profile */}
                <motion.div layout className="flex items-center gap-3 pt-4 border-t border-white/5 relative z-10 mt-auto" style={{ transform: 'translateZ(30px)' }}>
                    <div className="relative">
                        <img
                            src={getDriveImageUrl(testimonial.image)}
                            alt={testimonial.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-white/10 group-hover:border-[#FF0000]/40 transition-colors duration-300"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0a12]" />
                    </div>
                    <motion.div layout className="flex-1 min-w-0">
                        <motion.p
                            layout
                            className={`text-white font-semibold text-sm group-hover:text-[#FF0000] transition-colors duration-300 ${isHovered ? '' : 'truncate'}`}
                        >
                            {testimonial.name}
                        </motion.p>
                        <motion.p
                            layout
                            className={`text-gray-500 text-xs ${isHovered ? 'mt-1' : 'truncate'}`}
                        >
                            {testimonial.course}
                        </motion.p>
                    </motion.div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 flex-shrink-0">
                        {testimonial.company}
                    </span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// ─── Main Section — Single Strip ──────────────────────────────
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) setTestimonials(data);
            })
            .catch(() => { });
    }, []);

    return (
        <section className="py-16 bg-[#020205] relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020205] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020205] to-transparent z-20 pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 mb-10 relative z-10">
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
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-4">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-500 to-[#FF0000]">
                            Students
                        </span>{' '}
                        Say
                    </h2>
                </motion.div>
            </div>

            {/* Single marquee row */}
            <div className="relative z-10">
                <MarqueeRow testimonials={testimonials} direction="left" speed={50} />
            </div>
        </section>
    );
};

export default Testimonials;
