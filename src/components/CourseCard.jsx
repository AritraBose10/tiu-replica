import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, index }) => {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Engineering': return 'bg-[#FF0000]';
            case 'Management': return 'bg-blue-600';
            case 'Computer Applications': return 'bg-purple-600';
            case 'Design': return 'bg-pink-600';
            case 'Science': return 'bg-green-600';
            default: return 'bg-gray-600';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-[#FF0000]/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Top Badge */}
            <div className={`${getCategoryColor(course.category)} text-white text-xs font-bold px-4 py-2`}>
                {course.category === 'Engineering' || course.category === 'Science' ? "Bachelor's" : course.category}
            </div>

            <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-3 group-hover:text-[#FF0000] transition-colors line-clamp-2">
                    {course.title}
                </h3>

                {/* Details List */}
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Eligibility:</span>
                        <span className="font-medium">10+2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium">4 Years</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Semester:</span>
                        <span className="font-medium">8</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Industry Partner:</span>
                        <span className="font-medium text-[#FF0000]">
                            {course.title.includes('Google') ? 'Google' : course.title.includes('IBM') ? 'IBM' : 'TIU'}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {course.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                        Start Now
                    </button>
                    <Link
                        to="/admissions"
                        className="inline-flex items-center gap-1 bg-[#FF0000] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#CC0000] transition-all"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
