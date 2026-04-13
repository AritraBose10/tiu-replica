import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import logo1 from '../assets/logo1.png';

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
