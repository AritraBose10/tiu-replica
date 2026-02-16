import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const COLS = 10;
const ROWS = 6;

const CENTER_IMG =
    'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop';
const LEFT_IMG =
    'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=2070&auto=format&fit=crop';
const RIGHT_IMG =
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop';

/**
 * Multi-phase hero image with shatter effect:
 * 1. Center image enters with spring (3D unbox)
 * 2. Brief flash, then center image shatters into COLS×ROWS tiles
 * 3. Tiles scatter outward (left half → left, right half → right)
 * 4. Side panel images assemble from the particle direction
 * 5. All three images visible with subtle float
 */
export default function ShatterHeroImage() {
    const [phase, setPhase] = useState('entrance');
    // entrance → shatter → done

    /* ── Pre-compute tile scatter data ── */
    const tiles = useMemo(() => {
        const arr = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const goLeft = c < COLS / 2;
                // Distance from center column (0–1), used to scale scatter distance
                const distFromCenter = Math.abs(c - COLS / 2) / (COLS / 2);
                arr.push({
                    key: `t${r}-${c}`,
                    col: c,
                    row: r,
                    // Background-position to show the correct slice
                    bgPosX: COLS > 1 ? (c / (COLS - 1)) * 100 : 0,
                    bgPosY: ROWS > 1 ? (r / (ROWS - 1)) * 100 : 0,
                    // Scatter destination
                    dx: goLeft
                        ? -(180 + distFromCenter * 280 + Math.random() * 120)
                        : (180 + distFromCenter * 280 + Math.random() * 120),
                    dy: (Math.random() - 0.5) * 220,
                    dr: (Math.random() - 0.5) * 100,
                    // Stagger: tiles closer to edges scatter first
                    delay: (1 - distFromCenter) * 0.25 + Math.random() * 0.1,
                });
            }
        }
        return arr;
    }, []);

    /* ── Phase transitions ── */
    useEffect(() => {
        // Spring entrance finishes around 2.1s (0.6 delay + ~1.5s spring settling)
        // Add small pause after landing for dramatic effect
        const t = setTimeout(() => setPhase('shatter'), 2800);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (phase === 'shatter') {
            const t = setTimeout(() => setPhase('done'), 1600);
            return () => clearTimeout(t);
        }
    }, [phase]);

    const isShattered = phase === 'shatter' || phase === 'done';

    return (
        <div className="relative w-full flex items-center justify-center gap-2 md:gap-4">
            {/* ═══════════ LEFT SIDE PANEL ═══════════ */}
            <motion.div
                className="hidden md:block relative w-[22%] aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0, x: 80, rotateY: -20 }}
                animate={
                    isShattered
                        ? { opacity: 1, scale: 1, x: 0, rotateY: 0 }
                        : { opacity: 0, scale: 0, x: 80, rotateY: -20 }
                }
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 14,
                    delay: isShattered ? 0.3 : 0,
                }}
                style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
            >
                <img
                    src={LEFT_IMG}
                    alt="Campus Architecture"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* ═══════════ CENTER IMAGE + SHATTER ═══════════ */}
            <div
                className="relative w-[80%] sm:w-[55%] md:w-[45%] aspect-[4/3] z-10"
                style={{ perspective: '900px' }}
            >
                {/* ── Main image (spring entrance) ── */}
                <motion.div
                    className="absolute inset-0 rounded-md overflow-hidden border border-white/10 shadow-2xl"
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{
                        opacity: 0,
                        scale: 0.3,
                        rotateX: 40,
                        rotateY: -30,
                        y: 80,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.6,
                        type: 'spring',
                        stiffness: 60,
                        damping: 14,
                        mass: 1,
                    }}
                >
                    {/* Subtle float after everything settles */}
                    <motion.div
                        animate={phase === 'done' ? { y: [0, -6, 0] } : { y: 0 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.5,
                        }}
                    >
                        <img
                            src={CENTER_IMG}
                            alt="Techno India University Campus"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </motion.div>

                {/* ── White flash when shatter triggers ── */}
                {phase === 'shatter' && (
                    <motion.div
                        className="absolute inset-0 bg-white/90 rounded-md z-15 pointer-events-none"
                        initial={{ opacity: 0.9 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                )}

                {/* ── Shatter tile grid ── */}
                {isShattered && (
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                            borderRadius: '0.375rem',
                        }}
                    >
                        {tiles.map((tile) => (
                            <motion.div
                                key={tile.key}
                                className="rounded-[1px]"
                                style={{
                                    backgroundImage: `url(${CENTER_IMG})`,
                                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                    backgroundPosition: `${tile.bgPosX}% ${tile.bgPosY}%`,
                                    backfaceVisibility: 'hidden',
                                }}
                                initial={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                animate={{
                                    x: tile.dx,
                                    y: tile.dy,
                                    rotate: tile.dr,
                                    scale: 0,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 1.1,
                                    delay: tile.delay,
                                    ease: [0.36, 0.07, 0.19, 0.97],
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ═══════════ RIGHT SIDE PANEL ═══════════ */}
            <motion.div
                className="hidden md:block relative w-[22%] aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0, x: -80, rotateY: 20 }}
                animate={
                    isShattered
                        ? { opacity: 1, scale: 1, x: 0, rotateY: 0 }
                        : { opacity: 0, scale: 0, x: -80, rotateY: 20 }
                }
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 14,
                    delay: isShattered ? 0.3 : 0,
                }}
                style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
            >
                <img
                    src={RIGHT_IMG}
                    alt="Student Life"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
        </div>
    );
}
