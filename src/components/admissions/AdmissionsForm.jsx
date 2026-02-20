import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, BookOpen, MessageSquare } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder, value, onChange, name }) => (
    <div className="relative group mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
            <Icon className="w-5 h-5" />
        </div>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-red-500 group-focus-within:w-full transition-all duration-500" />
    </div>
);

const AdmissionsForm = ({ onSuccess }) => {
    const cardRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', program: '', message: ''
    });

    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            if (onSuccess) {
                setTimeout(onSuccess, 2000); // Trigger callback after showing success message for 2 seconds
            }
        }, 2000);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section className="py-24 px-4 bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center min-h-screen">
            {/* Background Particles (Simulated with simple dots) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Text */}
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Ready to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Apply?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-md">
                        Seats are limited and programs are in high demand. Apply early to secure your
                        preferred program and scholarship consideration.
                    </p>

                    <div className="flex flex-col gap-3 mb-8">
                        <a
                            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20the%20SoF%20course%20brochure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold hover:bg-green-500/20 transition-all"
                        >
                            📱 Get Course List & Brochure on WhatsApp
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                        >
                            📞 Book a 10-Minute Counselling Call
                        </a>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <h4 className="text-2xl font-bold text-red-500">2026</h4>
                            <p className="text-sm text-gray-500">Intake Open</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <h4 className="text-2xl font-bold text-white">Rolling</h4>
                            <p className="text-sm text-gray-500">Admissions</p>
                        </div>
                    </div>
                </div>

                {/* Right Form Card */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative perspective-1000"
                >
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transform-style-3d">
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Application Sent!</h3>
                                <p className="text-gray-400">Check your email for further instructions.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-2xl font-bold text-white mb-8">Quick Enquiry</h3>

                                <InputField icon={User} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                                <InputField icon={Mail} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField icon={Phone} type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                                    <div className="relative group mb-6">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <select
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
                                        >
                                            <option value="" className="text-black">Select Program</option>
                                            <option value="btech" className="text-black">B.Tech CSE</option>
                                            <option value="bca" className="text-black">BCA</option>
                                            <option value="mba" className="text-black">MBA</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 mb-6">
                                    <input
                                        type="checkbox"
                                        id="whatsapp-optin"
                                        className="mt-1 w-4 h-4 accent-red-500 bg-white/10 border-white/20 rounded"
                                        defaultChecked
                                    />
                                    <label htmlFor="whatsapp-optin" className="text-gray-400 text-sm">
                                        I agree to receive updates on WhatsApp
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'Sending...' : (
                                        <>Apply for Admissions 2026 <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AdmissionsForm;
