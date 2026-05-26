import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, GraduationCap, Users, Award,
  BookOpen, Briefcase, Target, Zap, ChevronDown, Phone,
  MapPin, Cpu, Brain, CloudLightning, Check, X,
  TrendingUp, Shield, Layers, Star, CheckCircle2
} from 'lucide-react';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const MotionLink = motion.create(Link);

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
const CursorGlow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden lg:block"
      style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)',
        borderRadius: '50%' }}
    />
  );
};

// ─── Marquee Announcement Bar ─────────────────────────────────────────────────
const AnnouncementBar = () => {
  const items = ['B.Tech Admissions 2026 Now Open', 'Collaboration with IIT KGP', 'Project Based Learning', 'AI · ML · Data Science · Cloud Computing', 'Limited Seats Available', 'School of the Future · Techno India University'];
  return (
    <div className="relative z-50 bg-amber-400 overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-black text-xs font-black tracking-wider uppercase flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Diagonal Divider ─────────────────────────────────────────────────────────
const DiagDivider = ({ flip = false }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ lineHeight: 0 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]" fill="none">
      <polygon points="0,0 1440,60 1440,60 0,60" fill="rgba(255,255,255,0.015)" />
    </svg>
  </div>
);

// ─── Big Ghost Number ─────────────────────────────────────────────────────────
const GhostNum = ({ n }) => (
  <span className="absolute -top-6 md:-top-10 left-0 text-[100px] md:text-[160px] font-black leading-none select-none pointer-events-none"
    style={{ WebkitTextStroke: '1px rgba(251,191,36,0.08)', color: 'transparent', zIndex: 0 }}>
    {n}
  </span>
);

// ─── Inline animated counter ──────────────────────────────────────────────────
const Counter = ({ target, suffix = '', duration = 1.8 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / (duration * 1000), 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── Lead Form ────────────────────────────────────────────────────────────────
const LeadForm = ({ compact = false }) => {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', course: '', board: '', city: '', counselling: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false); setSubmitted(true);
  };
  const inp = `w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600
    focus:outline-none focus:border-amber-400/50 focus:bg-black/60 transition-all duration-200`;

  if (submitted) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-16 h-16 bg-amber-400/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/30">
        <Check className="w-8 h-8 text-amber-400" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
      <p className="text-gray-400 text-sm">Our admission counsellor will connect with you shortly.</p>
      <p className="text-amber-400 text-sm font-bold mt-3">Call us: 08062642222</p>
    </motion.div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <input required name="name" placeholder="Full Name" value={form.name} onChange={handle} className={inp} />
      <input required name="mobile" placeholder="Mobile Number" type="tel" value={form.mobile} onChange={handle} className={inp} />
      {!compact && <input name="email" placeholder="Email ID" type="email" value={form.email} onChange={handle} className={inp} />}
      <select required name="course" value={form.course} onChange={handle} className={`${inp} ${!form.course ? 'text-gray-600' : 'text-white'}`}>
        <option value="" disabled>Preferred Course</option>
        <option>B.Tech CSE</option>
        <option>B.Tech CSE in AI and ML</option>
        <option>B.Tech CSE in Data Science</option>
        <option>B.Tech CSE in Cloud Computing</option>
      </select>
      {!compact && <>
        <select name="board" value={form.board} onChange={handle} className={`${inp} ${!form.board ? 'text-gray-600' : 'text-white'}`}>
          <option value="" disabled>Class 12 Board</option>
          <option>CBSE</option><option>ICSE</option><option>West Bengal Board</option><option>Other State Board</option>
        </select>
        <input name="city" placeholder="City" value={form.city} onChange={handle} className={inp} />
        <select name="counselling" value={form.counselling} onChange={handle} className={`${inp} ${!form.counselling ? 'text-gray-600' : 'text-white'}`}>
          <option value="" disabled>Counselling Preference</option>
          <option>Online</option><option>In Person (Campus Visit)</option><option>Phone Call</option>
        </select>
      </>}
      <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className="w-full bg-amber-400 text-black font-black py-3.5 rounded-lg hover:bg-amber-300 transition-colors
          flex items-center justify-center gap-2 disabled:opacity-70 tracking-wide text-sm">
        {loading
          ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
          : <><span>SUBMIT APPLICATION</span><ArrowRight className="w-4 h-4" /></>}
      </motion.button>
      <p className="text-gray-700 text-xs text-center">Limited seats. Early applicants get priority counselling.</p>
    </form>
  );
};

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FAQItem = ({ faq, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
      className="border-b border-white/6 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group">
        <span className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-amber-400 transition-colors">
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-amber-400/40 transition-colors">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden text-gray-400 text-sm leading-relaxed pb-6">
            {faq.a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const courses = [
  { n: '01', icon: Cpu, title: 'B.Tech CSE', label: 'Core', accent: '#FF0000',
    desc: 'Strong foundation in computer science — programming, software development, algorithms, databases, OS, networks and emerging technologies.',
    for: 'Software development · IT careers · Product development · Higher studies' },
  { n: '02', icon: Brain, title: 'B.Tech CSE in AI and ML', label: 'High Demand', accent: '#f59e0b',
    desc: 'Artificial Intelligence and Machine Learning — intelligent systems, automation, data driven applications, next generation technology careers.',
    for: 'AI roles · Machine learning · Automation · Robotics · Future technology' },
  { n: '03', icon: TrendingUp, title: 'B.Tech CSE in Data Science', label: 'Fastest Growing', accent: '#3b82f6',
    desc: 'Data analytics, big data, business intelligence, data visualization, statistics and data driven decision making.',
    for: 'Data analytics · Business intelligence · Insights · Research · Decision science' },
  { n: '04', icon: CloudLightning, title: 'B.Tech CSE in Cloud Computing', label: 'Enterprise', accent: '#06b6d4',
    desc: 'Cloud technology, scalable systems, cloud infrastructure, enterprise platforms and modern digital transformation.',
    for: 'Cloud platforms · DevOps · Cloud architecture · Enterprise technology' },
];

const iitBenefits = [
  { n: '01', icon: BookOpen, title: 'Academic Collaboration with IIT KGP', desc: 'A strong academic value addition to the B.Tech learning journey through the established collaboration.' },
  { n: '02', icon: Users, title: 'Sessions by IIT KGP Faculty', desc: 'Students get access to academic sessions as part of the program structure, taught by IIT KGP faculty.' },
  { n: '03', icon: Target, title: 'Project Based Evaluation', desc: 'Students move beyond textbook learning through practical and outcome focused academic evaluation.' },
  { n: '04', icon: Award, title: 'Certificate Upon Completion', desc: 'Students can receive a certificate linked to the collaborative course pathway, subject to successful completion.' },
  { n: '05', icon: Briefcase, title: 'Credentials That Stand Out', desc: 'Students build a stronger profile for internships, placements, recruiter interactions and future technology careers.' },
  { n: '06', icon: Zap, title: 'Future Ready Skill Stack', desc: 'Exposure to real-world tools, emerging technologies, and industry-grade learning frameworks.' },
];

const comparisonLeft = ['Degree focused', 'Generic academic exposure', 'Mostly theory based', 'Common learning path', 'Limited profile building', 'Late placement preparation', 'Less differentiation'];
const comparisonRight = ['Degree + skill focused', 'Collaboration with IIT KGP', 'Project based learning', 'AI focused specializations', 'Certification driven exposure', 'Career readiness from Day 1', 'Stronger career positioning'];

const faqs = [
  { q: 'Which B.Tech courses are available for Admissions 2026?', a: 'B.Tech CSE, B.Tech CSE in AI and ML, B.Tech CSE in Data Science and B.Tech CSE in Cloud Computing.' },
  { q: 'What is the IIT KGP collaboration?', a: 'Students receive academic benefits including academic exposure, project based evaluation and certification driven learning under the collaboration with IIT KGP, as per program terms.' },
  { q: 'Will students receive a certificate?', a: 'Students can receive a certificate upon successful completion, as per program terms.' },
  { q: 'Is this suitable for students interested in AI careers?', a: 'Yes. The programs are designed for students interested in Computer Science, AI and ML, Data Science, Cloud Computing and future technology careers.' },
  { q: 'Is this useful for placements and internships?', a: 'The programs are designed to help students build stronger academic exposure, project experience and career ready credentials that support internship and placement readiness.' },
  { q: 'Where is the campus located?', a: 'Techno India University is located at EM 4, Sector V, Salt Lake, Kolkata.' },
  { q: 'How can I apply?', a: 'Fill the enquiry form on this page or call 08062642222 for admission counselling.' },
];

const pageSchema = {
  '@context': 'https://schema.org', '@type': 'Course',
  name: 'B.Tech CSE Admissions 2026 with IIT KGP Collaboration',
  description: 'Future ready B.Tech CSE programs at Techno India University under its collaboration with IIT KGP.',
  provider: { '@type': 'CollegeOrUniversity', name: 'Techno India University', url: 'https://www.technoindiauniversity.ai' },
};

// ═════════════════════════════════════════════════════════════════════════════
const IITKGPLanding = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-[#09080a] text-white overflow-x-hidden selection:bg-amber-400 selection:text-black">
      <SEO
        title="B.Tech Admissions 2026 with IIT KGP Collaboration | Techno India University"
        description="Apply for B.Tech CSE, B.Tech CSE in AI and ML, Data Science and Cloud Computing at Techno India University, School of the Future under its collaboration with IIT KGP. Admissions 2026 open."
      />
      <SchemaInjector schema={pageSchema} />
      <CursorGlow />

      {/* ── ANNOUNCEMENT BAR ──────────────────────────────────────────────── */}
      <AnnouncementBar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">

        {/* Parallax grid */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none"
          aria-hidden>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
          {/* Diagonal amber slash */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(115deg, transparent 58%, rgba(251,191,36,0.04) 58.5%, rgba(251,191,36,0.04) 100%)'
          }} />
        </motion.div>

        {/* Glow blobs */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] bg-amber-500 rounded-full blur-[200px] pointer-events-none" />
        <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[55%] bg-[#FF0000]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-28 md:pt-24 lg:pt-20 pb-6">
          <div className="w-full grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-start lg:items-center">

          {/* ── LEFT ── */}
          <div>
            {/* IIT badge */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 bg-amber-400/12 border border-amber-400/30 px-4 py-2 rounded-full mb-5">
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 text-xs font-black tracking-widest uppercase">Collaboration with IIT KGP</span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative overflow-hidden">
              {/* Ghost backdrop text — clipped to parent */}
              <span className="absolute top-0 -left-1 text-[70px] sm:text-[100px] md:text-[130px] font-black leading-none select-none pointer-events-none"
                style={{ WebkitTextStroke: '1.5px rgba(251,191,36,0.06)', color: 'transparent' }}>
                IIT KGP
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight relative z-10 pt-2">
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
                  className="block text-white">Dreaming</motion.span>
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
                  className="block text-white">of <span className="relative inline-block">
                    <span className="text-transparent" style={{ WebkitTextStroke: '2px #f59e0b' }}>IIT?</span>
                    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-1 left-0 right-0 h-1 bg-amber-400 origin-left" />
                  </span>
                </motion.span>
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-orange-500 to-amber-400">
                  We Have Your Path.
                </motion.span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mt-5 mb-6 max-w-xl">
              Admissions 2026 are now open at Techno India University, School of the Future — future ready B.Tech CSE programs under its collaboration with IIT KGP, with project based learning and certification driven academic exposure.
            </motion.p>

            {/* Course pills */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-6">
              {['B.Tech CSE', 'AI & ML', 'Data Science', 'Cloud Computing'].map((c, i) => (
                <span key={i} className="text-xs font-bold px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 tracking-wide">
                  {c}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3">
              <MotionLink to="/apply" whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(255,0,0,0.4)' }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,0,0.25)] transition-shadow">
                Apply Now <ArrowRight className="w-4 h-4" />
              </MotionLink>
              <a href="tel:08062642222"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold border border-white/12 text-gray-300 hover:border-amber-400/40 hover:text-amber-400 transition-colors text-sm">
                <Phone className="w-4 h-4" /> 08062642222
              </a>
            </motion.div>

            {/* Disclaimer */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="text-gray-700 text-xs mt-5">
              Benefits under the collaboration with IIT KGP are applicable as per program terms.
            </motion.p>
          </div>

          {/* ── RIGHT — Form ── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full">
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs text-amber-400 font-black tracking-widest uppercase mb-1">Admissions 2026</p>
                  <h2 className="text-lg font-black text-white leading-snug">Apply for B.Tech<br />Admissions 2026</h2>
                  <p className="text-gray-500 text-xs mt-1">Counsellor will connect with you.</p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <LeadForm />
            </div>
          </motion.div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="relative z-10 border-t border-white/6 bg-black/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-0">
            {[
              { val: 4, suf: '', label: 'Specializations' },
              { val: 15000, suf: '+', label: 'Students' },
              { val: 200, suf: '+', label: 'Hiring Partners' },
              { val: 2026, suf: '', label: 'Admissions Open' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}
                className={`text-center ${i > 0 ? 'border-l border-white/5' : ''}`}>
                <div className="text-2xl md:text-3xl font-black text-amber-400">
                  <Counter target={s.val} suffix={s.suf} />
                </div>
                <div className="text-xs text-gray-600 mt-1 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IIT DREAM ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: 'linear-gradient(180deg, #09080a 0%, #0d0a07 50%, #09080a 100%)' }}>
        <DiagDivider />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 py-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-400/8 border border-amber-400/20 px-5 py-2 rounded-full mb-8">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase">IIT Dreams Don't End with Entrance Results</span>
          </motion.div>

          {/* Big pull-quote style */}
          <div className="relative">
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
              Not every student gets into IIT.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">But every serious aspirant</span>
              <span className="text-white"> deserves </span>
              <span className="relative inline-block">
                <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,0,0,0.6)' }}>more.</span>
              </span>
            </motion.p>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed mt-8 max-w-3xl mx-auto">
            At Techno India University, School of the Future, students pursue future ready B.Tech CSE programs under its collaboration with IIT KGP — with project based learning and certification driven academic exposure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="mt-10 inline-flex items-center gap-3 bg-[#FF0000]/10 border border-[#FF0000]/25 px-7 py-3.5 rounded-full cursor-default">
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#FF0000]" />
            <span className="text-[#FF0000] font-black tracking-wider text-sm uppercase">Apply Early — Seats Are Limited</span>
          </motion.div>
        </div>
        <DiagDivider flip />
      </section>

      {/* ── COURSES — Magazine Row Layout ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-4 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="relative">
              <GhostNum n="02" />
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Programs</p>
              <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
                Choose Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">Future Ready Program</span>
              </h2>
            </div>
            <MotionLink to="/apply" whileHover={{ x: 4 }} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
              View All Courses <ArrowUpRight className="w-4 h-4 group-hover:text-[#FF0000] transition-colors" />
            </MotionLink>
          </div>

          {/* Magazine-style rows */}
          <div className="space-y-px">
            {courses.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.025)' }}
                  className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-8 px-6 md:px-8 rounded-2xl border border-transparent hover:border-white/8 transition-all duration-300 cursor-default"
                >
                  {/* Number */}
                  <span className="text-6xl md:text-7xl font-black leading-none flex-shrink-0 tabular-nums"
                    style={{ color: `${c.accent}15`, WebkitTextStroke: `1px ${c.accent}30` }}>
                    {c.n}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border"
                    style={{ backgroundColor: `${c.accent}12`, borderColor: `${c.accent}25` }}>
                    <Icon className="w-6 h-6" style={{ color: c.accent }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-black text-white">{c.title}</h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full border"
                        style={{ color: c.accent, borderColor: `${c.accent}30`, backgroundColor: `${c.accent}10` }}>
                        {c.label}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">{c.desc}</p>
                    <p className="text-xs text-gray-600 font-medium">{c.for}</p>
                  </div>

                  {/* CTA */}
                  <MotionLink to="/apply" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm transition-all duration-200"
                    style={{ borderColor: `${c.accent}30`, color: c.accent }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${c.accent}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    Apply <ArrowRight className="w-4 h-4" />
                  </MotionLink>

                  {/* Hover left accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: c.accent }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IIT KGP BENEFITS — Numbered list ──────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0a07 0%, #09080a 50%, #080a0d 100%)' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
            {/* Left header — sticky feel */}
            <div className="lg:sticky lg:top-32">
              <div className="relative">
                <GhostNum n="03" />
                <p className="text-xs text-amber-400 font-black tracking-widest uppercase mb-4 relative z-10">What You Get</p>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight relative z-10">
                  The IIT KGP<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                    Collaboration Benefits
                  </span>
                </h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Students enrolling in selected B.Tech programs at Techno India University, School of the Future can receive academic benefits linked to the collaboration with IIT KGP.
              </p>

              {/* Decorative IIT KGP badge */}
              <div className="inline-block p-5 rounded-2xl border border-amber-400/20 bg-amber-400/5">
                <p className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">Collaboration with</p>
                <p className="text-white text-2xl font-black">IIT KGP</p>
                <p className="text-gray-500 text-xs mt-1">Indian Institute of Technology · Kharagpur</p>
                <p className="text-gray-700 text-xs mt-3">Benefits applicable as per program terms.</p>
              </div>
            </div>

            {/* Right — numbered list */}
            <div className="space-y-0">
              {iitBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group relative flex gap-5 py-7 border-b border-white/6 last:border-0 hover:pl-3 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-400/8 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/15 transition-colors">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-400/40 text-xs font-black">{b.n}</span>
                        <h3 className="text-white font-bold text-base">{b.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY + GOOGLE CLOUD — Two-tone split ───────────────────────────── */}
      <section className="py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

          {/* Why This Matters */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#FF0000]/6 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-4">Why It Matters</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                A Regular B.Tech May Not Be Enough Anymore
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The engineering job market is changing fast. Recruiters today look beyond a basic degree — they look for strong fundamentals, AI exposure, practical project experience, specialization knowledge and career ready confidence.
              </p>
              <div className="space-y-2.5">
                {['Future focused B.Tech pathway via IIT KGP', 'AI focused specializations built for the industry', 'Project based learning over theory', 'Career readiness credentials that stand out'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF0000] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Google Cloud */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="relative p-8 md:p-10 rounded-3xl border border-blue-500/15 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(6,182,212,0.04) 100%)' }}>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/8 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs text-blue-400 font-black tracking-widest uppercase mb-4">More Than One Advantage</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                Also: Google Cloud Collaborated Learning
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Along with the collaboration with IIT KGP, students at the School of the Future also get access to Google Cloud collaborated learning exposure — cloud, AI, digital tools and industry aligned learning.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Cloud Computing', 'AI Exposure', 'Digital Tools', 'Industry Aligned'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Check className="w-3 h-3" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON — Two Large Panels ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #09080a 0%, #0b0809 100%)' }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="relative inline-block">
              <GhostNum n="04" />
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">The Difference</p>
              <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
                Regular B.Tech<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">vs. Future Ready Pathway</span>
              </h2>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4 md:gap-0 md:divide-x divide-white/8">

            {/* Regular */}
            <div className="p-8 md:p-10 rounded-3xl md:rounded-r-none md:rounded-l-3xl border border-white/6 bg-white/[0.015]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="text-gray-400 font-black text-lg">Regular B.Tech</h3>
              </div>
              <div className="space-y-4">
                {comparisonLeft.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3">
                    <X className="w-4 h-4 text-gray-700 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* School of the Future */}
            <div className="relative p-8 md:p-10 rounded-3xl md:rounded-l-none md:rounded-r-3xl border border-[#FF0000]/20 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.05) 0%, rgba(245,158,11,0.03) 100%)' }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF0000]/6 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#FF0000]/15 border border-[#FF0000]/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#FF0000]" />
                  </div>
                  <h3 className="text-white font-black text-lg">School of the Future</h3>
                </div>
                <div className="space-y-4">
                  {comparisonRight.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#FF0000] flex-shrink-0" />
                      <span className="text-gray-200 text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mt-10">
            <p className="text-gray-600 text-sm mb-5">Limited Seats Available · Students who apply early get better access to counselling, course selection and seat booking support.</p>
            <MotionLink to="/apply" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-10 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(255,0,0,0.2)] hover:shadow-[0_0_55px_rgba(255,0,0,0.35)] transition-shadow">
              Apply Now Before Seats Fill <ArrowRight className="w-4 h-4" />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 relative">
            <GhostNum n="05" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Frequently Asked</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
              Got Questions?
            </h2>
          </div>
          <div>
            {faqs.map((f, i) => <FAQItem key={i} faq={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.06) 0%, transparent 50%, rgba(245,158,11,0.04) 100%)' }} />
        {/* Corner bracket decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-400/20 rounded-tl-xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-amber-400/20 rounded-tr-xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-amber-400/20 rounded-bl-xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-400/20 rounded-br-xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-400/25 px-4 py-2 rounded-full mb-7">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-xs font-black tracking-widest uppercase">Collaboration with IIT KGP</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Your B.Tech Journey Can Carry the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF0000]">IIT KGP Advantage</span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                Do not wait until seats are full. Apply now for future ready B.Tech programs at Techno India University, School of the Future under its collaboration with IIT KGP.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 mb-10">
                <MotionLink to="/apply" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(255,0,0,0.25)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition-shadow">
                  Apply for Admissions 2026 <ArrowRight className="w-4 h-4" />
                </MotionLink>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone className="w-4 h-4 text-[#FF0000]" />
                  <span>Call: <a href="tel:08062642222" className="text-white font-bold hover:text-amber-400 transition-colors">08062642222</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin className="w-4 h-4 text-[#FF0000]" />
                  <span>EM 4, Sector V, Salt Lake, Kolkata</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Layers className="w-4 h-4 text-[#FF0000]" />
                  <a href="https://www.technoindiauniversity.ai" target="_blank" rel="noopener noreferrer"
                    className="text-white font-bold hover:text-amber-400 transition-colors">www.technoindiauniversity.ai</a>
                </div>
              </motion.div>
              <p className="text-gray-700 text-xs mt-4">Benefits under the collaboration with IIT KGP are applicable as per program terms.</p>
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg" />
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8">
                <h3 className="text-lg font-black text-white mb-1">Apply for B.Tech Admissions 2026</h3>
                <p className="text-gray-500 text-sm mb-6">Our counsellor will reach out to you.</p>
                <LeadForm compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IITKGPLanding;
