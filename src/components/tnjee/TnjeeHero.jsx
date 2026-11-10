import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, GraduationCap, Phone } from 'lucide-react';
import { DisclaimerPanel } from '../OcnDisclaimer';
import { tnjee, announcementItems, sectionNav, heroFacts, pathway01, pathway02 } from '../../data/tnjee';
import { Val, PrimaryCta, SecondaryCta, GridBg } from './primitives';
import { fadeUp, stagger } from './motion';

// ─── Announcement marquee (same mechanism as the IIT KGP landing page) ────────
const BAR_HEIGHT = 36;

export const AnnouncementBar = () => {
  useEffect(() => {
    // Push the floating Navbar down below the bar while this page is mounted
    document.documentElement.style.setProperty('--navbar-top', `${BAR_HEIGHT + 8}px`);
    return () => document.documentElement.style.setProperty('--navbar-top', '1rem');
  }, []);

  return (
    <div className="sticky top-0 z-[60] bg-[#FF0000] overflow-hidden" style={{ height: BAR_HEIGHT }}>
      <div className="flex h-full items-center animate-marquee whitespace-nowrap w-max">
        {[...announcementItems, ...announcementItems, ...announcementItems, ...announcementItems].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-8 text-white text-[11px] font-black tracking-wider uppercase flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const PathwayCard = ({ n, data, href, children }) => (
  <motion.a
    href={href}
    variants={fadeUp}
    whileHover={{ y: -4 }}
    className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 md:p-6 transition-colors duration-500 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,0,0,0.08)] overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 to-red-500/0 group-hover:from-red-500/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
    <div className="relative flex items-start justify-between gap-4 mb-3">
      <div>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-red-400 mb-1.5">Pathway {n}</p>
        <h3 className="text-lg md:text-xl font-black text-white leading-snug group-hover:text-red-400 transition-colors">{data.title}</h3>
      </div>
      <span className="text-5xl font-black leading-none select-none" style={{ WebkitTextStroke: '1px rgba(255,0,0,0.25)', color: 'transparent' }}>{n}</span>
    </div>
    <p className="relative text-gray-400 text-sm leading-relaxed mb-4">{data.short}</p>
    <div className="relative flex flex-wrap gap-2">
      {data.programmes.map((p) => (
        <span key={p.slug} className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-gray-300 tracking-wide">
          {p.title}{data === pathway02 && p.desc && !p.desc.startsWith('[') ? ` ${p.desc}` : ''}
        </span>
      ))}
    </div>
    {children}
    <ArrowRight className="absolute bottom-6 right-6 w-4 h-4 text-white/20 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
  </motion.a>
);

export const TnjeeHero = () => {
  const brochure = tnjee.brochureUrl || tnjee.brochureWhatsApp;

  return (
    <section className="relative overflow-hidden pt-32 md:pt-32 pb-16 md:pb-20 bg-[#020205]">
      <GridBg />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#020205_85%)] pointer-events-none z-[1]" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] bg-[#FF0000] rounded-full blur-[200px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-14 items-center">
        {/* ── Left ── */}
        <motion.div variants={stagger(0.12)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              TNJEE 2027 · Applications Open
            </span>
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-4">
            Techno National Joint Entrance Examination · Admissions 2027
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="block text-white">Two pathways.</span>
            <span className="block text-[#FF0000]">One application.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-8">
            Apply once for TNJEE 2027 and choose your route into the School of the Future at Techno India University: B.Tech CSE with Google Cloud, or industry programmes built with IBM.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
            <PrimaryCta href="#apply">Apply for TNJEE 2027</PrimaryCta>
            <SecondaryCta href={brochure} external icon={Download}>Download Brochure</SecondaryCta>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {heroFacts.map((f) => (
              <div key={f.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">{f.label}</p>
                <p className="text-white font-bold text-sm"><FactValue v={f.value} /></p>
              </div>
            ))}
          </motion.div>

          <motion.a variants={fadeUp} href={`tel:${tnjee.helplineTel}`}
            className="inline-flex items-center gap-2 mt-6 text-sm text-gray-500 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-[#FF0000]" /> Admission Helpline · <span className="font-bold text-gray-300">{tnjee.helpline}</span>
          </motion.a>
        </motion.div>

        {/* ── Right: the two pathways ── */}
        <motion.div variants={stagger(0.15)} initial="hidden" animate="visible" className="space-y-4">
          <PathwayCard n="01" data={pathway01} href="#pathway-01">
            <p className="relative flex items-start gap-2 mt-4 text-[12px] text-gray-400 leading-relaxed pr-6">
              <GraduationCap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
              Programme includes IIT Kharagpur OCN micro-specialisation course(s), delivered through the Outreach Course Network.
            </p>
          </PathwayCard>
          {/* Mandatory OCN disclaimer — directly under the card that names IIT Kharagpur,
              so it stays in the same field of view and above the fold on desktop */}
          <motion.div variants={fadeUp}>
            <DisclaimerPanel compact />
          </motion.div>
          <PathwayCard n="02" data={pathway02} href="#pathway-02" />

          <motion.p variants={fadeUp} className="text-gray-500 text-xs leading-relaxed px-1">
            One common application. Pick your pathway inside the form, and your exam paper is assigned to match.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

// "Online · [Exam date]" — only the bracketed part gets the placeholder chip
const FactValue = ({ v }) => {
  const m = typeof v === 'string' && v.match(/^(.*?)(\[[^\]]+\])$/);
  if (m && m[1]) return <>{m[1]}<Val v={m[2]} /></>;
  return <Val v={v} />;
};

// ─── Sticky in-page section nav ───────────────────────────────────────────────
export const SectionNav = () => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = sectionNav.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        // first section (in page order) inside the band, or none when above them all
        setActive(sectionNav.map((s) => s.id).find((id) => visible.has(id)) || null);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    // h-0: the bar overlays content instead of adding a strip between sections
    <div className="sticky z-30 h-0 px-4 pointer-events-none" style={{ top: 'calc(var(--navbar-top, 1rem) + 4.25rem)' }}>
      <nav aria-label="TNJEE sections"
        className="pointer-events-auto mx-auto w-fit max-w-full rounded-full border border-white/10 bg-[#020205]/80 backdrop-blur-xl shadow-2xl">
        <ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide p-1.5">
          {sectionNav.map((s) => (
            <li key={s.id} className="flex-shrink-0">
              <a href={`#${s.id}`}
                className={`block px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${active === s.id ? 'bg-[#FF0000] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
