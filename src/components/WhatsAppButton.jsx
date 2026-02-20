import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '919999999999'; // Replace with actual number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20Techno%20India%20University.`;

const WhatsAppButton = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="fixed z-[55] bottom-24 right-6 md:bottom-28 md:right-8"
            style={{
                /* On mobile, bump up above sticky apply bar */
                marginBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
        >
            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
                                   bg-black/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg 
                                   whitespace-nowrap pointer-events-none"
                    >
                        Chat with us
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulse ring */}
            <span
                className="absolute inset-0 rounded-full animate-ping-slow"
                style={{
                    background: 'rgba(37, 211, 102, 0.25)',
                }}
            />

            {/* Button */}
            <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
                style={{
                    background: '#25D366',
                }}
                aria-label="Chat on WhatsApp"
            >
                {/* WhatsApp SVG icon */}
                <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.04-1.94A15.89 15.89 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.152 2.282-.836.18-1.928.324-5.604-1.204-4.702-1.956-7.726-6.72-7.96-7.032-.226-.312-1.898-2.528-1.898-4.822s1.2-3.422 1.628-3.89c.39-.428 1.026-.644 1.634-.644.198 0 .376.01.536.018.468.02.702.048 1.012.784.386.918 1.326 3.23 1.442 3.466.118.234.234.542.084.854-.14.32-.264.462-.498.73-.234.268-.458.474-.692.762-.214.252-.454.522-.19.986.264.46 1.176 1.94 2.526 3.142 1.736 1.546 3.198 2.026 3.654 2.248.354.174.778.136 1.054-.156.352-.368.786-.978 1.228-1.58.316-.428.714-.482 1.104-.324.394.15 2.5 1.18 2.928 1.394.428.216.714.324.82.5.102.178.102 1.028-.288 2.128v-.002z" />
                </svg>
            </a>

            <style>{`
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.6; }
                    75%, 100% { transform: scale(1.5); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default WhatsAppButton;
