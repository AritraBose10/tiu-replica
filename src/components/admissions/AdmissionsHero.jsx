import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Zap } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

// Premium Liquid Metal Text Effect
const LiquidChromeText = () => {
    return (
        <div className="relative z-10">
            <h1 className="font-black tracking-tight leading-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-2xl">
                    Admission 2026 Open for AI courses
                </span>
                <span className="block text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600 mt-2">
                    in B.Tech CSE, BBA, BCA &amp; More under Techno India University
                </span>
            </h1>
        </div>
    );
};

// External Admissions Form Widget (Embedded via Iframe to ensure script isolation and proper loading)
const AdmissionsFormWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [iframeHeight, setIframeHeight] = useState(520);
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'EE_WIDGET_LOADED') setIsLoading(false);
            if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') setIframeHeight(event.data.height);
        };
        window.addEventListener('message', handleMessage);

        const widgetCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
</style>
</head>
<body>
<script>
(function(){try{var s=window.parent.location.search;if(s)history.replaceState(null,'',s);}catch(e){}})();
<\/script>
<div class="ee-form-widget" id="ee-form-8"></div>
<script>
function reportHeight(){var h=document.body.scrollHeight;window.parent.postMessage({type:'EE_WIDGET_HEIGHT',height:h},'*');}
window.addEventListener("DOMContentLoaded",function(){
window.ee_form_widget_baseurl="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
if(!document.getElementById("__formWidgetCss")){var e=document.createElement("link");e.id="__formWidgetCss";e.rel="stylesheet";e.href=window.ee_form_widget_baseurl+"css/stylesheet.min.css";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e);}
var t=document.createElement("script");t.type="text/javascript";
t.onload=async function(){var w=new eeFormWidget();await w.init("softiu","form-8","ee-form-8");window.parent.postMessage({type:'EE_WIDGET_LOADED'},'*');setTimeout(reportHeight,300);setTimeout(reportHeight,1000);};
t.src=window.ee_form_widget_baseurl+"js/eeFormWidget.min.js";document.getElementsByTagName("head")[0].appendChild(t);});
if(window.ResizeObserver){new ResizeObserver(reportHeight).observe(document.documentElement);}
<\/script>
</body>
</html>`;

        const blob = new Blob([widgetCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeUrl(url);

        return () => {
            window.removeEventListener('message', handleMessage);
            URL.revokeObjectURL(url);
        };
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative flex flex-col transition-all duration-300" style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl transition-opacity duration-300">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
                </div>
            )}
            {iframeUrl && (
            <iframe
                src={iframeUrl}
                title="Admissions Enquiry Form"
                className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'transparent', height: iframeHeight }}
            />
            )}
        </div>
    );
};

const AdmissionsHero = () => {
    const { getSetting } = useSettings();
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
                    className="w-full h-full object-cover"
                >
                    <source
                        src={getSetting('admissions_hero_video') || "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"}
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

                    {/* Partner logos inline with header */}
                    <div className="flex items-center gap-4 mt-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg"
                            alt="Google Cloud"
                            className="h-6 object-contain"
                        />
                        <span className="text-white/30 text-lg font-light">|</span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                            alt="IBM"
                            className="h-7 object-contain brightness-0 invert"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl md:text-3xl text-white font-bold max-w-xl mb-4">
                            Your Journey to a Future-Ready Career Starts Here
                        </h2>
                        <p className="text-lg text-gray-400 max-w-xl border-l-2 border-red-600 pl-6 mb-4">
                            Techno India University one of the best engineering colleges in Kolkata welcomes applications for the 2026 academic year. Whether you are a school-leaver exploring AI courses after 12th or a graduate seeking a top M.Tech college in Kolkata, our admissions process is designed to help you find the right program.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium mb-8">
                            <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-400">Limited Seats</span>
                            <span className="text-white/20">|</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">High-Demand Programs</span>
                            <span className="text-white/20">|</span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">Rolling Admissions</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a href="#apply-section" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 inline-flex items-center gap-2">
                            <span className="relative z-10 flex items-center gap-2">
                                Apply Now <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </a>
                        <a href="https://wa.me/916292233351?text=Hi%2C%20I%20want%20the%20SoF%20course%20brochure" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium hover:bg-green-500/20 transition-all flex items-center gap-2">
                            📱 Get Brochure on WhatsApp
                        </a>
                        {/*
                        <a href="/btech-admission-iit-kharagpur-collaboration" className="group px-8 py-4 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all flex items-center gap-2">
                            TIU &amp; IIT KGP Program <ArrowRight className="w-4 h-4" />
                        </a>
                        */}
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
