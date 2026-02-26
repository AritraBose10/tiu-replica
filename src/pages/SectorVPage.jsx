import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Train, GraduationCap, Briefcase, ArrowUpRight, Sparkles, Navigation, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';
import coursesData from '../data/mock_courses.json';

// ─── Nearby Companies ─────────────────────────────────────────
const TECH_COMPANIES = [
    { name: 'TCS', distance: '0.5 km', type: 'IT Services' },
    { name: 'Cognizant', distance: '0.8 km', type: 'IT Services' },
    { name: 'IBM', distance: '1.2 km', type: 'Technology' },
    { name: 'Wipro', distance: '1.0 km', type: 'IT Services' },
    { name: 'Capgemini', distance: '1.5 km', type: 'Consulting' },
    { name: 'Accenture', distance: '1.3 km', type: 'Consulting' },
];

const LOCATION_ADVANTAGES = [
    {
        icon: <Building2 className="w-6 h-6" />,
        title: 'Heart of Kolkata\'s IT Hub',
        description: 'Located in Salt Lake Sector V — Kolkata\'s Silicon Valley with 500+ IT companies within walking distance.'
    },
    {
        icon: <Briefcase className="w-6 h-6" />,
        title: 'Internship-Ready Location',
        description: 'Walk to TCS, Cognizant, IBM, Wipro for internships. No commute — start working while you study.'
    },
    {
        icon: <Train className="w-6 h-6" />,
        title: 'Metro Connected',
        description: 'Direct metro connectivity via Karunamoyee & Central Park stations. Easy access from anywhere in Kolkata.'
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: 'Industry Networking',
        description: 'Regular meetups, GDG events, and tech conferences happen right in Sector V. Your campus is at the epicentre.'
    },
];

// ─── Hero Stats ────────────────────────────────────────────────
const STATS = [
    { value: '500+', label: 'IT Companies Nearby' },
    { value: '<1 km', label: 'From TCS & Cognizant' },
    { value: '2', label: 'Metro Stations' },
    { value: '700091', label: 'India\'s Tech PIN Code' },
];

const SectorVPage = () => {
    // Local SEO schema
    const localSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "CollegeOrUniversity",
        "name": "Techno India University — Salt Lake Sector V Campus",
        "alternateName": ["TIU Sector V", "School of the Future Salt Lake"],
        "url": "https://www.technoindiauniversity.ai/salt-lake-sector-v",
        "description": "Techno India University is located in Salt Lake Sector V, Kolkata — the IT hub of Eastern India. Study AI, Data Science, Cloud Computing next to TCS, Cognizant, IBM, and Wipro.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "EM-4, Sector V, Salt Lake",
            "addressLocality": "Kolkata",
            "addressRegion": "West Bengal",
            "postalCode": "700091",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "22.5726",
            "longitude": "88.4312"
        },
        "hasMap": "https://maps.google.com/?q=Techno+India+University+Salt+Lake+Sector+V+Kolkata",
        "areaServed": {
            "@type": "City",
            "name": "Kolkata"
        }
    }), []);

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
            <SEO
                title="Tech College in Salt Lake Sector V, Kolkata | AI & Data Science Programs | Techno India University"
                description="Study AI, Data Science, Cloud Computing & Design at Kolkata's only tech university in Salt Lake Sector V — adjacent to TCS, Cognizant, IBM & Wipro. UGC-recognised degrees powered by Google Cloud & IBM."
            />
            <SchemaInjector schema={localSchema} />

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* ═══ HERO ═══ */}
            <section className="relative pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <MapPin className="w-4 h-4 text-[#FF0000]" />
                            Salt Lake Sector V, Kolkata — 700091
                        </span>

                        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                            The Only Tech University in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">
                                Kolkata's IT Hub
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                            Study <strong className="text-white">AI, Data Science, Cloud Computing & Design</strong> right next to
                            TCS, Cognizant, IBM & Wipro in Salt Lake Sector V. Your classroom is where the industry works.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                                >
                                    <div className="text-2xl md:text-3xl font-black text-[#FF0000]">{stat.value}</div>
                                    <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/admissions"
                                className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl transition-colors"
                            >
                                Apply Now <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-colors"
                            >
                                View Programs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ LOCATION ADVANTAGES ═══ */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Why <span className="text-[#FF0000]">Sector V</span> Changes Everything
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            While other colleges are in Barasat or Kalyani, you're in the centre of Kolkata's tech ecosystem.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {LOCATION_ADVANTAGES.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[#FF0000]/10 text-[#FF0000]">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ NEARBY TECH COMPANIES ═══ */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Your <span className="text-[#FF0000]">Neighbours</span> at Sector V
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Walk to your internship. These companies are literally around the corner from your campus.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {TECH_COMPANIES.map((company, i) => (
                            <motion.div
                                key={company.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#FF0000]/30 text-center transition-all duration-300"
                            >
                                <div className="text-2xl font-black text-white group-hover:text-[#FF0000] transition-colors mb-1">
                                    {company.name}
                                </div>
                                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                                    <Navigation className="w-3 h-3" />
                                    {company.distance} away
                                </div>
                                <div className="text-gray-600 text-[10px] uppercase tracking-wider mt-1">{company.type}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PROGRAMS AVAILABLE ═══ */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            Programs in <span className="text-[#FF0000]">Salt Lake, Kolkata</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            UGC-recognised degrees powered by Google Cloud & IBM. Learn the future, in the future's neighbourhood.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {coursesData.slice(0, 12).map((course, i) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.03 }}
                            >
                                <Link
                                    to="/courses"
                                    className="group flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF0000]/30 transition-all duration-300"
                                >
                                    <GraduationCap className="w-4 h-4 text-[#FF0000] mt-1 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <h3 className="text-white text-sm font-medium group-hover:text-[#FF0000] transition-colors truncate">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs mt-0.5">{course.category}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 text-[#FF0000] hover:text-red-400 font-semibold transition-colors"
                        >
                            View All {coursesData.length} Programs <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ MAP / CTA ═══ */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-white/10"
                    >
                        {/* Google Maps Embed */}
                        <div className="aspect-video w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0!2d88.4312!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTechno%20India%20University!5e0!3m2!1sen!2sin!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Techno India University - Salt Lake Sector V, Kolkata"
                            />
                        </div>

                        {/* CTA Below Map */}
                        <div className="bg-gradient-to-r from-[#FF0000]/10 to-pink-500/10 p-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-black mb-3">
                                Visit Our Campus in Sector V
                            </h2>
                            <p className="text-gray-400 mb-6 text-sm">
                                EM-4, Sector V, Salt Lake, Kolkata 700091 • Near Karunamoyee Metro
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/admissions"
                                    className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                                >
                                    Apply Now <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl border border-white/20 transition-colors"
                                >
                                    <Clock className="w-4 h-4" /> Schedule a Visit
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SectorVPage;
