import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSanity } from '../hooks/useSanity';
import { FAQS_QUERY } from '../lib/queries';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const fallbackFAQData = [
 { id: 1, question: 'Is Techno India University one of the best engineering colleges in Kolkata?', answer: 'Yes. Techno India University is consistently ranked among the best engineering colleges in Kolkata and the top engineering universities in West Bengal. It is UGC-recognised, NAAC-accredited, and one of the few private engineering colleges in West Bengal with programs powered directly by Google Cloud and IBM.' },
 { id: 2, question: 'What B.Tech programs are available at this b tech college in Kolkata?', answer: 'As a leading b tech college in West Bengal, TIU offers B.Tech CSE specialisations in AI/ML, Data Science, and Cloud Computing all powered by Google Cloud. Students earn embedded industry certifications alongside their degree.' },
 { id: 3, question: 'What AI courses in Kolkata does TIU offer?', answer: 'TIU the top AI Institution in Kolkata offers a range of AI courses in Kolkata including B.Tech CSE AI/ML, BSc Data Analytics & Generative AI, BCA with AI & Data Science, and M.Tech CSE AI/ML. These are widely regarded as the best AI courses in India at the university level.' },
 { id: 4, question: 'Is there a data science course in Kolkata at TIU?', answer: 'Yes. TIU offers a dedicated 4-year B.Tech CSE Data Science program, widely considered the best data science course in Kolkata at the undergraduate level. It is powered by Google Cloud and comes with embedded certifications.' },
 { id: 5, question: 'Does TIU offer cloud computing courses in Kolkata?', answer: 'Yes. The B.Tech CSE Cloud Computing program is one of the most comprehensive cloud computing courses in Kolkata, covering Google Cloud Platform, DevOps, Kubernetes, and cloud security.' },
 { id: 6, question: 'What AI/ML courses are available at the postgraduate level?', answer: "TIU's M.Tech CSE AI/ML is the most advanced AI/ML courses in Kolkata offering at the postgraduate level. It is a 2-year research-focused program for B.Tech/BE graduates." },
 { id: 7, question: 'Are there AI courses after 12th at TIU?', answer: 'Absolutely. Our B.Tech CSE AI/ML is one of the most popular AI courses after 12th in Kolkata. Students with 10+2 (PCM) can directly enrol and begin their AI career journey at the best AI training Institution in Kolkata.' },
 { id: 8, question: 'What makes TIU the best IT training Institution in Kolkata?', answer: 'TIU combines UGC-recognised degree programs with real IBM and Google Cloud training on production-grade tools an experience that no standalone coaching centre or IT training Institution in Kolkata can match. Students graduate with both a university degree and 10+ industry certifications.' },
 { id: 9, question: 'Is TIU a private college in Kolkata or a government institution?', answer: 'TIU is a private engineering college in West Bengal specifically an autonomous private college in Kolkata under the Techno India Group. It operates under UGC and AICTE regulations and is NAAC-accredited.' },
 { id: 10, question: 'What are the best AI courses in India at the B.Tech level?', answer: "TIU's B.Tech CSE AI/ML program is recognised among the best AI courses in India at the undergraduate level, owing to its Google Cloud-powered curriculum, embedded certifications, and industry-first approach to AI learning course in Kolkata delivery." },
 { id: 11, question: 'What is the School of the Future?', answer: 'The School of the Future (SoF) is the innovation-focused academic arm of Techno India University one of the best engineering colleges in Kolkata. It offers industry-powered B.Tech, M.Tech, BCA, BBA, and MBA programs in collaboration with Google Cloud and IBM.' },
 { id: 12, question: 'Is the degree recognised?', answer: 'Yes. All degrees are awarded by Techno India University, a UGC-recognised and NAAC-accredited institution one of the most credible private engineering colleges in West Bengal.' },
 { id: 13, question: 'Who awards the degree?', answer: 'Techno India University, a fully autonomous university and one of the leading private universities in Kolkata, awards all degrees.' },
 { id: 14, question: 'Do I need a coding background for AI courses?', answer: 'No prior coding experience is required for most of our AI learning courses in Kolkata. Our curriculum is designed to take you from fundamentals to advanced AI skills.' },
 { id: 15, question: 'What career options are available after these programs?', answer: 'Graduates from our AI/ML, data science, and cloud computing programs go on to roles such as AI Engineer, Cloud Architect, Data Scientist, ML Researcher, Full-Stack Developer, and more, at companies including Google, IBM, Microsoft, Accenture, and leading startups.' },
 { id: 16, question: 'Are scholarships available?', answer: 'Yes. The School of the Future offers merit-based and need-based scholarships for eligible students. Details are shared during the admission counselling process.' },
 { id: 17, question: 'Is there an EMI or education loan facility available?', answer: 'Yes. Students can explore education loan and EMI options through partnered banks and financial institutions, subject to eligibility and applicable terms.' },
 { id: 18, question: 'Do students get internship or industry exposure during the course?', answer: 'Yes. Students are exposed to internships, live projects, industry visits, hackathons and applied learning experiences as part of their academic journey.' },
 { id: 19, question: 'Where is the campus located?', answer: 'The campus is located at EM-4, Sector V, Salt Lake, Kolkata 700091 inside Kolkata\'s IT and technology hub, well-connected by Metro and bus networks.' },
 { id: 20, question: 'Can Commerce or Arts students apply?', answer: 'Yes. Several programs at the School of the Future are designed for students from Commerce, Arts and other non-Science backgrounds, especially in business analytics, design, media and creative technology domains.' },
];

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.15,
 delayChildren: 0.5
 }
 }
};

const itemVariants = {
 hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
 visible: {
 opacity: 1,
 y: 0,
 filter: "blur(0px)",
 transition: {
 type: "spring",
 stiffness: 70,
 damping: 20,
 mass: 1
 }
 }
};

const FAQItem = ({ item, isOpen, onClick }) => {
 return (
 <motion.div
 variants={itemVariants}
 className={`mb-4 rounded-xl overflow-hidden border transition-all duration-300 ${isOpen ? 'bg-white/[0.03] border-red-500/30 shadow-[0_0_30px_-5px_rgba(239,68,68,0.15)]' : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'}`}
 >
 <button
 onClick={onClick}
 className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
 >
 <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
 {item.question}
 </span>
 <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'border-red-500 text-red-500 rotate-90' : 'border-gray-700 text-gray-500 group-hover:border-gray-500'}`}>
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300">
 <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </div>
 </button>
 <AnimatePresence initial={false}>
 {isOpen && (
 <motion.div
 key="content"
 initial="collapsed"
 animate="open"
 exit="collapsed"
 variants={{
 open: { height: "auto", opacity: 1 },
 collapsed: { height: 0, opacity: 0 }
 }}
 transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
 >
 <div className="px-6 md:px-8 pb-8">
 <div className="h-px w-12 bg-gradient-to-r from-red-500 to-orange-500 mb-4 opacity-50" />
 <p className="text-gray-300 leading-relaxed text-base md:text-lg">
 {item.answer}
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
};

const FAQ = () => {
 const { data: FAQData } = useSanity(FAQS_QUERY, fallbackFAQData);
 const [openId, setOpenId] = useState(1);

 const handleToggle = (id) => {
 setOpenId(openId === id ? null : id);
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "mainEntity": FAQData.slice(0, 10).map(faq => ({
 "@type": "Question",
 "name": faq.question,
 "acceptedAnswer": {
 "@type": "Answer",
 "text": faq.answer
 }
 }))
 };

 return (
 <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 relative overflow-hidden">
 <SEO
 title="FAQs | B.Tech, AI & Engineering Admissions | Techno India University Kolkata"
 description="Got questions about B.Tech CSE, AI/ML, data science or cloud computing programs at Techno India University? Find answers here. Top engineering college in Kolkata. Admissions 2026."
 />
 <SchemaInjector schema={faqSchema} />
 {/* Red Ambient Glow */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-900/5 rounded-full blur-[100px] pointer-events-none" />

 <div className="container mx-auto px-6 relative z-10 max-w-4xl">
 {/* Hero Section */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: "circOut" }}
 className="text-center mb-20"
 >
 <motion.span
 initial={{ opacity: 0, letterSpacing: "0.2em" }}
 animate={{ opacity: 1, letterSpacing: "0.4em" }}
 transition={{ duration: 1.5, delay: 0.2 }}
 className="block text-red-500 text-xs font-bold tracking-[0.4em] mb-4 uppercase"
 >
 Knowledge Base
 </motion.span>
 <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
 <motion.span
 initial={{ opacity: 0, filter: "blur(10px)" }}
 animate={{ opacity: 1, filter: "blur(0px)" }}
 transition={{ duration: 1, ease: "easeOut" }}
 className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500"
 >
 Frequently Asked
 </motion.span>
 <motion.span
 initial={{ opacity: 0, filter: "blur(10px)" }}
 animate={{ opacity: 1, filter: "blur(0px)" }}
 transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
 className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-red-600 animate-gradient-x"
 >
 Questions.
 </motion.span>
 </h1>
 <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
 Everything you need to know about the School of the Future.
 <br className="hidden md:block" />Admissions, curriculum, and our vision for tomorrow.
 </p>
 </motion.div>

 {/* FAQ List */}
 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 className="space-y-4"
 >
 {FAQData.map((item) => (
 <FAQItem
 key={item.id}
 item={item}
 isOpen={openId === item.id}
 onClick={() => handleToggle(item.id)}
 />
 ))}
 </motion.div>

 {/* Contact CTA */}
 <motion.div
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 0.5, duration: 1 }}
 className="mt-24 text-center"
 >
 <p className="text-gray-500 mb-6 text-sm tracking-widest uppercase">Still have questions?</p>
 <Link to="/apply" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95">
 <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600 to-orange-600 opacity-10 group-hover:opacity-20 transition-opacity" />
 <div className="absolute inset-0 w-full h-full border border-red-500/30 rounded-full group-hover:border-red-500/50 transition-colors" />
 <span className="relative text-white font-medium tracking-wide flex items-center gap-2">
 Contact Admissions
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
 <line x1="5" y1="12" x2="19" y2="12"></line>
 <polyline points="12 5 19 12 12 19"></polyline>
 </svg>
 </span>
 </Link>
 </motion.div>
 </div>
 </div>
 );
};

export default FAQ;
