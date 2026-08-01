import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import logo1 from '../assets/logo1.png';

// ─── Real WhatsApp glyph (lucide-react has no brand icons) ──────────────────
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
 <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
 <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.892.526 3.66 1.437 5.166L2 22l4.981-1.407A9.94 9.94 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2m0 18.06a8.03 8.03 0 0 1-4.331-1.267l-.31-.185-3.05.86.82-3.04-.202-.317A8.03 8.03 0 1 1 20.03 12c0 4.437-3.593 8.06-8.029 8.06" />
 </svg>
);

const ThankYou = () => {
 // Inject Google Ads mapping and Conversion snippet
 useEffect(() => {
 // --- Meta Pixel Lead Event ---
 if (typeof window.fbq === 'function') {
 window.fbq('track', 'Lead');
 }

 // 1. Base Google Ads gtag script
 const tagScript = document.createElement('script');
 tagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-340383729';
 tagScript.async = true;
 document.head.appendChild(tagScript);

 // 2. Base config & Conversion event snippet
 const inlineScript = document.createElement('script');
 inlineScript.text = `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', 'AW-340383729');
 
 // Lead Form conversion event (AW-340383729)
 gtag('event', 'conversion', {'send_to': 'AW-340383729/TC1qCODg5LIZEPGvp6IB'});

 // Lead Form conversion event (AW-16943685502)
 gtag('event', 'conversion', {'send_to': 'AW-16943685502/7xJnCK78mrkaEP6-sI8_'});

 // Sign-up conversion event (AW-18134909671)
 gtag('event', 'conversion', {'send_to': 'AW-18134909671/xmeCCIm0nqgcEOeFs8dD', 'value': 1.0, 'currency': 'INR'});
 `;
 document.head.appendChild(inlineScript);

 return () => {
 document.head.removeChild(tagScript);
 document.head.removeChild(inlineScript);
 };
 }, []);

 return (
 <div className="min-h-screen bg-[#020205] relative overflow-hidden flex flex-col items-center justify-center px-4">
 <SEO
 title="Thank You | School Of The Future"
 description="Thank you for reaching out to School of the Future. Our team will get back to you shortly."
 />

 {/* Background Effects */}
 <div className="absolute inset-0 pointer-events-none">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/[0.04] rounded-full blur-[200px]" />
 <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-900/[0.06] rounded-full blur-[150px]" />
 <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-orange-900/[0.04] rounded-full blur-[120px]" />
 <div
 className="absolute inset-0 opacity-[0.02]"
 style={{
 backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
 backgroundSize: '80px 80px',
 }}
 />
 </div>

 {/* Main Content */}
 <div className="relative z-10 max-w-2xl mx-auto text-center">
 {/* Logo */}
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.6, ease: 'easeOut' }}
 className="mb-10"
 >
 <Link to="/">
 <img
 src={logo1}
 alt="School of the Future"
 className="h-24 md:h-32 mx-auto object-contain hover:opacity-80 transition-opacity"
 />
 </Link>
 </motion.div>

 {/* Animated Check Icon */}
 <motion.div
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
 className="mb-8"
 >
 <div className="relative w-24 h-24 mx-auto">
 {/* Pulsing ring */}
 <motion.div
 className="absolute inset-0 rounded-full border-2 border-red-500/30"
 animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
 />
 <motion.div
 className="absolute inset-0 rounded-full border border-red-500/20"
 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
 />
 {/* Icon container */}
 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center backdrop-blur-sm">
 <CheckCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
 </div>
 </div>
 </motion.div>

 {/* Heading */}
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4, duration: 0.6 }}
 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight"
 >
 Thank You for{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
 Reaching Out!
 </span>
 </motion.h1>

 {/* Message */}
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.55, duration: 0.6 }}
 className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto"
 >
 We've received your query and our admissions team will get back to you within <span className="text-white font-semibold">24 hours</span>. Meanwhile, feel free to explore our programs or reach out directly.
 </motion.p>

 {/* Contact cards */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.7, duration: 0.6 }}
 className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
 >
 <a
 href="tel:08062642222"
 className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
 >
 <Phone className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
 <span className="text-gray-300 text-sm font-medium">08062642222</span>
 </a>
 <a
 href="https://wa.me/918100203639?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20and%20wanted%20to%20follow%20up"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
 >
 <WhatsAppIcon className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
 <span className="text-gray-300 text-sm font-medium">81002 03639</span>
 </a>
 <a
 href="mailto:sof@technoindiaeducation.com"
 className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
 >
 <Mail className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
 <span className="text-gray-300 text-sm font-medium">sof@technoindiaeducation.com</span>
 </a>
 </motion.div>

 {/* CTA Buttons */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.85, duration: 0.6 }}
 className="flex flex-col sm:flex-row items-center justify-center gap-4"
 >
 <Link
 to="/courses"
 className="flex items-center gap-2 bg-[#FF0000] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#CC0000] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105"
 >
 Explore Programs
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 to="/"
 className="flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-white/60"
 >
 Back to Home
 </Link>
 </motion.div>
 </div>

 {/* Bottom decorative line */}
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
 className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
 />
 </div>
 );
};

export default ThankYou;
