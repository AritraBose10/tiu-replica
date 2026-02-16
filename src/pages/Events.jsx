import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowUpRight, Search, Filter, Sparkles, ChevronRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import pastEvents from '../data/past_events.json';
import { useSanity } from '../hooks/useSanity';
import { EVENTS_QUERY } from '../lib/queries';

// ─── Mock Data ───────────────────────────────────────────────
const CATEGORIES = ['All', 'Technical', 'Cultural', 'Workshop', 'Seminar', 'Sports'];

const fallbackEventsData = [
    {
        id: 1,
        title: 'TechNova 2026 – Annual Tech Fest',
        description: 'A 3-day celebration of technology, innovation & creativity with hackathons, coding battles, robotics challenges, and keynote talks from industry leaders.',
        date: 'March 15–17, 2026',
        time: '9:00 AM – 8:00 PM',
        location: 'Main Auditorium & Tech Block',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        attendees: 2500,
        featured: true,
        status: 'upcoming',
    },
    {
        id: 2,
        title: 'AI & Machine Learning Workshop',
        description: 'Hands-on workshop covering LLMs, neural networks, and real-world ML applications. Includes certificate of completion.',
        date: 'March 22, 2026',
        time: '10:00 AM – 4:00 PM',
        location: 'CS Lab 301',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
        attendees: 120,
        featured: false,
        status: 'upcoming',
    },
    {
        id: 3,
        title: 'Culturama – Cultural Festival',
        description: 'Music, dance, drama, art exhibitions and food from cultures across India. Featured performances by professional artists.',
        date: 'April 5–6, 2026',
        time: '11:00 AM – 10:00 PM',
        location: 'Open Air Theatre & Central Ground',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
        attendees: 5000,
        featured: true,
        status: 'upcoming',
    },
    {
        id: 4,
        title: 'Industry Leaders Seminar Series',
        description: 'Monthly seminar with CXOs from Google, Microsoft, and Amazon sharing insights on tech careers and innovation.',
        date: 'Every Last Friday',
        time: '3:00 PM – 5:00 PM',
        location: 'Seminar Hall A',
        category: 'Seminar',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop',
        attendees: 300,
        featured: false,
        status: 'ongoing',
    },
    {
        id: 5,
        title: 'Hackathon: Code for Change',
        description: '36-hour hackathon focused on building solutions for social impact. Cash prizes worth ₹5 Lakhs.',
        date: 'April 20–21, 2026',
        time: '10:00 AM (Start)',
        location: 'Innovation Hub',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
        attendees: 500,
        featured: false,
        status: 'upcoming',
    },
    {
        id: 6,
        title: 'Inter-University Sports Meet',
        description: 'Annual sports competition featuring cricket, football, basketball, athletics, and esports with teams from 20+ universities.',
        date: 'May 1–5, 2026',
        time: '8:00 AM – 6:00 PM',
        location: 'Sports Complex',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba6343ce?q=80&w=2070&auto=format&fit=crop',
        attendees: 3000,
        featured: false,
        status: 'upcoming',
    },
    {
        id: 7,
        title: 'Cloud Computing Bootcamp',
        description: 'Intensive 2-day bootcamp on AWS, Azure, and GCP. Build and deploy real cloud applications.',
        date: 'March 29–30, 2026',
        time: '9:30 AM – 5:30 PM',
        location: 'Tech Block Room 204',
        category: 'Workshop',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        attendees: 80,
        featured: false,
        status: 'upcoming',
    },
    {
        id: 8,
        title: 'Research Paper Symposium',
        description: 'Present and discuss cutting-edge research across engineering, science, and management domains.',
        date: 'April 12, 2026',
        time: '10:00 AM – 3:00 PM',
        location: 'Conference Center',
        category: 'Seminar',
        image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2070&auto=format&fit=crop',
        attendees: 200,
        featured: false,
        status: 'upcoming',
    },
    ...pastEvents
];

// ─── Floating Background ─────────────────────────────────────
const FloatingBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[#FF0000]/5 rounded-full blur-[120px]"
        />
        <motion.div
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
    </div>
);

// ─── Status Badge ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const styles = {
        upcoming: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        ongoing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        past: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return (
        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${styles[status]}`}>
            {status === 'ongoing' ? '● Live' : status}
        </span>
    );
};

// ─── Featured Event Card ──────────────────────────────────────
const FeaturedEventCard = ({ event, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative col-span-1 md:col-span-2 lg:col-span-1"
    >
        {/* Hover Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-3xl" />

        <div className="relative h-full bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#FF0000]/30 transition-colors duration-500">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" />

                {/* Category + Status overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#FF0000] px-3 py-1 rounded-full">
                        {event.category}
                    </span>
                    <StatusBadge status={event.status} />
                </div>

                {/* Featured badge */}
                {event.featured && (
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-4 right-4"
                    >
                        <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                    </motion.div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors duration-300">
                    {event.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {event.description}
                </p>

                {/* Meta */}
                <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 text-[#FF0000]" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4 text-[#FF0000]" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-[#FF0000]" />
                        <span>{event.location}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{(event.attendees || 0).toLocaleString()}+ expected</span>
                    </div>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="bg-white/5 p-2 rounded-full group-hover:bg-[#FF0000] transition-all duration-300"
                    >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </motion.div>
                </div>
            </div>
        </div>
    </motion.div>
);

// ─── Main Events Page ─────────────────────────────────────────
const Events = () => {
    const { data: sanityEvents } = useSanity(EVENTS_QUERY, null);
    const eventsData = sanityEvents && sanityEvents.length > 0 ? sanityEvents : fallbackEventsData;
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = eventsData.filter((event) => {
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredEvents = eventsData.filter((e) => e.featured);

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <FloatingBackground />

            {/* ═══ HERO ═══ */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                        alt="Events"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/80 to-[#020205]/50" />
                </div>

                {/* Large bg text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[18vw] font-black text-white/[0.03] tracking-tighter select-none">
                        EVENTS
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/20"
                        >
                            <Calendar className="w-4 h-4 text-[#FF0000]" />
                            Campus Life & Events
                        </motion.span>

                        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
                            <motion.span
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                What's
                            </motion.span>{' '}
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                                className="relative inline-block"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-500 to-[#FF0000]">
                                    Happening
                                </span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left rounded-full"
                                />
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            Discover workshops, fests, hackathons, seminars and more — there's always something exciting happening at TIU.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

            {/* ═══ FEATURED EVENTS ═══ */}
            <section className="py-24 px-4 bg-[#020205] relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-14 flex items-end justify-between"
                    >
                        <div>
                            <span className="inline-block text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-3 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">
                                <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                                Featured
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mt-3">
                                Spotlight{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Events</span>
                            </h2>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredEvents.map((event, i) => (
                            <FeaturedEventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ALL EVENTS + FILTERS ═══ */}
            <section className="py-24 px-4 bg-gradient-to-b from-[#020205] via-[#050510] to-[#020205] relative">
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <span className="inline-block text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-3 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">
                            Browse All
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mt-3">
                            Event{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Calendar</span>
                        </h2>
                    </motion.div>

                    {/* Search + Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-4 mb-12"
                    >
                        {/* Search bar */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 focus:shadow-[0_0_20px_rgba(255,0,0,0.1)] transition-all"
                            />
                        </div>

                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <motion.button
                                    key={cat}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === cat
                                        ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-[#FF0000]/30 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Events Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event, i) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        className="group relative"
                                    >
                                        {/* Hover glow */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 rounded-3xl" />

                                        <div className="relative h-full bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#FF0000]/30 transition-colors duration-500">
                                            {/* Image */}
                                            <div className="relative h-44 overflow-hidden">
                                                <motion.img
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.4 }}
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" />
                                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#FF0000]/90 px-2.5 py-1 rounded-full">
                                                        {event.category}
                                                    </span>
                                                    <StatusBadge status={event.status} />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors duration-300 line-clamp-1">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                                    {event.description}
                                                </p>

                                                <div className="space-y-1.5 mb-4">
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                        <Calendar className="w-3.5 h-3.5 text-[#FF0000]" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                        <MapPin className="w-3.5 h-3.5 text-[#FF0000]" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                        <Users className="w-3.5 h-3.5" />
                                                        <span>{(event.attendees || 0).toLocaleString()}+</span>
                                                    </div>
                                                    <motion.div
                                                        whileHover={{ x: 3 }}
                                                        className="bg-white/5 p-1.5 rounded-full group-hover:bg-[#FF0000] transition-all duration-300"
                                                    >
                                                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <p className="text-2xl font-bold text-gray-500 mb-2">No events found</p>
                                        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-32 px-4 bg-[#020205] relative overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0000]/20 rounded-full blur-[150px]"
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-block mb-6"
                        >
                            <Calendar className="w-12 h-12 text-[#FF0000]" />
                        </motion.div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-6">
                            Don't Miss{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">Out</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
                            Stay updated with the latest events, workshops, and festivals at Techno India University.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,0,0,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,0,0,0.4)] border border-white/10"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Get Notified
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/admissions"
                                    className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-lg border border-white/20"
                                >
                                    Apply Now
                                    <ArrowUpRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Events;
