import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, ArrowUpRight, Zap, Code, Database, Palette, Microscope, ChevronLeft, ChevronRight, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import coursesData from '../data/mock_courses.json';
import seameduLogo from '../assets/seamedu.png';
import emversityLogo from '../assets/emversity.png';
import iitKgpLogo from '../assets/IIT_KGP.jpeg';
import { COURSES_QUERY } from '../lib/queries';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

// Career paths lookup merged into course objects client-side
// so chips show regardless of whether data comes from Sanity or mock JSON.
const careerPathsMap = {
 'Computer Science': ['Software Engineer', 'Cloud Architect', 'DevOps Lead', 'Full-Stack Developer'],
 'AI': ['AI Engineer', 'ML Researcher', 'Data Scientist', 'NLP Specialist'],
 'Data Science': ['Data Scientist', 'Analytics Engineer', 'BI Developer', 'Data Architect'],
 'Cloud': ['Cloud Architect', 'SRE Engineer', 'Platform Engineer', 'Cloud Security Analyst'],
 'M.Tech': ['AI Research Scientist', 'ML Lead', 'Deep Learning Engineer', 'Computer Vision Engineer'],
 'BCA': ['Data Analyst', 'Junior Data Scientist', 'AI Developer', 'BI Analyst'],
 'Data Analytics': ['GenAI Developer', 'Prompt Engineer', 'Data Analyst', 'AI Product Manager'],
 'Cyber': ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Cybersecurity Consultant'],
 'M.Sc': ['Senior Data Scientist', 'ML Engineer', 'Research Scientist', 'Analytics Lead'],
 'BBA Business': ['Business Analyst', 'Product Manager', 'Growth Strategist', 'Fintech Analyst'],
 'MBA Business': ['Strategy Consultant', 'VP Analytics', 'Product Director', 'Data-Driven CEO'],
 'Hotel': ['Hotel Manager', 'F&B Director', 'Revenue Manager', 'Hospitality Consultant'],
 'Executive MBA': ['C-Suite Executive', 'VP Operations', 'Managing Director', 'Entrepreneur'],
 'Visual Communication': ['Brand Designer', 'Art Director', 'UX Designer', 'Creative Lead'],
 'Game Art': ['Game Artist', '3D Modeler', 'Concept Artist', 'Environment Designer'],
 'Product Design': ['UX/UI Designer', 'Product Designer', 'Interaction Designer', 'Design Strategist'],
 'Advertising': ['Creative Director', 'Ad Strategist', 'Brand Manager', 'Digital Marketing Lead'],
 'Sound': ['Sound Engineer', 'Audio Producer', 'Mixing Engineer', 'Studio Manager'],
 'Game Development': ['Game Developer', 'Unity Engineer', 'Gameplay Programmer', 'Technical Designer'],
 'Gaming': ['Game Developer', 'Unity Engineer', 'Gameplay Programmer', 'Technical Designer'],
 'Filmmaking': ['Film Director', 'Cinematographer', 'Editor', 'Documentary Filmmaker'],
 'Visual Effects': ['VFX Artist', '3D Animator', 'Motion Graphics Designer', 'Compositing Artist'],
 'VFX': ['VFX Artist', '3D Animator', 'Motion Graphics Designer', 'Compositing Artist'],
 'Cardiovascular': ['Cath Lab Technologist', 'Echocardiography Technician', 'Electrophysiology Lab Tech', 'Cardiac Device Specialist'],
 'Anesthesia': ['Anesthesia Technologist', 'OT Technician', 'Perfusionist', 'Clinical Coordinator'],
 'Anaesthesia': ['Anaesthesia Technologist', 'OT Technician', 'Perfusionist', 'Clinical Coordinator'],
 'BMLT': ['Lab Technologist', 'Pathology Analyst', 'Research Technician', 'QC Officer'],
 'Medical Lab': ['Lab Technologist', 'Pathology Analyst', 'Research Technician', 'QC Officer'],
 'MMLT': ['Senior Lab Scientist', 'Lab Director', 'Clinical Researcher', 'Biotech Consultant'],
 'BMRIT': ['Radiologic Technologist', 'MRI Technician', 'CT Scan Specialist', 'Imaging Physicist'],
 'UX': ['UX/UI Designer', 'Product Designer', 'Interaction Designer', 'Design Strategist'],
 'Agriculture': ['Agronomist', 'Farm Manager', 'Agriculture Consultant', 'Research Scientist'],
 'LLB': ['Corporate Advocate', 'Legal Consultant', 'Litigator', 'Compliance Officer'],
 'Nursing': ['Nurse', 'Clinical Specialist', 'Nurse Educator', 'Hospital Administrator'],
 'LL.B': ['Advocate', 'Corporate Lawyer', 'Legal Consultant', 'Judicial Officer'],
 'B.Com': ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Audit Associate'],
 'Media Science': ['Journalist', 'Public Relations Officer', 'Digital Content Creator', 'Media Planner'],
 'Microbiology': ['Biotechnologist', 'Microbiologist', 'Quality Control Analyst', 'Research Technician'],
 'Biotechnology': ['Biotechnologist', 'Microbiologist', 'Quality Control Analyst', 'Research Technician'],
};


/** Match a course title to career paths from the lookup map */
const getCareerPaths = (title) => {
 if (!title) return ['Industry Professional', 'Specialist', 'Researcher'];
 for (const [key, paths] of Object.entries(careerPathsMap)) {
 if (title.includes(key)) return paths;
 }
 return ['Industry Professional', 'Specialist', 'Consultant', 'Entrepreneur'];
};
// --- 3D Flip Card Component ---
const FlipCard = ({ course, index }) => {
 const [flipped, setFlipped] = useState(false);

 const getIcon = (cat) => {
 if (cat.includes('Engineering')) return <Code className="w-6 h-6" />;
 if (cat.includes('Data') || cat.includes('Computer') || cat.includes('Technology')) return <Database className="w-6 h-6" />;
 if (cat.includes('Design') || cat.includes('Arts')) return <Palette className="w-6 h-6" />;
 if (cat.includes('Health') || cat.includes('Science')) return <Microscope className="w-6 h-6" />;
 if (cat.includes('Law')) return <Briefcase className="w-6 h-6" />;
 return <Zap className="w-6 h-6" />;
 };

 return (
 <motion.div
 initial={{ opacity: 0, y: 50 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="flip-card h-[420px] w-full cursor-pointer"
 >
 <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
 {/* ===== FRONT FACE ===== */}
 <div className="flip-card-front rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 p-1 group">
 {/* Neon Glow Background */}
 <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

 <div className="relative h-full w-full bg-[#0a0a0f] rounded-[22px] overflow-hidden p-8 flex flex-col justify-between">
 {/* Top Section */}
 <div>
 <div className="flex justify-between items-start mb-6 gap-3">
 <span className="bg-white/5 text-white/80 text-[11px] leading-tight font-bold px-3 py-2 rounded-lg border border-white/10 flex items-start gap-2 max-w-[70%]">
 <div className="shrink-0 opacity-80 mt-0.5">{getIcon(course.category)}</div>
 <span className="break-words">{course.category}</span>
 </span>
 {course.title.toLowerCase().includes('google') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-[18px] w-auto object-contain shrink-0 opacity-80 grayscale group-hover:grayscale-0 transition-all mt-1.5" />
 )}
 {course.title.toLowerCase().includes('ibm') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-[18px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 {course.partner === 'Emversity' && (
 <img src={emversityLogo} alt="Emversity" className="h-[18px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 {course.partner === 'Seamedu' && (
 <img src={seameduLogo} alt="Seamedu" className="h-[18px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 </div>

 <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#FF0000] transition-colors duration-300">
 {course.title}
 </h3>

 <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors">
 {course.description}
 </p>
 </div>

 {/* Bottom Section */}
 <div className="relative pt-6 border-t border-white/5">
 <div className="flex justify-between items-center">
 <div className="text-white/60 text-sm">
 <span className="block text-xs uppercase tracking-wider text-[#FF0000] font-bold mb-0.5">Duration</span>
 {course.duration || '4 Years'}
 </div>

 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
 className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-full text-white text-xs font-bold border border-white/10 hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300"
 >
 Career Paths
 <ArrowUpRight className="w-4 h-4" />
 </motion.button>
 </div>
 </div>
 </div>
 </div>

 {/* ===== BACK FACE ===== */}
 <div className="flip-card-back rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 p-1">
 <div className="relative h-full w-full bg-[#0a0a0f] rounded-[22px] overflow-hidden p-8 flex flex-col justify-between">
 {/* Accent glow */}
 <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF0000]/10 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

 {/* Header */}
 <div className="relative z-10">
 <span className="inline-flex items-center gap-2 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#FF0000]/20 uppercase tracking-widest mb-4">
 <Sparkles className="w-3 h-3" />
 Career Outcomes
 </span>
 <h3 className="text-xl font-black text-white mb-2 leading-tight">
 Where This Takes You
 </h3>
 <p className="text-gray-500 text-xs mb-6">
 {course.title}
 </p>

 {/* Career Path Chips */}
 <div className="flex flex-col gap-2">
 {getCareerPaths(course.title).map((path, i) => (
 <motion.span
 key={i}
 initial={{ opacity: 0, x: -10 }}
 animate={flipped ? { opacity: 1, x: 0 } : {}}
 transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
 className="flex items-center gap-2 w-full bg-white/5 text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30 hover:text-[#FF0000] transition-all duration-300"
 >
 <Briefcase className="w-3.5 h-3.5 text-gray-500 shrink-0" />
 {path}
 </motion.span>
 ))}
 </div>
 </div>

 {/* Back Button */}
 <div className="relative z-10 pt-6 border-t border-white/5">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
 className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-full text-white text-xs font-bold border border-white/10 hover:bg-white/10 transition-all duration-300"
 >
 <ChevronLeft className="w-4 h-4" />
 Back to Program
 </motion.button>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 );
};

// --- Helper to determine degree level ---
const getDegreeLevel = (title) => {
 const ugKeywords = ['B.Tech', 'BCA', 'BBA', 'B.Des', 'B.Sc', 'Bsc', 'Bachelor', 'LL.B', 'B.Com'];
 const pgKeywords = ['M.Tech', 'MBA', 'MCA', 'M.Sc', 'M.Des', 'Master'];

 if (ugKeywords.some(keyword => title.includes(keyword))) return 'UG';
 if (pgKeywords.some(keyword => title.includes(keyword))) return 'PG';
 return 'UG'; // Default
};

// --- Main Page Component ---
const Courses = () => {
 const allCourses = coursesData;
 const [filteredCourses, setFilteredCourses] = useState(allCourses);
 const [searchTerm, setSearchTerm] = useState('');
 const [degreeType, setDegreeType] = useState('UG'); // New State: UG or PG

 const degreeTabs = ['UG', 'PG'];

 // Build Course ItemList schema from course data
 const courseSchema = useMemo(() => {
 if (!allCourses || allCourses.length === 0) return null;
 return {
 "@context": "https://schema.org",
 "@type": "ItemList",
 "name": "Programs at Techno India University School of the Future",
 "itemListElement": allCourses.map((course, i) => ({
 "@type": "ListItem",
 "position": i + 1,
 "item": {
 "@type": "Course",
 "name": course.title,
 "description": course.description,
 "url": `https://www.technoindiauniversity.ai/courses`,
 "provider": {
 "@type": "CollegeOrUniversity",
 "name": "Techno India University",
 "sameAs": "https://www.technoindiauniversity.ai"
 },
 "hasCourseInstance": {
 "@type": "CourseInstance",
 "courseMode": "onsite",
 "location": {
 "@type": "Place",
 "name": "Techno India University, Kolkata",
 "address": {
 "@type": "PostalAddress",
 "addressLocality": "Kolkata",
 "addressRegion": "West Bengal",
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
 };
 }, [allCourses]);

 useEffect(() => {
 let results = allCourses;

 // 1. Filter by Degree Level (UG/PG)
 results = results.filter(c => getDegreeLevel(c.title) === degreeType);

 // 2. Filter by Search
 if (searchTerm) {
 results = results.filter(c =>
 c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
 c.description.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }
 setFilteredCourses(results);
 }, [searchTerm, degreeType, allCourses]);

 return (
 <div className="min-h-screen bg-[#020205] text-white relative overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
 <SEO
 title="B.Tech, M.Tech, CSE, AI ML, Data Science & Cloud Computing Courses | Techno India University"
 description="Explore B.Tech CSE, AI ML, Data Science & Cloud Computing, BCA, BBA, BSc, Law, Design, Nursing and M.Tech at Kolkata's best engineering college. Google & IBM certified. 90%+ placements. Admissions open."
 />
 <SchemaInjector schema={courseSchema} />

 {/* Background Ambience */}
 <div className="fixed inset-0 pointer-events-none">
 <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px] animate-pulse" />
 <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
 </div>

 <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">

 {/* Hero Header */}
 <div className="mb-20 text-center relative">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8 }}
 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[120px] md:text-[200px] font-black text-white/5 whitespace-nowrap select-none pointer-events-none"
 >
 FUTURE READY
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF0000] to-pink-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(255,0,0,0.4)] mb-6">
 <Sparkles className="w-4 h-4 text-white" />
 World Class Education
 </span>
 <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
 Future-Ready AI Courses <br />
 <span className="text-white relative inline-block pb-3">
 After 12th & Graduation
 <motion.svg
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 1, delay: 0.5 }}
 className="absolute bottom-0 left-0 w-full"
 style={{ height: '10px' }}
 viewBox="0 0 100 10"
 preserveAspectRatio="none"
 >
 <path d="M0 2 Q 50 8 100 2" stroke="#FF0000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
 </motion.svg>
 </span>
 </h1>
 <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
 Discover our industry-aligned B.Tech college in Kolkata programs, postgraduate specialisations, and industry certification courses all designed to make you career-ready from Day 1.
 </p>
 <Link
 to="/cloud-ai-certification-courses-kolkata"
 className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 hover:border-red-500/30 transition-all group"
 >
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-4" />
 <span className="mx-1 text-white/30">×</span>
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 brightness-0 invert" />
 <span className="mx-1 text-white/30">×</span>
 <img src={iitKgpLogo} alt="IIT KGP" className="h-5 w-auto object-contain brightness-0 invert opacity-80" />
 <span className="ml-2">Certification Courses</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 </motion.div>
 </div>

 {/* Search & Filter Bar */}
 <div className="sticky top-24 z-50 mb-16 space-y-6">
 <div className="glass-panel bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl space-y-6">

 {/* Top Section: UG/PG Selector & Search */}
 <div className="flex flex-col md:flex-row justify-between items-center gap-4">

 {/* Level 1: UG / PG Selector */}
 <div className="inline-flex bg-black/20 p-1 rounded-full relative">
 {degreeTabs.map((type) => (
 <button
 key={type}
 onClick={() => setDegreeType(type)}
 className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10 ${degreeType === type ? 'text-white' : 'text-gray-400 hover:text-white'
 }`}
 >
 {type === 'UG' ? 'Undergraduate' : 'Postgraduate'}
 {degreeType === type && (
 <motion.div
 layoutId="activeDegree"
 className="absolute inset-0 bg-[#FF0000] rounded-full shadow-lg"
 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
 style={{ zIndex: -1 }}
 />
 )}
 </button>
 ))}
 </div>

 {/* Search (Moved to Top) */}
 <div className="relative w-full md:w-96 group">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF0000] transition-colors" />
 <input
 type="text"
 placeholder="Search programs..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full bg-black/40 border border-white/10 rounded-full pl-12 pr-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 transition-all font-medium"
 />
 </div>
 </div>

 {/* Sub-Header Area Removed */}
 </div>
 </div>

 {/* Grid */}
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 <AnimatePresence mode='popLayout'>
 {filteredCourses.map((course, index) => (
 <FlipCard key={course.id} course={course} index={index} />
 ))}
 </AnimatePresence>
 </div>

 {filteredCourses.length === 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-center py-20"
 >
 <div className="inline-flex bg-white/5 p-6 rounded-full mb-6">
 <Search className="w-10 h-10 text-gray-500" />
 </div>
 <h3 className="text-2xl font-bold text-white mb-2">No programs found</h3>
 <p className="text-gray-500">Try adjusting your filters or search query</p>
 </motion.div>
 )}

 </div>
 </div>
 );
};

export default Courses;
