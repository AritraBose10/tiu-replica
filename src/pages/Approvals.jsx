import React, { useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSanity } from '../hooks/useSanity';
import { APPROVALS_QUERY } from '../lib/queries';

const fallbackApprovalBodies = [
 {
 id: 1,
 name: 'UGC',
 fullName: 'University Grants Commission',
 description: 'Recognized under Section 2(f) of the UGC Act, 1956, authorizing it to award degrees.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png',
 },
 {
 id: 2,
 name: 'AICTE',
 fullName: 'All India Council for Technical Education',
 description: 'Approved for its technical and engineering programs.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png',
 },
 {
 id: 3,
 name: 'COA',
 fullName: 'Council of Architecture',
 description: 'Approval for its Bachelor of Architecture (B.Arch) program.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Council_of_Architecture_-_Logo.png',
 },
 {
 id: 4,
 name: 'PCI',
 fullName: 'Pharmacy Council of India',
 description: 'Approval for Pharmacy courses (B.Pharm and D.Pharm).',
 logo: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Pharmacy_Council_of_India_Logo.png',
 },
 {
 id: 5,
 name: 'BCI',
 fullName: 'Bar Council of India',
 description: 'Approval for its legal programs.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Logo_of_Bar_Council_of_India.png',
 },
 {
 id: 6,
 name: 'INC & WBNC',
 fullName: 'Indian Nursing Council & West Bengal Nursing Council',
 description: 'Approved by the Indian Nursing Council and West Bengal Nursing Council for its nursing department.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Indian_Nursing_Council_Logo.png',
 },
 {
 id: 7,
 name: 'NAAC',
 fullName: 'National Assessment and Accreditation Council',
 description: 'The university has completed the Self Study Report (SSR) and IIQA stages; currently accredited or in the final certificate phase.',
 logo: '/assets/approvals/naac.png',
 },
 {
 id: 8,
 name: 'NBA',
 fullName: 'National Board of Accreditation',
 description: 'Specific technical programs have historically held or are under NBA accreditation processes.',
 logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/NBA_logo_India.png/220px-NBA_logo_India.png',
 },
 {
 id: 9,
 name: 'AIU',
 fullName: 'Association of Indian Universities',
 description: 'TIU is a member, ensuring degree equivalence for higher studies and government jobs.',
 logo: '/assets/approvals/aiu.png',
 },
 {
 id: 10,
 name: 'CIPU',
 fullName: 'Confederation of Indian Private Universities',
 description: 'Member of the Confederation of Indian Private Universities.',
 logo: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop',
 },
];

const otherIdentifiers = [
 { label: 'AISHE ID', value: 'U-0865' },
 { label: 'NAD ID', value: 'NAD112732' },
 { label: 'NGO DARPAN', value: 'WB/2019/0236617' },
];

const InfiniteMarquee = ({ approvalBodies }) => {
 return (
 <div className="relative flex overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-[#050505] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:after:from-[#050505] after:after:to-transparent">
 <motion.div
 animate={{ x: [0, -100 * approvalBodies.length] }}
 transition={{
 duration: 30,
 repeat: Infinity,
 ease: 'linear',
 }}
 className="flex shrink-0 items-center justify-around gap-20 px-10"
 >
 {[...approvalBodies, ...approvalBodies].map((body, i) => (
 <motion.div
 key={`${body.id || body.name}-${i}`}
 className="flex h-32 w-48 shrink-0 items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
 >
 <img
 src={body.logo}
 alt={body.name}
 className="max-h-full max-w-full object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
 />
 </motion.div>
 ))}
 </motion.div>
 </div>
 );
};

const MagneticCard = ({ children, className }) => {
 return (
 <div className={className}>
 {children}
 </div>
 );
};

const Approvals = () => {
 const { data: sanityApprovals } = useSanity(APPROVALS_QUERY, null);

 const correctLogos = fallbackApprovalBodies.reduce((acc, item) => {
 acc[item.name] = item.logo;
 return acc;
 }, {});

 const approvalBodies = sanityApprovals && sanityApprovals.length > 0
 ? sanityApprovals
 .filter(app => app.name !== 'ISO')
 .map(app => ({
 ...app,
 logo: correctLogos[app.name] || app.logoUrl || app.logo
 }))
 : fallbackApprovalBodies;
 const containerRef = useRef(null);
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ["start start", "end end"]
 });

 const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

 return (
 <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden font-sans">
 <SEO
 title="Accreditation & Approvals | UGC, NAAC, AICTE"
 description="Techno India University’s School Of The Future is accredited by UGC, NAAC, AICTE & AIU. Discover our regulatory approvals, rankings and commitment to quality education."
 />
 {/* Circuit Grid Background */}
 <div
 className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
 style={{
 backgroundImage: `linear-gradient(#f00 1px, transparent 1px), linear-gradient(90deg, #f00 1px, transparent 1px)`,
 backgroundSize: '40px 40px'
 }}
 />

 {/* Ambient Glows */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />
 <div className="absolute middle-0 -right-40 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />

 <div className="container mx-auto px-6 relative z-10 max-w-7xl">
 {/* Hero Section */}
 <motion.div
 style={{ opacity }}
 className="text-center mb-32"
 >
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, ease: 'backOut' }}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
 >
 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
 Accreditation & Quality Assurance
 </motion.div>

 <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
 <motion.span
 initial={{ y: 100, opacity: 0, filter: 'blur(20px)' }}
 animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
 transition={{ duration: 1, ease: 'circOut' }}
 className="block text-white"
 >
 PRESTIGIOUS
 </motion.span>
 <motion.span
 initial={{ y: 100, opacity: 0, filter: 'blur(20px)' }}
 animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
 transition={{ duration: 1, delay: 0.2, ease: 'circOut' }}
 className="block bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-300% animate-gradient"
 >
 APPROVALS.
 </motion.span>
 </h1>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 2, delay: 0.5 }}
 className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
 >
 Techno India University upholds the highest standards of academic excellence
 through rigorous accreditations from India's premier regulatory bodies.
 </motion.p>
 </motion.div>

 {/* Infinite Logo Marquee */}
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-40"
 >
 <InfiniteMarquee approvalBodies={approvalBodies} />
 </motion.div>

 {/* Distinctive Feature Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
 {approvalBodies.map((body, index) => (
 <MagneticCard
 key={body.id}
 className="group relative h-[400px] rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-10 overflow-hidden cursor-pointer"
 >
 {/* Background Number */}
 <span className="absolute -bottom-10 -right-10 text-[200px] font-black text-white/[0.02] select-none group-hover:text-red-500/[0.03] transition-colors">
 0{index + 1}
 </span>

 {/* Logo Area */}
 <div className="w-20 h-20 rounded-2xl bg-white p-4 mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-2xl shadow-red-500/10">
 <img src={body.logo} alt={body.name} className="w-full h-full object-contain" />
 </div>

 {/* Content */}
 <div className="relative z-10">
 <h3 className="text-2xl font-bold text-white mb-2">{body.name}</h3>
 <p className="text-red-500/80 text-xs font-bold tracking-widest uppercase mb-4">
 {body.fullName}
 </p>
 <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-4">
 {body.description}
 </p>
 </div>

 {/* Hover Line Animation */}
 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-700" />
 </MagneticCard>
 ))}
 </div>

 {/* Dynamic Stats Section */}
 <div className="relative py-20 rounded-[40px] bg-white/[0.02] border border-white/5 overflow-hidden mb-40">
 <div className="absolute inset-0 bg-red-600/5 blur-[120px] pointer-events-none" />
 <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-10 relative z-10">
 {[
 { label: 'Regulatory Bodies', value: '10', suffix: '+' },
 { label: 'Global Ranking', value: 'Top', suffix: ' 5%' },
 { label: 'Academic Programs', value: '45', suffix: '+' },
 { label: 'Student Success', value: '98', suffix: '%' }
 ].map((stat, i) => (
 <motion.div
 key={stat.label}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="text-center"
 >
 <div className="text-5xl md:text-6xl font-black text-white mb-2">
 <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
 {stat.value}
 </span>
 <span className="text-red-600">{stat.suffix}</span>
 </div>
 <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">{stat.label}</p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Other Identifiers */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-40"
 >
 <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-tight">
 Other <span className="text-red-500">Identifiers</span>
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {otherIdentifiers.map((item, i) => (
 <motion.div
 key={item.label}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
 >
 <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">{item.label}</p>
 <p className="text-2xl md:text-3xl font-black text-white">{item.value}</p>
 </motion.div>
 ))}
 </div>
 </motion.div>

 {/* Global recognition section */}
 <motion.div
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 className="text-center mb-20"
 >
 <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter">Setting the <span className="text-red-500 italic">benchmark</span> in technical education.</h2>
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 className="px-10 py-5 rounded-full bg-white text-black font-black text-sm tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
 >
 Download Accreditation Report
 </motion.button>
 </motion.div>
 </div>

 <style dangerouslySetInnerHTML={{
 __html: `
 @keyframes gradient {
 0% { background-position: 0% 50%; }
 50% { background-position: 100% 50%; }
 100% { background-position: 0% 50%; }
 }
 .animate-gradient {
 background-size: 200% auto;
 animation: gradient 5s linear infinite;
 }
 .bg-300\\% { background-size: 300% auto; }
 `}} />
 </div>
 );
};

export default Approvals;
