import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  BookOpen, Clock, ArrowUpRight, Search, Tag,
  Sparkles, ChevronRight, User, TrendingUp, Zap,
  Brain, Code, Cpu, Globe, GraduationCap, Lightbulb
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

// ─── Blog Data ────────────────────────────────────────────────
const CATEGORIES = ['All', 'AI & Tech', 'Career', 'Campus Life', 'Research', 'Industry', 'Tutorials'];

const CATEGORY_ICONS = {
  'AI & Tech': Brain,
  'Career': TrendingUp,
  'Campus Life': GraduationCap,
  'Research': Lightbulb,
  'Industry': Globe,
  'Tutorials': Code,
};

// ─── Skeleton Card ────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-[#0a0a12]/80 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
      <div className="h-3 bg-white/5 rounded w-full" />
    </div>
  </div>
);


// ─── Floating Background ──────────────────────────────────────
const FloatingBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{ y: [0, -40, 0], x: [0, 25, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[8%] right-[8%] w-[45%] h-[45%] bg-[#FF0000]/5 rounded-full blur-[130px]"
    />
    <motion.div
      animate={{ y: [0, 35, 0], x: [0, -25, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-[15%] left-[5%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]"
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15]" />
  </div>
);

// ─── 3D Tilt Featured Card ─────────────────────────────────────
const FeaturedBlogCard = ({ blog, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 90 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const CategoryIcon = CATEGORY_ICONS[blog.category] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.18, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative cursor-pointer"
    >
      <div className="absolute -inset-1 bg-gradient-to-br from-[#FF0000] via-pink-600 to-purple-700 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 rounded-3xl" />

      <div
        className="relative bg-[#0a0a12]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#FF0000]/40 transition-all duration-500"
        style={{ transform: 'translateZ(10px)' }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#FF0000] px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <CategoryIcon className="w-3 h-3" />
              {blog.category}
            </span>
          </div>

          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
          </motion.div>

          <div className="absolute bottom-4 right-4">
            <span className="text-xs text-white/70 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#FF0000] transition-colors duration-300 leading-tight">
            {blog.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF0000] to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                {blog.author[0]}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{blog.author}</p>
                <p className="text-gray-600 text-xs">{blog.date}</p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 4, y: -4 }}
              className="bg-white/5 p-2.5 rounded-full group-hover:bg-[#FF0000] transition-all duration-300 border border-white/10 group-hover:border-transparent"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Regular Blog Card ────────────────────────────────────────
const BlogCard = ({ blog, index }) => {
  const CategoryIcon = CATEGORY_ICONS[blog.category] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF0000] to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500 rounded-2xl" />

      <div className="relative bg-[#0a0a12]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group-hover:border-[#FF0000]/30 transition-all duration-300 h-full flex flex-col">
        {/* Image strip */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#FF0000]/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <CategoryIcon className="w-3 h-3" />
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>
            <span className="text-xs text-gray-600">{blog.date}</span>
          </div>

          <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors duration-300 line-clamp-2 leading-snug flex-grow">
            {blog.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF0000] to-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {blog.author[0]}
              </div>
              <span className="text-gray-500 text-xs truncate">{blog.author}</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded-full group-hover:bg-[#FF0000] transition-colors duration-300 flex-shrink-0">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Marquee Tag Strip ────────────────────────────────────────
const TagStrip = () => {
  const tags = [
    'Artificial Intelligence', 'Machine Learning', 'Cloud Computing', 'Python',
    'Data Science', 'System Design', 'Quantum Computing', 'EdTech',
    'Career Growth', 'Hackathon', 'Google Cloud', 'IBM SkillsBuild',
    'Neural Networks', 'Campus Life', 'Research', 'Placements',
  ];

  return (
    <div className="relative overflow-hidden py-6 border-y border-white/5 bg-[#020205]">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-4 text-sm text-gray-500 font-medium"
          >
            <span className="text-[#FF0000]">◆</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Main Blogs Page ──────────────────────────────────────────
const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(data => {
        setAllBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const tags = Array.isArray(blog.tags) ? blog.tags : [];
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = allBlogs.filter((b) => b.featured);
  const regularBlogs = filteredBlogs.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
      <SEO
        title="TIU Blog | AI, Tech, Career & Campus Stories"
        description="Read the latest articles, tutorials, career guides, and campus stories from Techno India University's School of the Future."
      />
      <FloatingBackground />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Giant BG text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-[20vw] font-black text-white/[0.025] tracking-tighter"
          >
            BLOG
          </motion.span>
        </div>

        {/* Animated orb cluster */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          >
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="absolute w-2 h-2 bg-[#FF0000] rounded-full"
                style={{
                  top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, type: 'spring', stiffness: 70 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/20"
            >
              <BookOpen className="w-4 h-4 text-[#FF0000]" />
              Ideas, Stories & Deep Dives
            </motion.span>

            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.05]">
              <motion.span
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                The TIU
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 90 }}
                className="relative inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-orange-400 to-pink-500">
                  Knowledge Hub
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.1 }}
                  className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF0000] to-pink-500 origin-left rounded-full"
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Tutorials, career guides, research insights, and campus stories — written by students, faculty, and industry veterans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {['AI & Tech', 'Career', 'Tutorials'].map((cat, i) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(255,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/5 border border-white/15 text-gray-300 hover:border-[#FF0000]/50 hover:text-white transition-all duration-300"
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2 backdrop-blur-sm">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-2 h-3 bg-[#FF0000] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ TAG STRIP ═══ */}
      <TagStrip />

      {/* ═══ FEATURED ═══ */}
      <section className="py-24 px-4 bg-[#020205] relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-3 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Editor's Pick
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-3">
              Featured{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">
                Reads
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredBlogs.map((blog, i) => (
              <FeaturedBlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALL BLOGS + FILTERS ═══ */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#020205] via-[#06060f] to-[#020205] relative">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[#FF0000] text-sm font-bold tracking-widest uppercase mb-3 px-4 py-2 bg-[#FF0000]/10 rounded-full border border-[#FF0000]/20">
              <Zap className="w-3.5 h-3.5" />
              All Articles
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-3">
              Explore the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-pink-500">
                Archive
              </span>
            </h2>
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-4 mb-12"
          >
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles, topics, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 focus:shadow-[0_0_25px_rgba(255,0,0,0.1)] transition-all"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.35)]'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:border-[#FF0000]/30 hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {(activeCategory === 'All' && !searchQuery ? regularBlogs : filteredBlogs).length > 0 ? (
                (activeCategory === 'All' && !searchQuery ? regularBlogs : filteredBlogs).map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-24">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-gray-500 mb-2">No articles found</p>
                    <p className="text-gray-600">Try a different category or search term.</p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-16 px-4 bg-[#020205] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '120+', label: 'Articles Published', icon: BookOpen },
              { value: '40+', label: 'Expert Contributors', icon: User },
              { value: '15K+', label: 'Monthly Readers', icon: Globe },
              { value: '8', label: 'Topic Categories', icon: Tag },
            ].map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#FF0000]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 border border-white/5 rounded-2xl group-hover:border-[#FF0000]/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#FF0000] mx-auto mb-3 opacity-70" />
                    <p className="text-4xl font-black text-white mb-1">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA ═══ */}
      <section className="py-32 px-4 bg-[#020205] relative overflow-hidden">
        {/* Pulsing orb */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF0000]/15 rounded-full blur-[180px]"
        />

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[#FF0000]/20 rounded-tl-3xl" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-[#FF0000]/20 rounded-br-3xl" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 90 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF0000] to-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)]">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
              Stay{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-orange-400 to-pink-500">
                Ahead
              </span>
              {' '}of the Curve
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Get the freshest articles on AI, tech careers, and campus stories delivered straight to your inbox every week.
            </p>

            {/* Email input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/15 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#FF0000]/50 focus:shadow-[0_0_25px_rgba(255,0,0,0.15)] transition-all backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,0,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#FF0000] to-[#CC0000] text-white px-8 py-4 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,0,0.35)] border border-white/10 whitespace-nowrap"
              >
                Subscribe Free
              </motion.button>
            </motion.div>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:border-white/40 transition-all"
                >
                  Apply to TIU
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:border-white/40 transition-all"
                >
                  View Events
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
