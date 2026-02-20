import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Palette, HeartPulse, ArrowUpRight, TrendingUp, Users, Building2, Quote, Globe } from 'lucide-react';

const pathways = [
    {
        icon: Code,
        domain: 'Technology',
        roles: [
            { name: 'AI Engineer', highlighted: true },
            { name: 'Cloud Architect', highlighted: true },
            { name: 'Full-Stack Dev', highlighted: false }
        ],
        color: 'bg-blue-500',
        gradient: 'from-blue-500/20 to-blue-600/5',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        highlightColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
        icon: Briefcase,
        domain: 'Business',
        roles: [
            { name: 'Product Manager', highlighted: true },
            { name: 'Fintech Analyst', highlighted: true },
            { name: 'Consultant', highlighted: false }
        ],
        color: 'bg-amber-500',
        gradient: 'from-amber-500/20 to-amber-600/5',
        border: 'border-amber-500/20',
        text: 'text-amber-400',
        highlightColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
        icon: Palette,
        domain: 'Creative',
        roles: [
            { name: 'UX Designer', highlighted: true },
            { name: 'Game Dev', highlighted: true },
            { name: 'Motion Artist', highlighted: false }
        ],
        color: 'bg-purple-500',
        gradient: 'from-purple-500/20 to-purple-600/5',
        border: 'border-purple-500/20',
        text: 'text-purple-400',
        highlightColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
        icon: HeartPulse,
        domain: 'Healthcare',
        roles: [
            { name: 'Clinical Data Scientist', highlighted: true },
            { name: 'Bio-Tech Researcher', highlighted: true }
        ],
        color: 'bg-emerald-500',
        gradient: 'from-emerald-500/20 to-emerald-600/5',
        border: 'border-emerald-500/20',
        text: 'text-emerald-400',
        highlightColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
];

const quotes = [
    { text: "I build AI models at a startup I interned with.", name: "Arjun R.", role: "AI Engineer @ Stealth" },
    { text: "My design portfolio landed me a role before graduation.", name: "Priya M.", role: "Product Designer @ Swiggy" },
    { text: "The MBA analytics track gave me confidence to lead teams.", name: "Rahul S.", role: "Data Lead @ Accenture" },
];

const CareerPathways = () => {
    return (
        <section className="py-16 px-4 bg-[#05050A] relative overflow-hidden border-t border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-[90%] md:w-[70%] mx-auto relative z-10">
                {/* Header — fully left-aligned */}
                <div className="mb-10 border-b border-white/10 pb-8">
                    <div className="max-w-4xl">
                        <span className="inline-flex items-center gap-2 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 mb-4">
                            Outcomes First
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                            Careers Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Long Game</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-lg border-l-4 border-red-500 pl-4 py-1 mb-8">
                            Go beyond placements. Build a career trajectory that adapts to the future of work.
                        </p>

                        {/* Stats — left-aligned row below heading */}
                        <div className="flex flex-wrap gap-6 md:gap-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">₹12 LPA</p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mt-1">Avg Package</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">500+</p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mt-1">Hiring Partners</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <Globe className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">Global</p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mt-1">Alumni Network</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                    {/* Left Col: Domain Pathways (Compact Grid) */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 h-full">
                        {pathways.map((path, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                className={`group relative p-5 rounded-xl border ${path.border} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden h-full`}
                            >
                                {/* Hover Gradient */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${path.gradient}`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <path.icon className={`w-8 h-8 ${path.text}`} strokeWidth={1.5} />
                                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-1">{path.domain}</h3>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {path.roles.map((role, rIndex) => (
                                            <span
                                                key={rIndex}
                                                className={`text-xs px-2.5 py-1 rounded-md border ${role.highlighted
                                                        ? path.highlightColor + ' font-bold shadow-sm'
                                                        : 'text-gray-500 border-white/5 bg-white/5 font-medium'
                                                    } transition-colors`}
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Col: Voices / Success Stories (Vertical Stack) */}
                    <div className="lg:col-span-1 bg-white/[0.02] border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center h-full">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

                        <div className="mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-red-500" />
                            <h4 className="text-white text-sm font-bold uppercase tracking-widest">Alumni Voices</h4>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {quotes.map((quote, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <p className="text-gray-400 text-xs italic mb-2 leading-relaxed">"{quote.text}"</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-[8px] text-white font-bold">
                                            {quote.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold">{quote.name}</p>
                                            <p className="text-gray-600 text-[10px] uppercase font-semibold">{quote.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerPathways;
