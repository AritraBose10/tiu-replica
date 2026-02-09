import { motion } from 'framer-motion';
import { Phone, FileText, Building, CheckCircle } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Get in Touch',
        description: 'Connect with our admissions team through call, WhatsApp, or by filling the enquiry form.',
        icon: Phone,
    },
    {
        number: '02',
        title: 'Document Submission',
        description: 'Submit your academic documents and complete the application form with required details.',
        icon: FileText,
    },
    {
        number: '03',
        title: 'Campus Tour',
        description: 'Visit our campus to explore facilities, meet faculty, and experience the TIU environment.',
        icon: Building,
    },
    {
        number: '04',
        title: 'Decision',
        description: 'Receive your admission decision and complete the enrollment process to begin your journey.',
        icon: CheckCircle,
    },
];

const HowToApply = () => {
    return (
        <section className="py-20 px-4 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-20 pl-4 md:pl-0">
                    <span className="text-[#FF0000] text-sm font-semibold tracking-wide">
                        Application Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-black mt-2 flex items-center gap-3">
                        <span className="w-1 h-10 bg-[#FF0000]"></span>
                        How to Apply
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Animated Vertical Line */}
                    <div className="absolute left-[2.25rem] md:left-[3rem] top-8 bottom-8 w-1 bg-gray-100 hidden md:block overflow-hidden rounded-full">
                        <motion.div
                            initial={{ height: "0%" }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full bg-[#FF0000]"
                        />
                    </div>

                    <div className="space-y-12 md:space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="flex gap-6 md:gap-12 items-center relative"
                            >
                                {/* Number Circle */}
                                <div className="relative z-10 flex-shrink-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
                                        className="w-20 h-20 md:w-24 md:h-24 bg-[#FF0000] rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                                    >
                                        <span className="text-white font-black text-2xl md:text-3xl">{step.number}</span>
                                    </motion.div>
                                </div>

                                {/* Card */}
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex-1 bg-gradient-to-r from-pink-50/80 via-white to-pink-50/30 rounded-3xl p-6 md:p-10 shadow-lg border border-red-50 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="hidden md:flex p-4 bg-white rounded-2xl shadow-sm text-[#FF0000] items-center justify-center">
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToApply;
