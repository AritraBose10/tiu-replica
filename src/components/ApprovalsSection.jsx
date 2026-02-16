import { motion } from 'framer-motion';
import { useSanity } from '../hooks/useSanity';
import { APPROVALS_QUERY } from '../lib/queries';

const fallbackApprovals = [
    { name: 'UGC', fullName: 'University Grants Commission', logo: 'https://static.wixstatic.com/media/4d76fa_22977ebae1bc4181b6af13c54d0ec195~mv2.jpg' },
    { name: 'AICTE', fullName: 'All India Council for Technical Education', logo: 'https://static.wixstatic.com/media/4d76fa_20b732a7a0df4f1aacbee92f04803ff1~mv2.jpg' },
    { name: 'BCI', fullName: 'Bar Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_b4b6e0c8ec2d4b84b19ea16dbcfd016a~mv2.jpg' },
    { name: 'PCI', fullName: 'Pharmacy Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_0f94f520580d4155ac4f8ccb065da04b~mv2.jpg' },
    { name: 'COA', fullName: 'Council of Architecture', logo: 'https://static.wixstatic.com/media/4d76fa_85c506123858458bbddc73a0ff910cc4~mv2.jpg' },
    { name: 'INC', fullName: 'Indian Nursing Council', logo: 'https://static.wixstatic.com/media/4d76fa_df762dfb25974f669d9704d2d5fd127e~mv2.jpg' },
];

const ApprovalsSection = () => {
    const { data: approvals } = useSanity(APPROVALS_QUERY, fallbackApprovals);
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
                            {approval.logo && approval.logo.startsWith('http') ? (
                                <img src={approval.logo} alt={approval.name} className="w-12 h-12 object-contain" />
                            ) : (
                                <span className="text-4xl">{approval.logo}</span>
                            )}
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
