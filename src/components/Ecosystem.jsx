import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Sparkles, ChevronRight } from 'lucide-react';

const layers = [
 {
 icon: Building2,
 label: 'Techno India Group',
 role: 'Foundation',
 stats: ['40+ Years', '100+ Institutions', 'Pan-India'],
 desc: 'One of India\'s most well-established education groups, providing institutional stability and operational strength.',
 accent: '#6B7280',
 },
 {
 icon: GraduationCap,
 label: 'Techno India University',
 role: 'Autonomous University',
 stats: ['UGC Recognised', 'NAAC Accredited'],
 desc: 'The degree-granting university that ensures every program meets the highest standards of academic governance.',
 accent: '#3B82F6',
 },
 {
 icon: Sparkles,
 label: 'School of the Future',
 role: 'Innovation Layer',
 stats: ['Google Cloud', 'IBM', 'Project-First'],
 desc: 'Where future-ready education happens industry-powered curriculum without compromising academic credibility.',
 accent: '#EF4444',
 featured: true,
 },
];

const Ecosystem = () => {
 return (
 <section className="pt-28 pb-10 px-4 bg-[#020205] relative overflow-hidden">
 {/* Subtle grid */}
 <div
 className="absolute inset-0 opacity-[0.025] pointer-events-none"
 style={{
 backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
 backgroundSize: '60px 60px',
 }}
 />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/[0.03] rounded-full blur-[200px] pointer-events-none" />

 <div className="w-[90%] md:w-[70%] mx-auto relative z-10">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-20"
 >
 <span className="inline-flex items-center gap-2 text-red-500 text-[11px] font-bold tracking-[0.3em] uppercase px-5 py-2.5 bg-red-500/10 rounded-full border border-red-500/20 mb-6">
 The Ecosystem
 </span>
 <h2 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight leading-tight">
 Built on a{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500">
 Legacy of Trust
 </span>
 </h2>
 <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
 The School of the Future isn't standalone it's the innovation arm of a well-established
 academic institution, backed by decades of educational excellence.
 </p>
 </motion.div>

 {/* Three-column flow */}
 <div className="grid md:grid-cols-3 gap-0 relative">
 {/* Connecting line behind */}
 <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-[1px]">
 <div className="w-full h-full bg-gradient-to-r from-gray-700 via-blue-700/50 to-red-700/50" />
 </div>

 {layers.map((layer, i) => {
 const Icon = layer.icon;
 const isFeatured = layer.featured;

 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.15, duration: 0.5 }}
 className="relative flex flex-col items-center text-center px-6"
 >
 {/* Connector arrow (mobile: vertical, desktop: handled by line) */}
 {i > 0 && (
 <div className="md:hidden flex items-center justify-center py-4">
 <ChevronRight className="w-5 h-5 text-gray-700 rotate-90" />
 </div>
 )}

 {/* Circle node */}
 <div
 className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${isFeatured ? 'scale-105' : ''
 }`}
 style={{
 background: isFeatured
 ? 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.02) 70%)'
 : 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 70%)',
 border: `1px solid ${isFeatured ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)'}`,
 }}
 >
 {/* Pulse ring for featured */}
 {isFeatured && (
 <motion.div
 className="absolute inset-0 rounded-full border border-red-500/20"
 animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
 transition={{ duration: 3, repeat: Infinity }}
 />
 )}
 <Icon
 className="w-8 h-8"
 style={{ color: layer.accent }}
 />
 </div>

 {/* Role tag */}
 <span
 className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full"
 style={{
 color: layer.accent,
 background: `${layer.accent}12`,
 border: `1px solid ${layer.accent}20`,
 }}
 >
 {layer.role}
 </span>

 {/* Name */}
 <h3 className={`text-xl font-black mb-3 ${isFeatured ? 'text-white' : 'text-gray-300'}`}>
 {layer.label}
 </h3>

 {/* Description */}
 <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-[260px]">
 {layer.desc}
 </p>

 {/* Stats pills */}
 <div className="flex flex-wrap justify-center gap-2">
 {layer.stats.map((stat, j) => (
 <span
 key={j}
 className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-400"
 >
 {stat}
 </span>
 ))}
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>
 );
};

export default Ecosystem;
