import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Users, Award, Building, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

// --- Animated Counter ---
const AnimatedCounter = ({ end, suffix = '', label, icon: Icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, end]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 mb-4">
                <Icon className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gray-400 text-sm">{label}</div>
        </motion.div>
    );
};

// --- Floating Particle ---
const FloatingParticle = ({ delay, size, x, y }) => (
    <motion.div
        className="absolute rounded-full bg-red-500/20 blur-sm"
        style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
        animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
        }}
        transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
);

// --- Contact Info Card ---
const ContactInfoCard = ({ icon: Icon, title, value, href, subtitle, index }) => (
    <motion.a
        href={href}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="group relative block rounded-2xl overflow-hidden cursor-pointer"
    >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        {/* Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl border border-red-500/0 group-hover:border-red-500/20 transition-colors duration-500" />

        <div className="relative p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center mb-5 group-hover:border-red-500/40 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all duration-500">
                <Icon className="w-7 h-7 text-red-400 group-hover:text-red-300 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-red-400 font-medium text-lg group-hover:text-red-300 transition-colors">{value}</p>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
            <div className="mt-4 flex items-center gap-1 text-gray-500 group-hover:text-red-400 transition-colors text-sm">
                <span>Connect</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
        </div>
    </motion.a>
);

const EEFormWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [iframeHeight, setIframeHeight] = useState(520);

    React.useEffect(() => {
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
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
            </style>
        </head>
        <body>
            <div class="ee-form-widget" id="ee-form-8"></div>
            <script>
                function reportHeight() {
                    var h = document.body.scrollHeight;
                    window.parent.postMessage({ type: 'EE_WIDGET_HEIGHT', height: h }, '*');
                }
                window.addEventListener("DOMContentLoaded", function() {
                    window.ee_form_widget_baseurl ="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";// "https://eewidget.extraaedge.com/";
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
                        await _eeFormWidget.init("softiu", "form-8", "ee-form-8");
                        // Notify parent that widget is loaded
                        window.parent.postMessage({ type: 'EE_WIDGET_LOADED' }, '*');
                        // Report height after a short delay for styles to settle
                        setTimeout(reportHeight, 300);
                        setTimeout(reportHeight, 1000);
                    };
                    t.src = window.ee_form_widget_baseurl + "js/eeFormWidget.min.js";
                    document.getElementsByTagName("head")[0].appendChild(t);
                });
                if (window.ResizeObserver) {
                    new ResizeObserver(reportHeight).observe(document.documentElement);
                }
            <\/script>
        </body>
        </html>
    `;

    return (
        <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl" style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500" />
                </div>
            )}
            <iframe
                srcDoc={widgetCode}
                title="Contact Enquiry Form"
                className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundColor: 'transparent', height: iframeHeight }}
            />
        </div>
    );
};

const Contact = () => {
    const { getSetting } = useSettings();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const particles = Array.from({ length: 12 }, (_, i) => ({
        delay: i * 0.5,
        size: 4 + Math.random() * 8,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-hidden relative selection:bg-red-500/30">
            <SEO
                title="Contact School Of The Future | Admissions & Campus Visit"
                description="Reach School Of The Future for admissions, program queries and application guidance. Call 08062642222 or email for quick assistance.."
            />
            {/* Background Ambience (Matched to Courses Page) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            {/* ===== HERO SECTION ===== */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Particles */}
                {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        Get In Touch
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                    >
                        Contact{' '}
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Us</span>
                            <motion.span
                                className="absolute -inset-2 bg-red-500/10 rounded-lg blur-lg"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Connect with us for admissions guidance, campus visits, or any questions you have — we're here to help.
                    </motion.p>
                </motion.div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#020205] via-[#020205]/80 to-transparent pointer-events-none" />
            </section>

            {/* ===== CONTACT CARDS ===== */}
            <section className="relative py-16 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ContactInfoCard
                        icon={Phone}
                        title="Call Us Now"
                        value={getSetting('phone') || "08062642222"}
                        href={`tel:${getSetting('phone') || "08062642222"}`}
                        subtitle="Mon – Sat, 9:30 AM – 5:00 PM"
                        index={0}
                    />
                    <ContactInfoCard
                        icon={Mail}
                        title="Email Us Now"
                        value={getSetting('email') || "admissions@tiu.com"}
                        href={`mailto:${getSetting('email') || "admissions@technoindiauniversity.com"}`}
                        subtitle="We reply within 24 hours"
                        index={1}
                    />
                    <ContactInfoCard
                        icon={MapPin}
                        title="Visit Campus"
                        value="Salt Lake, Sector V"
                        href={getSetting('contact_map_url') || "https://maps.google.com/?q=Techno+India+University+EM-4+Salt+Lake+Sector+V+Kolkata"}
                        subtitle="Kolkata – 700091, West Bengal"
                        index={2}
                    />
                </div>
            </section>

            {/* ===== FORM + MAP SECTION ===== */}
            <section className="relative py-20 px-4">
                {/* Section glow */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[100px]" />

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Send an <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Inquiry</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Fill out the form below and our team will get back to you as soon as possible.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            <EEFormWidget />
                        </motion.div>

                        {/* Map + Address */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Map Embed */}
                            <div className="relative rounded-3xl overflow-hidden h-[340px]">
                                <div className="absolute inset-0 bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.06] rounded-3xl" />
                                <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.06]">
                                    <iframe
                                        title="TIU Location"
                                        src={getSetting('contact_map_url') || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.256837!2d88.4314!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b8c02e2c75%3A0x57c071e0f78ee5d6!2sTechno%20India%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>

                            {/* Address Card */}
                            <div className="relative rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.06] rounded-3xl" />
                                <div className="relative p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <Building className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">Techno India University</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                                {getSetting('address') || <>
                                                    Ground Floor, EM-4, Salt Lake City,<br />
                                                    Sector V, Kolkata – 700091,<br />
                                                    West Bengal, India
                                                </>}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">Office Hours</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Monday – Saturday<br />
                                                9:30 AM – 5:00 PM IST
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== LEGACY STATS ===== */}
            <section className="relative py-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        A Legacy of <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Excellence</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Over the past 40 years, Techno India Group has nurtured over 5 lakh engineers and professionals.
                        Our alumni have gone on to achieve exceptional success.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    <AnimatedCounter end={40} suffix="+" label="Years of Legacy" icon={Clock} />
                    <AnimatedCounter end={500000} suffix="" label="Alumni Worldwide" icon={Users} />
                    <AnimatedCounter end={2} suffix=" Cr" label="Highest Package (INR)" icon={Award} />
                    <AnimatedCounter end={50} suffix="+" label="Industry Partners" icon={Building} />
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,rgba(2,2,5,0)_70%)]"
                    style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.06] rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Begin Your <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Journey?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        If you're willing to contact our admission department, click the button below to start your application.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/admissions"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-full shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.4)] transition-shadow duration-300"
                        >
                            Apply Now
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
