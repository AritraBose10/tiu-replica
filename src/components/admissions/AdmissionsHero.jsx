import React, { useState, useEffect } from 'react';
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

// External Admissions Form Widget (Embedded via Iframe to ensure script isolation and proper loading)
const AdmissionsFormWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [iframeHeight, setIframeHeight] = useState(520);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'EE_WIDGET_LOADED') {
                setIsLoading(false);
            }
            if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') {
                setIframeHeight(event.data.height);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const widgetCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
                /* Custom scrollbar for iframe content */
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
            </style>
        </head>
        <body>
            <div class="ee-form-widget" id="ee-form-9"></div>
            
            <script>
                function reportHeight() {
                    var h = document.body.scrollHeight;
                    window.parent.postMessage({ type: 'EE_WIDGET_HEIGHT', height: h }, '*');
                }

                window.addEventListener("DOMContentLoaded", function() {
                    window.ee_form_widget_baseurl = "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
                    
                    if (!document.getElementById("__formWidgetCss")) {
                        var e = document.createElement("link");
                        e.id = "__formWidgetCss";
                        e.rel = "stylesheet";
                        e.href = window.ee_form_widget_baseurl + "css/stylesheet.min.css";
                        e.type = "text/css";
                        document.getElementsByTagName("head")[0].appendChild(e);
                    }
                    
                    var t = document.createElement("script");
                    t.type = "text/javascript";
                    t.onload = async function() {
                        var _eeFormWidget = new eeFormWidget();
                        await _eeFormWidget.init("softiu", "form-9", "ee-form-9");
                        // Notify parent that widget is loaded
                        window.parent.postMessage({ type: 'EE_WIDGET_LOADED' }, '*');
                        // Report height after a short delay for styles to settle
                        setTimeout(reportHeight, 300);
                        setTimeout(reportHeight, 1000);
                    };
                    t.src = window.ee_form_widget_baseurl + "js/eeFormWidget.min.js";
                    document.getElementsByTagName("head")[0].appendChild(t);
                });

                // Also observe resize changes
                if (window.ResizeObserver) {
                    new ResizeObserver(reportHeight).observe(document.documentElement);
                }
            </script>
        </body>
        </html>
    `;

    return (
        <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative flex flex-col transition-all duration-300" style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
            {/* Real-time Loading spinner */}
            {
                isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl transition-opacity duration-300">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                )
            }

            <iframe
                srcDoc={widgetCode}
                title="Admissions Enquiry Form"
                className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'transparent', height: iframeHeight }}
            />
        </div>
    );
};

const AdmissionsHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-screen bg-[#020205] overflow-hidden flex items-center pt-20">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                >
                    <source
                        src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Ambient Background (above video) */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
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
