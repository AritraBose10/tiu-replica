import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2572&auto=format&fit=crop", // Modern white building
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop", // Modern office
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop", // Students collab
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop", // Lab/Tech
    "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2569&auto=format&fit=crop", // Campus
];

const ThreeDCarousel = ({ images = defaultImages }) => {
    // Ensure we have at least some images to display
    const displayImages = images && images.length > 0 ? images : defaultImages;
    const [currentIndex, setCurrentIndex] = useState(2 % displayImages.length);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    };

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(handleNext, 2500);
        return () => clearInterval(interval);
    }, [displayImages.length]);

    const getStyle = (index) => {
        const length = displayImages.length;
        const diff = (index - currentIndex + length) % length;

        // Center item
        if (diff === 0) {
            return {
                x: 0,
                scale: 1,
                rotateY: 0,
                zIndex: 10,
                opacity: 1,
                borderWidth: '2px',
                borderColor: '#FF0000',
            };
        }

        // Immediate right
        if (diff === 1 || diff === - (length - 1)) {
            return {
                x: 260,
                scale: 0.85,
                rotateY: -25,
                zIndex: 5,
                opacity: 0.7,
                borderWidth: '1px',
                borderColor: 'rgba(255, 0, 0, 0.5)',
            };
        }

        // Immediate left
        if (diff === -1 || diff === length - 1) {
            return {
                x: -260,
                scale: 0.85,
                rotateY: 25,
                zIndex: 5,
                opacity: 0.7,
                borderWidth: '1px',
                borderColor: 'rgba(255, 0, 0, 0.5)',
            };
        }

        // Far right (only if enough items)
        if (length > 4 && (diff === 2 || diff === - (length - 2))) {
            return {
                x: 460,
                scale: 0.7,
                rotateY: -35,
                zIndex: 1,
                opacity: 0.4,
                borderWidth: '1px',
                borderColor: 'rgba(255, 0, 0, 0.2)',
            };
        }

        // Far left (only if enough items)
        if (length > 4 && (diff === -2 || diff === length - 2)) {
            return {
                x: -460,
                scale: 0.7,
                rotateY: 35,
                zIndex: 1,
                opacity: 0.4,
                borderWidth: '1px',
                borderColor: 'rgba(255, 0, 0, 0.2)',
            };
        }

        return { x: 0, opacity: 0, display: 'none' };
    };

    return (
        <div className="relative w-full h-[300px] flex items-center justify-center perspective-[1000px] overflow-visible">
            {/* Tech Grid Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: `
                        linear-gradient(to right, transparent 0%, rgba(255,0,0,0.2) 50%, transparent 100%) top/100% 1px no-repeat,
                        linear-gradient(to right, transparent 0%, rgba(255,0,0,0.2) 50%, transparent 100%) bottom/100% 1px no-repeat,
                        linear-gradient(to bottom, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%) left/1px 100% no-repeat,
                        linear-gradient(to bottom, transparent 0%, rgba(255,0,0,0.1) 50%, transparent 100%) right/1px 100% no-repeat
                    `
                }}
            />

            {displayImages.map((img, index) => {
                const style = getStyle(index);

                return (
                    <motion.div
                        key={index}
                        className="absolute w-[450px] h-[260px] rounded-2xl overflow-hidden bg-black shadow-2xl backdrop-blur-sm group cursor-pointer"
                        initial={false}
                        animate={style}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            boxShadow: style.zIndex === 10
                                ? '0 0 50px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255,0,0,0.2) inset'
                                : '0 0 20px rgba(255, 0, 0, 0.1)',
                            transformStyle: 'preserve-3d',
                        }}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {/* Image */}
                        <img
                            src={img}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                        />

                        {/* Red Tech Border Overlay */}
                        <div className="absolute inset-0 border-[1px] border-red-500/30 rounded-2xl pointer-events-none"></div>

                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                        {/* Corner Accents (only for center) */}
                        {style.zIndex === 10 && (
                            <>
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500 rounded-tl-md" />
                                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500 rounded-tr-md" />
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500 rounded-bl-md" />
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500 rounded-br-md" />
                            </>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ThreeDCarousel;
