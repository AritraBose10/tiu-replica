import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, Users, Award, Building, ChevronRight, Sparkles, ArrowUpRight, CheckCircle } from 'lucide-react';

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

const Contact = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    };

    const particles = Array.from({ length: 12 }, (_, i) => ({
        delay: i * 0.5,
        size: 4 + Math.random() * 8,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <div className="min-h-screen bg-[#020205] text-white overflow-hidden relative selection:bg-red-500/30">
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
                        value="08062642222"
                        href="tel:08062642222"
                        subtitle="Mon – Sat, 9:30 AM – 5:00 PM"
                        index={0}
                    />
                    <ContactInfoCard
                        icon={Mail}
                        title="Email Us Now"
                        value="admissions@tiu.com"
                        href="mailto:admissions@technoindiauniversity.com"
                        subtitle="We reply within 24 hours"
                        index={1}
                    />
                    <ContactInfoCard
                        icon={MapPin}
                        title="Visit Campus"
                        value="Salt Lake, Sector V"
                        href="https://maps.google.com/?q=Techno+India+University+EM-4+Salt+Lake+Sector+V+Kolkata"
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
                            <div className="relative rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.06] rounded-3xl" />
                                <div className="relative p-8 md:p-10">
                                    <AnimatePresence mode="wait">
                                        {submitted ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex flex-col items-center justify-center py-16 text-center"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6">
                                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    {[
                                                        { name: 'firstName', label: 'First Name', type: 'text', required: true },
                                                        { name: 'lastName', label: 'Last Name', type: 'text', required: false },
                                                    ].map((field) => (
                                                        <div key={field.name} className="relative">
                                                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                                                {field.label} {field.required && <span className="text-red-400">*</span>}
                                                            </label>
                                                            <input
                                                                type={field.type}
                                                                name={field.name}
                                                                value={formData[field.name]}
                                                                onChange={handleChange}
                                                                onFocus={() => setFocusedField(field.name)}
                                                                onBlur={() => setFocusedField(null)}
                                                                required={field.required}
                                                                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 outline-none transition-all duration-300 ${focusedField === field.name
                                                                    ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                                                    : 'border-white/[0.08] hover:border-white/[0.15]'
                                                                    }`}
                                                                placeholder={field.label}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-gray-400 text-sm font-medium mb-2">
                                                        Email <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('email')}
                                                        onBlur={() => setFocusedField(null)}
                                                        required
                                                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 outline-none transition-all duration-300 ${focusedField === 'email'
                                                            ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                                            : 'border-white/[0.08] hover:border-white/[0.15]'
                                                            }`}
                                                        placeholder="your@email.com"
                                                    />
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-gray-400 text-sm font-medium mb-2">Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('phone')}
                                                        onBlur={() => setFocusedField(null)}
                                                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 outline-none transition-all duration-300 ${focusedField === 'phone'
                                                            ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                                            : 'border-white/[0.08] hover:border-white/[0.15]'
                                                            }`}
                                                        placeholder="+91 XXXXX XXXXX"
                                                    />
                                                </div>

                                                <div className="relative">
                                                    <label className="block text-gray-400 text-sm font-medium mb-2">
                                                        Message <span className="text-red-400">*</span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('message')}
                                                        onBlur={() => setFocusedField(null)}
                                                        required
                                                        rows={5}
                                                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none ${focusedField === 'message'
                                                            ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                                            : 'border-white/[0.08] hover:border-white/[0.15]'
                                                            }`}
                                                        placeholder="How can we help you?"
                                                    />
                                                </div>

                                                <motion.button
                                                    type="submit"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_40px_rgba(239,68,68,0.35)] transition-shadow duration-300"
                                                >
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </motion.button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
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
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.256837!2d88.4314!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b8c02e2c75%3A0x57c071e0f78ee5d6!2sTechno%20India%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Ground Floor, EM-4, Salt Lake City,<br />
                                                Sector V, Kolkata – 700091,<br />
                                                West Bengal, India
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
                    <motion.a
                        href="/admissions"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-full shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.4)] transition-shadow duration-300"
                    >
                        Apply Now
                        <ChevronRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
