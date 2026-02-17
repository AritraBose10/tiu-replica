import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingUp, ArrowRight } from 'lucide-react';

const SeatAvailability = () => {
    return (
        <section className="py-20 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-red-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl bg-gradient-to-br from-red-950/30 to-red-900/10 border border-red-600/20 p-8 md:p-12 overflow-hidden"
                >
                    {/* Decorative alert icon */}
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>

                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Limited Availability
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-6 max-w-2xl leading-tight">
                        Seats Are Limited.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Apply Early.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mb-8">
                        Programs at the School of the Future operate on a limited-seat model. Admissions are processed
                        on a rolling basis, and high-demand programs close early. Early applicants receive priority
                        consideration for scholarships.
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <Clock className="w-5 h-5 text-red-400" />
                            <div>
                                <p className="text-white font-bold text-lg">Rolling</p>
                                <p className="text-gray-500 text-xs">Admission Basis</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                            <TrendingUp className="w-5 h-5 text-orange-400" />
                            <div>
                                <p className="text-white font-bold text-lg">High Demand</p>
                                <p className="text-gray-500 text-xs">CSE, AI/ML, Data Science</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="#apply-section"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow-[0_0_30px_rgba(255,0,0,0.3)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] transition-all hover:scale-105"
                    >
                        Secure Your Seat <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default SeatAvailability;
