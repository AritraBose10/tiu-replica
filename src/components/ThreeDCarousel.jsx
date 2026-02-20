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

const defaultCaptions = [
    "Experience the future of campus life at SOF with our state-of-the-art facilities.",
    "Collaborative workspaces designed to foster innovation and teamwork.",
    "Engage in hands-on learning with industry-standard equipment and cutting-edge labs.",
    "Discover your potential in our vibrant, technology-driven research centers.",
    "Join a thriving community of learners and shape tomorrow's digital landscape."
];

const ThreeDCarousel = ({ items = [] }) => {
    // Helper to request appropriately sized images to prevent browser downsampling blur on huge files
    const optimizeUrl = (url) => {
        if (!url) return '';
        if (url.includes('cdn.sanity.io')) {
            return url + (url.includes('?') ? '&' : '?') + 'w=1200&q=80&fit=max&auto=format';
        }
        return url;
    };

    // Transform simple image strings to objects if necessary
    const normalizedItems = (items && items.length > 0 ? items : defaultImages).map((item, index) => {
        const defaultCaption = defaultCaptions[index % defaultCaptions.length];
        const obj = typeof item === 'string' ? { url: item, caption: '' } : item;
        const finalCaption = obj.caption && obj.caption.trim() !== '' ? obj.caption : defaultCaption;
        return { ...obj, caption: finalCaption, url: optimizeUrl(obj.url) };
    });

    const [currentIndex, setCurrentIndex] = useState(2 % normalizedItems.length);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % normalizedItems.length);
    };

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(handleNext, 2500);
        return () => clearInterval(interval);
    }, [normalizedItems.length]);

    const getStyle = (index) => {
        const length = normalizedItems.length;
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
            {normalizedItems.map((item, index) => {
                const style = getStyle(index);
                const isCenter = style.zIndex === 10;

                return (
                    <motion.div
                        key={index}
                        className="absolute w-[450px] h-[260px] rounded-2xl overflow-hidden bg-black shadow-2xl group cursor-pointer"
                        initial={false}
                        animate={style}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            boxShadow: isCenter
                                ? '0 0 50px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255,0,0,0.2) inset'
                                : '0 0 20px rgba(255, 0, 0, 0.1)',
                            transformStyle: 'preserve-3d',
                        }}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {/* Image */}
                        <img
                            src={item.url}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover transition-all duration-500 will-change-transform"
                            style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'translateZ(0) scale(1.0)', backfaceVisibility: 'hidden' }}
                        />

                        {/* Caption Overlay - Appears on hover for center image */}
                        {isCenter && item.caption && (
                            <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 flex items-end">
                                <p className="text-white text-sm font-medium leading-relaxed drop-shadow-lg">
                                    {item.caption}
                                </p>
                            </div>
                        )}

                        {/* Corner Accents (only for center) */}
                        {isCenter && (
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
