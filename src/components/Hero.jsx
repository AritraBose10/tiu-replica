import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, Building2, Globe, ArrowRight } from 'lucide-react';
import ThreeDCarousel from './ThreeDCarousel';
import { useSettings } from '../contexts/SettingsContext';
import iitKgpLogo from '../assets/IIT_KGP.jpeg';

/* ─── Stat Badge Data ─── */
const statBadges = [
 { icon: DollarSign, title: 'HIGHEST PACKAGE', value: '$150k+' },
 { icon: Building2, title: 'GLOBAL FORTUNE 500', value: 'Top Recruiters' },
 { icon: CheckCircle, title: 'PLACEMENT SUPPORT', value: '100%' },
 { icon: Globe, title: 'GLOBAL ALUMNI', value: '50k+' },
];

/* ═══════════════════════════════════════════
 METRICS BAR ARROW PROCESS (GLASSMORPHISM)
 ═══════════════════════════════════════════ */
const ARROW_W = 250; // viewBox width per arrow
const ARROW_H = 80; // viewBox height per arrow
const TIP = 28; // how far the point extends
const R = 8; // corner radius
const OVERLAP = 18; // px each arrow overlaps the previous

// Generate the SVG path for one arrow shape
const arrowPath = (isFirst, isLast) => {
 const w = ARROW_W;
 const h = ARROW_H;
 const t = TIP;
 const r = R; // Corner radius for box corners
 const tr = 3; // Tip radius - slight rounding for the sharp point

 if (isFirst) {
 return `
 M ${r} 0
 L ${w - t - tr} 0
 Q ${w - t} 0 ${w - t + tr} ${tr}
 L ${w - tr} ${h / 2 - tr}
 Q ${w} ${h / 2} ${w - tr} ${h / 2 + tr}
 L ${w - t + tr} ${h - tr}
 Q ${w - t} ${h} ${w - t - tr} ${h}
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
 L ${t - tr} ${h / 2 + tr}
 Q ${t - tr * 2} ${h / 2} ${t - tr} ${h / 2 - tr}
 L 0 0
 Z`;
 }
 // Middle Arrow
 return `
 M 0 0
 L ${w - t - tr} 0
 Q ${w - t} 0 ${w - t + tr} ${tr}
 L ${w - tr} ${h / 2 - tr}
 Q ${w} ${h / 2} ${w - tr} ${h / 2 + tr}
 L ${w - t + tr} ${h - tr}
 Q ${w - t} ${h} ${w - t - tr} ${h}
 L 0 ${h}
 L ${t - tr} ${h / 2 + tr}
 Q ${t - tr * 2} ${h / 2} ${t - tr} ${h / 2 - tr}
 L 0 0
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
 {/* Frosted Glass Backdrop the main visual */}
 <div
 className="absolute inset-0"
 style={{
 clipPath: `path('${d.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()}')`,
 backdropFilter: 'blur(12px)',
 WebkitBackdropFilter: 'blur(12px)',
 backgroundColor: 'rgba(255,255,255,0.07)',
 boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(255,255,255,0.05)',
 }}
 />

 {/* Soft outer glow SVG no crisp lines */}
 <svg
 className="absolute inset-0 w-full h-full pointer-events-none"
 viewBox={`0 0 ${ARROW_W} ${ARROW_H}`}
 preserveAspectRatio="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <defs>
 <filter id={`glass-glow-${i}`} x="-10%" y="-10%" width="120%" height="120%">
 <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
 </filter>
 </defs>
 {/* Soft diffused edge no hard border */}
 <path
 d={d}
 fill="none"
 stroke="rgba(255,255,255,0.12)"
 strokeWidth="2"
 filter={`url(#glass-glow-${i})`}
 />
 </svg>

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
const ExteriorWireframe = ({ src }) => (
 <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block w-[400px] h-[550px] overflow-hidden z-[2] mix-blend-screen"
 style={{
 maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
 WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
 }}>
 <img
 src={src || "/wireframes/exterior.webp"}
 alt=""
 className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
 />
 </div>
);

const InteriorWireframe = ({ src }) => (
 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block w-[400px] h-[550px] overflow-hidden z-[2] mix-blend-screen"
 style={{
 maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
 WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
 }}>
 <img
 src={src || "/wireframes/interior.webp"}
 alt=""
 className="w-full h-full object-cover opacity-35 filter grayscale contrast-125"
 />
 </div>
);

/* ═══════════════════════════════════════════
 HERO COMPONENT
 ═══════════════════════════════════════════ */
const Hero = () => {
 const { getSetting } = useSettings();
 const exteriorImg = getSetting('hero_wireframe_exterior');
 const interiorImg = getSetting('hero_wireframe_interior');

 // Use local carousel images
 const carouselItems = [
 { url: '/assets/images/c1.webp', caption: getSetting('home_carousel_caption_1') },
 { url: '/assets/images/c2.webp', caption: getSetting('home_carousel_caption_2') },
 { url: '/assets/images/c3.webp', caption: getSetting('home_carousel_caption_3') },
 { url: '/assets/images/c4.webp', caption: getSetting('home_carousel_caption_4') },
 { url: '/assets/images/c5.webp', caption: getSetting('home_carousel_caption_5') },
 ];

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

 return (
 <section
 className="relative min-h-screen flex flex-col items-center overflow-hidden pt-32 md:pt-28 pb-6 bg-[#020205]"
 >
 {/* ── Background Elements ── */}
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
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#020205_80%)] pointer-events-none z-[1]" />
 <ExteriorWireframe src={exteriorImg} />
 <InteriorWireframe src={interiorImg} />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

 {/* ═══ MAIN CONTENT ═══ */}
 <motion.div
 className="relative z-10 w-[90%] md:w-[70%] mx-auto flex-1 flex flex-col justify-center"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 >
 {/* ── Admissions Badge ── */}
 <motion.div className="flex justify-center mb-5" variants={fadeUp}>
 <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest">
 <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
 Admissions 2026 Now Open
 </span>
 </motion.div>

 {/* ── Heading ── */}
 <motion.div className="text-center mb-4 md:mb-6" variants={fadeUp}>
 <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
 <span className="text-white">Kolkata's Leading B.Tech Engineering College </span>
 <span className="text-[#FF0000]">for Future-Ready AI Courses</span>
 </h1>
 </motion.div>

 {/* ── Subtitle ── */}
 <motion.p
 className="text-center text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-5 md:mb-6 leading-relaxed"
 variants={fadeUp}
 >
 Industry-powered B.Tech, M.Tech, MBA &amp; PhD programs co-designed with Google Cloud &amp; IBM at Techno India University, West Bengal.
 </motion.p>

 {/* ── Partner Logos ── */}
 <motion.div
 className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 md:mb-10 flex-wrap"
 variants={fadeUp}
 >
 <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
 <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">Powered by</span>
 <img
 src={getSetting('logo_google_cloud') || "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"}
 alt="Google Cloud"
 className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity"
 />
 </div>
 <div className="hidden sm:block w-px h-6 bg-white/10" />
 <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
 <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">In collaboration with</span>
 <img
 src={getSetting('logo_ibm') || "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"}
 alt="IBM"
 className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity brightness-0 invert"
 />
 </div>
 <div className="hidden sm:block w-px h-6 bg-white/10" />
 <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
 <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">In collaboration with</span>
 <img
 src={iitKgpLogo}
 alt="IIT Kharagpur"
 className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity"
 />
 <span className="text-white/80 text-[11px] font-semibold whitespace-nowrap">IIT Kharagpur</span>
 </div>
 </motion.div>

 {/* ═══ 3D CAROUSEL ═══ */}
 <div className="relative w-full max-w-[1200px] mx-auto mb-8 md:mb-12">
 <ThreeDCarousel items={carouselItems} />
 </div>

 {/* ── CTA Buttons ── */}
 <motion.div
 className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4"
 variants={fadeUp}
 >
 <Link
 to="/apply"
 className="bg-[#FF0000] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#CC0000] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105"
 >
 Apply for 2026
 </Link>
 <Link
 to="/courses"
 className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-white/60"
 >
 Explore Programs
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 to="/btech-admissions-2026-iit-kgp-collaboration"
 className="flex items-center gap-2 border border-red-500/40 text-red-400 px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-red-500/10 transition-all duration-300 hover:border-red-500/70"
 >
 IIT KGP Collaboration
 <ArrowRight className="w-4 h-4" />
 </Link>
 </motion.div>

 </motion.div>
 </section >
 );
};

export default Hero;
