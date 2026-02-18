import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle2 } from 'lucide-react';
import { useSanity } from '../hooks/useSanity';
import { APPROVALS_QUERY } from '../lib/queries';

const fallbackApprovals = [
    { name: 'UGC', fullName: 'University Grants Commission', logo: 'https://static.wixstatic.com/media/4d76fa_22977ebae1bc4181b6af13c54d0ec195~mv2.jpg' },
    { name: 'AICTE', fullName: 'All India Council for Technical Education', logo: 'https://static.wixstatic.com/media/4d76fa_20b732a7a0df4f1aacbee92f04803ff1~mv2.jpg' },
    { name: 'COA', fullName: 'Council of Architecture', logo: 'https://static.wixstatic.com/media/4d76fa_85c506123858458bbddc73a0ff910cc4~mv2.jpg' },
    { name: 'PCI', fullName: 'Pharmacy Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_0f94f520580d4155ac4f8ccb065da04b~mv2.jpg' },
    { name: 'BCI', fullName: 'Bar Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_b4b6e0c8ec2d4b84b19ea16dbcfd016a~mv2.jpg' },
    { name: 'INC', fullName: 'Indian Nursing Council', logo: 'https://static.wixstatic.com/media/4d76fa_df762dfb25974f669d9704d2d5fd127e~mv2.jpg' },
    { name: 'WBNC', fullName: 'West Bengal Nursing Council', logo: 'https://static.wixstatic.com/media/4d76fa_e3fdabfd4e4f4fcda0bc586777ea9596~mv2.jpg' },
    { name: 'NAAC', fullName: 'National Assessment and Accreditation Council', logo: '🏅' },
    { name: 'NBA', fullName: 'National Board of Accreditation', logo: '📋' },
    { name: 'AIU', fullName: 'Association of Indian Universities', logo: '🎓' },
];

const ApprovalCard = ({ approval, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.5 }}
        className="group relative"
    >
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col items-start gap-4 transition-all duration-500 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,0,0,0.08)] overflow-hidden h-full">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/[0.04] group-hover:via-transparent group-hover:to-red-500/[0.02] transition-all duration-500 pointer-events-none" />

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/0 group-hover:border-red-500/40 transition-all duration-500 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/0 group-hover:border-red-500/40 transition-all duration-500 rounded-br-2xl" />

            {/* Logo */}
            <div className="relative w-16 h-16 rounded-xl bg-white/10 p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                {approval.logo && approval.logo.startsWith('http') ? (
                    <img
                        src={approval.logo}
                        alt={approval.name}
                        className="w-full h-full object-contain rounded-lg"
                    />
                ) : (
                    <span className="text-3xl">{approval.logo}</span>
                )}
            </div>

            {/* Name */}
            <span className="font-black text-white text-base tracking-wide group-hover:text-red-400 transition-colors duration-300 relative z-10">
                {approval.name}
            </span>

            {/* Full Name */}
            <span className="text-[11px] text-gray-500 text-left leading-relaxed relative z-10 group-hover:text-gray-400 transition-colors duration-300">
                {approval.fullName}
            </span>

            {/* Verified badge */}
            <div className="flex items-center gap-1 mt-auto pt-2 relative z-10">
                <CheckCircle2 className="w-3 h-3 text-emerald-500/60 group-hover:text-emerald-400 transition-colors" />
                <span className="text-[10px] text-emerald-500/60 group-hover:text-emerald-400 font-medium tracking-wider uppercase transition-colors">
                    Verified
                </span>
            </div>
        </div>
    </motion.div>
);

const ApprovalsSection = () => {
    const { data: approvals } = useSanity(APPROVALS_QUERY, fallbackApprovals);
    return (
        <section className="py-24 bg-[#020205] relative overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Circuit grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#f00 1px, transparent 1px), linear-gradient(90deg, #f00 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="w-[90%] md:w-[70%] mx-auto relative z-10">
                {/* Two-column asymmetric layout */}
                <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                    {/* Left column — text content */}
                    <div className="lg:sticky lg:top-24">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 text-red-500 text-[11px] font-bold tracking-[0.3em] uppercase px-5 py-2.5 bg-red-500/10 rounded-full border border-red-500/20">
                                <Shield className="w-3.5 h-3.5" />
                                Trust & Credibility
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight"
                        >
                            Recognition &{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-500">
                                Academic Assurance
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 mb-10 leading-relaxed text-sm md:text-base border-l-4 border-red-500 pl-6"
                        >
                            All programs are offered under a UGC-recognised university framework with structured
                            academic governance and compliance.
                        </motion.p>

                        {/* Stat bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="flex flex-col gap-6"
                        >
                            {[
                                { icon: Shield, value: '10+', label: 'Regulatory Bodies' },
                                { icon: Award, value: 'UGC', label: 'Recognized University' },
                                { icon: CheckCircle2, value: 'NAAC', label: 'Accredited' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <stat.icon className="w-4 h-4 text-red-500" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-black text-lg">{stat.value}</div>
                                        <div className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right column — Approval Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                        {approvals.map((approval, index) => (
                            <ApprovalCard key={approval.name} approval={approval} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApprovalsSection;
