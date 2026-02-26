import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Calendar, HelpCircle, ArrowUpRight, Sparkles, X } from 'lucide-react';
import coursesData from '../data/mock_courses.json';
import SEO from '../components/SEO';

// ─── Result Card ───────────────────────────────────────────────
const ResultCard = ({ result, index }) => {
    const icons = {
        course: <BookOpen className="w-5 h-5" />,
        event: <Calendar className="w-5 h-5" />,
        faq: <HelpCircle className="w-5 h-5" />,
        page: <ArrowUpRight className="w-5 h-5" />,
    };
    const colors = {
        course: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
        event: 'from-pink-500/20 to-red-500/10 border-pink-500/30',
        faq: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
        page: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    };
    const badges = {
        course: 'bg-blue-500/20 text-blue-300',
        event: 'bg-pink-500/20 text-pink-300',
        faq: 'bg-amber-500/20 text-amber-300',
        page: 'bg-emerald-500/20 text-emerald-300',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Link
                to={result.url}
                className={`block group p-5 rounded-2xl bg-gradient-to-br ${colors[result.type]} border backdrop-blur-sm hover:scale-[1.01] transition-all duration-300`}
            >
                <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-white/70 group-hover:text-white transition-colors">
                        {icons[result.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badges[result.type]}`}>
                                {result.type}
                            </span>
                        </div>
                        <h3 className="text-white font-semibold text-base group-hover:text-[#FF0000] transition-colors mb-1">
                            {result.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{result.description}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                </div>
            </Link>
        </motion.div>
    );
};

// ─── Main Search Page ──────────────────────────────────────────
const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromURL = searchParams.get('q') || '';
    const [query, setQuery] = useState(queryFromURL);
    const [events, setEvents] = useState([]);

    // Sync input with URL
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    // Fetch events for search
    useEffect(() => {
        fetch('/api/scrape-events')
            .then(r => r.ok ? r.json() : [])
            .then(setEvents)
            .catch(() => setEvents([]));
    }, []);

    // Static pages for search
    const pages = [
        { title: 'About Us', description: 'Learn about Techno India University, our vision, mission, and the School of the Future initiative.', url: '/about' },
        { title: 'Admissions', description: 'Apply now for future-ready programs. Scholarships, eligibility criteria, and application process.', url: '/admissions' },
        { title: 'Contact', description: 'Get in touch with Techno India University. Campus location, phone, email, and directions.', url: '/contact' },
        { title: 'FAQ', description: 'Frequently asked questions about programs, admissions, fees, campus life, and placements.', url: '/faq' },
        { title: 'Approvals & Accreditations', description: 'UGC, AICTE, NAAC approvals and recognitions for Techno India University.', url: '/approvals' },
        { title: 'Events & Happenings', description: 'Tech fests, workshops, hackathons, cultural events and seminars on campus.', url: '/events' },
        { title: 'Programs & Courses', description: 'Explore UG, PG & PhD programs in AI, Data Science, Design, Business and Health Sciences.', url: '/courses' },
    ];

    // Search logic
    const results = useMemo(() => {
        const q = (searchParams.get('q') || '').toLowerCase().trim();
        if (!q) return [];

        const matches = [];

        // Search courses
        coursesData.forEach(course => {
            if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q) || course.category.toLowerCase().includes(q)) {
                matches.push({ type: 'course', title: course.title, description: course.description, url: '/courses' });
            }
        });

        // Search events
        events.forEach(event => {
            if ((event.title || '').toLowerCase().includes(q) || (event.category || '').toLowerCase().includes(q)) {
                matches.push({ type: 'event', title: event.title, description: event.date || 'Upcoming event at TIU', url: '/events' });
            }
        });

        // Search pages
        pages.forEach(page => {
            if (page.title.toLowerCase().includes(q) || page.description.toLowerCase().includes(q)) {
                matches.push({ type: 'page', title: page.title, description: page.description, url: page.url });
            }
        });

        return matches;
    }, [searchParams.get('q'), events]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchParams({ q: query.trim() });
        }
    };

    const activeQuery = searchParams.get('q') || '';

    return (
        <div className="min-h-screen bg-[#020205] text-white relative overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <SEO
                title={activeQuery ? `Search: ${activeQuery} | School of the Future` : 'Search | School of the Future'}
                description="Search programs, events, and pages at the School of the Future, Techno India University."
            />

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            {/* Hero / Search Area */}
            <section className="relative pt-32 pb-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <Sparkles className="w-4 h-4 text-[#FF0000]" />
                            Search Everything
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-8">
                            What are you{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">
                                looking for?
                            </span>
                        </h1>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.form
                        onSubmit={handleSearch}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl focus-within:border-[#FF0000]/50 transition-colors duration-300">
                            <Search className="w-5 h-5 text-gray-500 ml-5 flex-shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search courses, events, pages..."
                                className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-4 text-lg outline-none"
                                autoFocus
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => { setQuery(''); setSearchParams({}); }}
                                    className="p-2 mr-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="bg-[#FF0000] hover:bg-red-600 text-white font-semibold px-6 py-4 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>

            {/* Results */}
            <section className="relative max-w-3xl mx-auto px-4 pb-24">
                <AnimatePresence mode="wait">
                    {activeQuery && (
                        <motion.div
                            key={activeQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="text-gray-400 text-sm mb-6">
                                {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
                                <span className="text-white font-semibold">"{activeQuery}"</span>
                            </p>

                            {results.length > 0 ? (
                                <div className="space-y-3">
                                    {results.map((result, i) => (
                                        <ResultCard key={`${result.type}-${result.title}-${i}`} result={result} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                        <Search className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                                    <p className="text-gray-500">Try searching for a program name, event, or topic.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {!activeQuery && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-gray-500 text-sm">Try searching for <span className="text-gray-300">"AI"</span>, <span className="text-gray-300">"Data Science"</span>, or <span className="text-gray-300">"admissions"</span></p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
};

export default SearchPage;
