import { motion } from 'framer-motion';

const approvals = [
    { name: 'UGC', fullName: 'University Grants Commission', logo: '🏛️' },
    { name: 'AICTE', fullName: 'All India Council for Technical Education', logo: '📚' },
    { name: 'AIU', fullName: 'Association of Indian Universities', logo: '🎓' },
    { name: 'NIRF', fullName: 'National Institutional Ranking Framework', logo: '🏆' },
    { name: 'NAAC', fullName: 'National Assessment and Accreditation Council', logo: '⭐' },
    { name: 'ISO', fullName: 'ISO 9001:2015 Certified', logo: '✅' },
];

const ApprovalsSection = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block bg-[#FF0000] text-white text-sm font-semibold px-6 py-2 rounded-full mb-6">
                        Assurance matters the most
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-black mb-6"
                >
                    Prestigious Approvals & Affiliations
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 max-w-3xl mx-auto mb-14 leading-relaxed"
                >
                    TIU - School of The Future is revolutionizing education with cutting-edge teaching methods,
                    personalized learning experiences, and a commitment to shaping the leaders of tomorrow in India.
                </motion.p>

                {/* Approval Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {approvals.map((approval, index) => (
                        <motion.div
                            key={approval.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-3"
                        >
                            <span className="text-4xl">{approval.logo}</span>
                            <span className="font-bold text-black">{approval.name}</span>
                            <span className="text-xs text-gray-500 text-center leading-relaxed">
                                {approval.fullName}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ApprovalsSection;
