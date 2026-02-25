import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, BarChart3, Palette, HeartPulse, Monitor, ArrowRight } from 'lucide-react';

/* ─── Program Data (from programs.md) ─── */
const domains = [
    {
        id: 'engineering',
        title: 'School of Engineering & Technology',
        icon: Cpu,
        color: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/30',
        accent: 'text-blue-400',
        glow: 'bg-blue-500/10',
        gridClass: 'md:col-span-2', // Removed row-span-2
        programs: [
            { name: 'B.Tech Computer Science & Engineering (CSE)', badge: 'Powered by Google Cloud' },
            { name: 'B.Tech CSE – AI/ML', badge: 'Powered by Google Cloud' },
            { name: 'B.Tech CSE – Data Science', badge: 'Powered by Google Cloud' },
            { name: 'B.Tech CSE – Cloud Computing', badge: 'Powered by Google Cloud' },
            { name: 'M.Tech CSE – AI/ML', badge: null },
        ],
    },
    {
        id: 'it-sciences',
        title: 'IT & Computer Applications',
        icon: Monitor,
        color: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/30',
        accent: 'text-purple-400',
        glow: 'bg-purple-500/10',
        gridClass: 'md:col-span-1',
        programs: [
            { name: 'BCA with Data Science & AI', badge: 'Powered by IBM' },
            { name: 'B.Sc (H) Data Analytics & Generative AI', badge: 'Powered by IBM' },
            { name: 'B.Sc (H) Cyber Security & Ethical Hacking', badge: 'Powered by IBM' },
            { name: 'M.Sc in Data Science & AI', badge: null },
            { name: 'Ph.D in AI', badge: null },
        ],
    },
    {
        id: 'business',
        title: 'Business & Management',
        icon: BarChart3,
        color: 'from-amber-500/20 to-orange-500/20',
        border: 'border-amber-500/30',
        accent: 'text-amber-400',
        glow: 'bg-amber-500/10',
        gridClass: 'md:col-span-1',
        programs: [
            { name: 'BBA Business Analytics & AI', badge: 'Powered by IBM' },
            { name: 'MBA Business Analytics & AI', badge: 'Powered by IBM' },
            { name: 'BBA Hotel & Hospitality Management', badge: null },
            { name: 'Executive MBA', badge: 'For Working Professionals' },
        ],
    },
    {
        id: 'creative',
        title: 'Creative Arts & Design',
        icon: Palette,
        color: 'from-rose-500/20 to-pink-500/20',
        border: 'border-rose-500/30',
        accent: 'text-rose-400',
        glow: 'bg-rose-500/10',
        gridClass: 'md:col-span-2',
        programs: [
            { name: 'B.Des Visual Communication & Digital Design', badge: null },
            { name: 'B.Des Game Art & Design', badge: null },
            { name: 'B.Des Digital Product Design', badge: null },
            { name: 'M.Des Advertising, Design & Digital Communication', badge: null },
            { name: 'B.Sc (H) in Sound Engineering', badge: null },
            { name: 'B.Sc (H) in Game Development', badge: null },
            { name: 'B.Sc (H) in Filmmaking', badge: null },
            { name: 'B.Sc (H) in Visual Effects & Animation', badge: null },
        ],
    },
    {
        id: 'health',
        title: 'Health & Allied Sciences',
        icon: HeartPulse,
        color: 'from-emerald-500/20 to-teal-500/20',
        border: 'border-emerald-500/30',
        accent: 'text-emerald-400',
        glow: 'bg-emerald-500/10',
        gridClass: 'md:col-span-1', // Moved to last column naturally
        programs: [
            { name: 'B.Sc (H) Cardiovascular Technology', badge: null },
            { name: 'B.Sc (H) Anesthesia and Operation Theater Technology', badge: null },
            { name: 'Bachelor of Medical Laboratory Technology (BMLT)', badge: null },
            { name: 'Master of Medical Laboratory Technology (MMLT)', badge: null },
            { name: 'Bachelor of Medical Radiology & Imaging Technology (BMRIT)', badge: null },
            { name: 'Bachelor of Physiotherapy (BPT)', badge: null },
            { name: 'Master of Physiotherapy (MPT)', badge: null },
        ],
    },
];

const BentoCard = ({ domain, isOpen, onToggle, index }) => {
    const Icon = domain.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative group"
        >
            <div
                className={`w-full rounded-2xl border ${domain.border} bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-opacity-60`}
            >
                {/* Corner glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 ${domain.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Header — always visible */}
                <button
                    onClick={onToggle}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between relative z-10"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center border ${domain.border} transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-105'}`}>
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base md:text-lg leading-tight">{domain.title}</h3>
                            <span className={`text-xs ${domain.accent} font-semibold`}>
                                {domain.programs.length} programs
                            </span>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-2"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                </button>

                {/* Expandable Programs List */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 md:px-6 pb-5 pt-0">
                                <div className="border-t border-white/5 pt-3 space-y-1">
                                    {domain.programs.map((prog, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                                        >
                                            <span className="text-gray-300 text-sm font-medium">{prog.name}</span>
                                            {prog.badge && (
                                                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${domain.color} border ${domain.border} ${domain.accent} whitespace-nowrap ml-2`}>
                                                    {prog.badge}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const AdmissionsBento = () => {
    const [openDomain, setOpenDomain] = useState('engineering');

    // Split domains into two columns for independent height flow
    const leftCol = domains.filter(d => ['engineering', 'business', 'health'].includes(d.id));
    const rightCol = domains.filter(d => ['it-sciences', 'creative'].includes(d.id));

    const renderCard = (domain, i) => (
        <BentoCard
            key={domain.id}
            domain={domain}
            index={i}
            isOpen={openDomain === domain.id}
            onToggle={() => setOpenDomain(openDomain === domain.id ? null : domain.id)}
        />
    );

    return (
        <section className="py-12 md:py-24 px-4 bg-[#020205] relative z-10 overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/3 -right-[10%] w-[40vw] h-[40vw] bg-red-600/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Admissions 2026
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
                        Programs You Can{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Apply for
                        </span>{' '}
                        2026
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Admissions are open for the following programs for the 2026 intake across five schools.
                    </p>
                </motion.div>

                {/* Two-column flex layout — each column flows independently */}
                <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* Left column — wider */}
                    <div className="flex flex-col gap-4 w-full md:flex-[3]">
                        {leftCol.map((d, i) => renderCard(d, i))}
                    </div>
                    {/* Right column — narrower */}
                    <div className="flex flex-col gap-4 w-full md:flex-[2]">
                        {rightCol.map((d, i) => renderCard(d, leftCol.length + i))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-center"
                >
                    <a
                        href="#apply-section"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full font-semibold shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] transition-all hover:scale-105"
                    >
                        Apply Now <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default AdmissionsBento;
