import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const statDefs = [
    { id: 1, value: "95%", label: "Placement Rate", radius: 80, color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30" },
    { id: 2, value: "150+", label: "Corporate Partners", radius: 60, color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30" },
    { id: 3, value: "13+", label: "Specialized Programs", radius: 90, color: "from-red-500/20 to-orange-500/20", border: "border-red-500/30" },
    { id: 4, value: "50LPA", label: "Highest Package", radius: 70, color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
    { id: 5, value: "AICTE", label: "Approved", radius: 50, color: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/30" },
];

const FloatingOrb = ({ stat, domRef, onDragStart, onDragEnd }) => {
    return (
        <motion.div
            ref={domRef}
            drag
            dragMomentum={false}
            dragElastic={0} // Prevent elastic overscroll
            onDragStart={() => onDragStart(stat.id)}
            onDragEnd={() => onDragEnd(stat.id)}
            // We control position via direct DOM manipulation in the parent's physics loop
            // but we need to let framer motion know we are handling layout potentially, 
            // or better yet, we use a transparent drag listener and update the visual element ourselves.
            // Actually, for this hybrid approach, we'll let framer handle the drag events but we override position.
            className={`absolute flex flex-col items-center justify-center rounded-full backdrop-blur-xl border ${stat.border} bg-gradient-to-br ${stat.color} shadow-[0_0_30px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing z-10`}
            style={{
                width: stat.radius * 2,
                height: stat.radius * 2,
                left: 0,
                top: 0,
                // Initial placement will be handled by the physics loop immediately
                willChange: 'transform',
            }}
        >
            <div className="text-2xl md:text-4xl font-bold text-white mb-1 pointer-events-none select-none">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-300 font-medium text-center px-4 pointer-events-none select-none">{stat.label}</div>

            {/* Inner Highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
        </motion.div>
    );
};

const AdmissionsStats = () => {
    const containerRef = useRef(null);
    const requestRef = useRef();
    const draggingId = useRef(null);

    // Physics state stored in refs to avoid re-renders
    const orbs = useRef(statDefs.map(s => ({
        ...s,
        x: 0, y: 0,
        vx: (Math.random() - 0.5) * 1.5, // Reduced velocity for smoothness
        vy: (Math.random() - 0.5) * 1.5
    })));

    // DOM refs for direct manipulation
    const orbDomRefs = useRef(new Map());

    // Initialize positions safely
    useEffect(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();

        const positions = [
            { xPct: 0.15, yPct: 0.35 },
            { xPct: 0.45, yPct: 0.25 },
            { xPct: 0.75, yPct: 0.30 },
            { xPct: 0.30, yPct: 0.65 },
            { xPct: 0.60, yPct: 0.60 },
        ];

        orbs.current.forEach((orb, i) => {
            const pos = positions[i] || { xPct: 0.5, yPct: 0.5 };
            // Ensure strictly inside container with padding
            orb.x = Math.max(orb.radius + 10, Math.min(width - orb.radius - 10, width * pos.xPct));
            orb.y = Math.max(orb.radius + 10, Math.min(height - orb.radius - 10, height * pos.yPct));
        });
    }, []);

    const updatePhysics = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // 1. Update positions and apply forces
        orbs.current.forEach(orb => {
            if (draggingId.current === orb.id) {
                // If dragging, we sync with the DOM element's position (pushed by Framer Motion drag)
                // Actually, Framer Motion drag uses transform. 
                // We need to read the transform to update our physics model? 
                // OR we just ignore physics update for this orb and let Drag sync it?
                // Better: We let Motion handle the visual drag, and we update our 'x/y' model to match 
                // so when we release, it resumes from there.

                const el = orbDomRefs.current.get(orb.id);
                if (el) {
                    // Extract matrix transform to get current X/Y relative to parent
                    // This is complex. 
                    // SIMPLER ALTERNATIVE: Use our own pointer tracking for drag. 
                    // But sticking to the hybrid approach for now:
                    // We'll skip position updates here. The handlePointerMove will update x/y.
                }
                return;
            }

            // Normal Physics
            orb.x += orb.vx;
            orb.y += orb.vy;

            // Boundaries (Strict Clamping & Bounce)
            // Left
            if (orb.x - orb.radius < 0) {
                orb.x = orb.radius;
                orb.vx *= -0.6; // Damped bounce
            }
            // Right
            if (orb.x + orb.radius > width) {
                orb.x = width - orb.radius;
                orb.vx *= -0.6;
            }
            // Top
            if (orb.y - orb.radius < 0) {
                orb.y = orb.radius;
                orb.vy *= -0.6;
            }
            // Bottom
            if (orb.y + orb.radius > height) {
                orb.y = height - orb.radius;
                orb.vy *= -0.6;
            }

            // Damping (Friction)
            orb.vx *= 0.98;
            orb.vy *= 0.98;

            // Gentle ambient motion (reduced jitter)
            if (Math.abs(orb.vx) < 0.2) orb.vx += (Math.random() - 0.5) * 0.05;
            if (Math.abs(orb.vy) < 0.2) orb.vy += (Math.random() - 0.5) * 0.05;
        });

        // 2. Resolve Collisions (Position Correction to stop vibration)
        for (let i = 0; i < orbs.current.length; i++) {
            for (let j = i + 1; j < orbs.current.length; j++) {
                const o1 = orbs.current[i];
                const o2 = orbs.current[j];

                // Don't collide with dragged orb (optional, but smoother)
                // if (draggingId.current === o1.id || draggingId.current === o2.id) continue;

                const dx = o2.x - o1.x;
                const dy = o2.y - o1.y;
                const distSq = dx * dx + dy * dy;
                const minDist = o1.radius + o2.radius;

                if (distSq < minDist * minDist) {
                    const dist = Math.sqrt(distSq);
                    const overlap = minDist - dist;
                    const angle = Math.atan2(dy, dx);

                    // Separate them to resolve overlap (prevents sticking)
                    const moveX = (Math.cos(angle) * overlap) / 2;
                    const moveY = (Math.sin(angle) * overlap) / 2;

                    if (draggingId.current !== o1.id) {
                        o1.x -= moveX;
                        o1.y -= moveY;
                        o1.vx -= moveX * 0.05; // Energy transfer
                        o1.vy -= moveY * 0.05;
                    }
                    if (draggingId.current !== o2.id) {
                        o2.x += moveX;
                        o2.y += moveY;
                        o2.vx += moveX * 0.05;
                        o2.vy += moveY * 0.05;
                    }
                }
            }
        }

        // 3. Render Updates (Direct DOM manipulation)
        orbs.current.forEach(orb => {
            const el = orbDomRefs.current.get(orb.id);
            if (el) {
                // Use transform for smooth 60fps
                // Subtract dimensions to center (since x,y are center-based in our logic)
                // But we want top-left positioning context for the element if using 'left/top' style
                // Actually, let's just use transform translate from top-left 0,0
                el.style.transform = `translate3d(${orb.x - orb.radius}px, ${orb.y - orb.radius}px, 0)`;
                // Ensure left/top are 0 in CSS or style to act as base
            }
        });

        requestRef.current = requestAnimationFrame(updatePhysics);
    };

    // Global pointer move for custom drag handling (smoother than motion drag for physics sync)
    useEffect(() => {
        const handlePointerMove = (e) => {
            if (draggingId.current === null) return;
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to container
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            // STRICT CLAMPING during drag
            const orb = orbs.current.find(o => o.id === draggingId.current);
            if (orb) {
                x = Math.max(orb.radius, Math.min(rect.width - orb.radius, x));
                y = Math.max(orb.radius, Math.min(rect.height - orb.radius, y));

                // Update velocity based on drag movement (throw effect)
                orb.vx = (x - orb.x) * 0.2;
                orb.vy = (y - orb.y) * 0.2;

                orb.x = x;
                orb.y = y;
            }
        };

        const handlePointerUp = () => {
            draggingId.current = null;
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <section ref={containerRef} className="hidden md:flex relative h-[80vh] bg-[#020205] overflow-hidden items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Central Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <h2 className="text-[20vw] font-black text-white/[0.03] tracking-tighter uppercase leading-none">
                    IMPACT
                </h2>
            </div>
            <div className="absolute bottom-20 text-center pointer-events-none select-none z-0">
                <p className="text-white/20 text-xl tracking-[0.5em] uppercase">Techno India University</p>
            </div>

            {/* Floating Orbs */}
            {statDefs.map(stat => (
                <FloatingOrb
                    key={stat.id}
                    stat={stat}
                    domRef={(el) => {
                        if (el) orbDomRefs.current.set(stat.id, el);
                        else orbDomRefs.current.delete(stat.id);
                    }}
                    onDragStart={(id) => draggingId.current = id}
                    onDragEnd={(id) => draggingId.current = null}
                />
            ))}

            <div className="absolute bottom-10 text-gray-500 text-sm animate-pulse z-20">
                Drag the bubbles to interact
            </div>
        </section>
    );
};

export default AdmissionsStats;
