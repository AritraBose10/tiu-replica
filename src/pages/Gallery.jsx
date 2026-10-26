import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
 Camera, X, ChevronLeft, ChevronRight, Play, Pause, Maximize2,
 Search, Shuffle, Images, LayoutGrid, Sparkles, ArrowRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import { galleryImages, GALLERY_CATEGORIES } from '../data/gallery';

const AUTOPLAY_MS = 4500;

// ─── Floating Background ──────────────────────────────────────
const FloatingBackground = () => (
 <div className="fixed inset-0 pointer-events-none overflow-hidden">
 <motion.div
 animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
 className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[#FF0000]/5 rounded-full blur-[120px]"
 />
 <motion.div
 animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
 className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]"
 />
 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
 </div>
);

// ─── Hero photo wall: rows of photos drifting in opposite directions ──
const MarqueeRow = ({ images, reverse, duration }) => (
 <div className="flex overflow-hidden">
 <motion.div
 className="flex gap-4 pr-4 shrink-0"
 animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
 transition={{ duration, repeat: Infinity, ease: 'linear' }}
 >
 {[...images, ...images].map((img, i) => (
 <img
 key={i}
 src={img.src}
 alt=""
 loading="lazy"
 className="h-40 md:h-52 w-auto rounded-2xl object-cover grayscale-[40%]"
 style={{ aspectRatio: `${img.width} / ${img.height}` }}
 />
 ))}
 </motion.div>
 </div>
);

// ─── Responsive column count for the masonry grid ─────────────
const getColumnCount = (width) => (width < 640 ? 1 : width < 1024 ? 2 : width < 1440 ? 3 : 4);

const useColumnCount = () => {
 const [count, setCount] = useState(3);
 useEffect(() => {
 const update = () => setCount(getColumnCount(window.innerWidth));
 update();
 window.addEventListener('resize', update);
 return () => window.removeEventListener('resize', update);
 }, []);
 return count;
};

// Place each photo in the currently shortest column so the columns end level.
const distribute = (items, count) => {
 const columns = Array.from({ length: count }, () => ({ height: 0, items: [] }));
 items.forEach((item, index) => {
 const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
 shortest.items.push({ ...item, index });
 shortest.height += item.height / item.width;
 });
 return columns.map(c => c.items);
};

// ─── Gallery Card ─────────────────────────────────────────────
const GalleryCard = ({ image, onOpen }) => {
 const handleMouseMove = (e) => {
 const rect = e.currentTarget.getBoundingClientRect();
 e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
 e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
 };

 return (
 <motion.button
 layout
 type="button"
 initial={{ opacity: 0, y: 40, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
 onClick={() => onOpen(image.index)}
 onMouseMove={handleMouseMove}
 aria-label={`Open photo: ${image.title}`}
 className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0000]"
 >
 <img
 src={image.src}
 alt={image.alt}
 loading="lazy"
 width={image.width}
 height={image.height}
 className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
 style={{ aspectRatio: `${image.width} / ${image.height}` }}
 />

 {/* Cursor spotlight */}
 <div
 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
 style={{ background: 'radial-gradient(400px circle at var(--x) var(--y), rgba(255,0,0,0.18), transparent 60%)' }}
 />

 {/* Caption */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
 <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-500">
 <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 px-2.5 py-1 rounded-full mb-2 backdrop-blur-sm">
 {image.category}
 </span>
 <h3 className="text-white font-bold text-lg leading-snug">{image.title}</h3>
 </div>

 <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
 <Maximize2 className="w-4 h-4 text-white" />
 </div>
 </motion.button>
 );
};

// ─── Lightbox ─────────────────────────────────────────────────
const slideVariants = {
 enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
 center: { x: 0, opacity: 1, scale: 1 },
 exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
};

const Lightbox = ({ images, index, direction, onClose, onNavigate }) => {
 const [playing, setPlaying] = useState(false);
 const thumbRefs = useRef([]);
 const closeRef = useRef(null);
 const image = images[index];

 const next = useCallback(() => onNavigate((index + 1) % images.length, 1), [index, images.length, onNavigate]);
 const prev = useCallback(() => onNavigate((index - 1 + images.length) % images.length, -1), [index, images.length, onNavigate]);

 useEffect(() => {
 const onKey = (e) => {
 if (e.key === 'Escape') onClose();
 else if (e.key === 'ArrowRight') next();
 else if (e.key === 'ArrowLeft') prev();
 else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p); }
 };
 window.addEventListener('keydown', onKey);
 return () => window.removeEventListener('keydown', onKey);
 }, [next, prev, onClose]);

 // Lock page scroll and move focus into the dialog while it is open
 useEffect(() => {
 const previous = document.body.style.overflow;
 document.body.style.overflow = 'hidden';
 closeRef.current?.focus();
 return () => { document.body.style.overflow = previous; };
 }, []);

 useEffect(() => {
 if (!playing) return;
 const timer = setTimeout(next, AUTOPLAY_MS);
 return () => clearTimeout(timer);
 }, [playing, index, next]);

 useEffect(() => {
 thumbRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
 }, [index]);

 return (
 <motion.div
 role="dialog"
 aria-modal="true"
 aria-label={`${image.title} — photo ${index + 1} of ${images.length}`}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
 >
 {/* Blurred ambient copy of the current photo */}
 <AnimatePresence>
 <motion.img
 key={image.src}
 src={image.src}
 alt=""
 aria-hidden="true"
 initial={{ opacity: 0 }}
 animate={{ opacity: 0.25 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.8 }}
 className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 pointer-events-none"
 />
 </AnimatePresence>

 {/* Top bar */}
 <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
 <div className="flex items-center gap-3 text-sm">
 <span className="font-mono text-white/90">
 {String(index + 1).padStart(2, '0')} <span className="text-white/40">/ {String(images.length).padStart(2, '0')}</span>
 </span>
 <span className="hidden sm:inline text-[10px] font-bold tracking-widest uppercase text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 px-2.5 py-1 rounded-full">
 {image.category}
 </span>
 </div>
 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={() => setPlaying(p => !p)}
 aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
 className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors"
 >
 {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
 </button>
 <button
 ref={closeRef}
 type="button"
 onClick={onClose}
 aria-label="Close gallery viewer"
 className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF0000] border border-white/10 flex items-center justify-center transition-colors"
 >
 <X className="w-5 h-5 text-white" />
 </button>
 </div>
 </div>

 {/* Slideshow progress */}
 <div className="relative z-10 h-0.5 bg-white/5">
 {playing && (
 <motion.div
 key={index}
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
 className="h-full bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left"
 />
 )}
 </div>

 {/* Stage */}
 <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden px-4 md:px-24">
 <AnimatePresence initial={false} custom={direction} mode="popLayout">
 <motion.img
 key={image.src}
 src={image.src}
 alt={image.alt}
 custom={direction}
 variants={slideVariants}
 initial="enter"
 animate="center"
 exit="exit"
 transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
 drag="x"
 dragConstraints={{ left: 0, right: 0 }}
 dragElastic={0.6}
 onDragEnd={(_, info) => {
 if (info.offset.x < -80 || info.velocity.x < -500) next();
 else if (info.offset.x > 80 || info.velocity.x > 500) prev();
 }}
 className="max-h-full max-w-full object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing select-none"
 draggable={false}
 />
 </AnimatePresence>

 <button
 type="button"
 onClick={prev}
 aria-label="Previous photo"
 className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-[#FF0000] border border-white/10 items-center justify-center transition-all hover:scale-110"
 >
 <ChevronLeft className="w-6 h-6 text-white" />
 </button>
 <button
 type="button"
 onClick={next}
 aria-label="Next photo"
 className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-[#FF0000] border border-white/10 items-center justify-center transition-all hover:scale-110"
 >
 <ChevronRight className="w-6 h-6 text-white" />
 </button>
 </div>

 {/* Caption + thumbnails */}
 <div className="relative z-10 px-4 md:px-8 pt-4 pb-6">
 <AnimatePresence mode="wait">
 <motion.div
 key={image.src}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.3 }}
 className="text-center mb-4"
 >
 <h2 className="text-white text-xl md:text-2xl font-bold">{image.title}</h2>
 <p className="text-gray-400 text-sm mt-1">{image.alt}</p>
 </motion.div>
 </AnimatePresence>

 <div className="flex gap-2 overflow-x-auto pb-2 justify-start md:justify-center [scrollbar-width:none]">
 {images.map((img, i) => (
 <button
 key={img.src}
 ref={el => (thumbRefs.current[i] = el)}
 type="button"
 onClick={() => onNavigate(i, i > index ? 1 : -1)}
 aria-label={`Show photo ${i + 1}: ${img.title}`}
 aria-current={i === index}
 className={`relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 ${i === index
 ? 'ring-2 ring-[#FF0000] opacity-100 scale-105'
 : 'opacity-40 hover:opacity-80'
 }`}
 >
 <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
 </button>
 ))}
 </div>
 </div>
 </motion.div>
 );
};

// ═══════════════════════════════════════════
// GALLERY PAGE
// ═══════════════════════════════════════════
const Gallery = () => {
 const [activeCategory, setActiveCategory] = useState('All');
 const [searchQuery, setSearchQuery] = useState('');
 const [order, setOrder] = useState(galleryImages);
 const [lightbox, setLightbox] = useState({ index: null, direction: 0 });
 const columnCount = useColumnCount();

 const categoryCounts = useMemo(() => {
 const counts = { All: galleryImages.length };
 galleryImages.forEach(img => { counts[img.category] = (counts[img.category] || 0) + 1; });
 return counts;
 }, []);

 const filteredImages = useMemo(() => {
 const q = searchQuery.trim().toLowerCase();
 return order.filter(img =>
 (activeCategory === 'All' || img.category === activeCategory) &&
 (!q || `${img.title} ${img.alt} ${img.category}`.toLowerCase().includes(q))
 );
 }, [order, activeCategory, searchQuery]);

 const columns = useMemo(() => distribute(filteredImages, columnCount), [filteredImages, columnCount]);

 const heroRows = useMemo(() => [
 galleryImages.filter((_, i) => i % 3 === 0),
 galleryImages.filter((_, i) => i % 3 === 1),
 galleryImages.filter((_, i) => i % 3 === 2),
 ], []);

 const shuffle = () => {
 const next = [...order];
 for (let i = next.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [next[i], next[j]] = [next[j], next[i]];
 }
 setOrder(next);
 };

 const openLightbox = (index) => setLightbox({ index, direction: 0 });
 const closeLightbox = useCallback(() => setLightbox({ index: null, direction: 0 }), []);
 const navigate = useCallback((index, direction) => setLightbox({ index, direction }), []);

 return (
 <div className="min-h-screen bg-[#020205] text-white overflow-x-clip selection:bg-[#FF0000] selection:text-white">
 <SEO
 title="Campus Gallery | Life at School of the Future | Techno India University"
 description="Explore photos of campus life at Techno India University's School of the Future — hackathons, industry visits with Google and IBM, workshops, cultural events and student milestones."
 />
 <FloatingBackground />

 {/* ═══ HERO ═══ */}
 <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
 {/* Drifting photo wall */}
 <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 opacity-40 -rotate-6 scale-125" aria-hidden="true">
 <MarqueeRow images={heroRows[0]} duration={60} />
 <MarqueeRow images={heroRows[1]} duration={75} reverse />
 <MarqueeRow images={heroRows[2]} duration={65} />
 </div>
 <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#020205] via-[#020205]/80 to-[#020205]/60" />
 <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020205_75%)]" />

 {/* Large bg text */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 <span className="text-[18vw] font-black text-white/[0.03] tracking-tighter select-none">
 GALLERY
 </span>
 </div>

 {/* Content */}
 <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-32 pb-20">
 <motion.div
 initial={{ opacity: 0, y: 60 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, type: "spring" }}
 >
 <motion.span
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.3 }}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/20"
 >
 <Camera className="w-4 h-4 text-[#FF0000]" />
 Campus Gallery
 </motion.span>

 <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
 <motion.span
 initial={{ opacity: 0, x: -50 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.4 }}
 >
 Life in
 </motion.span>{' '}
 <motion.span
 initial={{ opacity: 0, scale: 0.5 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
 className="relative inline-block"
 >
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-pink-500 to-[#FF0000]">
 Frames
 </span>
 <motion.div
 initial={{ scaleX: 0 }}
 animate={{ scaleX: 1 }}
 transition={{ duration: 0.8, delay: 1 }}
 className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left rounded-full"
 />
 </motion.span>
 </h1>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.8 }}
 className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
 >
 Hackathons, industry visits, masterclasses and late-night code sprints. Here’s what learning at the School of the Future really looks like.
 </motion.p>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 1 }}
 className="flex items-center justify-center gap-3 md:gap-4"
 >
 {[
 { icon: Images, value: galleryImages.length, label: 'Moments' },
 { icon: LayoutGrid, value: GALLERY_CATEGORIES.length, label: 'Categories' },
 ].map(({ icon: Icon, value, label }) => (
 <div key={label} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-5 py-3">
 <Icon className="w-5 h-5 text-[#FF0000] shrink-0" />
 <span className="text-2xl font-black">{value}</span>
 <span className="text-sm text-gray-400">{label}</span>
 </div>
 ))}
 </motion.div>
 </motion.div>
 </div>

 {/* Scroll indicator */}
 <motion.div
 animate={{ y: [0, 12, 0] }}
 transition={{ repeat: Infinity, duration: 1.5 }}
 className="absolute bottom-8 left-1/2 -translate-x-1/2"
 >
 <div className="w-7 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 backdrop-blur-sm">
 <motion.div
 animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
 transition={{ repeat: Infinity, duration: 1.5 }}
 className="w-2 h-3 bg-[#FF0000] rounded-full"
 />
 </div>
 </motion.div>
 </section>

 {/* ═══ GALLERY GRID ═══ */}
 <section className="relative pb-24 px-4">
 {/* Filter bar */}
 <div className="sticky top-[5.25rem] z-30 -mx-4 px-4 py-4 mb-10">
 <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-3 bg-[#0a0a12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
 <div className="flex gap-1 overflow-x-auto flex-1 [scrollbar-width:none]">
 {['All', ...GALLERY_CATEGORIES].map(cat => (
 <button
 key={cat}
 type="button"
 onClick={() => setActiveCategory(cat)}
 aria-pressed={activeCategory === cat}
 className={`relative shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeCategory === cat ? 'text-white' : 'text-gray-400 hover:text-white'}`}
 >
 {activeCategory === cat && (
 <motion.span
 layoutId="gallery-filter-pill"
 className="absolute inset-0 bg-[#FF0000] rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.35)]"
 transition={{ type: 'spring', stiffness: 400, damping: 32 }}
 />
 )}
 <span className="relative z-10 flex items-center gap-1.5">
 {cat}
 <span className={`text-[11px] ${activeCategory === cat ? 'text-white/80' : 'text-gray-600'}`}>{categoryCounts[cat]}</span>
 </span>
 </button>
 ))}
 </div>

 <div className="flex gap-2">
 <div className="relative flex-1 lg:w-56">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
 <input
 type="search"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search photos…"
 aria-label="Search photos"
 className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 transition-colors"
 />
 </div>
 <motion.button
 type="button"
 onClick={shuffle}
 whileTap={{ rotate: 180, scale: 0.9 }}
 aria-label="Shuffle photos"
 title="Shuffle"
 className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF0000]/50 hover:text-[#FF0000] flex items-center justify-center text-gray-300 transition-colors"
 >
 <Shuffle className="w-4 h-4" />
 </motion.button>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto">
 {filteredImages.length > 0 ? (
 <div className="flex gap-4 md:gap-5 items-start">
 {columns.map((column, c) => (
 <div key={c} className="flex-1 min-w-0 flex flex-col gap-4 md:gap-5">
 <AnimatePresence mode="popLayout">
 {column.map(image => (
 <GalleryCard key={image.src} image={image} onOpen={openLightbox} />
 ))}
 </AnimatePresence>
 </div>
 ))}
 </div>
 ) : (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center py-24"
 >
 <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
 <p className="text-gray-400 text-lg mb-4">No photos match “{searchQuery}”.</p>
 <button
 type="button"
 onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
 className="text-[#FF0000] font-semibold hover:underline"
 >
 Clear filters
 </button>
 </motion.div>
 )}
 </div>
 </section>

 {/* ═══ CTA ═══ */}
 <section className="relative py-24 px-4">
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.7 }}
 className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF0000]/15 via-[#0a0a12] to-blue-600/10 p-10 md:p-16 text-center"
 >
 <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-[#FF0000]/20 rounded-full blur-[100px] pointer-events-none" />
 <span className="relative inline-flex items-center gap-2 text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">
 <Sparkles className="w-3.5 h-3.5" />
 Your story starts here
 </span>
 <h2 className="relative text-3xl md:text-5xl font-black mb-4">
 Be in the{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">next frame</span>
 </h2>
 <p className="relative text-gray-400 text-lg max-w-xl mx-auto mb-8">
 Join a campus where every week brings a new hackathon, masterclass or industry visit.
 </p>
 <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 to="/apply"
 className="group inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,0,0,0.35)] transition-all hover:scale-105"
 >
 Apply Now
 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
 </Link>
 <Link
 to="/events"
 className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-full transition-colors"
 >
 See Upcoming Events
 </Link>
 </div>
 </motion.div>
 </section>

 {/* ═══ LIGHTBOX ═══ */}
 <AnimatePresence>
 {lightbox.index !== null && (
 <Lightbox
 images={filteredImages}
 index={lightbox.index}
 direction={lightbox.direction}
 onClose={closeLightbox}
 onNavigate={navigate}
 />
 )}
 </AnimatePresence>
 </div>
 );
};

export default Gallery;
