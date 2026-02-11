import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Zap } from 'lucide-react';

// Premium Liquid Metal Text Effect
const LiquidChromeText = () => {
    return (
        <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl">
                    SHAPING
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600 animate-gradient-x pb-4">
                    THE FUTURE
                </span>
            </h1>
        </div>
    );
};

// Admissions Form Widget
// Uses a retry-poll to wait for #ee-form-9 to be in the DOM before injecting
// the external script. Prevents the race condition where the script executes
// before React has committed the container element (StrictMode, route transitions).
const AdmissionsFormWidget = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let pollTimer = null;
        let cancelled = false;

        const injectScript = () => {
            // Guard 1: script tag already in the DOM (survives HMR)
            if (document.querySelector('script[src*="ee-form-widget/form-9"]')) return;
            // Guard 2: window flag (covers same-tick StrictMode double-fire)
            if (window.__EE_WIDGET_LOADED__) return;

            window.__EE_WIDGET_LOADED__ = true;

            const script = document.createElement('script');
            script.src =
                'https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/softiu/ee-form-widget/form-9/widget.js';
            script.async = true;
            document.body.appendChild(script);
        };

        // Poll every 100ms until #ee-form-9 is present (max ~3s)
        let attempts = 0;
        const MAX_ATTEMPTS = 30;

        const poll = () => {
            if (cancelled) return;
            const target = document.getElementById('ee-form-9');
            if (target) {
                injectScript();
                return;
            }
            attempts++;
            if (attempts < MAX_ATTEMPTS) {
                pollTimer = setTimeout(poll, 100);
            }
        };

        // Kick off the poll
        poll();

        // Cleanup: cancel any pending poll (do NOT remove the script)
        return () => {
            cancelled = true;
            if (pollTimer) clearTimeout(pollTimer);
        };
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative min-h-[600px] flex flex-col">
            {/* Loading spinner (sits behind widget content) */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>

            {/* Widget Container — z-10 forces iframe above backdrop layers */}
            <div
                ref={containerRef}
                className="ee-form-widget w-full h-full relative z-10"
                id="ee-form-9"
                style={{ position: 'relative', zIndex: 10 }}
            ></div>
        </div>
    );
};

const AdmissionsHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-screen bg-[#020205] overflow-hidden flex items-center pt-20">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div style={{ y: y1 }} className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[120px]" />
                <motion.div style={{ y: y2 }} className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left: Typography */}
                <div className="space-y-8">
                    <LiquidChromeText />

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xl md:text-2xl text-gray-400 max-w-xl border-l-2 border-red-600 pl-6 mb-8">
                            Step into a world where technology meets imagination. <br />
                            <span className="text-white font-semibold">Admissions Open for 2026.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Start Application <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                        <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Virtual Tour
                        </button>
                    </motion.div>
                </div>

                {/* Right: Admissions Form Widget */}
                <div className="relative flex justify-center w-full">
                    <AdmissionsFormWidget />
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex flex-col items-center gap-2"
            >
                <span className="uppercase tracking-widest text-xs">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-red-500 to-transparent" />
            </motion.div>
        </section>
    );
};

export default AdmissionsHero;
