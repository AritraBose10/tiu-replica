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

const CardStack = () => {
    const cards = [
        { id: 1, title: "Google Powered", subtitle: "B.Tech CSE", gradient: "from-blue-600 to-blue-400" },
        { id: 2, title: "IBM Collaboration", subtitle: "AI & ML", gradient: "from-purple-600 to-purple-400" },
        { id: 3, title: "L&T Partnership", subtitle: "Civil Engg", gradient: "from-orange-600 to-yellow-400" },
    ];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            style={{ perspective: 1000 }}
            className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center p-10"
        >
            {cards.map((card, index) => {
                const yOffset = index * -40;
                const scale = 1 - index * 0.05;
                const zIndex = cards.length - index;

                return (
                    <motion.div
                        key={card.id}
                        style={{
                            rotateX: useSpring(rotateX, { stiffness: 150, damping: 20 }),
                            rotateY: useSpring(rotateY, { stiffness: 150, damping: 20 }),
                            y: yOffset,
                            scale: scale,
                            zIndex: zIndex,
                        }}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: yOffset }}
                        transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                        className={`absolute w-64 h-80 md:w-80 md:h-96 rounded-2xl bg-gradient-to-br ${card.gradient} p-6 shadow-2xl border border-white/10 flex flex-col justify-end transform-style-3d`}
                    >
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                        <p className="text-white/80">{card.subtitle}</p>
                    </motion.div>
                );
            })}
        </motion.div>
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

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
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

                {/* Right: 3D Card Stack */}
                <div className="relative flex justify-center">
                    <CardStack />
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
