import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdmissionsFormWidget = () => {
 const [isLoading, setIsLoading] = useState(true);
 const [iframeHeight, setIframeHeight] = useState(520);
 const parentSearch = typeof window !== 'undefined' ? window.location.search : '';

 useEffect(() => {
 const handleMessage = (event) => {
 if (event.data && event.data.type === 'EE_WIDGET_LOADED') {
 setIsLoading(false);
 }
 if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') {
 setIframeHeight(event.data.height);
 }
 };

 window.addEventListener('message', handleMessage);
 return () => window.removeEventListener('message', handleMessage);
 }, []);

 const widgetCode = `
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <style>
 body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
 /* Custom scrollbar for iframe content */
 ::-webkit-scrollbar { width: 6px; }
 ::-webkit-scrollbar-track { background: transparent; }
 ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
 </style>
 </head>
 <body>
 <script>
 (function(){var s=${JSON.stringify(parentSearch)};if(s){try{history.replaceState(null,'',s);}catch(e){}try{new URLSearchParams(s).forEach(function(v,k){window[k]=v;});}catch(e){}}})();
 <\/script>
 <div class="ee-form-widget" id="ee-form-8"></div>

 <script>
 function reportHeight() {
 var h = document.body.scrollHeight;
 window.parent.postMessage({ type: 'EE_WIDGET_HEIGHT', height: h }, '*');
 }

 window.addEventListener("DOMContentLoaded", function() {
 window.ee_form_widget_baseurl ="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";// "https://eewidget.extraaedge.com/";
 if (!document.getElementById("__formWidgetCss")) {
 var e = document.createElement("link");
 e.id = "__formWidgetCss";
 e.rel = "stylesheet";
 e.href = window.ee_form_widget_baseurl + "css/stylesheet.min.css";
 e.type = "text/css";
 document.getElementsByTagName("head")[0].appendChild(e);
 }
 var t = document.createElement("script");
 t.type = "text/javascript";
 t.onload = async function() {
 var _eeFormWidget = new eeFormWidget();
 await _eeFormWidget.init("softiu", "form-8", "ee-form-8");
 // Notify parent that widget is loaded
 window.parent.postMessage({ type: 'EE_WIDGET_LOADED' }, '*');
 // Report height after a short delay for styles to settle
 setTimeout(reportHeight, 300);
 setTimeout(reportHeight, 1000);
 };
 t.src = window.ee_form_widget_baseurl + "js/eeFormWidget.min.js";
 document.getElementsByTagName("head")[0].appendChild(t);
 });

 // Also observe resize changes
 if (window.ResizeObserver) {
 new ResizeObserver(reportHeight).observe(document.documentElement);
 }
 </script>
 </body>
 </html>
 `;

 return (
 <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl relative flex flex-col transition-all duration-300" style={{ padding: '10px 5px', height: iframeHeight + 120 }}>
 {/* Header */}
 <div className="text-center pt-8 pb-4">
 <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Apply Now</h2>
 <p className="text-gray-500 text-sm mt-2">Fill out the quick form below to proceed.</p>
 </div>

 {/* Real-time Loading spinner */}
 {
 isLoading && (
 <div className="absolute inset-x-0 bottom-0 top-[120px] flex items-center justify-center z-20 bg-white/80 backdrop-blur-sm rounded-b-3xl transition-opacity duration-300">
 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
 </div>
 )
 }

 <iframe
 srcDoc={widgetCode}
 title="Admissions Enquiry Form"
 className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
 style={{ backgroundColor: 'transparent', height: iframeHeight }}
 />
 </div>
 );
};

const questions = [
 {
 id: 1,
 question: 'What excites you the most?',
 options: [
 { label: 'Building apps, AI & technology', tags: ['tech'] },
 { label: 'Business strategy & analytics', tags: ['business'] },
 { label: 'Design, film & creative media', tags: ['creative'] },
 { label: 'Healthcare & helping people', tags: ['health'] },
 ],
 },
 {
 id: 2,
 question: 'How do you prefer to learn?',
 options: [
 { label: 'Coding, labs & problem-solving', tags: ['tech'] },
 { label: 'Case studies & data-driven thinking', tags: ['business'] },
 { label: 'Visual storytelling & hands-on creation', tags: ['creative'] },
 { label: 'Practical training & clinical exposure', tags: ['health'] },
 ],
 },
 {
 id: 3,
 question: 'What career path sounds right?',
 options: [
 { label: 'AI Engineer, Cloud Architect, Data Scientist', tags: ['tech'] },
 { label: 'Business Analyst, Product Manager, Consultant', tags: ['business'] },
 { label: 'UX Designer, Filmmaker, Game Developer', tags: ['creative'] },
 { label: 'Nurse, Lab Technologist, Cardiovascular Specialist', tags: ['health'] },
 ],
 },
];

const results = {
 tech: {
 domain: 'Technology & Artificial Intelligence',
 tagline: 'Build careers in AI, data and cloud not just degrees.',
 programs: 'B.Tech CSE-AI/ML | BCA with Data Science and AI | B.Sc (H) Cyber Security | M.Tech CSE AI/ML',
 badge: 'Powered by Google Cloud & IBM',
 color: 'from-blue-600 to-cyan-500',
 link: '/courses?category=engineering',
 },
 business: {
 domain: 'Business, Analytics & Management',
 tagline: 'Where business decisions are driven by data and intelligence.',
 programs: 'BBA Business Analytics | MBA | B.Sc (H) Hotel and Hospital Management',
 badge: 'Powered by IBM',
 color: 'from-amber-500 to-orange-500',
 link: '/courses?category=management',
 },
 creative: {
 domain: 'Design, Media & Creative Technology',
 tagline: 'Turn creativity into real careers not just portfolios.',
 programs: 'B. Des Visual Communication | B.Sc (H) in Game Development | B.Sc (H) in Filmmaking | B.Sc (H) in Visual Effects & Animation',
 badge: '',
 color: 'from-purple-600 to-pink-500',
 link: '/courses?category=design',
 },
 health: {
 domain: 'Health & Allied Sciences',
 tagline: 'Skill-focused healthcare education aligned with real hospitals.',
 programs: 'B.Sc (H) Cardiovascular Technology | B.Sc (H) Anesthesia and Operation Theater Technology | B.Sc (H) Microbiology | B.Sc (H) Biotechnology',
 badge: '',
 color: 'from-emerald-500 to-teal-500',
 link: '/courses?category=health',
 },
};

const ProgramQuiz = () => {
 const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
 const [answers, setAnswers] = useState([]);
 const [selectedOption, setSelectedOption] = useState(null);
 const [showLeadForm, setShowLeadForm] = useState(false);

 const handleSelect = (option) => {
 setSelectedOption(option);
 };

 const handleNext = () => {
 if (selectedOption === null) return;
 const newAnswers = [...answers, selectedOption];
 setAnswers(newAnswers);
 setSelectedOption(null);

 if (step === 2) {
 setStep(3);
 setShowLeadForm(true);
 } else if (step >= questions.length) {
 setStep(4); // result
 } else {
 setStep(step + 1);
 }
 };

 const handleCloseLeadForm = () => {
 setShowLeadForm(false);
 };

 const handleBack = () => {
 if (step <= 1) {
 setStep(0);
 setAnswers([]);
 setSelectedOption(null);
 } else {
 const newAnswers = answers.slice(0, -1);
 setAnswers(newAnswers);
 setSelectedOption(null);
 setStep(step - 1);
 }
 };

 const handleReset = () => {
 setStep(0);
 setAnswers([]);
 setSelectedOption(null);
 };

 // Calculate result
 const getResult = () => {
 const tagCounts = {};
 answers.forEach((ans) => {
 ans.tags.forEach((tag) => {
 tagCounts[tag] = (tagCounts[tag] || 0) + 1;
 });
 });
 const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'tech';
 return results[topTag];
 };

 const currentQuestion = questions[step - 1];
 const result = step === 4 ? getResult() : null;

 return (
 <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
 <div className="max-w-3xl mx-auto">
 <AnimatePresence mode="wait">
 {/* Intro */}
 {step === 0 && (
 <motion.div
 key="intro"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 className="text-center"
 >
 <span className="inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6">
 Quick Discovery
 </span>
 <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
 Not Sure Which Program{' '}
 <span className="text-[#FF0000]">Fits You</span>?
 </h2>
 <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
 Most students don't start with clarity and that's okay.
 Answer a few quick questions and discover programs aligned to your interests and goals.
 </p>
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => setStep(1)}
 className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#CC0000] transition-colors"
 >
 <Sparkles size={20} />
 Find My Best-Fit Program
 <ArrowRight size={20} />
 </motion.button>
 </motion.div>
 )}

 {/* Questions */}
 {step >= 1 && step <= 3 && currentQuestion && (
 <motion.div
 key={`q-${step}`}
 initial={{ opacity: 0, x: 40 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -40 }}
 >
 {/* Progress */}
 <div className="flex items-center justify-between mb-8">
 <button
 onClick={handleBack}
 className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors text-sm font-medium"
 >
 <ArrowLeft size={16} /> Back
 </button>
 <div className="flex gap-2">
 {[1, 2, 3].map((i) => (
 <div
 key={i}
 className={`h-2 w-10 rounded-full transition-colors ${i <= step ? 'bg-[#FF0000]' : 'bg-gray-200'
 }`}
 />
 ))}
 </div>
 <span className="text-sm text-gray-400 font-medium">Step {step} of 3</span>
 </div>

 <h3 className="text-2xl md:text-3xl font-black text-black mb-8 text-center">
 {currentQuestion.question}
 </h3>

 <div className="grid sm:grid-cols-2 gap-4 mb-8">
 {currentQuestion.options.map((option, i) => (
 <motion.button
 key={i}
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 onClick={() => handleSelect(option)}
 className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${selectedOption === option
 ? 'border-[#FF0000] bg-red-50 shadow-lg'
 : 'border-gray-200 bg-white hover:border-gray-300'
 }`}
 >
 <span className={`font-semibold text-sm ${selectedOption === option ? 'text-[#FF0000]' : 'text-gray-700'
 }`}>
 {option.label}
 </span>
 </motion.button>
 ))}
 </div>

 <div className="text-center">
 <motion.button
 whileHover={{ scale: selectedOption ? 1.05 : 1 }}
 whileTap={{ scale: selectedOption ? 0.98 : 1 }}
 onClick={handleNext}
 disabled={!selectedOption}
 className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg transition-all ${selectedOption
 ? 'bg-[#FF0000] text-white hover:bg-[#CC0000] cursor-pointer'
 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
 }`}
 >
 {step === 3 ? 'See My Result' : 'Next'}
 <ArrowRight size={20} />
 </motion.button>
 </div>
 </motion.div>
 )}

 {/* Result */}
 {step === 4 && result && (
 <motion.div
 key="result"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0 }}
 className="text-center"
 >
 <motion.div
 className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-6"
 initial={{ scale: 0 }}
 animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
 transition={{ delay: 0.2 }}
 >
 <Sparkles size={32} />
 </motion.div>

 <h3 className="text-2xl font-bold text-gray-500 mb-2">Your best fit is</h3>
 <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
 {result.domain}
 </h2>
 <p className="text-lg text-gray-500 italic mb-2">"{result.tagline}"</p>

 {result.badge && (
 <span className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
 {result.badge}
 </span>
 )}

 <div className="bg-gray-50 rounded-2xl p-6 mb-8 mt-4">
 <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Matching Programs</p>
 <p className="text-gray-700 font-medium">{result.programs}</p>
 </div>

 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 to={result.link}
 className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-10 py-4 rounded-full font-bold hover:bg-[#CC0000] transition-all hover:scale-105"
 >
 Explore These Programs
 <ArrowRight size={18} />
 </Link>
 <button
 onClick={handleReset}
 className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all"
 >
 <RotateCcw size={16} />
 Retake Quiz
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* Lead Gen Full-Page Modal */}
 <AnimatePresence>
 {showLeadForm && (
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 50 }}
 transition={{ type: "spring", damping: 25, stiffness: 200 }}
 className="fixed inset-0 z-50 bg-[#0a0a0f] overflow-y-auto"
 >
 {/* Close Button */}
 <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[60]">
 <button
 onClick={handleCloseLeadForm}
 className="bg-white/10 hover:bg-red-500 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-xl border border-white/20"
 aria-label="Close and see results"
 >
 <X size={24} />
 </button>
 </div>

 <div className="min-h-screen relative flex items-center justify-center pt-20 pb-10">
 <AdmissionsFormWidget />
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </section>
 );
};

export default ProgramQuiz;
