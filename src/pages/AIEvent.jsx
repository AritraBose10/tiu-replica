import { motion } from 'framer-motion';
import {
    Sparkles, ChevronRight, ArrowUpRight, Check, Brain, Zap,
    Users, Clock, MapPin, Star, AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfvDuLQN7Aq-1oIGeteYicyc50Ta6UOIgmqYVECaO9ROLniJg/viewform?usp=sharing&ouid=100476780291117363807';

// ─── Floating Background ─────────────────────────────────────────────────────
const FloatingBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[#FF0000]/5 rounded-full blur-[120px]"
        />
        <motion.div
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]"
        />
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[100px]"
        />
    </div>
);

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-block text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20"
    >
        {children}
    </motion.span>
);

// ─── Workshop Image Block ─────────────────────────────────────────────────────
// Replace /assets/images/seminar.jpg with the actual workshop photo when available
const WorkshopImageBlock = () => (
    <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring', stiffness: 70 }}
        className="relative"
    >
        {/* Ambient glow behind image */}
        <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-6 bg-gradient-to-br from-[#FF0000]/20 via-purple-600/15 to-blue-600/10 rounded-3xl blur-3xl pointer-events-none"
        />

        {/* Image frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            <img
                src="/assets/images/seminar.jpg"
                alt="Live workshop session — students learning AI and Prompt Engineering"
                className="w-full h-[440px] object-cover"
                loading="eager"
            />

            {/* Bottom-to-top gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* Purple pill badge — matches the creative */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <div className="flex items-center gap-2.5 bg-[#5a2d82]/85 backdrop-blur-md px-6 py-3 rounded-full border border-purple-400/30 shadow-[0_4px_24px_rgba(90,45,130,0.5)] whitespace-nowrap">
                    <Sparkles className="w-4 h-4 text-purple-300 shrink-0" />
                    <span className="text-white font-semibold text-sm">Workshop on AI &amp; Prompt Engineering</span>
                </div>
            </motion.div>
        </div>

        {/* "Don't wait. Get ahead." — directly from the creative */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center mt-5 text-[#FF0000] font-black text-lg tracking-wide"
        >
            Don&apos;t wait. Get ahead.
        </motion.p>
    </motion.div>
);

// ─── Learn Item ───────────────────────────────────────────────────────────────
const LearnItem = ({ text, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ x: 8, borderColor: 'rgba(255,0,0,0.4)' }}
        className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-300 group"
    >
        <div className="w-8 h-8 shrink-0 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center mt-0.5 group-hover:bg-[#FF0000] transition-colors duration-300">
            <Check className="w-4 h-4 text-[#FF0000] group-hover:text-white transition-colors duration-300" />
        </div>
        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">{text}</p>
    </motion.div>
);

// ─── Audience Card ────────────────────────────────────────────────────────────
const AudienceCard = ({ text, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 }}
        className="group relative"
    >
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-2xl" />
        <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-[#FF0000]/30 transition-colors duration-300 h-full flex items-center gap-4">
            <Star className="w-5 h-5 text-[#FF0000] shrink-0" />
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{text}</p>
        </div>
    </motion.div>
);

// ─── Detail Card ──────────────────────────────────────────────────────────────
const DetailCard = ({ icon: Icon, label, value }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#FF0000]/30 transition-all duration-300"
    >
        <div className="w-12 h-12 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#FF0000]" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
        <p className="text-white font-semibold">{value}</p>
    </motion.div>
);

// ─── Special Feature Item ─────────────────────────────────────────────────────
const SpecialItem = ({ text, index }) => (
    <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-3"
    >
        <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shrink-0"
        />
        <p className="text-gray-300">{text}</p>
    </motion.div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const AIEvent = () => {
    const learnItems = [
        'Understand what AI really is',
        'Learn how prompt engineering works',
        'See how students can use AI for study, creativity, and problem solving',
        'Get practical exposure through simple examples',
        'Explore how AI skills can help in college and future careers',
    ];

    const audienceItems = [
        'Class 12 students awaiting college admission',
        'Students curious about AI',
        'Students who want to stay ahead before college starts',
        'Students interested in technology, business, creativity, or future careers',
    ];

    const details = [
        { icon: Users, label: 'For', value: 'Class 12 students awaiting admission' },
        { icon: MapPin, label: 'Mode', value: 'Offline / Online' },
        { icon: Clock, label: 'Date', value: 'To be announced' },
        { icon: Clock, label: 'Duration', value: 'To be announced' },
    ];

    const specialItems = [
        'Simple language',
        'Beginner friendly session',
        'Useful for students from all streams',
        'Focused on real world understanding',
        'Designed to make you confident with AI from the very beginning',
    ];

    const whyNowLines = [
        { bold: 'College will start soon.', sub: 'The clock is already ticking.' },
        { bold: 'Competition has already started.', sub: 'Others are not waiting.' },
        { bold: 'Students who begin early will always stay one step ahead.', sub: 'That advantage starts now.' },
    ];

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <div className="fixed inset-0 pointer-events-none z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07]" />
            <SEO
                title="Workshop on AI and Prompt Engineering for Class 12 Students | School of the Future"
                description="Start learning AI before college begins. Join our Workshop on AI and Prompt Engineering made specially for Class 12 students awaiting admissions. Limited seats — register now."
            />
            <FloatingBackground />

            {/* ═══ HERO — Split Layout ═══ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Large watermark BG text */}
                <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-4 md:pr-8">
                    <span className="text-[22vw] font-black text-white/[0.018] tracking-tighter select-none leading-none">AI</span>
                </div>

                {/* Red ambient orb — left side */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.22, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-[#FF0000]/15 rounded-full blur-[160px] pointer-events-none"
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                        {/* ── Left: Ad copy ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >
                            {/* Class badge */}
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 }}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20 shadow-lg"
                            >
                                <Brain className="w-4 h-4 text-[#FF0000]" />
                                For Class 12 Students
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.span>

                            {/* Hook — mirrors the creative exactly */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="text-gray-400 text-xl font-medium mb-2 tracking-wide"
                            >
                                Still waiting for
                            </motion.p>

                            <h1 className="font-black leading-[1.0] mb-5">
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="block text-white text-5xl md:text-[4.5rem]"
                                >
                                    College
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                    className="relative block"
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-400 to-[#FF0000] text-5xl md:text-[4.5rem]">
                                        Admissions?
                                    </span>
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 1.0 }}
                                        className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left rounded-full"
                                    />
                                </motion.span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-gray-400 text-lg mb-2"
                            >
                                Others have already started{' '}
                                <span className="text-white font-bold">learning AI.</span>
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.72, type: 'spring' }}
                                className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight"
                            >
                                WHERE ARE YOU?
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.85 }}
                                className="text-gray-500 text-sm mb-8 flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4 text-[#FF0000] shrink-0" />
                                Limited seats. Early registration is strongly recommended.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                            >
                                <motion.a
                                    href={FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,0,0,0.6)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,0,0,0.4)] border border-white/10"
                                >
                                    <Zap className="w-5 h-5" />
                                    Register Now
                                    <ChevronRight className="w-5 h-5" />
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* ── Right: Workshop image block ── */}
                        <WorkshopImageBlock />
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-7 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 backdrop-blur-sm">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-2 h-3 bg-[#FF0000] rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ═══ SECTION 1 — WHY JOIN ═══ */}
            <section className="py-28 px-4 bg-[#111111] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionLabel>Why Join</SectionLabel>
                            <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-8">
                                Why join this{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">workshop?</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                While many students are still waiting for admissions, smart students are already building future ready skills.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-lg mt-4">
                                This workshop will help you understand how AI works, how prompts can be used in the right way, and how these skills can give you an early advantage before college even starts.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -inset-4 bg-gradient-to-r from-[#FF0000]/20 to-purple-600/20 rounded-3xl blur-3xl"
                            />
                            <div className="relative bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="inline-block mb-6"
                                >
                                    <Brain className="w-20 h-20 text-[#FF0000]" />
                                </motion.div>
                                <p className="text-2xl font-black text-white mb-2">Start Before Everyone Else</p>
                                <p className="text-gray-400">The best time to learn AI is now — before college begins.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 2 — WHAT YOU WILL LEARN ═══ */}
            <section className="py-28 px-4 bg-[#0d0d0d] relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <SectionLabel>Curriculum</SectionLabel>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
                            What you will{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">learn</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {learnItems.map((item, i) => (
                            <LearnItem key={i} text={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 3 — WHO SHOULD ATTEND ═══ */}
            <section className="py-28 px-4 bg-gradient-to-b from-[#020205] via-[#050510] to-[#020205] relative">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <SectionLabel>Audience</SectionLabel>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
                            Who should{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">attend?</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {audienceItems.map((item, i) => (
                            <AudienceCard key={i} text={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 4 — WHY THIS MATTERS NOW ═══ */}
            <section className="py-28 px-4 bg-[#0d0d0d] relative overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF0000]/15 rounded-full blur-[180px]"
                />

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <SectionLabel>Urgency</SectionLabel>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-2">
                            Why this{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">matters now</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-6 mb-14">
                        {whyNowLines.map(({ bold, sub }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group"
                            >
                                <p className="text-2xl md:text-3xl font-black text-white group-hover:text-[#FF0000] transition-colors duration-300">{bold}</p>
                                <p className="text-gray-500 mt-1">{sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-2xl p-8 max-w-xl mx-auto"
                    >
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Do not spend these important months only waiting.<br />
                            <span className="text-white font-bold">Use this time to build something valuable.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ SECTION 5 — WORKSHOP DETAILS ═══ */}
            <section className="py-28 px-4 bg-[#111111] relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <SectionLabel>Workshop Info</SectionLabel>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-4">
                            Workshop{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Details</span>
                        </h2>
                        <p className="text-gray-500 text-base">Workshop on AI and Prompt Engineering</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {details.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <DetailCard {...d} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 6 — WHAT MAKES IT SPECIAL ═══ */}
            <section className="py-28 px-4 bg-[#0d0d0d] relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-5"
                        >
                            <SectionLabel>Special</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-black text-white">
                                What makes this{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">workshop special?</span>
                            </h2>
                            <div className="space-y-4 pt-4">
                                {specialItems.map((item, i) => (
                                    <SpecialItem key={i} text={item} index={i} />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: Brain, label: 'Beginner Friendly', desc: 'No prior knowledge needed' },
                                { icon: Users, label: 'All Streams', desc: 'Science, Commerce & Arts' },
                                { icon: Zap, label: 'Practical Focus', desc: 'Real world examples' },
                                { icon: Star, label: 'Early Advantage', desc: 'Start ahead of peers' },
                            ].map(({ icon: Icon, label, desc }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#FF0000]/30 transition-all duration-300"
                                >
                                    <Icon className="w-8 h-8 text-[#FF0000] mb-3" />
                                    <p className="text-white font-bold text-sm mb-1">{label}</p>
                                    <p className="text-gray-500 text-xs">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="py-32 px-4 bg-[#111111] relative overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0000]/20 rounded-full blur-[150px]"
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                            Seats are{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">limited.</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-2">Registrations are filling fast.</p>
                        <p className="text-gray-500 mb-4">Do not miss the chance to get early exposure to AI before college begins.</p>

                        {/* Creative tagline repeated as final punch */}
                        <p className="text-[#FF0000] font-black text-2xl mb-12 tracking-wide">Don&apos;t wait. Get ahead.</p>

                        <motion.a
                            href={FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,0,0,0.6)' }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-14 py-6 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] border border-white/10 transition-shadow duration-300"
                        >
                            <Zap className="w-6 h-6" />
                            Book My Seat
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <ArrowUpRight className="w-6 h-6" />
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AIEvent;
