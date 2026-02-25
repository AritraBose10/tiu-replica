import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Train, Plane, Building2, TreePine } from 'lucide-react';

const highlights = [
    { icon: MapPin, label: 'EM-4, Sector V, Salt Lake, Kolkata 700091' },
    { icon: Train, label: '~20 min from Howrah Station' },
    { icon: Plane, label: '~30 min from Netaji Subhas Chandra Bose International Airport' },
    { icon: Building2, label: "Inside Kolkata's IT & Tech Hub — Salt Lake Sector V" },
    { icon: TreePine, label: 'Connected to Metro, Bus & Major Arterial Roads' },
];

const CampusLocation = () => {
    return (
        <section className="py-12 md:py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[40vw] h-[30vw] bg-blue-600/5 rounded-full blur-[180px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0!2d88.4341!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTechno+India+University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Campus Location"
                        />
                    </motion.div>

                    {/* Right — Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                            Campus Location
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4 leading-tight">
                            Where You'll{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                Study
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Located inside Kolkata's IT and tech corridor — Salt Lake Sector V — surrounded
                            by top tech companies, startup offices, and the best infrastructure in the city.
                        </p>

                        <div className="space-y-3">
                            {highlights.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                                    >
                                        <Icon className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CampusLocation;
