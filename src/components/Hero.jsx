import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, Building2, Globe, ArrowRight } from 'lucide-react';

/* ─── Stat Badge Data ─── */
const statBadges = [
    { icon: DollarSign, title: 'HIGHEST PACKAGE', value: '$150k+' },
    { icon: Building2, title: 'GLOBAL FORTUNE 500', value: 'Top Recruiters' },
    { icon: CheckCircle, title: 'PLACEMENT SUPPORT', value: '100%' },
    { icon: Globe, title: 'GLOBAL ALUMNI', value: '50k+' },
];

/* ═══════════════════════════════════════════
   METRICS BAR COMPONENT
   ═══════════════════════════════════════════ */
const MetricsBar = () => {
    return (
        <motion.div
            className="w-full max-w-4xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
        >
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#111111]/90 backdrop-blur-xl px-4 py-4 md:px-8 md:py-5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                {statBadges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                        <React.Fragment key={badge.title}>
                            {/* Vertical divider (skip first) */}
                            {i > 0 && (
                                <div className="hidden md:block w-px h-10 bg-white/10 flex-shrink-0" />
                            )}

                            {/* Stat item */}
                            <div className="flex items-center gap-3 flex-1 justify-center px-2">
                                <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center">
                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                                </div>
                                <div className="hidden sm:block min-w-0">
                                    <p className="text-white font-bold text-sm md:text-base leading-tight truncate">
                                        {badge.value}
                                    </p>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-medium uppercase tracking-wider leading-tight truncate">
                                        {badge.title}
                                    </p>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </motion.div>
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
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
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
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
    </div>
);

/* ═══════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════ */
const Hero = () => {
    // Stagger orchestration
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
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pt-32 md:pt-24 pb-16">
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
                className="relative z-10 w-full max-w-6xl mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* ── Heading ── */}
                <motion.div className="text-center mb-6" variants={fadeUp}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tight">
                        <span className="text-white">SHAPE YOUR FUTURE </span>
                        <span className="text-gray-500 font-light lowercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl">at</span>
                        <br />
                        <motion.span
                            className="text-[#FF0000] inline-block whitespace-nowrap"
                            initial={{ opacity: 0, letterSpacing: '0.2em' }}
                            animate={{ opacity: 1, letterSpacing: '0.02em' }}
                            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        >
                            TECHNO INDIA UNIVERSITY
                        </motion.span>
                    </h1>
                </motion.div>

                {/* ── Subtitle ── */}
                <motion.p
                    className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
                    variants={fadeUp}
                >
                    The School of the Future offers interdisciplinary programs that blend modern technologies
                    and innovation, equipping students to excel in a rapidly changing world.
                </motion.p>

                {/* ═══ CENTER IMAGE + METRICS BAR ═══ */}
                <motion.div
                    className="relative max-w-4xl mx-auto mb-12"
                    variants={fadeScale}
                >
                    {/* ── Campus Image ── */}
                    <div className="relative mx-auto w-[80%] sm:w-[60%] md:w-[50%] aspect-[4/3] z-10">
                        {/* Outer glow */}
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20 rounded-lg blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        />

                        {/* Image container */}
                        <motion.div
                            className="relative rounded-sm overflow-hidden border border-red-500/20 shadow-[0_0_40px_rgba(255,0,0,0.12)]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
                                alt="Techno India University Campus"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* ── Metrics Bar ── */}
                    <MetricsBar />
                </motion.div>

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
        </section>
    );
};

export default Hero;
