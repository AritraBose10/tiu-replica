import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FileText, UserCheck, Award, Layers } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Registration",
        desc: "Create your account and fill basic details.",
        icon: FileText
    },
    {
        id: 2,
        title: "Documentation",
        desc: "Upload academic records & ID proof.",
        icon: Layers
    },
    {
        id: 3,
        title: "Verification",
        desc: "Our team reviews your eligibility.",
        icon: UserCheck
    },
    {
        id: 4,
        title: "Admission Offer",
        desc: "Accept offer & pay admission fees.",
        icon: Award
    },
];

const AdmissionsTimeline = () => {
    const targetRef = useRef(null);
    const scrollContentRef = useRef(null);
    const [scrollRange, setScrollRange] = useState(0);

    // Measure how far we need to scroll horizontally
    // scrollRange = total content width - viewport width
    useEffect(() => {
        const measure = () => {
            if (scrollContentRef.current) {
                const contentWidth = scrollContentRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                const totalRange = contentWidth - viewportWidth + 150; // +150px buffer for safe ending
                // Add a small buffer/correction or clamp
                setScrollRange(Math.max(0, totalRange));
            }
        };

        // Initial measure
        measure();

        // Measure on resize and load (for images/fonts)
        window.addEventListener('resize', measure);
        window.addEventListener('load', measure);

        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('load', measure);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Map vertical scroll to exact pixel-based horizontal movement
    // [0.1, 0.9] creates a buffer: 10% vertical scroll to "settle" before moving,
    // and 10% to "hold" the end before unsticking.
    const x = useTransform(scrollYProgress, [0.1, 0.9], ["0px", `-${scrollRange}px`]);

    // Smooth spring for buttery scroll feel
    const smoothX = useSpring(x, { stiffness: 80, damping: 30, mass: 0.8 });

    // Progress Line filling up
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={targetRef} className="relative h-[500vh] bg-[#020205]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Background Text */}
                <div className="absolute top-20 left-10 opacity-5 pointer-events-none select-none">
                    <h2 className="text-[15vw] font-bold text-white leading-none">PROCESS</h2>
                </div>

                <motion.div
                    ref={scrollContentRef}
                    style={{ x: smoothX }}
                    className="flex gap-20 px-10 md:px-20 items-center h-full will-change-transform"
                >
                    {/* Intro Card */}
                    <div className="flex flex-col justify-center min-w-[300px] md:min-w-[500px] flex-shrink-0">
                        <h2 className="text-5xl md:text-8xl font-bold text-white mb-6">
                            Your Journey <br />
                            <span className="text-red-600">Starts Here</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-lg">
                            A seamless 4-step process designed to get you from applicant to student.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-transparent rounded-full" />
                            <div className="w-4 h-1 bg-white/20 rounded-full" />
                        </div>
                    </div>

                    {/* Step Cards */}
                    {steps.map((step, index) => {
                        return (
                            <div key={step.id} className="relative flex-shrink-0 w-[80vw] md:w-[600px] h-[50vh] md:h-[600px] flex items-center">
                                <div className="relative z-10 w-full h-full p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] group overflow-hidden shadow-2xl">
                                    {/* Decorative Number */}
                                    <div className="absolute -top-10 -right-10 text-[15rem] font-bold text-white/5 group-hover:text-red-600/10 transition-colors duration-500 select-none">
                                        {step.id}
                                    </div>

                                    <div className="mt-auto relative z-20">
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-600/20 to-orange-600/20 text-red-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/5">
                                            <step.icon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{step.title}</h3>
                                        <p className="text-gray-400 text-xl leading-relaxed max-w-md">{step.desc}</p>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Connecting Line (Visual) */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-1/2 -right-[5rem] w-20 h-[2px] bg-white/5 hidden md:block" />
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                {/* Progress Bar Bottom */}
                <div className="absolute bottom-10 left-10 md:left-20 w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div style={{ width: lineWidth }} className="h-full bg-red-600" />
                </div>
            </div>
        </section>
    );
};

export default AdmissionsTimeline;
