import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AdmissionsHero from '../components/admissions/AdmissionsHero';
import WhySOF from '../components/admissions/WhySOF';
import GoogleIBMDark from '../components/admissions/GoogleIBMDark';
import AdmissionsBento from '../components/admissions/AdmissionsBento';
import ScholarshipSection from '../components/admissions/ScholarshipSection';
import CareerOutcomes from '../components/admissions/CareerOutcomes';
import CampusGallery from '../components/admissions/CampusGallery';
import FAQSection from '../components/FAQSection';
import AdmissionsForm from '../components/admissions/AdmissionsForm';

/* ─── Floating Apply CTA ─── */
const FloatingCTA = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.95, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.08], [80, 0]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed bottom-8 right-8 z-50"
        >
            <motion.a
                href="#apply-section"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-full shadow-[0_0_40px_rgba(255,0,0,0.4)] hover:shadow-[0_0_60px_rgba(255,0,0,0.5)] transition-shadow cursor-pointer"
            >
                Apply Now
                <ArrowRight className="w-4 h-4" />
            </motion.a>
        </motion.div>
    );
};

const Admissions = () => {
    return (
        <div className="bg-[#020205] min-h-screen text-white">
            {/* 1. Hero — Video Overlay */}
            <AdmissionsHero />

            {/* 2. Why School of the Future is Different */}
            <WhySOF />

            {/* 3. Google & IBM Partnership */}
            <GoogleIBMDark />

            {/* 4. Programs — Bento Grid */}
            <AdmissionsBento />

            {/* 5. Scholarships */}
            <ScholarshipSection />

            {/* 6. Career Outcomes */}
            <CareerOutcomes />

            {/* 7. Campus Experience */}
            <CampusGallery />

            {/* 8. FAQ */}
            <FAQSection />

            {/* 9. Enquiry Form (Closing CTA) */}
            <div id="apply-section">
                <AdmissionsForm />
            </div>

            {/* Floating Apply CTA */}
            <FloatingCTA />
        </div>
    );
};

export default Admissions;
