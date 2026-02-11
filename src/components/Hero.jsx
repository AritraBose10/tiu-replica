import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, Building2, Globe, ArrowRight } from 'lucide-react';

/* ─── Stat Badge Data ─── */
const statBadges = [
    { icon: DollarSign, title: 'Highest Package:', value: '$150k+', position: 'top-left' },
    { icon: CheckCircle, title: '100% Placement', value: 'Support', position: 'top-right' },
    { icon: Building2, title: 'Top Recruiters:', value: 'Google, Microsoft, Amazon', position: 'bottom-left' },
    { icon: Globe, title: 'Global Alumni', value: 'Network: 50k+', position: 'bottom-right' },
];

/* ─── Blob Configuration ─── */
const BLOB_SIZE = 100;
const MAX_DRAG = 110;
const STRING_CONFIGS = [
    { position: 'top-left', restX: 0.09, restY: 0.18, anchorX: 0.255, anchorY: 0.30, badgeIdx: 0 },
    { position: 'top-right', restX: 0.91, restY: 0.18, anchorX: 0.745, anchorY: 0.30, badgeIdx: 1 },
    { position: 'bottom-left', restX: 0.09, restY: 0.82, anchorX: 0.255, anchorY: 0.70, badgeIdx: 2 },
    { position: 'bottom-right', restX: 0.91, restY: 0.82, anchorX: 0.745, anchorY: 0.70, badgeIdx: 3 },
];

/* ═══════════════════════════════════════════
   DRAGGABLE METRIC BLOB COMPONENT
   ═══════════════════════════════════════════ */

// Global tracking for blob entrance animations to persist across re-mounts (StrictMode/Nav)
const enteredBlobs = new Set();

const DraggableBlob = ({ config, badge, containerRef, stringDelay, blobDelay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const pathRef = useRef(null);
    const glowRef = useRef(null);
    const hasEnteredRef = useRef(false);

    // Initialize state from the global Set to skip animation if already entered
    const [entered, setEntered] = useState(() => enteredBlobs.has(config.position));

    // Physics constants
    const SAG_MAX = 80;
    const SLACK_FACTOR = 1.4;

    const updateString = useCallback(() => {
        if (!pathRef.current || !containerRef.current) return;

        // USE offsetWidth/offsetHeight (unscaled dimensions) instead of getBoundingClientRect (scaled)
        // This ensures correct path calculations even if parent is scaling up (0.85 -> 1)
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        if (width === 0 || height === 0) return;

        const blobX = width * config.restX + x.get();
        const blobY = height * config.restY + y.get();
        const anchorX = width * config.anchorX;
        const anchorY = height * config.anchorY;

        const dx = blobX - anchorX;
        const dy = blobY - anchorY;
        const currentLen = Math.sqrt(dx * dx + dy * dy);

        const restDx = width * config.restX - anchorX;
        const restDy = height * config.restY - anchorY;
        const restLen = Math.sqrt(restDx * restDx + restDy * restDy);

        const naturalLen = restLen * SLACK_FACTOR;
        const safeNaturalLen = Math.max(naturalLen, 0.1);

        let sag = 0;
        let tension = 0;

        if (currentLen < naturalLen) {
            const slackRatio = 1 - (currentLen / safeNaturalLen);
            sag = slackRatio * SAG_MAX;
        } else {
            tension = (currentLen - safeNaturalLen) / safeNaturalLen;
        }

        const midX = (anchorX + blobX) / 2;
        const midY = (anchorY + blobY) / 2;
        const ctrlX = midX;
        const ctrlY = midY + sag;

        // Endpoint on blob edge (toward anchor)
        const radius = BLOB_SIZE / 2;
        const safeCurrentLen = Math.max(currentLen, 0.1);
        let endX = blobX - (dx / safeCurrentLen) * radius;
        let endY = blobY - (dy / safeCurrentLen) * radius;
        if (isNaN(endX)) endX = blobX;
        if (isNaN(endY)) endY = blobY;

        const d = `M ${anchorX},${anchorY} Q ${ctrlX},${ctrlY} ${endX},${endY}`;
        pathRef.current.setAttribute('d', d);

        // Visual feedback based on tension
        const opacity = 0.8 + Math.min(tension * 3, 0.2);
        pathRef.current.style.opacity = String(opacity);
        pathRef.current.style.strokeWidth = tension > 0.1 ? '2.5px' : '2px';

        if (glowRef.current) {
            glowRef.current.style.opacity = String(Math.min(tension * 4, 1));
        }
    }, [config, containerRef, x, y]);

    // Subscribe to drag motion values & resize
    useEffect(() => {
        const unsubX = x.on('change', updateString);
        const unsubY = y.on('change', updateString);
        const handleResize = () => updateString();
        window.addEventListener('resize', handleResize);
        setTimeout(updateString, 50);
        return () => {
            unsubX();
            unsubY();
            window.removeEventListener('resize', handleResize);
        };
    }, [x, y, updateString]);

    // String draw entrance animation (StrictMode-safe)
    useEffect(() => {
        if (!pathRef.current) return;
        const path = pathRef.current;
        let raf;

        // If blob already entered (StrictMode re-mount or route return), skip draw animation
        if (enteredBlobs.has(config.position)) {
            // Just ensure the string is drawn immediately at its final state
            const t = setTimeout(() => updateString(), 50);
            return () => clearTimeout(t);
        }

        // Wait for layout to settle (100ms) then calculate
        const setupTimer = setTimeout(() => {
            updateString();

            raf = requestAnimationFrame(() => {
                if (!path.isConnected) return;
                const length = path.getTotalLength() || 300;

                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length}`;
                path.style.opacity = '0.8';
                path.style.transition = 'none';

                // Force reflow
                void path.getBoundingClientRect();

                // Animate draw
                path.style.transition = `stroke-dashoffset 1.2s ease-out ${stringDelay - 0.9}s, opacity 0.6s ease ${stringDelay - 0.9}s`;
                path.style.strokeDashoffset = '0';
            });
        }, 100);

        // Cleanup dasharray after animation finishes
        const cleanupTimer = setTimeout(() => {
            if (path.isConnected) {
                path.style.strokeDasharray = 'none';
                path.style.strokeDashoffset = '0';
                path.style.transition = 'none';
            }
        }, (stringDelay + 1.5) * 1000);

        return () => {
            clearTimeout(setupTimer);
            if (raf) cancelAnimationFrame(raf);
            clearTimeout(cleanupTimer);
        };
    }, [stringDelay, updateString, config.position]);

    const Icon = badge.icon;
    const xOrigin = config.position.includes('left') ? '100%' : '0%';
    const yOrigin = config.position.includes('top') ? '100%' : '0%';

    return (
        <>
            {/* ── Elastic String SVG ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5] overflow-visible">
                <defs>
                    <linearGradient id={`grad-${config.position}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B0000" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#FF0000" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#FF4444" stopOpacity="1" />
                    </linearGradient>
                    <filter id={`glow-filter-${config.position}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* NO transition-all class — transitions handled purely by JS above */}
                <path
                    ref={pathRef}
                    fill="none"
                    stroke={`url(#grad-${config.position})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter={`url(#glow-filter-${config.position})`}
                />
            </svg>

            {/* ── Draggable Circular Blob ── */}
            <motion.div
                drag
                dragSnapToOrigin={true}
                dragConstraints={{
                    left: -MAX_DRAG,
                    right: MAX_DRAG,
                    top: -MAX_DRAG,
                    bottom: MAX_DRAG,
                }}
                dragElastic={0.15}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
                style={{
                    x, y,
                    left: `${config.restX * 100}%`,
                    top: `${config.restY * 100}%`,
                    width: BLOB_SIZE,
                    height: BLOB_SIZE,
                    marginLeft: -BLOB_SIZE / 2,
                    marginTop: -BLOB_SIZE / 2,
                    transformOrigin: `${xOrigin} ${yOrigin}`,
                }}
                className="absolute z-30 hidden md:block cursor-grab active:cursor-grabbing select-none"
                /* Entrance plays ONCE, then locks to final values.
                   Uses ref (StrictMode-safe) + state to control animation. */
                initial={entered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
                animate={
                    entered
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : {
                            opacity: 1,
                            scale: [0, 1.15, 0.95, 1.05, 1],
                            rotate: [0, -5, 3, -1, 0],
                        }
                }
                transition={
                    entered
                        ? { duration: 0 }
                        : {
                            delay: blobDelay,
                            duration: 1.2,
                            times: [0, 0.4, 0.6, 0.8, 1],
                            ease: 'easeOut',
                        }
                }
                onAnimationComplete={() => {
                    if (!hasEnteredRef.current) {
                        hasEnteredRef.current = true;
                        setEntered(true);
                        enteredBlobs.add(config.position);
                    }
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Blob content (glassmorphism) */}
                <div className="w-full h-full rounded-full relative">
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-red-500/40 via-red-600/10 to-red-500/40 blur-[2px]" />
                    <div className="absolute inset-0 rounded-full border border-red-500/50 bg-[#0f0f0f]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.08)_0%,_transparent_70%)]" />
                        <div
                            ref={glowRef}
                            className="absolute inset-0 rounded-full border-2 border-red-500/80 shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                            style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-red-500/30"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <Icon className="w-6 h-6 text-red-500 mb-1.5 relative z-10 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]" />
                        <p className="text-white text-[10px] font-bold leading-tight text-center px-2 relative z-10 tracking-widest uppercase">
                            {badge.title}
                        </p>
                        <p className="text-gray-400 text-[9px] leading-tight text-center px-2 relative z-10 mt-0.5">
                            {badge.value}
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
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

/* ─── TIU INTERIOR Wireframe (Right Side — real photo, wireframe style) ─── */
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
    const metricsContainerRef = useRef(null);

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
                            className="text-[#FF0000] inline-block"
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

                {/* ═══ CENTER IMAGE + DRAGGABLE METRIC BLOBS ═══ */}
                <motion.div
                    ref={metricsContainerRef}
                    className="relative max-w-4xl mx-auto mb-12"
                    variants={fadeScale}
                    style={{ overflow: 'visible' }}
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

                    {/* ── Draggable Metric Blobs with Elastic Strings ── */}
                    {STRING_CONFIGS.map((cfg, i) => (
                        <DraggableBlob
                            key={cfg.position}
                            config={cfg}
                            badge={statBadges[cfg.badgeIdx]}
                            containerRef={metricsContainerRef}
                            stringDelay={1.0 + i * 0.15} // Stagger string appearance
                            blobDelay={2.2 + i * 0.15}   // Blob appears exactly when string finishes (1.0 + 1.2s)
                        />
                    ))}
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
