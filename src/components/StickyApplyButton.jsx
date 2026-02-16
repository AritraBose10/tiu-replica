import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StickyApplyButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
                >
                    <div
                        className="px-4 py-3"
                        style={{
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <Link
                            to="/admissions"
                            className="block w-full text-center py-3 rounded-lg font-bold text-sm tracking-widest uppercase text-white transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                                boxShadow: '0 4px 20px rgba(255,0,0,0.35)',
                            }}
                        >
                            Apply Now
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyApplyButton;
