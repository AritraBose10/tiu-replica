import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Phone, MessageCircle, ChevronDown,
  Briefcase, Cpu, TrendingUp, FlaskConical, Clock, Calendar,
  MapPin, ClipboardList, Users, BookOpen, Award,
  GraduationCap, Video, CreditCard, Percent, Gift, Landmark,
  ShieldCheck, UserCheck, FileCheck2, Sparkles, Building2,
} from 'lucide-react';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';
import sofLogo from '../assets/logo1.png';

const WHATSAPP_NUMBER = '916292233351';
const ADMISSIONS_PHONE = '08062642222';

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const track = (eventName, params = {}) => {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, params);
  } catch (_e) { /* analytics must never break the page */ }
};

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ─── Scroll-depth tracker (50% / 75%, fires once each) ─────────────────────
const useScrollDepthTracking = () => {
  const fired = useRef({ 50: false, 75: false });
  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      const pct = (scrolled / total) * 100;
      if (pct >= 50 && !fired.current[50]) { fired.current[50] = true; track('scroll_depth_50', { page: 'pg_working_professionals' }); }
      if (pct >= 75 && !fired.current[75]) { fired.current[75] = true; track('scroll_depth_75', { page: 'pg_working_professionals' }); }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
};

// ─── Ghost section number ───────────────────────────────────────────────────
const GhostNum = ({ n }) => (
  <span className="absolute -top-6 md:-top-10 left-0 text-[100px] md:text-[160px] font-black leading-none select-none pointer-events-none"
    style={{ WebkitTextStroke: '1px rgba(255,0,0,0.12)', color: 'transparent', zIndex: 0 }}>
    {n}
  </span>
);

// ─── ExtraEdge enquiry form widget (same integration used sitewide) ─────────
const EEFormWidget = ({ formDomId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(520);
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EE_WIDGET_LOADED') {
        setIsLoading(false);
        track('enquiry_form_view', { page: 'pg_working_professionals', form: formDomId });
      }
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
<div class="ee-form-widget" id="${formDomId}"></div>
<script>
function reportHeight(){var h=document.body.scrollHeight;window.parent.postMessage({type:'EE_WIDGET_HEIGHT',height:h},'*');}
window.addEventListener("DOMContentLoaded",function(){
window.ee_form_widget_baseurl="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
if(!document.getElementById("__formWidgetCss")){var e=document.createElement("link");e.id="__formWidgetCss";e.rel="stylesheet";e.href=window.ee_form_widget_baseurl+"css/stylesheet.min.css";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e);}
var t=document.createElement("script");t.type="text/javascript";
t.onload=async function(){var w=new eeFormWidget();await w.init("softiu","form-8","${formDomId}");window.parent.postMessage({type:'EE_WIDGET_LOADED'},'*');setTimeout(reportHeight,300);setTimeout(reportHeight,1000);};
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
  }, [formDomId]);

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
          title="Eligibility Check Enquiry Form"
          className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: 'transparent', height: iframeHeight }}
        />
      )}
    </div>
  );
};

// ─── FAQ accordion item ──────────────────────────────────────────────────────
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

// ─── Sticky page-specific CTA (desktop header strip + mobile bottom bar) ────
const StickyPGBar = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop header CTA */}
          <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden md:flex fixed top-0 left-0 right-0 z-[70] items-center justify-between px-8 py-3"
            style={{ background: 'rgba(2,2,5,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-white text-sm font-bold tracking-wide">MBA · M.Tech · M.Sc · Ph.D — for Working Professionals</span>
            <div className="flex items-center gap-3">
              <a href={waLink("Hi, I'm a working professional interested in your postgraduate programmes.")}
                onClick={() => track('whatsapp_click', { placement: 'sticky_header' })}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 border border-green-500/30 px-4 py-2 rounded-full text-xs font-bold hover:bg-green-500/10 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button onClick={() => scrollToId('enquiry-form')}
                className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 rounded-full text-xs font-black tracking-wide uppercase hover:bg-[#CC0000] transition-colors">
                Check Eligibility
              </button>
            </div>
          </motion.div>

          {/* Mobile bottom bar */}
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:hidden grid grid-cols-2 gap-px"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <a href={waLink("Hi, I'm a working professional interested in your postgraduate programmes.")}
              onClick={() => track('whatsapp_click', { placement: 'sticky_mobile' })}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 text-green-400 font-bold text-xs uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <button onClick={() => scrollToId('enquiry-form')}
              className="flex items-center justify-center gap-2 py-3.5 text-white font-black text-xs uppercase tracking-wide"
              style={{ background: 'linear-gradient(135deg, #FF0000, #CC0000)' }}>
              Enquire Now
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const programmes = [
  {
    n: '01', icon: Briefcase, accent: '#FF0000', name: 'MBA',
    tag: 'Working Professional Track',
    specialisations: 'Business Administration with Data Science, AI Tools & Strategic Management (IBM-powered)',
    duration: '2 Years', mode: 'Weekend / Hybrid',
    eligibility: "Bachelor's degree in any discipline + 2 years' work experience",
    bestFor: 'Professionals targeting management, leadership or techno-managerial roles',
    anchor: 'fee-table',
  },
  {
    n: '02', icon: Cpu, accent: '#3b82f6', name: 'M.Tech',
    tag: 'CSE — AI & Machine Learning',
    specialisations: 'Artificial Intelligence & Machine Learning — research-focused curriculum',
    duration: '2 Years', mode: 'Weekend / Hybrid + campus lab access',
    eligibility: "B.E./B.Tech in a relevant branch (or equivalent) + 2 years' experience",
    bestFor: 'Engineers targeting technical leadership, R&D or product architecture roles',
    anchor: 'fee-table',
  },
  {
    n: '03', icon: TrendingUp, accent: '#06b6d4', name: 'M.Sc',
    tag: 'Data Science & AI',
    specialisations: 'Machine learning, deep learning and data engineering',
    duration: '2 Years', mode: 'Weekend / Hybrid',
    eligibility: 'B.Sc / B.E. / B.Tech with a quantitative background',
    bestFor: 'Analysts and engineers moving into applied data science roles',
    anchor: 'fee-table',
  },
  {
    n: '04', icon: FlaskConical, accent: '#FF4444', name: 'Ph.D',
    tag: 'AI — Part-Time / Half-Time',
    specialisations: 'Doctoral research in Artificial Intelligence, designed for working professionals',
    duration: 'Flexible (part-time)', mode: 'Coursework + research, flexible around work',
    eligibility: "Master's degree + entrance test / interview",
    bestFor: 'Professionals and academics pursuing doctoral research alongside their job',
    anchor: 'phd-section',
  },
];

const logistics = [
  { icon: Clock, title: 'Weekly Time Commitment', desc: 'Approximately 6–8 hours a week of coursework and study, sized for a full working schedule.' },
  { icon: Video, title: 'Class Schedule', desc: 'Weekend and evening live sessions, with recorded lecture access for sessions you cannot attend live.' },
  { icon: MapPin, title: 'Campus Visits', desc: 'Periodic on-campus intensives at EM-4, Sector V, Salt Lake, with the remaining sessions delivered online.' },
  { icon: ClipboardList, title: 'Assessment Pattern', desc: 'Assignments, projects and periodic assessments — scheduled around weekends, not weekday work hours.' },
  { icon: Briefcase, title: 'Workplace-Linked Projects', desc: 'Capstone and elective projects can draw on your own organisation and role wherever relevant.' },
  { icon: Users, title: 'Support Structure', desc: 'A dedicated mentor, peer cohort and LMS access for coursework, recordings and doubt-resolution.' },
];

const funding = [
  { icon: CreditCard, title: 'EMI & No-Cost Financing', desc: 'EMI plans are available across programmes; no-cost financing options can be discussed with your admissions counsellor.' },
  { icon: FileCheck2, title: 'Employer Sponsorship Letter', desc: 'Request a ready-to-use employer sponsorship letter template for reimbursement or approval from your organisation.', cta: 'request' },
  { icon: Gift, title: 'Scholarships', desc: 'Merit-based scholarships are available to eligible working-professional applicants — ask your counsellor what you qualify for.' },
  { icon: Percent, title: 'Tax Benefit on Education Loans', desc: 'Interest paid on an education loan for these programmes may qualify for deduction under Section 80E of the Income Tax Act, 1961 — please consult your tax advisor.' },
];

const admissionSteps = [
  { title: 'Enquire', desc: 'Share your details through the eligibility form or WhatsApp — takes under a minute.', icon: MessageCircle },
  { title: 'Eligibility Check & Counselling Call', desc: 'A counsellor reviews your background and walks you through the right-fit programme.', icon: UserCheck },
  { title: 'Document Submission', desc: 'Submit your degree certificates, experience letters and ID proof online.', icon: FileCheck2 },
  { title: 'Confirm Seat', desc: 'Complete the fee formalities and confirm your seat for the upcoming batch.', icon: ShieldCheck },
];

const faqs = [
  { q: 'Is this degree the same as the full-time programme?', a: 'Yes. The MBA, M.Tech and M.Sc awarded to working-professional learners is the same degree awarded by Techno India University to full-time students — only the delivery format (weekend/hybrid) differs to fit around a full-time job.' },
  { q: 'Will my employer recognise it?', a: "Yes. All degrees are awarded by Techno India University, a UGC-recognised, NAAC-accredited and AICTE-approved university — the same recognition that applies to every full-time degree from the university." },
  { q: 'What happens if I miss a class?', a: 'Recorded lecture access and mentor catch-up sessions are built into the programme specifically so a missed live session, travel or a work deadline does not put you behind.' },
  { q: 'Do I need to attend campus, and how often?', a: 'Most of the programme is delivered online or on weekends. Periodic on-campus intensives are scheduled at EM-4, Sector V, Salt Lake — exact frequency is confirmed with your counsellor based on the programme you choose.' },
  { q: 'Is the programme UGC / AICTE approved?', a: 'Yes. Techno India University is UGC-recognised, NAAC-accredited and AICTE-approved, and all postgraduate programmes on this page are offered under that recognition.' },
  { q: 'Can I continue if I am posted outside Kolkata?', a: 'Yes — the hybrid delivery model is built for exactly this. Live sessions are attended online, with on-campus intensives scheduled in advance so you can plan travel around them.' },
  { q: 'How do I manage notice periods, travel or shift work?', a: 'Talk to your counsellor during the eligibility call — cohort scheduling, recorded sessions and flexible assessment windows are designed to absorb exactly this kind of disruption.' },
  { q: 'Can I switch specialisation later?', a: 'Specialisation changes depend on seat availability and academic eligibility in the new track. Raise this during your counselling call so it can be assessed for your specific case.' },
];

const feeRows = [
  { name: 'MBA (Working Professional)', eligibility: "Bachelor's degree + 2 years' experience", duration: '24 months' },
  { name: 'M.Tech (CSE — AI & ML)', eligibility: 'B.E./B.Tech in relevant branch', duration: '24 months' },
  { name: 'M.Sc (Data Science & AI)', eligibility: 'B.Sc in relevant discipline', duration: '24 months' },
  { name: 'Ph.D (AI — Part-Time)', eligibility: "Master's degree + entrance/interview", duration: 'Flexible (part-time)' },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': programmes.map((p) => ({
    '@type': 'Course',
    name: `${p.name} — ${p.tag}`,
    description: `${p.specialisations}. ${p.eligibility}.`,
    provider: { '@type': 'CollegeOrUniversity', name: 'Techno India University', url: 'https://www.technoindiauniversity.ai' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      courseWorkload: p.duration,
    },
  })),
};

// ═════════════════════════════════════════════════════════════════════════════
const WorkingProfessionals = () => {
  useScrollDepthTracking();

  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
      <SEO
        title="MBA, M.Tech, M.Sc & Ph.D for Working Professionals | Techno India University"
        description="Weekend & hybrid MBA, M.Tech, M.Sc and Ph.D programmes for working professionals at Techno India University — UGC-recognised, same degree as full-time, EMI available. Check your eligibility."
      />
      <SchemaInjector schema={pageSchema} />
      <StickyPGBar />

      {/* ── SECTION 1 · HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden pt-32 md:pt-28 pb-6">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] bg-[#FF0000] rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10">
          <div className="w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3">
                Admissions 2026 · For Working Professionals
              </motion.p>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                <span className="text-white">Your Colleagues are Upskilling. </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">Are you?</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                <span className="text-white font-bold">MBA · M.Tech · M.Sc · Ph.D</span> For working professionals - weekend and hybrid delivery, built for professionals with 2+ years of experience.
              </motion.p>

              {/* Partner strip */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-2 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">In collaboration with</span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                    alt="IBM"
                    className="h-5 object-contain opacity-80 brightness-0 invert"
                  />
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => scrollToId('enquiry-form')}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-full font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,0,0.25)] hover:shadow-[0_0_50px_rgba(255,0,0,0.4)] hover:scale-[1.03] transition-all">
                  Check Your Eligibility <ArrowRight className="w-4 h-4" />
                </button>
                <a href={waLink("Hi, I'd like the brochure for MBA/M.Tech/M.Sc/PhD programmes for working professionals.")}
                  onClick={() => track('brochure_download_click', { placement: 'hero' })}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold border border-white/12 text-gray-300 hover:border-[#FF0000]/30 hover:text-[#FF0000] transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" /> Download Brochure
                </a>
              </motion.div>
            </div>

            {/* Right — credibility card (no stock classroom photo, matches site's card aesthetic) */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg z-10" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg z-10" />
              <div className="relative rounded-3xl border border-white/12 overflow-hidden p-7 md:p-9"
                style={{ background: 'linear-gradient(155deg, rgba(255,0,0,0.08) 0%, rgba(2,2,5,0.6) 55%, rgba(59,130,246,0.05) 100%)' }}>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-6">Built around your job, not the other way around</p>
                <div className="space-y-5">
                  {[
                    { icon: Clock, label: 'Weekly commitment', value: '6–8 hours' },
                    { icon: Calendar, label: 'Delivery', value: 'Weekend + evening, hybrid' },
                    { icon: GraduationCap, label: 'Degree', value: 'Equivalent as full-time programme' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <row.icon className="w-5 h-5 text-[#FF0000]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wide">{row.label}</p>
                        <p className="text-white font-bold text-sm">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 · TRUST BAR ─────────────────────────────────────────── */}
      <section className="py-8 border-y border-white/8 bg-black/40">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png" alt="UGC" className="h-8 md:h-10 object-contain opacity-80" />
            <img src="https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png" alt="AICTE" className="h-8 md:h-10 object-contain opacity-80" />
            <img src="/assets/approvals/naac.png" alt="NAAC" className="h-8 md:h-10 object-contain opacity-80" />
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-5 md:h-6 object-contain opacity-80" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-5 md:h-6 object-contain opacity-80 brightness-0 invert" />
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-right max-w-sm">
            40+ years of academic legacy · 50,000+ alumni worldwide
          </p>
        </div>
      </section>

      {/* ── SECTION 3 · THE TENSION ───────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              A promotion blocked without a postgraduate qualification? Technical skills ageing faster than your role can absorb? No room for a two-year residential break? A doctoral ambition that has never quite fitted the calendar?
            </p>
            <p className="text-white text-xl md:text-2xl font-black leading-snug">
              You don't need to choose between your salary and your degree.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4 · CHOOSE YOUR PROGRAMME ─────────────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-14">
            <GhostNum n="01" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Four Paths, One Goal</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">Programme</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programmes.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4"
                    style={{ backgroundColor: `${p.accent}12`, borderColor: `${p.accent}30` }}>
                    <Icon className="w-6 h-6" style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{p.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: p.accent }}>{p.tag}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.specialisations}</p>
                  <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                    <p><span className="text-gray-300 font-semibold">Duration:</span> {p.duration}</p>
                    <p><span className="text-gray-300 font-semibold">Mode:</span> {p.mode}</p>
                    <p><span className="text-gray-300 font-semibold">Eligibility:</span> {p.eligibility}</p>
                  </div>
                  <p className="text-gray-400 text-xs italic mb-5 flex-1">Best for: {p.bestFor}</p>
                  <button onClick={() => scrollToId(p.anchor)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border font-bold text-xs uppercase tracking-wide transition-colors"
                    style={{ borderColor: `${p.accent}30`, color: p.accent }}>
                    See Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · HOW IT WORKS WITH A FULL-TIME JOB ─────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10 relative" style={{ background: 'linear-gradient(180deg, #020205 0%, #0a0a0f 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-14">
            <GhostNum n="02" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">No Guesswork</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">
              How It Works With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">a Full-Time Job</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {logistics.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center mb-4">
                  <l.icon className="w-5 h-5 text-[#FF0000]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{l.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · OUTCOMES ──────────────────────────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-14">
            <GhostNum n="03" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Where This Leads</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Career Outcomes</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { prog: 'MBA', path: 'Individual contributor → Manager / Leadership' },
              { prog: 'M.Tech', path: 'Engineer → Architect / R&D lead' },
              { prog: 'M.Sc', path: 'Analyst / Engineer → Applied AI & Data Science specialist' },
              { prog: 'Ph.D', path: 'Professional → Academic / Independent researcher / Consultant' },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-[#FF0000] font-black text-sm mb-2">{c.prog}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{c.path}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="text-gray-300 text-sm leading-relaxed">
              Working-learner placement and progression support includes resume and LinkedIn positioning for a postgraduate profile, internal-promotion case-building guidance, and access to the university's placement cell for professionals exploring a lateral move.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7 · ELIGIBILITY & INVESTMENT ──────────────────────────── */}
      <section id="fee-table" className="py-8 md:py-16 px-4 md:px-10 scroll-mt-24" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #020205 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-10">
            <GhostNum n="04" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Straight Numbers</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Eligibility &amp; Investment</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead className="bg-white/[0.05]">
                <tr>
                  {['Programme', 'Eligibility', 'Duration', 'Total Fee', 'EMI'].map((h) => (
                    <th key={h} className="px-5 py-4 text-xs font-black tracking-widest uppercase text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeRows.map((r, i) => (
                  <tr key={i} className="border-t border-white/8 hover:bg-white/[0.03] transition-colors">
                    <td className="px-5 py-5 text-white font-bold text-sm">{r.name}</td>
                    <td className="px-5 py-5 text-gray-400 text-sm">{r.eligibility}</td>
                    <td className="px-5 py-5 text-gray-400 text-sm">{r.duration}</td>
                    <td className="px-5 py-5 text-sm">
                      <a href={`tel:${ADMISSIONS_PHONE}`} className="text-[#FF0000] font-bold hover:underline">Contact Admissions</a>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <a href={`tel:${ADMISSIONS_PHONE}`} className="text-[#FF0000] font-bold hover:underline">Contact Admissions</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-xs mt-4">Fee and EMI figures will be published here once confirmed by admissions — call {ADMISSIONS_PHONE} for current figures.</p>
        </div>
      </section>

      {/* ── SECTION 8 · PH.D DEDICATED BLOCK ───────────────────────────────── */}
      <section id="phd-section" className="py-8 md:py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-10">
            <GhostNum n="05" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">A Different Kind of Enquiry</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Ph.D — Built for Working Scholars</h2>
            <p className="text-gray-400 text-sm mt-4 max-w-2xl relative z-10">
              Doctoral enquirers behave nothing like MBA enquirers, so here's the detail relevant specifically to your research ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: FlaskConical, title: 'Research Areas & Supervisor Availability', desc: 'Doctoral research in Artificial Intelligence and allied areas — reach out to the research cell for current supervisor availability in your area of interest.' },
              { icon: BookOpen, title: 'Coursework & Thesis Timeline', desc: 'Coursework in the initial phase, followed by a comprehensive/qualifying assessment and thesis work, structured per UGC PhD regulations with flexibility for part-time scholars.' },
              { icon: Award, title: 'Publication Support & Facilities', desc: 'Access to research labs, journal subscriptions and guidance for publishing in peer-reviewed venues alongside your working schedule.' },
              { icon: ClipboardList, title: 'Entrance, Interview & Intake', desc: 'An entrance test and/or interview is conducted each admission cycle. The half-time (part-time) Ph.D in AI track is designed specifically for working professionals.' },
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-[#FF4444]/10 border border-[#FF4444]/20 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-[#FF4444]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9 · RESEARCH & INDUSTRY ECOSYSTEM ─────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10" style={{ background: 'linear-gradient(180deg, #020205 0%, #0a0a0f 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-10">
            <GhostNum n="06" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Beyond the Classroom</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Research &amp; Industry Ecosystem</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Building2, title: 'Labs & Infrastructure', desc: 'Dedicated AI, Data Science and analytics labs available to postgraduate learners.' },
              { icon: Landmark, title: 'Industry Partnerships', desc: 'Curriculum co-designed with Google Cloud and IBM across postgraduate programmes.' },
              { icon: Sparkles, title: 'Incubation Access', desc: "Access to the university's entrepreneurship and incubation cell for research-to-venture ideas." },
            ].map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <d.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10 · ADMISSION PROCESS ────────────────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">Admission Process</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">Four Simple Steps</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Admissions open for the 2026 batch — apply before seats close.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {admissionSteps.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} className="relative group h-full">
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-32px)] h-px bg-gradient-to-r from-white/15 to-transparent z-0" />
                )}
                <div className="relative h-full z-10 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                  <span className="absolute top-3 right-4 text-5xl font-black text-white/[0.04] group-hover:text-red-500/10 transition-colors select-none">{index + 1}</span>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-7 h-7 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11 · FUNDING YOUR DEGREE ──────────────────────────────── */}
      <section className="py-8 md:py-16 px-4 md:px-10" style={{ background: 'linear-gradient(180deg, #020205 0%, #0a0a0f 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-10">
            <GhostNum n="07" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Rescuing Price-Sensitive Leads</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Funding Your Degree</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {funding.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#FF0000]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                {f.cta === 'request' && (
                  <a href={waLink("Hi, could you send me the employer sponsorship letter template for a postgraduate programme?")}
                    onClick={() => track('sponsorship_letter_request')}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-green-400 hover:underline">
                    <MessageCircle className="w-3.5 h-3.5" /> Request via WhatsApp
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12 · FAQ ───────────────────────────────────────────────── */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14 relative">
            <GhostNum n="08" />
            <p className="text-xs text-[#FF0000] font-black tracking-widest uppercase mb-3 relative z-10">Frequently Asked</p>
            <h2 className="text-3xl md:text-5xl font-black text-white relative z-10">Got Questions?</h2>
          </div>
          <div>
            {faqs.map((f, i) => <FAQItem key={i} faq={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── SECTION 13 · CLOSING CTA ───────────────────────────────────────── */}
      <section id="enquiry-form" className="relative py-8 md:py-16 px-6 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.06) 0%, transparent 50%, rgba(59,130,246,0.04) 100%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.img initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                src={sofLogo} alt="School of the Future — Techno India University" className="h-12 md:h-14 w-auto object-contain mb-6" />

              <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
                Your Career Doesn't Have to Wait for a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-orange-400">Career Break</span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
                MBA, M.Tech, M.Sc and Ph.D programmes for working professionals — Admissions 2026 batch is open. Check your eligibility now, before seats close.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone className="w-4 h-4 text-[#FF0000]" />
                  <span>Talk to a counsellor: <a href={`tel:${ADMISSIONS_PHONE}`} className="text-white font-bold hover:text-[#FF0000] transition-colors">{ADMISSIONS_PHONE}</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <a href={waLink("Hi, I'd like to talk to a counsellor about MBA/M.Tech/M.Sc/PhD for working professionals.")}
                    onClick={() => track('whatsapp_click', { placement: 'closing_cta' })}
                    target="_blank" rel="noopener noreferrer"
                    className="text-white font-bold hover:text-green-400 transition-colors">WhatsApp a counsellor</a>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <MapPin className="w-4 h-4 text-[#FF0000]" />
                  <span>EM-4, Sector V, Salt Lake, Kolkata 700091</span>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg" />
              <EEFormWidget formDomId="ee-form-pg-working-professionals" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkingProfessionals;
