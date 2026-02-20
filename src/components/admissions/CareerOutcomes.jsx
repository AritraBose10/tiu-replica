import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSettings } from '../../contexts/SettingsContext';
import { TrendingUp, Building2, Handshake, ArrowUpRight } from 'lucide-react';

/* ─── Data ─── */
const packages = [
    { label: 'Highest Package', value: 2, suffix: ' Cr', barWidth: 100, color: 'from-red-500 to-orange-500', glow: 'rgba(255,0,0,0.3)' },
    { label: 'Average Package', value: 12, suffix: ' LPA', barWidth: 60, color: 'from-blue-500 to-cyan-500', glow: 'rgba(59,130,246,0.3)' },
    { label: 'Median Package', value: 8, suffix: ' LPA', barWidth: 42, color: 'from-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.3)' },
];

const recruiters = [
    { name: 'Accenture', logo: '/assets/recruiters/Placement_Drive_Logos/Accenture.png' },
    { name: 'Adani', logo: '/assets/recruiters/Placement_Drive_Logos/Adani.png' },
    { name: 'Adobe', logo: '/assets/recruiters/Placement_Drive_Logos/Adobe.png' },
    { name: 'Amazon', logo: '/assets/recruiters/Placement_Drive_Logos/Amazon.png' },
    { name: 'Apple', logo: '/assets/recruiters/Placement_Drive_Logos/Apple.png' },
    { name: 'Byjus', logo: '/assets/recruiters/Placement_Drive_Logos/Byjus.png' },
    { name: 'Capgemini', logo: '/assets/recruiters/Placement_Drive_Logos/Capgemini.png' },
    { name: 'Cisco', logo: '/assets/recruiters/Placement_Drive_Logos/Cisco.png' },
    { name: 'Cognizant', logo: '/assets/recruiters/Placement_Drive_Logos/Cognizant.png' },
    { name: 'Dell', logo: '/assets/recruiters/Placement_Drive_Logos/Dell.png' },
    { name: 'Deloitte', logo: '/assets/recruiters/Placement_Drive_Logos/Deloitte.png' },
    { name: 'Flipkart', logo: '/assets/recruiters/Placement_Drive_Logos/Flipkart.png' },
    { name: 'Google', logo: '/assets/recruiters/Placement_Drive_Logos/Google.png' },
    { name: 'HCL Technologies', logo: '/assets/recruiters/Placement_Drive_Logos/HCL_Technologies.png' },
    { name: 'HDFC Bank', logo: '/assets/recruiters/Placement_Drive_Logos/HDFC Bank.png' },
    { name: 'HP', logo: '/assets/recruiters/Placement_Drive_Logos/HP.png' },
    { name: 'IBM', logo: '/assets/recruiters/Placement_Drive_Logos/IBM.png' },
    { name: 'ICICI Bank', logo: '/assets/recruiters/Placement_Drive_Logos/ICICI Bank.png' },
    { name: 'Infosys', logo: '/assets/recruiters/Placement_Drive_Logos/Infosys.png' },
    { name: 'Intel', logo: '/assets/recruiters/Placement_Drive_Logos/Intel.png' },
    { name: 'JPMorgan Chase', logo: '/assets/recruiters/Placement_Drive_Logos/JPMorgan Chase.png' },
    { name: 'KPMG', logo: '/assets/recruiters/Placement_Drive_Logos/KPMG.png' },
    { name: 'L&T', logo: '/assets/recruiters/Placement_Drive_Logos/L&T.png' },
    { name: 'Lenovo', logo: '/assets/recruiters/Placement_Drive_Logos/Lenovo.png' },
];

/* ─── Animated Counter ─── */
const CountUp = ({ target, suffix = '', decimals = 0, duration = 2000 }) => {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setVal(target);
                clearInterval(timer);
            } else {
                setVal(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration, decimals]);

    return <span ref={ref}>₹{val}{suffix}</span>;
};

/* ─── Animated Bar ─── */
const AnimatedBar = ({ pkg, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group"
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-medium text-sm uppercase tracking-wider">{pkg.label}</span>
                <span className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${pkg.color}`}>
                    <CountUp target={pkg.value} suffix={pkg.suffix} decimals={pkg.value % 1 !== 0 ? 1 : 0} />
                </span>
            </div>
            <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${pkg.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pkg.barWidth}%` } : {}}
                    transition={{ delay: 0.3 + index * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ boxShadow: `0 0 20px ${pkg.glow}` }}
                />
            </div>
        </motion.div>
    );
};

/* ─── Marquee ─── */
const LogoMarquee = () => {
    // Double the list for infinite scroll illusion
    const doubled = [...recruiters, ...recruiters];

    return (
        <div className="relative overflow-hidden py-6">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020205] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020205] to-transparent z-10" />

            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: [0, -50 * recruiters.length] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {doubled.map((recruiter, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-colors duration-300 min-w-[120px]"
                    >
                        <img
                            src={recruiter.logo}
                            alt={recruiter.name}
                            className="h-8 w-auto max-w-[120px] object-contain"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

/* ─── Main Component ─── */
const CareerOutcomes = () => {
    const { getSetting } = useSettings();

    return (
        <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-red-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Placement Record
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-3 leading-tight">
                        Career{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Outcomes
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mt-4 max-w-2xl">
                        Our graduates are hired by the world's top companies. Here's a snapshot of our
                        placement performance.
                    </p>
                </motion.div>

                {/* Block A: Package Stats (Bars) */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-8">
                        {packages.map((pkg, i) => (
                            <AnimatedBar key={i} pkg={pkg} index={i} />
                        ))}
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: TrendingUp, value: '100%', label: 'Placement Assistance', color: 'text-emerald-400' },
                            { icon: Building2, value: '300+', label: 'Recruiting Companies', color: 'text-blue-400' },
                            { icon: Handshake, value: '1200+', label: 'Offers Made (2025)', color: 'text-amber-400' },
                            { icon: ArrowUpRight, value: '40%', label: 'YoY Package Growth', color: 'text-red-400' },
                        ].map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-all duration-500"
                                >
                                    <Icon className={`w-6 h-6 ${stat.color} mb-3`} />
                                    <p className="text-white text-2xl font-black">{stat.value}</p>
                                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Block B: Top Recruiters Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-red-600 rounded-full" />
                        Top Recruiters
                    </h3>
                    <LogoMarquee />
                </motion.div>

                {/* Block C: IBM Internship Spotlight */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-sm border border-white/10"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600" />

                    <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                        {/* IBM Logo */}
                        <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                            <img
                                src={getSetting('logo_ibm') || "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"}
                                alt="IBM"
                                className="w-16 h-auto object-contain"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                                    Mandatory Program
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Mandatory IBM Internship
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                Every student at School of the Future completes a structured internship
                                with IBM, gaining hands-on experience in enterprise technology, cloud computing,
                                and AI — guaranteed before graduation.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                                <Handshake className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CareerOutcomes;
