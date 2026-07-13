import React from 'react';
import Hero from '../components/Hero';
import PartnersCarousel from '../components/PartnersCarousel';
import Testimonials from '../components/Testimonials';
import ProgramsSection from '../components/ProgramsSection';
import GoogleIBMBanner from '../components/GoogleIBMBanner';
import FAQSection from '../components/FAQSection';
import ApprovalsSection from '../components/ApprovalsSection';
import WhatIsSoF from '../components/WhatIsSoF';
import WhySoF from '../components/WhySoF';
import ProgramQuiz from '../components/ProgramQuiz';
import HowLearningWorks from '../components/HowLearningWorks';
import StudentWork from '../components/StudentWork';
import CampusLife from '../components/CampusLife';
import CareerPathways from '../components/CareerPathways';
import Ecosystem from '../components/Ecosystem';
import ScholarshipsStrip from '../components/ScholarshipsStrip';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const eduOrgSchema = {
 "@context": "https://schema.org",
 "@type": "CollegeOrUniversity",
 "name": "School of the Future Techno India University",
 "alternateName": "SoF TIU",
 "url": "https://www.technoindiauniversity.ai",
 "logo": "https://www.technoindiauniversity.ai/image.png",
 "description": "School of the Future is a future-focused academic school under Techno India University, Kolkata offering Google Cloud & IBM-powered UG & PG programs in AI, Cloud Computing, Data Science, Business, Design and Allied Health Sciences.",
 "foundingDate": "2001",
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
 "telephone": "+91-8062642222",
 "sameAs": [
 "https://www.facebook.com/technoindiauniversity",
 "https://www.instagram.com/technoindiauniversity",
 "https://www.linkedin.com/school/techno-india-university"
 ],
 "parentOrganization": {
 "@type": "Organization",
 "name": "Techno India Group"
 },
 "hasCredential": [
 { "@type": "EducationalOccupationalCredential", "name": "UGC Recognition", "credentialCategory": "certification" },
 { "@type": "EducationalOccupationalCredential", "name": "NAAC Accreditation Grade A", "credentialCategory": "certification" },
 { "@type": "EducationalOccupationalCredential", "name": "AICTE Approval", "credentialCategory": "certification" }
 ]
};

const Home = () => {
 return (
 <div className="bg-white">
 <SEO
 title="Top Engineering & AI College in Kolkata | Techno India University"
 description="Join Techno India University, a leading B.Tech engineering college in kolkata, for career-focused CSE courses in AI, ML, Data Science, Cloud Computing, and more with Google & IBM certifications embedded in the curriculum. 90%+ eligible placements."
 />
 <SchemaInjector schema={eduOrgSchema} />
 {/* §1 Hero */}
 <Hero />



 {/* §2 What is SoF? */}
 <WhatIsSoF />

 {/* §3 Why SoF is Different */}
 <WhySoF />

 {/* §4 Find My Program Quiz */}
 <ProgramQuiz />

 {/* §5 Program Pathways */}
 <ProgramsSection />

 {/* §6 Industry Collaboration */}
 <GoogleIBMBanner />

 {/* §13 Accreditations */}
 <ApprovalsSection />

 {/* §7 How Learning Works */}
 <HowLearningWorks />

 {/* §8 Real Work / Outcomes */}
 <StudentWork />

 {/* §9 Campus Life */}
 <CampusLife />

 {/* §10 Careers & Pathways */}
 <CareerPathways />

 {/* Partners Moved here */}
 <PartnersCarousel />

 {/* §11 The Ecosystem */}
 <Ecosystem />

 {/* §12 Scholarships */}
 <ScholarshipsStrip />


 {/* §14 Admissions Snapshot */}
 <section className="py-24 bg-black relative overflow-hidden text-center text-white">
 {/* Subtle motion gradient */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.15)_0%,_transparent_70%)]" />
 <motion.div
 className="absolute inset-0 opacity-30"
 animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
 transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
 style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.1), transparent, rgba(255,0,0,0.05))', backgroundSize: '200% 200%' }}
 />

 <div className="container mx-auto px-4 relative z-10">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 >
 <h2 className="text-4xl md:text-6xl font-black mb-6">
 Your Journey to the Future{' '}
 <span className="bg-[#FF0000] px-4 py-1">Starts Here</span>
 </h2>
 <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
 Admissions follow a guided process to help students choose the right program aligned with their interests and aspirations.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 to="/apply"
 className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#CC0000] transition-all duration-300 hover:shadow-2xl hover:scale-105"
 >
 Explore Admissions 2026
 <ArrowRight className="w-5 h-5" />
 </Link>
 <a
 href="https://wa.me/916292233351?text=Hi,%20I'd%20like%20the%20program%20brochure"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
 >
 <MessageCircle className="w-5 h-5" />
 Get Brochure on WhatsApp
 </a>
 </div>
 </motion.div>
 </div>
 </section>

 {/* §15 FAQs */}
 <FAQSection />
 </div>
 );
};

export default Home;
