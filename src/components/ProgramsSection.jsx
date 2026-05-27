import { useState } from 'react';
import seameduLogo from '../assets/seamedu.png';
import emversityLogo from '../assets/emversity.png';
import iitKgpLogo from '../assets/IIT_KGP.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, GraduationCap, ChevronRight, ChevronLeft, ArrowUpRight, Sparkles, Briefcase } from 'lucide-react';

const categories = [
 { id: 'engineering', label: 'Engineering & Tech' },
 { id: 'it_applied', label: 'IT & Applied Sciences' },
 { id: 'business', label: 'Business & Management' },
 { id: 'creative', label: 'Creative Arts & Design' },
 { id: 'health', label: 'Health & Allied Sciences' },
];

const courses = {
 engineering: [
 {
 id: 1,
 title: 'B.Tech CSE-AI/ML',
 subtitle: 'Powered by GOOGLE',
 partner: 'Google',
 duration: '4 Years',
 eligibility: '10+2 with PCM',
 badge: 'Bachelor',
 },
 {
 id: 2,
 title: 'B.Tech CSE-Data Science',
 subtitle: 'Powered by GOOGLE',
 partner: 'Google',
 duration: '4 Years',
 eligibility: '10+2 with PCM',
 badge: 'Bachelor',
 },
 {
 id: 3,
 title: 'B.Tech CSE-Cloud Computing',
 subtitle: 'Powered by GOOGLE',
 partner: 'Google',
 duration: '4 Years',
 eligibility: '10+2 with PCM',
 badge: 'Bachelor',
 },
 {
 id: 20,
 title: 'M.Tech CSE AI/ML',
 subtitle: 'Advanced Research Focus',
 partner: 'Tech',
 duration: '2 Years',
 eligibility: 'B.Tech/BE in relevant field',
 badge: 'Master',
 },
 {
 id: 21,
 title: 'PhD in AI (Full Time)',
 subtitle: 'Doctoral Research Program',
 partner: 'Research',
 duration: '4.5 - 5.5 Years',
 eligibility: 'M.Tech/ME in relevant field',
 badge: 'PhD',
 },
 {
 id: 22,
 title: 'PhD in AI (Half Time)',
 subtitle: 'Doctoral Research Program',
 partner: 'Research',
 duration: 'NA',
 eligibility: 'M.Tech/ME in relevant field',
 badge: 'PhD',
 },
 ],
 it_applied: [
 {
 id: 4,
 title: 'BCA with Data Science and AI',
 subtitle: 'Powered by IBM',
 partner: 'IBM',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 5,
 title: 'BSc (H) Cyber Security and Ethical Hacking',
 subtitle: 'Powered by IBM',
 partner: 'IBM',
 duration: '4 Years',
 eligibility: '10+2 with Science',
 badge: 'Bachelor',
 },
 {
 id: 23,
 title: 'BSc (H) Data Analytics and Generative AI',
 subtitle: 'Powered by IBM',
 partner: 'IBM',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 24,
 title: 'MSc. In Data Science AI',
 subtitle: 'Advanced Postgraduate Program',
 partner: 'Tech',
 duration: '2 Years',
 eligibility: 'Graduation in relevant field',
 badge: 'Master',
 },
 {
 id: 6,
 title: 'Bsc Agriculture',
 subtitle: 'Modern Agricultural Sciences',
 partner: 'AgriTech',
 duration: '4 Years',
 eligibility: '10+2 with Science',
 badge: 'Bachelor',
 },
 ],
 business: [
 {
 id: 7,
 title: 'BBA Business Analytics',
 subtitle: 'Powered by IBM',
 partner: 'IBM',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 8,
 title: 'MBA',
 subtitle: 'Powered by IBM',
 partner: 'IBM',
 duration: '2 Years',
 eligibility: 'Graduation in any stream',
 badge: 'Master',
 },
 {
 id: 25,
 title: 'Working Professional MBA',
 subtitle: 'Flexible Learning',
 partner: 'Business',
 duration: '2 Years',
 eligibility: 'Graduation with work experience',
 badge: 'Master',
 },
 {
 id: 9,
 title: 'BSc (H) Hotel and Hospital Management',
 subtitle: 'Hospitality & Management',
 partner: 'Hospitality',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 ],
 creative: [
 {
 id: 10,
 title: 'B. Des Visual Communication & Digital Design',
 subtitle: 'Digital Design Focus',
 partner: 'Design',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 26,
 title: 'B. Des Game Art & Design',
 subtitle: 'Game Art & Concept Design',
 partner: 'Design',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 27,
 title: 'B. Des Digital Product Design',
 subtitle: 'UX & Product Design',
 partner: 'Design',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 28,
 title: 'M.Des in Advertising, design and digital communications',
 subtitle: 'Advanced Design Studies',
 partner: 'Design',
 duration: '2 Years',
 eligibility: 'Graduation in any stream',
 badge: 'Master',
 },
 {
 id: 11,
 title: 'BSC (H) in Game Development',
 subtitle: 'Industry Skilling by Seamedu',
 partner: 'Seamedu',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 12,
 title: 'BSC (H) in Filmmaking',
 subtitle: 'Industry Skilling by Seamedu',
 partner: 'Seamedu',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 18,
 title: 'BSC (H) in Sound Engineering',
 subtitle: 'Industry Skilling by Seamedu',
 partner: 'Seamedu',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 {
 id: 19,
 title: 'BSC (H) in Visual Effects & Animation',
 subtitle: 'Industry Skilling by Seamedu',
 partner: 'Seamedu',
 duration: '4 Years',
 eligibility: '10+2 any stream',
 badge: 'Bachelor',
 },
 ],
 health: [
 {
 id: 13,
 title: 'Bsc (H) Cardiovascular Technology',
 subtitle: 'Industry Skilling by Emversity',
 partner: 'Emversity',
 duration: '4 Years',
 eligibility: '10+2 with PCB',
 badge: 'Bachelor',
 },
 {
 id: 14,
 title: 'Bsc (H) Anesthesia and Operation Theater Technology',
 subtitle: 'Industry Skilling by Emversity',
 partner: 'Emversity',
 duration: '4 Years',
 eligibility: '10+2 with PCB',
 badge: 'Bachelor',
 },
 {
 id: 29,
 title: 'BPT',
 subtitle: 'Bachelor of Physiotherapy',
 partner: 'Health',
 duration: '4.5 Years',
 eligibility: '10+2 with PCB',
 badge: 'Bachelor',
 },
 {
 id: 30,
 title: 'BMRIT',
 subtitle: 'Medical Radiation & Imaging Technology',
 partner: 'Health',
 duration: '4 Years',
 eligibility: '10+2 with PCB',
 badge: 'Bachelor',
 },
 {
 id: 31,
 title: 'MPT',
 subtitle: 'Master of Physiotherapy',
 partner: 'Health',
 duration: '2 Years',
 eligibility: 'BPT or equivalent',
 badge: 'Master',
 },
 {
 id: 32,
 title: 'MMLT',
 subtitle: 'Master of Medical Lab Technology',
 partner: 'Health',
 duration: '2 Years',
 eligibility: 'Graduation in relevant field',
 badge: 'Master',
 },
 ],
};

// Career paths lookup by title keyword
const careerPathsMap = {
 'Computer Science': ['Software Engineer', 'Cloud Architect', 'DevOps Lead', 'Full-Stack Developer'],
 'AI': ['AI Engineer', 'ML Researcher', 'Data Scientist', 'NLP Specialist'],
 'Cloud': ['Cloud Architect', 'SRE Engineer', 'Platform Engineer', 'Cloud Security Analyst'],
 'BCA': ['Data Analyst', 'Junior Data Scientist', 'AI Developer', 'BI Analyst'],
 'Cyber': ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Cyber Security Consultant'],
 'Agriculture': ['Agronomist', 'Agri-Tech Specialist', 'Research Scientist', 'Farm Manager'],
 'BBA': ['Business Analyst', 'Product Manager', 'Growth Strategist', 'Fintech Analyst'],
 'MBA': ['Corporate Strategist', 'Management Consultant', 'Operations Head', 'Financial Manager'],
 'Hotel': ['Hotel Manager', 'Hospitality Operations', 'Event Manager', 'Guest Experience Lead'],
 'Visual Communication': ['Brand Designer', 'Art Director', 'UX Designer', 'Creative Lead'],
 'Game': ['Game Developer', 'Unity Engineer', 'Gameplay Programmer', 'Technical Designer'],
 'Filmmaking': ['Film Director', 'Cinematographer', 'Video Editor', 'Production Manager'],
 'Cardiovascular': ['Cardiovascular Technologist', 'Cardiac Sonographer', 'Cath Lab Technician', 'Clinical Specialist'],
 'Nursing': ['Clinical Nurse', 'Healthcare Administrator', 'Public Health Nurse', 'Nurse Educator'],
 'Medical Lab': ['Clinical Laboratory Scientist', 'Pathology Assistant', 'Medical Technologist', 'Research Associate'],
 'LL.B': ['Corporate Advocate', 'Legal Consultant', 'Litigator', 'Compliance Officer'],
 'Law': ['Corporate Advocate', 'Legal Consultant', 'Litigator', 'Compliance Officer'],
};

const getCareerPaths = (title) => {
 if (!title) return ['Industry Professional', 'Specialist', 'Researcher'];
 for (const [key, paths] of Object.entries(careerPathsMap)) {
 if (title.includes(key)) return paths;
 }
 return ['Industry Professional', 'Specialist', 'Consultant', 'Entrepreneur'];
};

// --- Flip Card for Homepage ---
const ProgramFlipCard = ({ course, index }) => {
 const [flipped, setFlipped] = useState(false);

 return (
 <motion.div
 key={course.id}
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: 0.4, delay: index * 0.1 }}
 className="flip-card w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
 style={{ flexGrow: 0, height: '320px' }}
 >
 <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
 {/* ===== FRONT FACE ===== */}
 <div className="flip-card-front group relative bg-[#11111f] rounded-3xl p-1 overflow-hidden">
 {/* Hover Gradient Border */}
 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

 <div className="relative bg-[#0a0a1a] h-full rounded-[20px] p-6 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 flex flex-col justify-between">
 {/* Arrow button — absolutely positioned so it never gets clipped by flex */}
 <motion.button
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
 className="absolute top-4 right-4 w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-shadow duration-300 z-10"
 >
 <ArrowUpRight className="w-5 h-5 text-white" />
 </motion.button>

 {/* Badge */}
 <div>
 <div className="flex items-start gap-2 mb-6 pr-12">
 <span className="bg-white/5 text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-wide whitespace-nowrap">
 {course.badge}
 </span>
 {course.subtitle?.toLowerCase().includes('google') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-[14px] w-auto object-contain shrink-0 opacity-80 grayscale group-hover:grayscale-0 transition-all mt-1" />
 )}
 {course.title.toLowerCase().startsWith('b.tech') && (
 <img src={iitKgpLogo} alt="IIT Kharagpur" className="h-[14px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1" />
 )}
 {course.subtitle?.toLowerCase().includes('ibm') && (
 <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-[14px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 {course.partner === 'Emversity' && (
 <img src={emversityLogo} alt="Emversity" className="h-[14px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 {course.partner === 'Seamedu' && (
 <img src={seameduLogo} alt="Seamedu" className="h-[14px] w-auto object-contain shrink-0 opacity-80 group-hover:opacity-100 transition-opacity mt-1.5" />
 )}
 </div>

 {/* Title */}
 <div className="mb-8">
 <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#FF0000] transition-colors">
 {course.title}
 </h3>
 <p className="text-gray-400 text-sm font-medium">
 {course.subtitle}
 </p>
 {course.title.toLowerCase().startsWith('b.tech') && (
 <div className="flex items-center gap-1.5 mt-2">
   <span className="text-white/40 text-[10px] font-semibold whitespace-nowrap">In collab with</span>
   <img src={iitKgpLogo} alt="IIT Kharagpur" className="h-[13px] w-auto object-contain shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
   <span className="text-white/60 text-[10px] font-bold whitespace-nowrap">IIT KGP</span>
 </div>
 )}
 </div>
 </div>

 {/* Details */}
 <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
 <div className="space-y-1">
 <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-bold">
 <Clock className="w-3 h-3" />
 Duration
 </div>
 <p className="text-white font-semibold">{course.duration}</p>
 </div>
 <div className="space-y-1">
 <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-bold">
 <GraduationCap className="w-3 h-3" />
 Eligibility
 </div>
 <p className="text-white font-semibold">{course.eligibility}</p>
 </div>
 </div>
 </div>
 </div>

 {/* ===== BACK FACE ===== */}
 <div className="flip-card-back bg-[#11111f] rounded-3xl p-1">
 <div className="relative bg-[#0a0a1a] h-full rounded-[20px] p-8 overflow-hidden flex flex-col justify-between">
 {/* Accent glow */}
 <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF0000]/10 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

 {/* Header + Chips */}
 <div className="relative z-10">
 <span className="inline-flex items-center gap-2 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#FF0000]/20 uppercase tracking-widest mb-4">
 <Sparkles className="w-3 h-3" />
 Career Outcomes
 </span>
 <h3 className="text-lg font-black text-white mb-1 leading-tight">
 Where This Takes You
 </h3>
 <p className="text-gray-500 text-xs mb-5 truncate">
 {course.title}
 </p>

 {/* Career Path Chips */}
 <div className="flex flex-col gap-1.5">
 {getCareerPaths(course.title).map((path, i) => (
 <motion.span
 key={i}
 initial={{ opacity: 0, x: -10 }}
 animate={flipped ? { opacity: 1, x: 0 } : {}}
 transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
 className="flex items-center gap-1.5 w-full bg-white/5 text-white text-xs font-semibold px-3 py-2 rounded-lg border border-white/10 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30 hover:text-[#FF0000] transition-all duration-300"
 >
 <Briefcase className="w-3 h-3 text-gray-500 shrink-0" />
 {path}
 </motion.span>
 ))}
 </div>
 </div>

 {/* Back Button */}
 <div className="relative z-10 pt-4 border-t border-white/5">
 <motion.button
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
 className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white text-xs font-bold border border-white/10 hover:bg-white/10 transition-all duration-300"
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

const ProgramsSection = () => {
 const [activeCategory, setActiveCategory] = useState('engineering');

 return (
 <section className="bg-[#050510] py-24 px-4 overflow-hidden relative">
 {/* Background Ambience */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
 <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
 <div className="absolute top-40 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 {/* Header */}
 <div className="mb-14">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 >
 <span className="text-[#FF0000] text-sm font-bold tracking-wider uppercase bg-[#FF0000]/10 px-3 py-1 rounded-full">
 Academic Excellence
 </span>
 <h2 className="text-4xl md:text-6xl font-black text-white mt-4 flex items-center gap-4">
 <span className="w-1.5 h-12 bg-[#FF0000] rounded-full"></span>
 Explore Our Flagship Programs
 </h2>
 </motion.div>
 </div>

 {/* Category Tabs */}
 <div className="flex flex-wrap gap-3 mb-16">
 {categories.map((category) => (
 <button
 key={category.id}
 onClick={() => setActiveCategory(category.id)}
 className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group ${activeCategory === category.id
 ? 'text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]'
 : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
 }`}
 >
 <span className="relative z-10">{category.label}</span>
 {activeCategory === category.id && (
 <motion.div
 layoutId="activeTab"
 className="absolute inset-0 bg-[#FF0000]"
 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
 />
 )}
 </button>
 ))}
 </div>

 {/* Course Cards Grid */}
 <motion.div
 layout
 className="flex flex-wrap gap-6 justify-center sm:justify-start"
 >
 <AnimatePresence mode='wait'>
 {courses[activeCategory]?.map((course, index) => (
 <ProgramFlipCard key={course.id} course={course} index={index} />
 ))}
 </AnimatePresence>
 </motion.div>

 {/* View All Link */}
 <motion.div
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="mt-16 flex justify-start"
 >
 <Link
 to="/courses"
 className="group inline-flex items-center gap-3 text-white transition-colors font-semibold px-8 py-3 rounded-full border border-white/10 hover:bg-white/5"
 >
 View All Programs
 <span className="bg-[#FF0000] rounded-full p-1 group-hover:translate-x-1 transition-transform">
 <ChevronRight className="w-4 h-4" />
 </span>
 </Link>
 </motion.div>
 </div>
 </section>
 );
};

export default ProgramsSection;
