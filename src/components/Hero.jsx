import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, Building2, Globe, ArrowRight } from 'lucide-react';
import ShatterHeroImage from './ShatterHeroImage';

/* ─── Stat Badge Data ─── */
const statBadges = [
    { icon: DollarSign, title: 'HIGHEST PACKAGE', value: '$150k+' },
    { icon: Building2, title: 'GLOBAL FORTUNE 500', value: 'Top Recruiters' },
    { icon: CheckCircle, title: 'PLACEMENT SUPPORT', value: '100%' },
    { icon: Globe, title: 'GLOBAL ALUMNI', value: '50k+' },
];

/* ═══════════════════════════════════════════
   METRICS BAR — ARROW PROCESS (GLASSMORPHISM)
   Inline SVG chevrons with visible stroke borders,
   frosted glass fill, icon centered above label.
   ═══════════════════════════════════════════ */
const ARROW_W = 250;   // viewBox width per arrow
const ARROW_H = 80;    // viewBox height per arrow
const TIP = 28;        // how far the point extends
const R = 8;           // corner radius
const OVERLAP = 18;    // px each arrow overlaps the previous

// Generate the SVG path for one arrow shape
const arrowPath = (isFirst, isLast) => {
    const w = ARROW_W;
    const h = ARROW_H;
    const t = TIP;
    const r = R;

    if (isFirst) {
        return `
            M ${r} 0
            L ${w - t} 0
            L ${w} ${h / 2}
            L ${w - t} ${h}
            L ${r} ${h}
            Q 0 ${h} 0 ${h - r}
            L 0 ${r}
            Q 0 0 ${r} 0
            Z`;
    }
    if (isLast) {
        return `
            M 0 0
            L ${w - r} 0
            Q ${w} 0 ${w} ${r}
            L ${w} ${h - r}
            Q ${w} ${h} ${w - r} ${h}
            L 0 ${h}
            L ${t} ${h / 2}
            Z`;
    }
    return `
        M 0 0
        L ${w - t} 0
        L ${w} ${h / 2}
        L ${w - t} ${h}
        L 0 ${h}
        L ${t} ${h / 2}
        Z`;
};

const MetricsBar = () => {
    const [startIdx, setStartIdx] = useState(statBadges.length);

    useEffect(() => {
        const timers = [];
        timers.push(setTimeout(() => setStartIdx(3), 1200));
        timers.push(setTimeout(() => setStartIdx(2), 1600));
        timers.push(setTimeout(() => setStartIdx(1), 2000));
        timers.push(setTimeout(() => setStartIdx(0), 2400));
        return () => timers.forEach(clearTimeout);
    }, []);

    const visibleBadges = statBadges.slice(startIdx);

    return (
        <div className="w-full max-w-5xl mx-auto mt-4 px-2 h-[112px] flex items-center justify-center">
            <div className="flex items-center justify-center overflow-visible py-4 w-full">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visibleBadges.map((badge, i) => {
                        const realIndex = statBadges.indexOf(badge);
                        const isFirst = realIndex === 0;
                        const isLast = realIndex === statBadges.length - 1;
                        const d = arrowPath(isFirst, isLast);

                        return (
                            <motion.div
                                key={badge.title}
                                layout
                                initial={{ x: -100, opacity: 0, scale: 0.9 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 180,
                                    damping: 24,
                                    mass: 1,
                                }}
                                className="relative group"
                                style={{
                                    width: `${ARROW_W}px`,
                                    height: `${ARROW_H}px`,
                                    marginLeft: i === 0 ? 0 : `-${OVERLAP}px`,
                                    zIndex: statBadges.length - realIndex,
                                    flexShrink: 0,
                                }}
                            >
                                {/* SVG arrow — transparent with white border & slight fill */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    viewBox={`0 0 ${ARROW_W} ${ARROW_H}`}
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Very subtle white fill for body presence */}
                                    <path d={d} fill="rgba(255,255,255,0.02)" />
                                    {/* Smooth White Border */}
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {/* Inner Shine - Optional */}
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="3"
                                        className="opacity-20"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                {/* The ACTUAL Frosted Glass Filter Layer */}
                                <div
                                    className="absolute inset-0 -z-10"
                                    style={{
                                        clipPath: `path('${d.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()}')`,
                                        backdropFilter: 'blur(6px)',
                                        WebkitBackdropFilter: 'blur(6px)',
                                        backgroundColor: 'rgba(255,255,255,0.03)', // Increased Transparency
                                        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2)'
                                    }}
                                />

                                {/* Content */}
                                <div
                                    className="absolute inset-0 flex items-center gap-3"
                                    style={{
                                        paddingLeft: isFirst ? '24px' : `${TIP + 14}px`,
                                        paddingRight: isLast ? '16px' : `${TIP + 4}px`,
                                    }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        {React.createElement(badge.icon, { className: "w-5 h-5 text-white/80" })}
                                    </div>
                                    <div className="min-w-0 flex flex-col justify-center">
                                        <p className="text-white font-bold text-sm leading-tight tracking-wide">
                                            {badge.value}
                                        </p>
                                        <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest leading-tight truncate">
                                            {badge.title}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ─── Wireframe Components ─── */
const ExteriorWireframe = () => (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block w-[400px] h-[550px] overflow-hidden z-[2] mix-blend-screen"
        style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
        }}>
        <img
            src="/wireframes/exterior.jpg"
            alt=""
            className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
        />
    </div>
);

const InteriorWireframe = () => (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block w-[400px] h-[550px] overflow-hidden z-[2] mix-blend-screen"
        style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
        }}>
        <img
            src="/wireframes/interior.jpg"
            alt=""
            className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
        />
    </div>
);

/* ═══════════════════════════════════════════
   TIU ANIMATION COMPONENT
   ═══════════════════════════════════════════ */
const TiuText = () => {
    const letterVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    const suffixVariants = {
        hidden: { width: 0, opacity: 0, overflow: "hidden" },
        visible: {
            width: "auto",
            opacity: 1,
            transition: {
                delay: 1.5,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            },
            transitionEnd: {
                overflow: "visible"
            }
        }
    };

    const spaceVariants = {
        hidden: { width: 0 },
        visible: {
            width: "0.4ch",
            transition: { delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            className="flex flex-wrap justify-center text-[#FF0000] font-black tracking-tighter"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
        >
            {/* T-ECHNO */}
            <span className="inline-flex items-baseline">
                <motion.span variants={letterVariants}>T</motion.span>
                <motion.span
                    variants={suffixVariants}
                    className="overflow-hidden whitespace-nowrap pr-0.5"
                >
                    ECHNO
                </motion.span>
            </span>

            <motion.span variants={spaceVariants} />

            {/* I-NDIA */}
            <span className="inline-flex items-baseline">
                <motion.span variants={letterVariants}>I</motion.span>
                <motion.span
                    variants={suffixVariants}
                    className="overflow-hidden whitespace-nowrap pr-0.5"
                >
                    NDIA
                </motion.span>
            </span>

            <motion.span variants={spaceVariants} />

            {/* U-NIVERSITY */}
            <span className="inline-flex items-baseline">
                <motion.span variants={letterVariants}>U</motion.span>
                <motion.span
                    variants={suffixVariants}
                    className="overflow-hidden whitespace-nowrap pr-0.5"
                >
                    NIVERSITY
                </motion.span>
            </span>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════ */
const Hero = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    };

    const fadeScale = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#0A0A0A] pt-28 md:pt-20 pb-6">
            {/* ── Subtle Grid Background ── */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* ── Vignette overlay ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0A0A0A_80%)] pointer-events-none z-[1]" />

            {/* ── Architectural Wireframes ── */}
            <ExteriorWireframe />
            <InteriorWireframe />

            {/* ── Ambient red glow ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

            {/* ═══ MAIN CONTENT ═══ */}
            <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* ── Heading ── */}
                <motion.div className="text-center mb-4 md:mb-6" variants={fadeUp}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tight">
                        <span className="text-white">SHAPE YOUR FUTURE </span>
                        <span className="text-gray-500 font-light lowercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl">at</span>
                        <br />
                        <TiuText />
                    </h1>
                </motion.div>

                {/* ── Subtitle ── */}
                <motion.p
                    className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
                    variants={fadeUp}
                >
                    The School of the Future offers interdisciplinary programs that blend modern technologies
                    and innovation, equipping students to excel in a rapidly changing world.
                </motion.p>

                {/* ═══ CENTER IMAGE ═══ */}
                <div className="relative w-full max-w-5xl mx-auto mb-2 md:mb-4">
                    <ShatterHeroImage />
                </div>

                {/* ═══ METRICS BAR ═══ */}
                <div className="relative z-20 mb-6 md:mb-8">
                    <MetricsBar />
                </div>

                {/* ── CTA Buttons ── */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={fadeUp}
                >
                    <Link
                        to="/admissions"
                        className="bg-[#FF0000] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#CC0000] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105"
                    >
                        Apply Now
                    </Link>
                    <Link
                        to="/courses"
                        className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-white/60"
                    >
                        Explore Programs
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </motion.div>
        </section >
    );
};

export default Hero;
