import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UserCheck, Award, Layers } from 'lucide-react';

const steps = [
 {
 id: 1,
 title: "Explore Programs",
 desc: "Browse our full range of B.Tech, BCA, BBA, MBA, M.Tech, and B.Des programs at this leading b tech college in Kolkata.",
 icon: FileText,
 },
 {
 id: 2,
 title: "Check Eligibility",
 desc: "Most undergraduate programs (including our B.Tech CSE courses) require 10+2 with PCM. Postgraduate programs require a relevant undergraduate degree.",
 icon: Layers,
 },
 {
 id: 3,
 title: "Submit Application",
 desc: "Complete your application online. Our team at this private college in Kolkata will review your application and reach out within 48 hours.",
 icon: UserCheck,
 },
 {
 id: 4,
 title: "Admission & Enrolment",
 desc: "Receive your admission offer, complete fee payment, and join one of West Bengal's top private engineering colleges for Admissions 2026.",
 icon: Award,
 },
];

const AdmissionsTimeline = () => {
 return (
 <section className="py-10 md:py-20 px-4 bg-[#020205] relative overflow-hidden">
 {/* Background glow */}
 <div className="absolute inset-0 pointer-events-none">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[30vw] bg-red-600/5 rounded-full blur-[160px]" />
 </div>

 <div className="max-w-5xl mx-auto relative z-10">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="text-center mb-14"
 >
 <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
 Admissions Process
 </span>
 <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
 Simple &{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
 Guided Process
 </span>
 </h2>
 <p className="text-gray-400 text-lg max-w-xl mx-auto">
 No complex entrance exams. No guesswork. Full guidance at every step.
 </p>
 </motion.div>

 {/* Steps Grid */}
 <div className="grid md:grid-cols-4 gap-5">
 {steps.map((step, index) => {
 const Icon = step.icon;
 return (
 <motion.div
 key={step.id}
 initial={{ opacity: 0, y: 25 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: index * 0.1 }}
 className="relative group h-full"
 >
 {/* Connector line */}
 {index < steps.length - 1 && (
 <div className="hidden md:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-32px)] h-px bg-gradient-to-r from-white/15 to-transparent z-0" />
 )}

 <div className="relative h-full z-10 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
 {/* Step number */}
 <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.04] group-hover:text-red-500/10 transition-colors select-none">
 {step.id}
 </span>

 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
 <Icon className="w-7 h-7 text-red-400" />
 </div>

 <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
 <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>
 );
};

export default AdmissionsTimeline;
