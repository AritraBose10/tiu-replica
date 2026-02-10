import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQData = [
    {
        id: 1,
        question: "What programs and technologies are included in the curriculum?",
        answer: "The School of the Future offers interdisciplinary programs that seamlessly integrate technology, science, and creativity. Major specializations include Artificial Intelligence, Data Science, Cloud Computing, Cybersecurity, Blockchain, and Biotechnology with AI. We also offer innovative programs in Design, Digital Humanities, and Business Analytics, ensuring graduates are ready for tomorrow's digital landscape."
    },
    {
        id: 2,
        question: "How are emerging technologies integrated into learning?",
        answer: "Technology is woven into every aspect of our teaching. Through partnerships with industry leaders like Google and IBM, students earn certifications in AI and Cloud Computing. Our campus features 'tech-enabled' learning labs, maker spaces, and innovation centers where students experiment with Robotics, IoT, and sustainable systems in real-world projects."
    },
    {
        id: 3,
        question: "What career paths can graduates pursue?",
        answer: "Graduates are equipped for dynamic careers in frontline industries such as AI, Machine Learning, Big Data, and Cybersecurity. Many also pursue roles in Design Thinking, Product Innovation, and Digital Transformation. The program fosters an entrepreneurial spirit, empowering students to launch successful startups or lead in global enterprises."
    },
    {
        id: 4,
        question: "What are the eligibility criteria and admission requirements?",
        answer: "For undergraduate programs, applicants must hold a Class 12 qualification (typically in the Science stream) and secure valid scores in recognized entrance exams like WBJEE or JEE Main. Postgraduate applicants may need GATE or CAT scores. Admissions are processed online or via TIU's central office."
    },
    {
        id: 5,
        question: "How is the teaching and learning approach structured?",
        answer: "Our teaching model aligns education with industry needs through research-driven coursework and experiential projects. We emphasize critical thinking, leadership, and adaptability, ensuring students gain both depth and breadth of knowledge through interactive learning environments and mentorship."
    }
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
    const [openId, setOpenId] = useState(1);

    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#020205] text-white pt-32 pb-20 relative overflow-hidden">
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
                    <Link to="/admissions" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95">
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
