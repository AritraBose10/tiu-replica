import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup = () => {
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });

    const triggerPopup = useCallback(() => {
        if (sessionStorage.getItem('exitPopupShown')) return;
        sessionStorage.setItem('exitPopupShown', 'true');
        setShow(true);
    }, []);

    useEffect(() => {
        // Desktop: mouse leaves viewport from the top
        const handleMouseOut = (e) => {
            if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
                triggerPopup();
            }
        };
        document.addEventListener('mouseout', handleMouseOut);

        // Mobile fallback: show after 30s of idle
        const timer = setTimeout(() => {
            triggerPopup();
        }, 30000);

        return () => {
            document.removeEventListener('mouseout', handleMouseOut);
            clearTimeout(timer);
        };
    }, [triggerPopup]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Connect to backend API
        console.log('Brochure download lead:', form);
        setSubmitted(true);
        setTimeout(() => setShow(false), 2500);
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                    onClick={() => setShow(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        {/* Top red accent bar */}
                        <div
                            className="h-1 w-full"
                            style={{
                                background: 'linear-gradient(90deg, #FF0000, #CC0000)',
                            }}
                        />

                        {/* Close button */}
                        <button
                            onClick={() => setShow(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full 
                                       flex items-center justify-center text-gray-400 
                                       hover:text-white hover:bg-white/10 transition-colors"
                            aria-label="Close popup"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8">
                            {!submitted ? (
                                <>
                                    {/* Icon */}
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto"
                                        style={{
                                            background: 'rgba(255,0,0,0.1)',
                                            border: '1px solid rgba(255,0,0,0.2)',
                                        }}
                                    >
                                        <svg className="w-7 h-7 text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                                        Download Our Brochure
                                    </h2>
                                    <p className="text-gray-400 text-center text-sm mb-6">
                                        Get the complete guide to programs, campus life &amp; placements
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-1 focus:ring-[#FF0000]/50"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-1 focus:ring-[#FF0000]/50"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            required
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-1 focus:ring-[#FF0000]/50"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-3 rounded-lg font-bold text-sm tracking-wider uppercase text-white transition-all duration-200 hover:brightness-110"
                                            style={{
                                                background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                                                boxShadow: '0 4px 20px rgba(255,0,0,0.3)',
                                            }}
                                        >
                                            Download Brochure
                                        </button>
                                    </form>

                                    <p className="text-gray-600 text-[11px] text-center mt-4">
                                        We respect your privacy. No spam, ever.
                                    </p>
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">Thank You!</h3>
                                    <p className="text-gray-400 text-sm">Your brochure download will begin shortly.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
