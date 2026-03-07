import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSanity } from '../hooks/useSanity';
import { FAQS_QUERY } from '../lib/queries';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const fallbackFAQData = [
    { id: 1, question: 'What is the School of the Future?', answer: 'The School of the Future is a future-focused academic school that offers industry-powered undergraduate, postgraduate and doctoral programs designed for emerging careers in technology, business, design and applied sciences.' },
    { id: 2, question: 'Is the School of the Future a college or a university?', answer: 'The School of the Future is a constituent school under Techno India University, West Bengal. It delivers academic programs, while the university awards the degrees.' },
    { id: 3, question: 'Who awards the degree at the School of the Future?', answer: 'All degrees offered at the School of the Future are awarded by Techno India University, West Bengal, a UGC-recognised university.' },
    { id: 4, question: 'What does "Powered by Google Cloud and IBM" mean?', answer: 'It means that the curriculum, learning frameworks, tools and certifications are aligned with Google Cloud and IBM industry standards and integrated into the academic programs.' },
    { id: 5, question: 'Do I need prior coding knowledge to join these programs?', answer: 'No. Many programs are designed to start from fundamentals. Students are trained progressively using structured learning, projects and industry tools.' },
    { id: 6, question: 'What programs can I pursue after Class 12 at the School of the Future?', answer: 'After Class 12, students can pursue programs in Computer Science, AI, Data Analytics, Business Analytics, Design, Filmmaking, Game Development and Allied Health Sciences.' },
    { id: 7, question: 'Are these programs suitable for future careers?', answer: 'Yes. Programs are designed around emerging technologies, applied learning and evolving industry needs to ensure long-term career relevance.' },
    { id: 8, question: 'What career options are available after graduating from SoF?', answer: 'Graduates explore careers across technology, business, creative industries and healthcare, along with opportunities for higher studies and entrepreneurship.' },
    { id: 9, question: 'Is the degree recognised across India and abroad?', answer: 'Yes. Degrees are awarded by Techno India University, which is recognised in India and accepted for higher studies and employment in India and abroad, subject to local requirements.' },
    { id: 10, question: 'How does the admission process work?', answer: 'Admissions follow a guided process where students receive counselling support to choose the right program based on their interests, eligibility and career goals.' },
    { id: 11, question: 'What is the difference between B.Tech CSE and B.Tech CSE with specialisations?', answer: 'B.Tech CSE (Core) focuses on strong computer science fundamentals, while B.Tech CSE with specialisations such as AI/ML, Data Science or Cloud Computing includes additional industry-aligned courses and applied learning in specific high-growth domains.' },
    { id: 12, question: 'Can Commerce or Arts students apply to programs at the School of the Future?', answer: 'Yes. Several programs at the School of the Future are designed for students from Commerce, Arts and other non-Science backgrounds, especially in business analytics, design, media and creative technology domains.' },
    { id: 13, question: 'Are scholarships available at the School of the Future?', answer: 'Yes. The School of the Future offers merit-based and need-based scholarships for eligible students. Details are shared during the admission counselling process.' },
    { id: 14, question: 'Is there an EMI or education loan facility available?', answer: 'Yes. Students can explore education loan and EMI options through partnered banks and financial institutions, subject to eligibility and applicable terms.' },
    { id: 15, question: 'Are industry certifications included in the programs?', answer: 'Industry-aligned certifications from partners such as Google Cloud and IBM are integrated into select programs as part of the curriculum or academic pathway.' },
    { id: 16, question: 'Do students get internship or industry exposure during the course?', answer: 'Yes. Students are exposed to internships, live projects, industry visits, hackathons and applied learning experiences as part of their academic journey.' },
    { id: 17, question: 'What if I am unsure about my career choice right now?', answer: 'The School of the Future follows a guided counselling approach to help students identify suitable programs based on interests, aptitude and long-term career goals.' },
    { id: 18, question: 'Is the School of the Future suitable for students aiming for higher studies abroad?', answer: 'Yes. Programs are designed with strong academic foundations and applied learning, making them suitable for students planning higher studies in India or abroad, subject to individual university requirements.' },
    { id: 19, question: 'Where is the School of the Future campus located?', answer: 'The School of the Future is located in Kolkata and operates under Techno India University, West Bengal, with access to modern academic and learning infrastructure.' },
    { id: 20, question: 'Does the School of the Future provide hostel or accommodation facilities?', answer: 'Accommodation options and support are available. Details regarding hostels or nearby accommodation are shared with students during the admission process.' },
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

    // Generate FAQPage JSON-LD schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQData.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 relative overflow-hidden">
            <SEO
                title="FAQs | School of the Future | Techno India University"
                description="Find answers to frequently asked questions about admissions, programs, fees, scholarships, and campus life at the School of the Future."
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
