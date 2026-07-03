import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, Zap, ArrowRight } from 'lucide-react';

const scholarships = [
 {
 icon: Award,
 title: 'Merit Scholarship',
 coverage: 100,
 gradient: 'from-amber-500 to-orange-500',
 glowColor: 'rgba(245, 158, 11, 0.15)',
 },
 {
 icon: Heart,
 title: 'Need-Based Aid',
 coverage: 75,
 gradient: 'from-rose-500 to-pink-500',
 glowColor: 'rgba(244, 63, 94, 0.15)',
 },
 {
 icon: Zap,
 title: 'Sports Excellence',
 coverage: 50,
 gradient: 'from-blue-500 to-cyan-500',
 glowColor: 'rgba(59, 130, 246, 0.15)',
 },
];

/* Animated counter hook */
const AnimatedCounter = ({ target, suffix = '%', duration = 2000 }) => {
 const [count, setCount] = useState(0);
 const ref = useRef(null);
 const inView = useInView(ref, { once: true });

 useEffect(() => {
 if (!inView) return;
 let start = 0;
 const step = target / (duration / 16);
 const timer = setInterval(() => {
 start += step;
 if (start >= target) {
 setCount(target);
 clearInterval(timer);
 } else {
 setCount(Math.floor(start));
 }
 }, 16);
 return () => clearInterval(timer);
 }, [inView, target, duration]);

 return (
 <span ref={ref}>
 {count}{suffix}
 </span>
 );
};

const containerVariants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
 hidden: { opacity: 0, y: 40 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const ScholarshipSection = () => {
 return (
 <section className="py-12 md:py-24 px-4 bg-[#020205] relative overflow-hidden">
 {/* Background */}
 <div className="absolute inset-0 pointer-events-none">
 <div className="absolute top-1/4 -left-[10%] w-[40vw] h-[40vw] bg-amber-600/5 rounded-full blur-[150px]" />
 <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-rose-600/5 rounded-full blur-[120px]" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-16"
 >
 <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
 Financial Support
 </span>
 <h2 className="text-4xl md:text-6xl font-black text-white mt-3 mb-4">
 Scholarships &{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
 Financial Support
 </span>
 </h2>
 <p className="text-gray-400 text-lg max-w-2xl mx-auto">
 Eligible students can apply for merit-based scholarships, need-based financial support,
 and limited-seat scholarship categories. Scholarships are awarded on a rolling basis
 and subject to availability.
 </p>
 </motion.div>

 {/* Cards Grid */}
 <motion.div
 className="grid md:grid-cols-3 gap-6"
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: '-50px' }}
 >
 {scholarships.map((s, i) => {
 const Icon = s.icon;
 return (
 <motion.div
 key={i}
 variants={cardVariants}
 className="group relative rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500"
 >
 {/* Gradient accent top border */}
 <div className={`h-1 w-full bg-gradient-to-r ${s.gradient}`} />

 <div className="p-8">
 {/* Icon + Coverage */}
 <div className="flex items-start justify-between mb-6">
 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} bg-opacity-20 flex items-center justify-center`} style={{ background: s.glowColor }}>
 <Icon className="w-7 h-7 text-white" />
 </div>
 <div className="text-right">
 <p className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.gradient}`}>
 <AnimatedCounter target={s.coverage} />
 </p>
 <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
 Max Coverage
 </p>
 </div>
 </div>

 {/* Title */}
 <h3 className="text-2xl font-bold text-white mb-6">{s.title}</h3>

 {/* CTA */}
 <button className="w-full py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2 group/btn">
 Check Eligibility
 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
 </button>
 </div>

 {/* Hover glow */}
 <div
 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-3xl"
 style={{ background: `radial-gradient(ellipse at center, ${s.glowColor}, transparent 70%)` }}
 />
 </motion.div>
 );
 })}
 </motion.div>

 {/* Bottom note */}
 <motion.p
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 0.6 }}
 className="text-center text-gray-500 text-sm mt-10"
 >
 All scholarships are limited and awarded on a rolling basis, subject to availability.
 Contact the admissions team for detailed terms and eligibility.
 </motion.p>
 </div>
 </section>
 );
};

export default ScholarshipSection;
