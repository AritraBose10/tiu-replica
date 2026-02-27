import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AdmissionsHero from '../components/admissions/AdmissionsHero';
import WhySOF from '../components/admissions/WhySOF';
import GoogleIBMDark from '../components/admissions/GoogleIBMDark';
import AdmissionsBento from '../components/admissions/AdmissionsBento';
import EligibilitySection from '../components/admissions/EligibilitySection';
import AdmissionsTimeline from '../components/admissions/AdmissionsTimeline';
import ScholarshipSection from '../components/admissions/ScholarshipSection';
import SeatAvailability from '../components/admissions/SeatAvailability';
import CareerOutcomes from '../components/admissions/CareerOutcomes';
import DegreeRecognition from '../components/admissions/DegreeRecognition';
import CampusGallery from '../components/admissions/CampusGallery';
import CampusLocation from '../components/admissions/CampusLocation';
import AdmissionsStats from '../components/admissions/AdmissionsStats';
import FAQSection from '../components/FAQSection';
import AdmissionsForm from '../components/admissions/AdmissionsForm';

/* ─── Admissions-Specific FAQs (from admission.md §14) ─── */
const admissionsFaqs = [
    {
        id: 1,
        question: 'Is this a recognised university?',
        answer: 'Yes. All programs are offered under Techno India University, a UGC-recognised university established by the West Bengal State Legislature. Degrees are valid across India and for higher studies abroad.',
    },
    {
        id: 2,
        question: 'How is the School of the Future different from a regular college?',
        answer: 'Unlike traditional colleges, SoF integrates industry partnership (Google Cloud, IBM) directly into the curriculum, follows project-based learning from Year 1, and focuses on career-relevant skills rather than outdated theory.',
    },
    {
        id: 3,
        question: 'Do I need to clear an entrance exam?',
        answer: 'No. Most programs at SoF do not require a separate entrance exam. Admission is based on academic counselling and merit review of your qualifying examination results.',
    },
    {
        id: 4,
        question: 'What programs are available for 2026 intake?',
        answer: 'We offer 35+ programs across five schools — Engineering & Technology, IT & Applied Sciences, Business & Management, Creative Arts & Design, and Health & Allied Sciences. Programs include B.Tech, BCA, BBA, B.Des, B.Sc, MBA, M.Tech, M.Des, and Ph.D.',
    },
    {
        id: 5,
        question: 'Are scholarships available?',
        answer: 'Yes. Merit-based scholarships (up to 100% tuition), need-based financial aid (up to 75%), and sports excellence scholarships (up to 50%) are available on a rolling basis, subject to eligibility and availability.',
    },
    {
        id: 6,
        question: 'Where is the campus located?',
        answer: 'The campus is located at EM-4, Sector V, Salt Lake, Kolkata 700091 — inside Kolkata\'s IT and technology hub. It is well-connected by Metro, bus networks, and is approximately 20 minutes from Howrah Station and 30 minutes from the airport.',
    },
];

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

import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const admissionsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": admissionsFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

const admissionsEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "School of the Future — Admissions 2026",
    "description": "Admissions are now open for 2026 intake at School of the Future, Techno India University. Apply for Google Cloud & IBM-powered degree programs in AI, Data Science, Cloud Computing, Business, Design and more.",
    "startDate": "2026-01-15",
    "endDate": "2026-06-30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
        "@type": "Place",
        "name": "Techno India University — School of the Future",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "EM-4, Sector V, Salt Lake",
            "addressLocality": "Kolkata",
            "addressRegion": "West Bengal",
            "postalCode": "700091",
            "addressCountry": "IN"
        }
    },
    "organizer": {
        "@type": "CollegeOrUniversity",
        "name": "Techno India University",
        "url": "https://www.technoindiauniversity.ai"
    },
    "offers": {
        "@type": "Offer",
        "url": "https://www.technoindiauniversity.ai/admissions",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-15"
    }
};

const Admissions = () => {
    return (
        <div className="bg-[#020205] min-h-screen text-white">
            <SEO
                title="School Of The Future Admissions 2026 | Apply for Future-Ready Degrees"
                description="Admissions open for 2026 at School Of The Future. Google & IBM-powered programs, strong placements, scholarships and industry internships. Apply today."
            />
            <SchemaInjector schema={admissionsFaqSchema} />
            <SchemaInjector schema={admissionsEventSchema} />
            {/* §1. Hero — Video Overlay + Form Widget */}
            <AdmissionsHero />

            {/* §2. Why School of the Future */}
            <WhySOF />

            {/* §3. Google & IBM Partnership */}
            <GoogleIBMDark />

            {/* §4. Programs — Accordion */}
            <AdmissionsBento />

            {/* §5. Who Should Apply? */}
            <EligibilitySection />

            {/* §6. Admissions Stats (Draggable Orbs) */}
            <AdmissionsStats />

            {/* §7. Admissions Timeline */}
            <AdmissionsTimeline />

            {/* §8. Scholarships & Financial Support */}
            <ScholarshipSection />

            {/* §9. Seat Availability (FOMO) */}
            <SeatAvailability />

            {/* §10. Career Outcomes */}
            <CareerOutcomes />

            {/* §11. Degree Recognition */}
            <DegreeRecognition />

            {/* §12. Campus Life */}
            <CampusGallery />

            {/* §13. Campus Location */}
            <CampusLocation />

            {/* §14. Admissions FAQ */}
            <FAQSection customFaqs={admissionsFaqs} />

            {/* §15. Enquiry Form (Closing CTA) */}
            <div id="apply-section">
                <AdmissionsForm />
            </div>

            {/* Floating Apply CTA */}
            <FloatingCTA />
        </div>
    );
};

export default Admissions;
