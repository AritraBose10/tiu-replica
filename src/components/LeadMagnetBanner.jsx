import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DISMISS_KEY = 'leadMagnetDismissed';
const DISMISS_DAYS = 7;

const LeadMagnetBanner = () => {
 const [visible, setVisible] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const [submitted, setSubmitted] = useState(false);
 const [form, setForm] = useState({ name: '', email: '', phone: '' });
 const location = useLocation();

 useEffect(() => {
 // Only show on homepage
 if (location.pathname !== '/') return;

 const dismissedAt = localStorage.getItem(DISMISS_KEY);
 if (dismissedAt) {
 const diff = Date.now() - parseInt(dismissedAt, 10);
 if (diff < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
 }

 const timer = setTimeout(() => setVisible(true), 5000);
 return () => clearTimeout(timer);
 }, [location.pathname]);

 const dismiss = useCallback(() => {
 localStorage.setItem(DISMISS_KEY, Date.now().toString());
 setVisible(false);
 setShowModal(false);
 }, []);

 const handleSubmit = (e) => {
 e.preventDefault();
 // TODO: Wire up to actual submission endpoint
 setSubmitted(true);
 setTimeout(() => dismiss(), 2500);
 };

 const handleChange = (e) => {
 setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 return (
 <>
 {/* Slide-in ribbon */}
 <AnimatePresence>
 {visible && !showModal && (
 <motion.div
 initial={{ x: '110%' }}
 animate={{ x: 0 }}
 exit={{ x: '110%' }}
 transition={{ type: 'spring', stiffness: 200, damping: 25 }}
 className="fixed z-[55] right-0 top-1/2 -translate-y-1/2 hidden md:block"
 >
 <div
 className="relative rounded-l-2xl overflow-hidden shadow-2xl"
 style={{
 background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
 border: '1px solid rgba(255,255,255,0.1)',
 borderRight: 'none',
 }}
 >
 {/* Close button */}
 <button
 onClick={dismiss}
 className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center 
 justify-center text-gray-500 hover:text-white hover:bg-white/10 
 transition-colors text-xs"
 aria-label="Dismiss"
 >
 ✕
 </button>

 <div className="px-5 py-4 pr-10">
 <div className="flex items-center gap-3 mb-2">
 <span className="text-xl">🎓</span>
 <p className="text-white font-bold text-sm leading-tight">
 FREE: AI Career<br />Guide 2026
 </p>
 </div>
 <p className="text-gray-400 text-[11px] mb-3 leading-relaxed">
 Your roadmap to the<br />hottest AI careers
 </p>
 <button
 onClick={() => {
 setVisible(false);
 setShowModal(true);
 }}
 className="w-full py-2 rounded-lg font-bold text-xs tracking-wider uppercase 
 text-white transition-all duration-200 hover:brightness-110"
 style={{
 background: 'linear-gradient(135deg, #FF0000, #CC0000)',
 boxShadow: '0 2px 12px rgba(255,0,0,0.3)',
 }}
 >
 Get It Free
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Modal form */}
 <AnimatePresence>
 {showModal && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="fixed inset-0 z-[70] flex items-center justify-center p-4"
 onClick={dismiss}
 >
 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
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
 <div
 className="h-1 w-full"
 style={{ background: 'linear-gradient(90deg, #FF0000, #CC0000)' }}
 />

 <button
 onClick={dismiss}
 className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center 
 justify-center text-gray-400 hover:text-white hover:bg-white/10 
 transition-colors"
 aria-label="Close"
 >
 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>

 <div className="p-8">
 {!submitted ? (
 <>
 <div className="text-center mb-6">
 <span className="text-4xl mb-3 block">🎓</span>
 <h2 className="text-2xl font-bold text-white mb-2">
 AI Career Guide 2026
 </h2>
 <p className="text-gray-400 text-sm">
 Get your free copy roles, salaries, skills &amp; learning paths
 </p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-3">
 <input
 type="text"
 name="name"
 placeholder="Full Name"
 required
 value={form.name}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#FF0000]/50"
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
 className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#FF0000]/50"
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
 className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#FF0000]/50"
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
 Download Free Guide
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
 <h3 className="text-xl font-bold text-white mb-1">You're All Set!</h3>
 <p className="text-gray-400 text-sm">Your download will begin shortly.</p>
 </div>
 )}
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
};

export default LeadMagnetBanner;
