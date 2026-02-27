import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const defaultGalleryImages = [
    {
        src: '',
        alt: 'Tech Club Session',
        caption: 'Technology & Innovation Club',
        category: 'Clubs',
        span: 'col-span-2 row-span-2',
    },
    {
        src: '',
        alt: 'Hackathon Event',
        caption: 'Annual Hackathon Championship',
        category: 'Hackathons',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '',
        alt: 'Industry Masterclass',
        caption: 'Expert-Led Masterclass Series',
        category: 'Masterclasses',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '',
        alt: 'Cultural Festival',
        caption: 'Annual Cultural Fest',
        category: 'Cultural Events',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '',
        alt: 'Design Showcase',
        caption: 'Student Design Exhibition',
        category: 'Clubs',
        span: 'col-span-1 row-span-2',
    },
    {
        src: '',
        alt: 'Industry Visit',
        caption: 'Google Cloud Campus Visit',
        category: 'Masterclasses',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '',
        alt: 'Coding Competition',
        caption: '24-Hour Code Sprint',
        category: 'Hackathons',
        span: 'col-span-1 row-span-1',
    },
    {
        src: '',
        alt: 'Student Performance',
        caption: 'Music & Creative Night',
        category: 'Cultural Events',
        span: 'col-span-1 row-span-1',
    },
];

const categories = ['All', 'Clubs', 'Hackathons', 'Masterclasses', 'Cultural Events'];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CampusGallery = () => {
    const { settings } = useSettings();
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const galleryImages = defaultGalleryImages.map((img, index) => {
        const settingKey = `campus_life_image_${index + 1}`;
        return {
            ...img,
            src: settings?.[settingKey] || img.src
        };
    });

    const filteredImages = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
    const nextImage = () => setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));

    return (
        <section className="py-12 md:py-24 px-4 bg-[#020205] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] bg-red-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">
                        Campus Life
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-3 mb-4">
                        Campus Life That Builds{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Confidence
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Learning at the School of the Future extends beyond classrooms. Students actively
                        engage through clubs, hackathons, masterclasses, and student-led events.
                    </p>
                </motion.div>

                {/* Category Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 mb-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    key={activeCategory} /* re-animate on filter change */
                >
                    {filteredImages.map((img, i) => (
                        <motion.div
                            key={`${activeCategory}-${i}`}
                            variants={itemVariants}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${img.span}`}
                            onClick={() => openLightbox(i)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                                <div className="flex items-center gap-2 mb-1">
                                    <Camera className="w-4 h-4 text-red-500" />
                                    <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">{img.category}</span>
                                </div>
                                <p className="text-white font-bold text-lg">{img.caption}</p>
                            </div>

                            {/* Border */}
                            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                            onClick={closeLightbox}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Prev */}
                        <button
                            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl max-h-[80vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={filteredImages[lightboxIndex]?.src}
                                alt={filteredImages[lightboxIndex]?.alt}
                                className="w-full h-full object-contain rounded-2xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                                <p className="text-white font-bold text-xl">{filteredImages[lightboxIndex]?.caption}</p>
                                <p className="text-gray-400 text-sm mt-1">{filteredImages[lightboxIndex]?.category}</p>
                            </div>
                        </motion.div>

                        {/* Next */}
                        <button
                            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CampusGallery;
