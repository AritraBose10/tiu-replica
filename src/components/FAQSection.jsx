import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useSanity } from '../hooks/useSanity';
import { FAQS_QUERY } from '../lib/queries';

const fallbackFaqs = [
    {
        id: 1,
        question: 'How are emerging technologies integrated into learning?',
        answer: 'Our curriculum is designed in collaboration with Google and IBM to incorporate the latest technologies including AI, Machine Learning, Cloud Computing, and Cybersecurity. Students work on real-world projects and gain industry certifications.',
    },
    {
        id: 2,
        question: 'What career paths can graduates pursue?',
        answer: 'Graduates can pursue careers as Software Engineers, Data Scientists, AI/ML Engineers, Cloud Architects, UI/UX Designers, Digital Marketers, and more. Our placement cell connects students with top tech companies.',
    },
    {
        id: 3,
        question: 'What are the eligibility criteria and admission requirements?',
        answer: 'Eligibility varies by program. Engineering courses require 10+2 with PCM, while other programs accept students from any stream. Apply through our online portal and complete the document submission process.',
    },
    {
        id: 4,
        question: 'How is the teaching and learning approach structured?',
        answer: 'We follow a blended learning approach combining classroom instruction, hands-on labs, industry projects, and internships. Faculty includes industry experts and certified Google/IBM trainers.',
    },
];

const FAQSection = () => {
    const { data: faqs } = useSanity(FAQS_QUERY, fallbackFaqs);
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="bg-[#0a0a1a] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left - Student Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Tilted frame with red border */}
                        <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 border-4 border-[#FF0000] rounded-2xl transform translate-x-4 translate-y-4" />
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                    alt="Students"
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-[#FF0000]/30 rounded-full" />
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#FF0000]/20 rounded-full" />
                    </motion.div>

                    {/* Right - FAQ Accordion */}
                    <div>
                        <span className="text-[#FF0000] text-sm font-semibold tracking-wide">FAQs</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-10 flex items-center gap-3">
                            <span className="w-1 h-10 bg-[#FF0000]"></span>
                            Know Before You Join
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-900 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="text-white font-medium pr-4">{faq.question}</span>
                                        <span className="flex-shrink-0">
                                            {openId === faq.id ? (
                                                <Minus className="w-5 h-5 text-[#FF0000]" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-gray-400" />
                                            )}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openId === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
