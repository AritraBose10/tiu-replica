import React from 'react';
import AdmissionsHero from '../components/admissions/AdmissionsHero';
import AdmissionsBento from '../components/admissions/AdmissionsBento';
import AdmissionsTimeline from '../components/admissions/AdmissionsTimeline';
import AdmissionsStats from '../components/admissions/AdmissionsStats';
import AdmissionsForm from '../components/admissions/AdmissionsForm';

const Admissions = () => {
    return (
        <div className="bg-[#020205] min-h-screen text-white">
            {/* 1. Hero Section: "The Future Portal" */}
            <AdmissionsHero />

            {/* 2. Stats & Highlights: "Floating Orbs" 
               (Placed before programs to build credibility first) */}
            <AdmissionsStats />

            {/* 3. Programs Catalog: "Bento Grid" */}
            <AdmissionsBento />

            {/* 4. Admission Process: "The Snake Scroll" */}
            <AdmissionsTimeline />

            {/* 5. Enquiry Form: "Glass Sheet" */}
            <AdmissionsForm />

        </div>
    );
};

export default Admissions;
