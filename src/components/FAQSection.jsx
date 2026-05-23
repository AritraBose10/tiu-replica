import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const fallbackFaqs = [
 {
 id: 1,
 question: 'What is the School of the Future?',
 answer: 'The School of the Future (SoF) is the innovation-focused academic arm of Techno India University one of the best engineering colleges in Kolkata. It offers industry-powered B.Tech, M.Tech, BCA, BBA, and MBA programs in collaboration with Google Cloud and IBM.',
 },
 {
 id: 2,
 question: 'Is the degree recognised?',
 answer: 'Yes. All degrees are awarded by Techno India University, a UGC-recognised and NAAC-accredited institution one of the most credible private engineering colleges in West Bengal.',
 },
 {
 id: 3,
 question: 'Who awards the degree?',
 answer: 'Techno India University, a fully autonomous university and one of the leading private universities in Kolkata, awards all degrees.',
 },
 {
 id: 4,
 question: 'Do I need a coding background for AI courses?',
 answer: 'No prior coding experience is required for most of our AI learning courses in Kolkata. Our curriculum is designed to take you from fundamentals to advanced AI skills.',
 },
 {
 id: 5,
 question: 'What career options are available after these programs?',
 answer: 'Graduates from our AI/ML, data science, and cloud computing programs go on to roles such as AI Engineer, Cloud Architect, Data Scientist, ML Researcher, Full-Stack Developer, and more, at companies including Google, IBM, Microsoft, Accenture, and leading startups.',
 },
];

const FAQSection = ({ customFaqs }) => {
 const faqs = customFaqs || fallbackFaqs;
 const [openId, setOpenId] = useState(null);

 const toggleFAQ = (id) => {
 setOpenId(openId === id ? null : id);
 };

 const bgImage = null;
 const sideImage = '/assets/images/FAQ.webp';

 return (
 <section
 className="bg-[#0a0a1a] py-20 px-4 relative bg-cover bg-center"
 style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
 >
 {bgImage && <div className="absolute inset-0 bg-black/80"></div>}
 <div className="max-w-7xl mx-auto relative z-10">
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
 src={sideImage}
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
