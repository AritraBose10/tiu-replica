import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const CENTER_COLS = 10;
const CENTER_ROWS = 6;
const SIDE_COLS = 6;
const SIDE_ROWS = 5;
const SIDE_COLS_FAR = 4;
const SIDE_ROWS_FAR = 4;

const CENTER_IMG =
    '';

const SIDE_PANELS = [
    {
        id: 'far-left',
        src: '',
        alt: 'University Hall',
        side: 'left',
        far: true,
    },
    {
        id: 'near-left',
        src: '',
        alt: 'Campus Architecture',
        side: 'left',
        far: false,
    },
    {
        id: 'near-right',
        src: '',
        alt: 'Student Life',
        side: 'right',
        far: false,
    },
    {
        id: 'far-right',
        src: '',
        alt: 'Graduation Day',
        side: 'right',
        far: true,
    },
];

/**
 * Multi-phase hero image with CONNECTED shatter→assembly:
 * 1. Center image enters with fast spring
 * 2. Center shatters into tiles that scatter outward
 * 3. Side panel tiles converge INWARD from scattered positions,
 *    assembling from the particle direction to form each side image
 * 4. Once assembled, clean images replace tile grids
 * 5. All 5 images float gently
 */
export default function ShatterHeroImage() {
    const [phase, setPhase] = useState('entrance');
    // entrance → shatter → done

    /* ── Center scatter tiles ── */
    const centerTiles = useMemo(() => {
        const arr = [];
        for (let r = 0; r < CENTER_ROWS; r++) {
            for (let c = 0; c < CENTER_COLS; c++) {
                const goLeft = c < CENTER_COLS / 2;
                const distFromCenter =
                    Math.abs(c - CENTER_COLS / 2) / (CENTER_COLS / 2);
                arr.push({
                    key: `ct-${r}-${c}`,
                    col: c,
                    row: r,
                    bgPosX:
                        CENTER_COLS > 1 ? (c / (CENTER_COLS - 1)) * 100 : 0,
                    bgPosY:
                        CENTER_ROWS > 1 ? (r / (CENTER_ROWS - 1)) * 100 : 0,
                    dx: goLeft
                        ? -(160 + distFromCenter * 300 + Math.random() * 100)
                        : 160 + distFromCenter * 300 + Math.random() * 100,
                    dy: (Math.random() - 0.5) * 200,
                    dr: (Math.random() - 0.5) * 100,
                    delay: (1 - distFromCenter) * 0.15 + Math.random() * 0.08,
                });
            }
        }
        return arr;
    }, []);

    /* ── Side panel assembly tile data ── */
    const sidePanelData = useMemo(() => {
        return SIDE_PANELS.map((panel) => {
            const cols = panel.far ? SIDE_COLS_FAR : SIDE_COLS;
            const rows = panel.far ? SIDE_ROWS_FAR : SIDE_ROWS;
            const tiles = [];
            // Tiles come FROM the center direction
            const fromDir = panel.side === 'left' ? 1 : -1;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    // Tiles near the center edge assemble first
                    const edgeDist =
                        panel.side === 'left'
                            ? (cols - 1 - c) / cols // right edge = near center
                            : c / cols; // left edge = near center
                    tiles.push({
                        key: `${panel.id}-${r}-${c}`,
                        col: c,
                        row: r,
                        cols,
                        rows,
                        bgPosX: cols > 1 ? (c / (cols - 1)) * 100 : 0,
                        bgPosY: rows > 1 ? (r / (rows - 1)) * 100 : 0,
                        // Start scattered from center direction
                        startX: fromDir * (100 + Math.random() * 250),
                        startY: (Math.random() - 0.5) * 180,
                        startRotate: (Math.random() - 0.5) * 70,
                        // Stagger: edge nearest to center assembles first
                        delay: edgeDist * 0.2 + Math.random() * 0.08,
                    });
                }
            }
            return { ...panel, tiles, cols, rows };
        });
    }, []);

    /* ── Phase transitions ── */
    useEffect(() => {
        const t = setTimeout(() => setPhase('shatter'), 800);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (phase === 'shatter') {
            // Allow enough time for assembly to complete
            const t = setTimeout(() => setPhase('done'), 1800);
            return () => clearTimeout(t);
        }
    }, [phase]);

    const isShattered = phase === 'shatter' || phase === 'done';

    return (
        <div className="relative w-full flex items-center justify-center gap-1.5 md:gap-3">
            {/* ═══════════ LEFT PANELS (far → near) ═══════════ */}
            {sidePanelData
                .filter((p) => p.side === 'left')
                .map((panel) => (
                    <AssemblingPanel
                        key={panel.id}
                        panel={panel}
                        phase={phase}
                        isShattered={isShattered}
                    />
                ))}

            {/* ═══════════ CENTER IMAGE + SHATTER ═══════════ */}
            <div
                className="relative w-[75%] sm:w-[50%] md:w-[38%] aspect-[16/10] z-10"
                style={{ perspective: '900px' }}
            >
                {/* ── Main image (fast spring entrance) ── */}
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
                        delay: 0.15,
                        type: 'spring',
                        stiffness: 90,
                        damping: 15,
                        mass: 0.8,
                    }}
                >
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

                {/* ── White flash on shatter ── */}
                {phase === 'shatter' && (
                    <motion.div
                        className="absolute inset-0 bg-white/80 rounded-md pointer-events-none"
                        style={{ zIndex: 15 }}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                )}

                {/* ── Center scatter tiles ── */}
                {isShattered && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            zIndex: 20,
                            display: 'grid',
                            gridTemplateColumns: `repeat(${CENTER_COLS}, 1fr)`,
                            gridTemplateRows: `repeat(${CENTER_ROWS}, 1fr)`,
                            borderRadius: '0.375rem',
                        }}
                    >
                        {centerTiles.map((tile) => (
                            <motion.div
                                key={tile.key}
                                style={{
                                    backgroundImage: `url(${CENTER_IMG})`,
                                    backgroundSize: `${CENTER_COLS * 100}% ${CENTER_ROWS * 100}%`,
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
                                    scale: 0.3,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: tile.delay,
                                    ease: [0.36, 0.07, 0.19, 0.97],
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ═══════════ RIGHT PANELS (near → far) ═══════════ */}
            {sidePanelData
                .filter((p) => p.side === 'right')
                .map((panel) => (
                    <AssemblingPanel
                        key={panel.id}
                        panel={panel}
                        phase={phase}
                        isShattered={isShattered}
                    />
                ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
 * Side panel that assembles from scattered tiles
 * ───────────────────────────────────────────── */
function AssemblingPanel({ panel, phase, isShattered }) {
    const showTiles = phase === 'shatter';
    const showClean = phase === 'done';
    const baseDelay = panel.far ? 0.35 : 0.1;

    return (
        <div
            className={`hidden md:block relative ${panel.far ? 'w-[13%] aspect-[3/4]' : 'w-[17%] aspect-[3/4]'
                }`}
            style={{ perspective: '600px' }}
        >
            {/* ── Assembling tile grid (overflow visible so tiles come from outside) ── */}
            {isShattered && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        display: 'grid',
                        gridTemplateColumns: `repeat(${panel.cols}, 1fr)`,
                        gridTemplateRows: `repeat(${panel.rows}, 1fr)`,
                        overflow: 'visible',
                        borderRadius: '0.5rem',
                    }}
                >
                    {panel.tiles.map((tile) => (
                        <motion.div
                            key={tile.key}
                            style={{
                                backgroundImage: `url(${panel.src})`,
                                backgroundSize: `${tile.cols * 100}% ${tile.rows * 100}%`,
                                backgroundPosition: `${tile.bgPosX}% ${tile.bgPosY}%`,
                                backfaceVisibility: 'hidden',
                                borderRadius: 1,
                            }}
                            initial={{
                                x: tile.startX,
                                y: tile.startY,
                                rotate: tile.startRotate,
                                opacity: 0,
                                scale: 0.3,
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                rotate: 0,
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.85,
                                delay: tile.delay + baseDelay,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── Clean image (replaces tiles after assembly) ── */}
            <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden border border-white/10 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: showClean ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src={panel.src}
                    alt={panel.alt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
        </div>
    );
}
