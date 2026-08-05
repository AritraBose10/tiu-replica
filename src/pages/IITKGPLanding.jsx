import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, GraduationCap, Award,
  ChevronDown, Phone,
  MapPin, Cpu, Brain, CloudLightning, Check, X,
  TrendingUp, Layers, CheckCircle2, IdCard, Mail, ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';
import sofLogo from '../assets/logo1.png';
import ocnLockup from '../assets/iit-kharagpur-ocn-logo-horizontal-transparent.png';

const MotionLink = motion.create(Link);

// ─── Mandatory OCN disclaimer (verbatim — PS/OCN/BRAND/2026-01 §4.1) ──────────
const OCN_DISCLAIMER = "IIT Kharagpur provides specific micro-specialisation course(s) to students of this programme through its Outreach Course Network. The degree/programme is awarded solely by Techno India University. IIT Kharagpur does not award, co-award, or endorse any degree of Techno India University. All IIT Kharagpur credentials (OCN Student Identity Card, institutional email ID, OCN Micro-Specialisation Certificate, and OCN Alumni Status) are subject to IIT Kharagpur's policies and conferred at its sole discretion.";

// ─── Reusable disclaimer panel (legible, same field of view as any OCN mention)
const DisclaimerPanel = ({ className = '' }) => (
  <div className={`rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 ${className}`}>
    <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-2">Important — please read</p>
    <p className="text-gray-300 text-[13px] leading-relaxed">{OCN_DISCLAIMER}</p>
  </div>
);

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
        background: 'radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)',
        borderRadius: '50%' }}
    />
  );
};

// ─── Marquee Announcement Bar ─────────────────────────────────────────────────
const BAR_HEIGHT = 36; // px — must match h-[36px] below

const AnnouncementBar = () => {
  // Partner programme leads; IIT Kharagpur OCN is referenced only as a
  // micro-specialisation contributor (never as the dominant headline).
  const items = ['Final Admission Call 2026', 'B.Tech CSE · Techno India University', '40 Years of Legacy', 'Includes IIT Kharagpur OCN Micro-Specialisation', 'Limited Seats Available', 'Counselling Helpline · 08062642222'];

  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-top', `${BAR_HEIGHT + 8}px`);
    return () => document.documentElement.style.setProperty('--navbar-top', '1rem');
  }, []);

  return (
    <div className="sticky top-0 z-[60] bg-[#FF0000] overflow-hidden" style={{ height: BAR_HEIGHT }}>
      <div className="flex h-full items-center animate-marquee whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-white text-[11px] font-black tracking-wider uppercase flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Big Ghost Number ─────────────────────────────────────────────────────────
const GhostNum = ({ n }) => (
  <span className="absolute -top-6 md:-top-10 left-0 text-[100px] md:text-[160px] font-black leading-none select-none pointer-events-none"
    style={{ WebkitTextStroke: '1px rgba(255,0,0,0.12)', color: 'transparent', zIndex: 0 }}>
    {n}
  </span>
);

// ─── ExtraEdge Form Widget ────────────────────────────────────────────────────
const EEFormWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(520);
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EE_WIDGET_LOADED') setIsLoading(false);
      if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') setIframeHeight(event.data.height);
    };
    window.addEventListener('message', handleMessage);

    const widgetCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
</style>
</head>
<body>
<script>
(function(){var s=${JSON.stringify(window.location.search)};if(s)try{history.replaceState(null,'',s);}catch(_){}})();
<\/script>
<div class="ee-form-widget" id="ee-form-8"></div>
<script>
function reportHeight(){var h=document.body.scrollHeight;window.parent.postMessage({type:'EE_WIDGET_HEIGHT',height:h},'*');}
window.addEventListener("DOMContentLoaded",function(){
window.ee_form_widget_baseurl="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
if(!document.getElementById("__formWidgetCss")){var e=document.createElement("link");e.id="__formWidgetCss";e.rel="stylesheet";e.href=window.ee_form_widget_baseurl+"css/stylesheet.min.css";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e);}
var t=document.createElement("script");t.type="text/javascript";
t.onload=async function(){var w=new eeFormWidget();await w.init("softiu","form-8","ee-form-8");window.parent.postMessage({type:'EE_WIDGET_LOADED'},'*');setTimeout(reportHeight,300);setTimeout(reportHeight,1000);};
t.src=window.ee_form_widget_baseurl+"js/eeFormWidget.min.js";document.getElementsByTagName("head")[0].appendChild(t);});
if(window.ResizeObserver){new ResizeObserver(reportHeight).observe(document.documentElement);}
<\/script>
</body>
</html>`;

    try{var _qs=window.location.search,_p=new URLSearchParams(_qs);if(["utm_source","utm_medium","utm_campaign","utm_term","utm_content","channel"].some(function(k){return _p.has(k)})){var _url=window.location.href;if(_p.has("channel")&&!_p.has("utm_source")){var _u=new URL(_url);_u.searchParams.set("utm_source",_p.get("channel"));_url=_u.href;}localStorage.setItem("stored_url",JSON.stringify({url:_url,expiry:Date.now()+2592000000}));}}catch(_e){}
    const blob = new Blob([widgetCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);

    return () => {
      window.removeEventListener('message', handleMessage);
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl" style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500" />
        </div>
      )}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          title="Admissions Enquiry Form"
          className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: 'transparent', height: iframeHeight }}
        />
      )}
    </div>
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
        <span className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-[#FF0000] transition-colors">
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#FF0000]/30 transition-colors">
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
// The Partner's own degree programmes — awarded solely by Techno India University.
const degreePrograms = [
  { n: '01', icon: Cpu, title: 'B.Tech CSE', label: 'Core', accent: '#FF0000',
    desc: 'A strong foundation in computer science: programming, software development, algorithms, databases, operating systems, networks and emerging technologies.',
    for: 'Software development · IT careers · Product development · Higher studies' },
  { n: '02', icon: Brain, title: 'B.Tech CSE in AI & ML', label: 'High Demand', accent: '#FF4444',
    desc: 'Artificial Intelligence and Machine Learning, intelligent systems, automation and data-driven applications for next-generation technology careers.',
    for: 'AI roles · Machine learning · Automation · Robotics · Future technology' },
  { n: '03', icon: TrendingUp, title: 'B.Tech CSE in Data Science', label: 'Fastest Growing', accent: '#3b82f6',
    desc: 'Data analytics, big data, business intelligence, data visualization, statistics and data-driven decision making.',
    for: 'Data analytics · Business intelligence · Insights · Research · Decision science' },
  { n: '04', icon: CloudLightning, title: 'B.Tech CSE in Cloud Computing', label: 'Enterprise', accent: '#06b6d4',
    desc: 'Cloud technology, scalable systems, cloud infrastructure, enterprise platforms and modern digital transformation.',
    for: 'Cloud platforms · DevOps · Cloud architecture · Enterprise technology' },
];

// ELIGIBLE STUDENT BENEFITS — the four OCN credentials, worded exactly as the
// approved poster / §3 credential table. Benefits at IIT Kharagpur's sole discretion.
const ocnCredentials = [
  { icon: Award, title: 'IIT KGP OCN Micro-specialisation certificate',
    desc: 'upon successful completion' },
  { icon: IdCard, title: 'IIT KGP OCN student identity card',
    desc: 'for the program duration' },
  { icon: Mail, title: 'IIT KGP OCN email ID',
    desc: 'for the program duration' },
  { icon: ShieldCheck, title: 'IIT KGP OCN alumni status',
    desc: 'upon successful completion' },
];

const comparisonLeft = ['Degree focused only', 'Generic academic exposure', 'Mostly theory based', 'Common learning path', 'Limited profile building', 'Late placement preparation', 'Less differentiation'];
const comparisonRight = ['Degree + micro-specialisation', 'IIT Kharagpur OCN Micro-Specialisation Certificate', 'Project-based learning', 'AI-focused specializations', 'Certification-driven exposure', 'Career readiness from Day 1', 'Stronger career positioning'];

const faqs = [
  { q: 'Which B.Tech courses are available for Admissions 2026?', a: 'B.Tech CSE, B.Tech CSE in AI & ML, B.Tech CSE in Data Science and B.Tech CSE in Cloud Computing. These degrees are awarded solely by Techno India University.' },
  { q: 'What is the IIT Kharagpur OCN Micro-Specialisation?', a: 'Techno India University is an onboarded partner of the IIT Kharagpur Outreach Course Network (OCN), via ProofSlate. Students of the programme can access specific IIT Kharagpur OCN micro-specialisation course(s) delivered through the Outreach Course Network, alongside their Techno India University degree.' },
  { q: 'Does the IIT Kharagpur OCN award my degree?', a: 'No. Your B.Tech degree is awarded solely by Techno India University. IIT Kharagpur does not award, co-award, accredit or endorse any Techno India University degree. IIT Kharagpur\'s involvement is limited to specific micro-specialisation course(s) delivered through its Outreach Course Network.' },
  { q: 'What certificate can I earn from the OCN?', a: 'Qualifying learners can earn an IIT Kharagpur OCN Micro-Specialisation Certificate upon successful completion. All OCN credentials are conferred at IIT Kharagpur\'s sole discretion, subject to its policies as amended from time to time.' },
  { q: 'Is this suitable for students interested in AI careers?', a: 'Yes. The programmes are designed for students interested in Computer Science, AI & ML, Data Science, Cloud Computing and future technology careers.' },
  { q: 'Where is the campus located?', a: 'Techno India University is located at EM-4, Sector V, Salt Lake, Kolkata 700091.' },
  { q: 'How can I apply?', a: 'Fill the enquiry form on this page or call 08062642222 for admission counselling with Techno India University.' },
];

const pageSchema = {
  '@context': 'https://schema.org', '@type': 'Course',
  name: 'B.Tech CSE Admissions 2026 — Techno India University, School of the Future',
  description: 'B.Tech CSE degree programmes awarded solely by Techno India University. The programme includes IIT Kharagpur OCN micro-specialisation course(s) delivered through the IIT Kharagpur Outreach Course Network.',
  provider: { '@type': 'CollegeOrUniversity', name: 'Techno India University', url: 'https://www.technoindiauniversity.ai' },
};

// ═════════════════════════════════════════════════════════════════════════════
const IITKGPLanding = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-[#09080a] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
      <SEO
        title="B.Tech CSE Admissions 2026 | Techno India University"
        description="B.Tech CSE degrees awarded solely by Techno India University, School of the Future. Programme includes IIT Kharagpur OCN micro-specialisation course(s) delivered through the Outreach Course Network. Admissions 2026 open."
      />
      <SchemaInjector schema={pageSchema} />
      <CursorGlow />

      {/* ── ANNOUNCEMENT BAR ──────────────────────────────────────────────── */}
      <AnnouncementBar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">

        {/* Parallax grid */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(115deg, transparent 58%, rgba(255,0,0,0.04) 58.5%, rgba(255,0,0,0.04) 100%)'
          }} />
        </motion.div>

        {/* Glow blobs */}
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] bg-[#FF0000] rounded-full blur-[200px] pointer-events-none" />
        <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[55%] bg-[#FF0000]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-32 md:pt-28 lg:pt-24 pb-6">
          <div className="w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── LEFT ── */}
          <div>
            {/* Partner (Techno India University) — primary, largest identity */}
            {/* Kicker */}
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3">
              Final Admission Call 2026
            </motion.p>

            {/* Headline — the Partner's own programme is always the headline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative overflow-hidden">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight relative z-10 pt-2">
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
                  className="block text-white">B.Tech CSE</motion.span>
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-orange-500 to-[#FF0000]">
                  Admissions 2026
                </motion.span>
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, duration: 0.7 }}
                  className="block text-white text-2xl sm:text-3xl md:text-4xl mt-3">at Techno India University</motion.span>
              </h1>
            </motion.div>

            {/* Onboarded-partner pill (approved formulation) */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/12 px-4 py-2 rounded-full mt-6 mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-300 text-[11px] font-bold tracking-wide">Onboarded partner of the IIT Kharagpur OCN, via ProofSlate</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mb-6 max-w-xl">
              Future-ready B.Tech CSE degree programmes at the School of the Future, awarded solely by Techno India University. The programme <span className="text-gray-200 font-semibold">includes IIT Kharagpur OCN micro-specialisation course(s)</span> delivered through the IIT Kharagpur Outreach Course Network, with project-based learning.
            </motion.p>

            {/* Programme pills (Partner degree programmes) */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-6">
              {['B.Tech CSE', 'CSE AI & ML', 'CSE Data Science', 'CSE Cloud Computing'].map((c, i) => (
                <span key={i} className="text-xs font-bold px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 tracking-wide">
                  {c}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 mb-6">
              <MotionLink to="/apply" whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(255,0,0,0.4)' }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,0,0.25)] transition-shadow">
                Apply Now <ArrowRight className="w-4 h-4" />
              </MotionLink>
              <a href="tel:08062642222"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold border border-white/12 text-gray-300 hover:border-[#FF0000]/30 hover:text-[#FF0000] transition-colors text-sm">
                <Phone className="w-4 h-4" /> 08062642222
              </a>
            </motion.div>

          </div>

          {/* ── RIGHT — IIT Kharagpur OCN featured lock-up (approved lock-up, not a campus photo) ── */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full">
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg z-10" />

            <div className="relative rounded-3xl border border-white/12 overflow-hidden p-7 md:p-9"
              style={{ background: 'linear-gradient(155deg, rgba(44,44,134,0.20) 0%, rgba(9,8,10,0.55) 55%, rgba(255,0,0,0.06) 100%)' }}>
              <div className="absolute -top-16 -right-10 w-56 h-56 bg-[#2C2C86]/25 rounded-full blur-[90px] pointer-events-none" />

              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-5 relative z-10">Programme includes micro-specialisation from</p>

              {/* Official IIT Kharagpur OCN lock-up (on a light surface for legibility) */}
              <div className="bg-white rounded-xl px-4 py-3 mb-6 relative z-10 shadow-lg inline-block">
                <img src={ocnLockup} alt="IIT Kharagpur OCN — Outreach Course Network" className="h-12 md:h-14 w-auto object-contain" />
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed relative z-10">
                Students can earn <span className="text-white font-semibold">IIT Kharagpur OCN Micro-specialisation certification(s)</span> alongside their <span className="text-white font-semibold">Techno India University B.Tech CSE degree</span>.
              </p>
              <p className="text-gray-600 text-[11px] mt-5 relative z-10">Benefits available to qualifying learners at IIT Kharagpur's sole discretion.</p>
            </div>

            {/* Mandatory disclaimer — in the same field of view as the OCN reference, above the fold */}
            <DisclaimerPanel className="mt-4" />
          </motion.div>
          </div>
        </div>
      </section>

      {/* ── PARTNER DEGREE PROGRAMMES ─────────────────────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="relative">
              <GhostNum n="01" />
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Techno India University Degrees</p>
              <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
                Choose Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">B.Tech CSE Programme</span>
              </h2>
              <p className="text-gray-500 text-sm mt-4 max-w-lg relative z-10">These degree programmes are awarded solely by Techno India University.</p>
            </div>
            <MotionLink to="/courses" whileHover={{ x: 4 }} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
              View All Courses <ArrowUpRight className="w-4 h-4 group-hover:text-[#FF0000] transition-colors" />
            </MotionLink>
          </div>

          <div className="space-y-px">
            {degreePrograms.map((c, i) => {
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
                  <span className="text-6xl md:text-7xl font-black leading-none flex-shrink-0 tabular-nums"
                    style={{ color: `${c.accent}15`, WebkitTextStroke: `1px ${c.accent}30` }}>
                    {c.n}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border"
                    style={{ backgroundColor: `${c.accent}12`, borderColor: `${c.accent}25` }}>
                    <Icon className="w-6 h-6" style={{ color: c.accent }} />
                  </div>
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
                  <MotionLink to="/apply" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm transition-all duration-200"
                    style={{ borderColor: `${c.accent}30`, color: c.accent }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${c.accent}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    Apply <ArrowRight className="w-4 h-4" />
                  </MotionLink>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: c.accent }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ELIGIBLE STUDENT BENEFITS — dedicated OCN credentials section ─────── */}
      <section className="relative py-8 md:py-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0a07 0%, #09080a 50%, #080a0d 100%)' }}>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FF0000 0, #FF0000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
            {/* Left header */}
            <div className="lg:sticky lg:top-32">
              <div className="relative">
                <GhostNum n="02" />
                <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-4 relative z-10">A Separate Add-On to Your Degree</p>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight relative z-10">
                  Eligible Student<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF4444]">
                    Benefits
                  </span>
                </h2>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-4">
                Qualifying learners can earn the following IIT Kharagpur OCN credentials alongside their Techno India University B.Tech CSE degree. These are separate from, and additional to, the degree awarded solely by Techno India University.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                All IIT Kharagpur OCN credentials are presented as benefits available to qualifying learners, conferred at IIT Kharagpur's sole discretion and subject to its policies. They are not guaranteed.
              </p>

              {/* Official IIT Kharagpur OCN lock-up (on a light surface for legibility) */}
              <div className="bg-white rounded-xl px-4 py-3 shadow-lg inline-block">
                <img src={ocnLockup} alt="IIT Kharagpur OCN — Outreach Course Network" className="h-12 md:h-14 w-auto object-contain" />
              </div>
            </div>

            {/* Right — credential list (full OCN-qualified names) */}
            <div className="space-y-0">
              {ocnCredentials.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group relative flex gap-5 py-6 border-b border-white/6 last:border-0 hover:pl-3 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FF0000]/8 border border-[#FF0000]/20 flex items-center justify-center group-hover:bg-[#FF0000]/10 transition-colors">
                      <Icon className="w-5 h-5 text-[#FF0000]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{b.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* N.B. */}
          <div className="mt-12 max-w-4xl mx-auto rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4">
            <p className="text-gray-300 text-[13px] leading-relaxed">
              <span className="font-black text-white">N.B.:</span> Students enrolled in this programme have the opportunity to pursue select IIT Kharagpur Micro-Specialisation course(s) through IIT KGP's Outreach Course Network (OCN). The degree/programme is solely awarded by TIU, WB. IIT Kharagpur's participation is limited to the OCN Micro-Specialisation component and the associated OCN credentials.
            </p>
          </div>

          {/* Mandatory disclaimer in same field of view */}
          <DisclaimerPanel className="mt-4 max-w-4xl mx-auto" />
        </div>
      </section>

      {/* ── WHY + GOOGLE CLOUD ────────────────────────────────────────────── */}
      <section className="py-6 md:py-14 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Why This Matters */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl border border-white/8 bg-white/[0.02] overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#FF0000]/6 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-4">Why It Matters</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                A Degree Plus Practical, Certifiable Skills
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The engineering job market is changing fast. Recruiters look beyond a basic degree for strong fundamentals, AI exposure, practical project experience and career-ready confidence.
              </p>
              <div className="space-y-2.5">
                {['B.Tech CSE degree awarded solely by Techno India University', 'IIT Kharagpur OCN micro-specialisation course(s) as an add-on', 'Project-based learning over theory', 'Career-readiness credentials that stand out'].map((t, i) => (
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
                At the School of the Future, students also get access to Google Cloud collaborated learning exposure: cloud, AI, digital tools and industry-aligned learning.
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

      {/* ── COMPARISON ─────────────────────────────────────────────────────── */}
      <section className="py-6 md:py-14 px-6 md:px-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #09080a 0%, #0b0809 100%)' }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="relative inline-block">
              <GhostNum n="03" />
              <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">The Difference</p>
              <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
                A Degree-Only Path<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">vs. Degree + Micro-Specialisation</span>
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
                <h3 className="text-gray-400 font-black text-lg">A Degree-Only Path</h3>
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
                  <h3 className="text-white font-black text-lg">Techno India University · School of the Future</h3>
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
      <section className="py-8 md:py-16 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 relative">
            <GhostNum n="04" />
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
      <section className="relative py-8 md:py-16 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.06) 0%, transparent 50%, rgba(245,158,11,0.04) 100%)' }} />
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#FF0000]/20 rounded-tl-xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#FF0000]/20 rounded-tr-xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#FF0000]/20 rounded-bl-xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#FF0000]/20 rounded-br-xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Partner logo — primary identity */}
              <motion.img initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                src={sofLogo} alt="School of the Future — Techno India University" className="h-12 md:h-14 w-auto object-contain mb-6" />

              <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Secure Your B.Tech CSE Seat for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#990000]">Admissions 2026</span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                Apply now for future-ready B.Tech CSE programmes at Techno India University, School of the Future — including IIT Kharagpur OCN micro-specialisation course(s) delivered through the Outreach Course Network.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 mb-8">
                <MotionLink to="/apply" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(255,0,0,0.25)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition-shadow">
                  Apply for Admissions 2026 <ArrowRight className="w-4 h-4" />
                </MotionLink>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone className="w-4 h-4 text-[#FF0000]" />
                  <span>Call: <a href="tel:08062642222" className="text-white font-bold hover:text-[#FF0000] transition-colors">08062642222</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin className="w-4 h-4 text-[#FF0000]" />
                  <span>EM-4, Sector V, Salt Lake, Kolkata 700091</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Layers className="w-4 h-4 text-[#FF0000]" />
                  <a href="https://www.technoindiauniversity.ai" target="_blank" rel="noopener noreferrer"
                    className="text-white font-bold hover:text-[#FF0000] transition-colors">www.technoindiauniversity.ai</a>
                </div>
              </motion.div>

              {/* Mandatory disclaimer in same field of view as OCN references */}
              <DisclaimerPanel />
            </div>

            {/* ExtraEdge Form Widget */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg" />
              <EEFormWidget />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IITKGPLanding;
