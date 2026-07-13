import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
 ArrowRight, CheckCircle2, Cloud, Shield, BookOpen, Award,
 Code, Database, Palette, Zap, GraduationCap, Users, Building2,
 Briefcase, Target, Cpu, Globe, Lightbulb
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useSanity } from '../hooks/useSanity';
import { COURSES_QUERY } from '../lib/queries';
import coursesData from '../data/mock_courses.json';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const MotionLink = motion.create(Link);

const fadeUp = {
 initial: { opacity: 0, y: 30 },
 animate: { opacity: 1, y: 0 },
 transition: { duration: 0.6 }
};

const certifications = [
 { icon: Cloud, label: 'Google Cloud Architect', color: 'from-blue-500 to-cyan-400', desc: 'Design & manage cloud solutions' },
 { icon: Shield, label: 'IBM Cybersecurity', color: 'from-green-500 to-emerald-400', desc: 'Enterprise security & compliance' },
 { icon: BookOpen, label: 'AI & Machine Learning', color: 'from-purple-500 to-violet-400', desc: 'Build intelligent applications' },
 { icon: Database, label: 'Data Engineering', color: 'from-amber-500 to-orange-400', desc: 'Process & analyze big data' },
 { icon: Cpu, label: 'Cloud Computing', color: 'from-red-500 to-pink-400', desc: 'Scale infrastructure globally' },
 { icon: Globe, label: 'IoT & Edge Computing', color: 'from-teal-500 to-cyan-400', desc: 'Connected device ecosystems' },
];

const highlights = [
 { icon: Target, title: 'Curriculum Co-Designed by Industry Leaders', desc: 'Programs built jointly with Google Cloud & IBM engineers not adapted from generic syllabi. Our AI/ML courses in Kolkata reflect what top tech companies actually need.' },
 { icon: Lightbulb, title: 'Real Tools & Production-Grade Platforms', desc: 'Students pursuing AI courses in Kolkata at TIU learn on the same platforms used by professionals at Fortune 500 companies Google Cloud Platform, IBM Watson, BigQuery, and more.' },
 { icon: Award, title: 'Embedded Certifications Not Add-Ons', desc: '10+ industry certifications are earned through real coursework, making TIU the best IT training Institution in Kolkata for students who want verifiable credentials alongside their degree.' },
 { icon: Users, title: 'Industry Mentors & Guest Lecturers', desc: 'Direct access to practitioners from Google and IBM for workshops, mentoring sessions, and career guidance a key differentiator for our AI learning course in Kolkata.' },
 { icon: Briefcase, title: 'Guaranteed Internships', desc: 'Industry internships with 200+ hiring partners are structured into the program, ensuring students graduate with experience that matters.' },
 { icon: Building2, title: 'Campus Innovation Labs', desc: 'Dedicated Google Cloud & IBM labs on campus bringing TIU\'s claim as the leading AI training Institution in Kolkata to life every single day.' },
];

const stats = [
 { value: '10+', label: 'Industry Certifications' },
 { value: '50+', label: 'Live Projects' },
 { value: '200+', label: 'Hiring Partners' },
 { value: '2', label: 'Global Tech Partners' },
];

const GoogleIBMCourse = () => {
 const { getSetting } = useSettings();
 const { data: allCourses } = useSanity(COURSES_QUERY, coursesData);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);

 // Filter courses related to Google/IBM
 const googleIBMCourses = useMemo(() =>
 allCourses?.filter(c =>
 c.title?.includes('Google') ||
 c.title?.includes('IBM') ||
 c.description?.includes('Google Cloud') ||
 c.description?.includes('IBM')
 ) || [],
 [allCourses]
 );

 const images = [
 getSetting('admissions_google_ibm_bg') || null,
 getSetting('admissions_google_ibm_bg_2') || null
 ].filter(Boolean);

 useEffect(() => {
 const timer = setInterval(() => {
 setCurrentImageIndex((prev) => (prev + 1) % images.length);
 }, 4000);
 return () => clearInterval(timer);
 }, [images.length]);

 // Course schema for SEO individual Course types for rich results
 const courseSchema = useMemo(() => ({
 "@context": "https://schema.org",
 "@type": "ItemList",
 "name": "Google Cloud & IBM Certification Courses at School of the Future",
 "numberOfItems": googleIBMCourses.length,
 "itemListElement": googleIBMCourses.map((course, i) => ({
 "@type": "ListItem",
 "position": i + 1,
 "item": {
 "@type": "Course",
 "name": course.title,
 "description": course.description,
 "url": "https://www.technoindiauniversity.ai/cloud-ai-certification-courses-kolkata",
 "courseCode": course.id,
 "educationalCredentialAwarded": "Bachelor's / Master's Degree + Industry Certifications",
 "provider": {
 "@type": "CollegeOrUniversity",
 "name": "Techno India University",
 "url": "https://www.technoindiauniversity.ai",
 "sameAs": "https://www.technoindiauniversity.ai"
 },
 "hasCourseInstance": {
 "@type": "CourseInstance",
 "courseMode": "onsite",
 "courseWorkload": "PT40H",
 "location": {
 "@type": "Place",
 "name": "Techno India University, Kolkata",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "EM-4, Sector V, Salt Lake",
 "addressLocality": "Kolkata",
 "addressRegion": "West Bengal",
 "postalCode": "700091",
 "addressCountry": "IN"
 }
 },
 "offers": {
 "@type": "Offer",
 "category": "Paid",
 "priceCurrency": "INR",
 "price": "0",
 "url": "https://www.technoindiauniversity.ai/apply",
 "availability": "https://schema.org/InStock"
 }
 }
 }
 }))
 }), [googleIBMCourses]);

 const getIcon = (cat) => {
 if (cat?.includes('Engineering')) return <Code className="w-5 h-5" />;
 if (cat?.includes('Data') || cat?.includes('Computer')) return <Database className="w-5 h-5" />;
 if (cat?.includes('Design')) return <Palette className="w-5 h-5" />;
 return <Zap className="w-5 h-5" />;
 };

 return (
 <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
 <SEO
 title="Google Cloud & IBM AI Courses in Kolkata | TIU"
 description="Join the best AI training Institution in Kolkata. Earn Google Cloud & IBM certifications embedded in your B.Tech or BCA degree. AI/ML, Cloud Computing & Data Science courses in Kolkata. Admissions 2026."
 />
 <SchemaInjector schema={courseSchema} />

 {/* ── Hero Section ── */}
 <section className="relative min-h-[90vh] flex items-center overflow-hidden">
 {/* Background image crossfade */}
 <div className="absolute inset-0">
 <AnimatePresence mode="popLayout">
 <motion.img
 key={currentImageIndex}
 src={images[currentImageIndex]}
 initial={{ opacity: 0, scale: 1.05 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 1.5, ease: "easeInOut" }}
 alt="Students collaborating with industry tools"
 className="absolute inset-0 w-full h-full object-cover"
 />
 </AnimatePresence>
 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
 <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-black/60" />
 </div>

 <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 md:py-40">
 <div className="max-w-3xl">
 {/* Partner Logos */}
 <motion.div {...fadeUp} className="flex items-center gap-5 mb-8">
 <img
 src={getSetting('logo_google_cloud') || "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"}
 alt="Google Cloud"
 className="h-7 md:h-8 object-contain"
 />
 <div className="w-px h-8 bg-white/30" />
 <img
 src={getSetting('logo_ibm') || "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"}
 alt="IBM"
 className="h-8 md:h-9 object-contain brightness-0 invert"
 />
 </motion.div>

 <motion.span
 {...fadeUp}
 transition={{ ...fadeUp.transition, delay: 0.1 }}
 className="inline-block text-red-500 text-sm font-semibold tracking-wider uppercase mb-4"
 >
 Industry Partnership Programs
 </motion.span>

 <motion.h1
 {...fadeUp}
 transition={{ ...fadeUp.transition, delay: 0.2 }}
 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-6"
 >
 <span className="text-white">Google Cloud & IBM Certification Courses </span>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
 The Best AI Training Institution in Kolkata
 </span>
 </motion.h1>

 <motion.p
 {...fadeUp}
 transition={{ ...fadeUp.transition, delay: 0.3 }}
 className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
 >
 Programs co-designed with Google Cloud & IBM real tools, real certifications, real industry exposure. Techno India University is the only AI Institution in Kolkata where industry-grade certifications are embedded directly into your degree, not offered as optional extras.
 </motion.p>

 <motion.div
 {...fadeUp}
 transition={{ ...fadeUp.transition, delay: 0.4 }}
 className="flex flex-col sm:flex-row gap-4"
 >
 <MotionLink
 to="/apply"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.98 }}
 className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] transition-shadow"
 >
 Apply Now
 <ArrowRight className="w-5 h-5" />
 </MotionLink>
 <MotionLink
 to="/courses"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.98 }}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors"
 >
 Browse All Programs
 </MotionLink>
 </motion.div>
 </div>
 </div>

 {/* Stats bar at bottom */}
 <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10 z-10">
 <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
 {stats.map((stat, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6 + i * 0.1 }}
 className="text-center"
 >
 <div className="text-2xl md:text-3xl font-black text-[#FF0000]">{stat.value}</div>
 <div className="text-xs md:text-sm text-gray-400 font-medium mt-1">{stat.label}</div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ── Why Google & IBM Section ── */}
 <section className="py-20 md:py-28 px-4 relative">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-red-600/5 rounded-full blur-[200px] pointer-events-none" />

 <div className="max-w-7xl mx-auto relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-16"
 >
 <span className="inline-block bg-red-500/10 text-red-500 text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-red-500/20">
 Why It Matters
 </span>
 <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
 Why TIU is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Top AI Institution in Kolkata</span>
 </h2>
 <p className="text-gray-400 text-lg max-w-2xl mx-auto">
 Most institutions marketing themselves as AI training centres in Kolkata offer standalone certificates with limited real-world application. At TIU, our collaboration with Google Cloud and IBM is woven into every semester which is what sets us apart as the city's leading AI Institution.
 </p>
 </motion.div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {highlights.map((item, i) => {
 const Icon = item.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.05] transition-all duration-300"
 >
 <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-red-500/20 transition-colors">
 <Icon className="w-6 h-6 text-red-500" />
 </div>
 <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
 <p className="text-gray-400 leading-relaxed">{item.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>

 {/* ── Certifications Section ── */}
 <section className="py-20 md:py-28 px-4 bg-white/[0.02] border-y border-white/5">
 <div className="max-w-7xl mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-16"
 >
 <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-blue-500/20">
 Embedded Certifications
 </span>
 <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
 Graduate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Industry Credentials</span>
 </h2>
 <p className="text-gray-400 text-lg max-w-2xl mx-auto">
 Certifications aren't add-ons they're embedded into your degree, earned through real coursework.
 </p>
 </motion.div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {certifications.map((cert, i) => {
 const Icon = cert.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08 }}
 className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
 >
 <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${cert.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
 <div className="relative z-10 flex items-start gap-4">
 <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.color} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
 <Icon className="w-5 h-5 text-white" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-white mb-1">{cert.label}</h3>
 <p className="text-gray-400 text-sm">{cert.desc}</p>
 </div>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>

 {/* ── Featured Programs Section ── */}
 {googleIBMCourses.length > 0 && (
 <section className="py-20 md:py-28 px-4">
 <div className="max-w-7xl mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-16"
 >
 <span className="inline-block bg-red-500/10 text-red-500 text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-red-500/20">
 Featured Programs
 </span>
 <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
 Programs Powered by <span className="text-[#FF0000]">Google Cloud & IBM</span>
 </h2>
 </motion.div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {googleIBMCourses.map((course, i) => (
 <motion.div
 key={course.id || i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-red-500/30 transition-all duration-300"
 >
 <div className="flex justify-between items-start mb-6">
 <span className="bg-white/5 text-white/80 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
 {getIcon(course.category)}
 {course.category}
 </span>
 <div className="flex items-center gap-2">
 {course.description?.includes('Google') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
 )}
 {course.description?.includes('IBM') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 opacity-70 brightness-0 invert group-hover:opacity-100 transition-opacity" />
 )}
 </div>
 </div>

 <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF0000] transition-colors">
 {course.title}
 </h3>
 <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
 {course.description}
 </p>

 <div className="flex justify-between items-center pt-4 border-t border-white/5">
 <span className="text-xs text-red-500 font-bold uppercase tracking-wider">4 Years</span>
 <Link
 to="/apply"
 className="text-sm font-semibold text-white hover:text-red-500 transition-colors flex items-center gap-1"
 >
 Apply <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* ── CTA Section ── */}
 <section className="py-20 md:py-28 px-4 relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10" />
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] bg-red-600/5 rounded-full blur-[200px] pointer-events-none" />

 <div className="max-w-4xl mx-auto text-center relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <GraduationCap className="w-16 h-16 text-red-500 mx-auto mb-6" />
 <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
 Ready to Build Your Future?
 </h2>
 <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
 Join 15,000+ students learning at the best AI Institution in Kolkata with industry-grade tools and certifications that employers actually value. Admissions 2026 are now open.
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <MotionLink
 to="/apply"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.98 }}
 className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,0,0,0.3)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition-shadow"
 >
 Apply for 2026
 <ArrowRight className="w-5 h-5" />
 </MotionLink>
 <MotionLink
 to="/contact"
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.98 }}
 className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/5 transition-colors"
 >
 Talk to Admissions
 </MotionLink>
 </div>
 </motion.div>
 </div>
 </section>
 </div>
 );
};

export default GoogleIBMCourse;
