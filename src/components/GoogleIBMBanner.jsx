import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GoogleIBMBanner = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl relative"
                >
                    <div className="grid md:grid-cols-2 items-center">
                        {/* Left Content */}
                        <div className="p-10 md:p-14">
                            <span className="text-[#FF0000] text-sm font-semibold tracking-wide">
                                Google & IBM Courses
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-black mt-3 mb-6 leading-tight">
                                Advance Your Career
                                <br />
                                with Google & IBM Programs
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Empower your future with globally recognized programs developed with Google and IBM,
                                specializing in AI, Data Science, and Cloud Computing. Gain hands-on expertise,
                                industry-aligned skills, and the confidence to excel in tomorrow's technology landscape.
                            </p>
                            <motion.a
                                href="/admissions"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#CC0000] transition-colors"
                            >
                                Enroll
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>

                        {/* Right Image Section */}
                        <div className="relative h-full min-h-[400px] overflow-hidden">
                            {/* Red accent */}
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-[#FF0000] z-10" />

                            {/* Google & IBM logos */}
                            <div className="absolute top-6 right-24 z-20 flex items-center gap-3">
                                <img
                                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                                    alt="Google"
                                    className="h-6 object-contain"
                                />
                                <span className="text-blue-600 font-bold text-xl">IBM</span>
                            </div>

                            {/* Student montage - B&W effect */}
                            <div className="absolute inset-0 grayscale">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                    alt="Students"
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient fade on left */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GoogleIBMBanner;
