import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Lock, CheckCircle2, Award, Cloud, Building2, Users,
  FileCheck2, Map, Sparkles, Compass, Quote, Play, Newspaper, Phone, Mail, MapPin, Download,
} from 'lucide-react';
import { DisclaimerPanel } from '../OcnDisclaimer';
import EEFormWidget from '../EEFormWidget';
import { useSettings } from '../../contexts/SettingsContext';
import ocnLockup from '../../assets/iit-kharagpur-ocn-logo-horizontal-transparent.png';
import {
  tnjee, pathway01, ocnBlock, pathway02, examGuides, kit, steps, careerStats, recruiters,
  internshipPartners, readiness, institutions, groupStats, leaders, studentVoices, press, gallery,
  isPlaceholder,
} from '../../data/tnjee';
import { Val, SectionHead, PrimaryCta, SecondaryCta, Corners, GridBg } from './primitives';
import { reveal } from './motion';

const GOOGLE_CLOUD_FALLBACK = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg';
const IBM_FALLBACK = 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg';

const usePartnerLogos = () => {
  const { getSetting } = useSettings();
  return {
    google: getSetting('logo_google_cloud') || GOOGLE_CLOUD_FALLBACK,
    ibm: getSetting('logo_ibm') || IBM_FALLBACK,
  };
};

// Same approval set + logos as ApprovalsSection
const approvals = [
  { name: 'UGC', full: 'University Grants Commission', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png' },
  { name: 'AICTE', full: 'All India Council for Technical Education', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png' },
  { name: 'AIU', full: 'Association of Indian Universities', logo: '/assets/approvals/aiu.png' },
  { name: 'NAAC', full: 'National Assessment and Accreditation Council', logo: '/assets/approvals/naac.png' },
];

// ═════════════════════════════════════════════════════════════════════════════
// §2 Collaborations & approvals (light strip)
// ═════════════════════════════════════════════════════════════════════════════
export const CollaborationsStrip = () => {
  const logos = usePartnerLogos();
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="w-[90%] max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
        <motion.div {...reveal()}>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Industry collaborations</p>
          <div className="flex items-center gap-8">
            <img src={logos.google} alt="Google Cloud" className="h-8 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
            <div className="w-px h-8 bg-gray-200" />
            <img src={logos.ibm} alt="IBM" className="h-8 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300" />
          </div>
        </motion.div>
        <motion.div {...reveal(1)}>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Approvals & affiliations</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {approvals.map((a) => (
              <div key={a.name} title={a.full}
                className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 hover:border-red-500/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <img src={a.logo} alt={a.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-black text-black text-sm group-hover:text-[#FF0000] transition-colors">{a.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Shared bits
// ═════════════════════════════════════════════════════════════════════════════
const ProgrammeCard = ({ p, i, tone = 'dark', level = '4-year B.Tech' }) => {
  const dark = tone === 'dark';
  return (
    <motion.div {...reveal(i)} className="h-full">
      <Link to={`/courses/${p.slug}`}
        className={`group relative flex flex-col h-full rounded-2xl p-6 overflow-hidden transition-all duration-500 ${dark
          ? 'border border-white/[0.08] bg-white/[0.03] hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,0,0,0.08)]'
          : 'border border-gray-100 bg-white shadow-lg hover:shadow-xl hover:border-red-500/30 hover:-translate-y-1'}`}>
        {dark && <Corners hover />}
        <span className={`text-[10px] font-black tracking-widest uppercase mb-4 ${dark ? 'text-red-400' : 'text-[#FF0000]'}`}>{p.level || level}</span>
        <h3 className={`text-xl font-black mb-2 transition-colors ${dark ? 'text-white group-hover:text-red-400' : 'text-black group-hover:text-[#FF0000]'}`}>{p.title}</h3>
        <p className={`text-sm leading-relaxed flex-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}><Val v={p.desc} tone={tone} /></p>
        <span className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${dark ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-black'} transition-colors`}>
          View programme <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#FF0000]" />
        </span>
      </Link>
    </motion.div>
  );
};

const Highlight = ({ h, i, tone = 'dark', icon: Icon = CheckCircle2 }) => (
  <motion.div {...reveal(i)} className="flex gap-4">
    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${tone === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
      <Icon className="w-5 h-5 text-[#FF0000]" />
    </div>
    <div>
      <h4 className={`font-bold mb-1 ${tone === 'dark' ? 'text-white' : 'text-black'}`}>{h.title}</h4>
      <p className={`text-sm leading-relaxed ${tone === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{h.desc}</p>
    </div>
  </motion.div>
);

// Locked exam guide — unlocks through the common application
const ExamGuideCard = ({ g, tone = 'dark' }) => {
  const dark = tone === 'dark';
  return (
    <motion.div {...reveal()}
      className={`relative rounded-3xl p-8 md:p-10 overflow-hidden ${dark
        ? 'border border-red-500/20 bg-gradient-to-br from-red-500/[0.06] to-transparent'
        : 'border border-gray-100 bg-white shadow-lg'}`}>
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div>
          <p className={`text-[10px] font-black tracking-widest uppercase mb-3 ${dark ? 'text-red-400' : 'text-[#FF0000]'}`}>{g.kicker}</p>
          <h3 className={`text-2xl md:text-3xl font-black leading-snug mb-3 ${dark ? 'text-white' : 'text-black'}`}>{g.title}</h3>
          <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{g.sub}</p>
          <PrimaryCta href="#apply">Register & download the guide</PrimaryCta>
          <p className={`text-xs mt-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>Free. Unlocks through the TNJEE common application — no separate form.</p>
        </div>
        <div className={`relative rounded-2xl p-6 border ${dark ? 'border-white/10 bg-black/40' : 'border-gray-100 bg-gray-50'}`}>
          <span className={`absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${dark ? 'bg-[#FF0000] text-white' : 'bg-black text-white'}`}>
            <Lock className="w-3 h-3" /> Unlocks on registration
          </span>
          <ul className="space-y-3 mt-2">
            {g.items.map((it) => (
              <li key={it} className={`flex items-start gap-2.5 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#FF0000] flex-shrink-0" /> {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// §3 Pathway 01 — B.Tech CSE with Google Cloud (+ separate OCN block)
// ═════════════════════════════════════════════════════════════════════════════
export const PathwayOne = () => {
  const logos = usePartnerLogos();
  return (
    <section id="pathway-01" className="scroll-mt-36 bg-[#050510] py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <SectionHead kicker={pathway01.tag} title="B.Tech CSE" accent="with Google Cloud" sub={pathway01.intro} className="mb-0" />
          <motion.div {...reveal(1)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 self-start lg:self-auto">
            <span className="text-white/40 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">Powered by</span>
            <img src={logos.google} alt="Google Cloud" className="h-5 object-contain opacity-80" />
          </motion.div>
        </div>

        {/* Techno India University degree programmes */}
        <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mt-14 mb-5">Techno India University degree programmes</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pathway01.programmes.map((p, i) => <ProgrammeCard key={p.slug} p={p} i={i} />)}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {pathway01.highlights.map((h, i) => <Highlight key={h.title} h={h} i={i} icon={[Cloud, Building2, Users][i]} />)}
        </div>

        {/* Dedicated OCN block — distinct from the degree list, disclaimer in view */}
        <motion.div {...reveal()} className="mt-16 relative rounded-3xl border border-white/12 overflow-hidden p-7 md:p-10"
          style={{ background: 'linear-gradient(155deg, rgba(44,44,134,0.18) 0%, rgba(9,8,10,0.55) 55%, rgba(255,0,0,0.05) 100%)' }}>
          <div className="absolute -top-16 -right-10 w-56 h-56 bg-[#2C2C86]/25 rounded-full blur-[90px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-4">{ocnBlock.kicker}</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">{ocnBlock.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{ocnBlock.body}</p>
              <div className="bg-white rounded-xl px-4 py-3 shadow-lg inline-block mb-6">
                <img src={ocnLockup} alt="IIT Kharagpur OCN — Outreach Course Network" className="h-10 md:h-12 w-auto object-contain" />
              </div>
              <div>
                <Link to={ocnBlock.moreLink} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
                  How the OCN micro-specialisation works <ArrowUpRight className="w-4 h-4 group-hover:text-[#FF0000] transition-colors" />
                </Link>
              </div>
            </div>
            <div>
              <ul className="divide-y divide-white/6 mb-5">
                {ocnBlock.credentials.map((c, i) => (
                  <motion.li key={c} {...reveal(i)} className="flex gap-4 py-4 hover:pl-2 transition-all duration-300">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#FF0000]/8 border border-[#FF0000]/20 flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#FF0000]" />
                    </div>
                    <span className="text-gray-200 text-sm leading-relaxed self-center">{c}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-gray-500 text-[11px] mb-4">{ocnBlock.note}</p>
              <DisclaimerPanel compact />
            </div>
          </div>
        </motion.div>

        {/* Student voice */}
        <motion.figure {...reveal()} className="relative mt-16 max-w-4xl mx-auto text-center">
          <Quote className="w-10 h-10 text-red-500/30 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-black text-white leading-snug tracking-tight">
            “{pathway01.testimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 text-sm text-gray-500">
            <span className="text-white font-bold">{pathway01.testimonial.name}</span> · {pathway01.testimonial.meta}
          </figcaption>
        </motion.figure>

        <div className="mt-16">
          <ExamGuideCard g={examGuides.p01} />
        </div>
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// §4 Pathway 02 — Courses with IBM (light)
// ═════════════════════════════════════════════════════════════════════════════
export const PathwayTwo = () => {
  const logos = usePartnerLogos();
  return (
    <section id="pathway-02" className="scroll-mt-36 py-24 px-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHead tone="light" kicker={pathway02.tag} title="Courses" accent="with IBM" sub={pathway02.intro} className="mb-0" />
          <motion.div {...reveal(1)} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm self-start lg:self-auto">
            <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap">In collaboration with</span>
            <img src={logos.ibm} alt="IBM" className="h-7 object-contain" />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pathway02.programmes.map((p, i) => <ProgrammeCard key={p.slug} p={p} i={i} tone="light" />)}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14 mb-16">
          {pathway02.highlights.map((h, i) => <Highlight key={h.title} h={h} i={i} tone="light" icon={[Award, Sparkles, Users][i]} />)}
        </div>

        <ExamGuideCard g={examGuides.p02} tone="light" />
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// §5 Future-Ready Kit (dark strip, ScholarshipsStrip treatment)
// ═════════════════════════════════════════════════════════════════════════════
const KIT_ICONS = { FileCheck2, Map, Sparkles, Compass };

export const FutureReadyKit = () => (
  <section id="kit" className="scroll-mt-36 py-24 px-4 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,0,0,0.12)_0%,_transparent_50%)] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1fr_1.3fr] gap-14 items-start">
      <div className="lg:sticky lg:top-40">
        <SectionHead kicker="Free with registration" title="The TNJEE 2027" accent="Future-Ready Kit"
          sub="Everything you need to crack TNJEE and choose the right tech career — before you sit the exam." className="mb-10" />
        <motion.div {...reveal(1)} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {kit.stats.map((s) => (
            <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-base md:text-lg font-black text-white leading-tight break-words"><Val v={s.value} /></div>
              <div className="text-[10px] font-medium text-gray-500 mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div {...reveal(2)}>
          <PrimaryCta href="#apply">Unlock my free kit</PrimaryCta>
          <p className="text-xs text-gray-600 mt-4">Via the common application. No separate form.</p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {kit.items.map((k, i) => {
          const Icon = KIT_ICONS[k.icon] || Sparkles;
          return (
            <motion.div key={k.title} {...reveal(i)} whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-7 overflow-hidden transition-colors duration-500 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,0,0,0.08)]">
              <Corners hover />
              <span className="absolute top-5 right-6 text-5xl font-black leading-none select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)', color: 'transparent' }}>0{i + 1}</span>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-[#FF0000]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2 group-hover:text-red-400 transition-colors">{k.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{k.desc}</p>
              {k.extra && <p className="text-sm mt-3"><Val v={k.extra} /></p>}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §6 Common application — steps + form (light)
// ═════════════════════════════════════════════════════════════════════════════
export const CommonApplication = () => (
  <section id="apply" className="scroll-mt-36 py-24 px-0 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <div className="w-[90%] max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
      <div>
        <SectionHead tone="light" kicker="Common application" title="One application for" accent="both pathways"
          sub="Fill a single TNJEE 2027 application and choose Pathway 01 or Pathway 02 inside it. Your exam paper is assigned to match your choice." className="mb-12" />

        <ol className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#FF0000] via-red-200 to-transparent" aria-hidden />
          {steps.map((s, i) => (
            <motion.li key={s.title} {...reveal(i)} className="relative flex gap-6 pb-8 last:pb-0 group">
              <span className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#FF0000] text-[#FF0000] font-black text-sm flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white transition-colors duration-300">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-black text-black text-lg mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div {...reveal()} className="mt-10 rounded-2xl border border-gray-100 bg-white shadow-sm p-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-gray-500">Last date: <Val v={tnjee.lastDate} tone="light" className="font-bold text-black" /></span>
          <a href={`tel:${tnjee.helplineTel}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF0000] transition-colors">
            <Phone className="w-4 h-4 text-[#FF0000]" /> <span className="font-bold text-black">{tnjee.helpline}</span>
          </a>
        </motion.div>
      </div>

      <motion.div {...reveal(1)} className="relative lg:sticky lg:top-40">
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#FF0000]/30 rounded-tl-lg" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#FF0000]/30 rounded-br-lg" />
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Start your application</p>
        <EEFormWidget formId={tnjee.eeFormId} title="TNJEE 2027 Common Application" tone="light" />
      </motion.div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §7 Placements (dark)
// ═════════════════════════════════════════════════════════════════════════════
const CountOrVal = ({ v }) => {
  // Animate numeric values like "42", "18 LPA", "95%"; leave placeholders as chips
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const m = !isPlaceholder(v) && typeof v === 'string' && v.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!m || !inView) return;
    const end = parseFloat(m[1]);
    let raf; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / 1800, 1);
      setN(Math.floor(end * p * (2 - p)));
      if (p < 1) raf = requestAnimationFrame(step); else setN(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <Val v={v} />;
  return <span ref={ref} className="font-mono">{n}{m[2]}</span>;
};

export const Placements = () => (
  <section id="placements" className="scroll-mt-36 py-24 px-4 bg-[#020205] relative overflow-hidden">
    <GridBg opacity="opacity-[0.02]" />
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHead kicker="Careers" title="Internship &" accent="placement partners" sub="Where School of the Future students intern, train and get hired." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {careerStats.map((s, i) => (
          <motion.div key={s.label} {...reveal(i)}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-red-500 transition-colors duration-300"><CountOrVal v={s.value} /></div>
            <div className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <h3 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-6">Placement partners</h3>
      <div className="relative overflow-hidden mb-14 -mx-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-scroll-left">
          {[...recruiters, ...recruiters, ...recruiters].map((r, i) => (
            <div key={i} className="flex-shrink-0 mx-3 w-36 h-16 rounded-xl bg-white flex items-center justify-center p-3 opacity-80 hover:opacity-100 transition-opacity">
              <img src={r.logo} alt={i < recruiters.length ? r.name : ''} aria-hidden={i >= recruiters.length} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-6">Internship partners</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        {internshipPartners.map((p, i) => (
          <div key={i} className="h-16 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-xs">
            <Val v={p} />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {readiness.map((h, i) => <Highlight key={h.title} h={h} i={i} icon={[CheckCircle2, Award, Users][i]} />)}
      </div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §8 Who we are (light)
// ═════════════════════════════════════════════════════════════════════════════
const INSTITUTION_LOGOS = {
  tig: '/assets/tnjee/tig-mark.png',
  tiu: '/assets/tnjee/tiu-wordmark.png',
  sof: '/assets/tnjee/sof-wordmark.png',
};

const initials = (name) => name.replace(/^Prof\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');

export const WhoWeAre = () => (
  <section className="py-24 px-0 bg-white overflow-hidden">
    <div className="w-[90%] max-w-7xl mx-auto">
      <SectionHead tone="light" kicker="Who we are"
        title="Techno India Group. Techno India University." accent="School of the Future."
        sub="The scale of Eastern India's largest education group, the depth of a research university, and a school built for the AI decade." />

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {institutions.map((inst, i) => (
          <motion.div key={inst.key} {...reveal(i)}
            className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-red-500/20 transition-all duration-300">
            <div className="h-16 mb-6 flex items-center">
              <img src={INSTITUTION_LOGOS[inst.key]} alt={inst.name} className="max-h-full w-auto object-contain" />
            </div>
            <h3 className="text-xl font-black text-black mb-3 group-hover:text-[#FF0000] transition-colors">{inst.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{inst.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...reveal()} className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 mb-16">
        {groupStats.map((s) => (
          <div key={s.label} className="bg-white p-6 text-center">
            <div className="text-2xl md:text-3xl font-black text-black"><Val v={s.value} tone="light" /></div>
            <div className="text-xs font-medium text-gray-500 mt-2 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {leaders.map((l, i) => (
          <motion.figure key={l.name} {...reveal(i)}
            className="relative rounded-3xl bg-black text-white p-8 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,0,0,0.15)_0%,_transparent_60%)] pointer-events-none" />
            <Quote className="relative w-8 h-8 text-[#FF0000] mb-6" />
            <blockquote className="relative text-lg md:text-xl font-semibold leading-relaxed text-gray-100 mb-8">“{l.quote}”</blockquote>
            <figcaption className="relative flex items-center gap-4">
              {l.photo
                ? <img src={l.photo} alt={l.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
                : <span className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center font-black text-white" aria-hidden>{initials(l.name)}</span>}
              <span>
                <span className="block font-black text-white">{l.name}</span>
                <span className="block text-xs text-gray-400 mt-0.5">{l.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §9 Student voices (dark)
// ═════════════════════════════════════════════════════════════════════════════
export const StudentVoices = () => (
  <section className="py-24 px-4 bg-[#020205] relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/[0.04] rounded-full blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHead kicker="Student voices" title="From the" accent="School of the Future" center />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {studentVoices.map((s, i) => (
          <motion.figure key={i} {...reveal(i)} whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-red-500/30 hover:bg-white/[0.06] transition-colors duration-500">
            <Quote className="w-6 h-6 text-red-500/40 mb-5" />
            <blockquote className="text-gray-200 text-sm leading-relaxed flex-1"><Val v={s.quote.startsWith('[') ? s.quote : `“${s.quote}”`} /></blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/[0.06]">
              <span className="block font-bold text-white text-sm"><Val v={s.name} /></span>
              <span className="block text-xs text-gray-500 mt-1"><Val v={s.meta} /></span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §10 In the news (light)
// ═════════════════════════════════════════════════════════════════════════════
export const InTheNews = () => (
  <section className="py-24 px-0 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <div className="w-[90%] max-w-7xl mx-auto">
      <SectionHead tone="light" kicker="Press" title="In the" accent="news" />
      <div className="grid md:grid-cols-2 gap-5">
        {press.map((p, i) => {
          const Tag = p.url ? 'a' : 'div';
          return (
            <motion.div key={i} {...reveal(i)}>
              <Tag {...(p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-5 h-full bg-white rounded-3xl p-7 border border-gray-100 shadow-lg hover:shadow-xl hover:border-red-500/20 hover:-translate-y-1 transition-all duration-300">
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-[#FF0000]" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-widest text-[#FF0000] mb-2">{p.outlet}</span>
                  <span className="block text-black font-bold leading-snug group-hover:text-[#FF0000] transition-colors">{p.headline}</span>
                </span>
                {p.url && <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF0000] transition-colors flex-shrink-0" />}
              </Tag>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ═════════════════════════════════════════════════════════════════════════════
// §11 Campus tour & gallery (dark)
// ═════════════════════════════════════════════════════════════════════════════
export const CampusGallery = () => {
  const hasTour = !isPlaceholder(tnjee.campusTourUrl);
  const [first, ...rest] = gallery;
  return (
    <section id="campus" className="scroll-mt-36 py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHead kicker="Campus" title="Campus tour" accent="& gallery" className="mb-0" />
          <motion.div {...reveal(1)}>
            {hasTour ? (
              <a href={tnjee.campusTourUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
                Watch the campus tour on YouTube <ArrowUpRight className="w-4 h-4 group-hover:text-[#FF0000] transition-colors" />
              </a>
            ) : (
              <span className="text-sm text-gray-500">Watch the campus tour on YouTube · <Val v={tnjee.campusTourUrl} /></span>
            )}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[560px]">
          <motion.a {...reveal()} href={hasTour ? tnjee.campusTourUrl : '/gallery'} {...(hasTour ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group relative md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/3] md:aspect-auto">
            <img src={first.src} alt={first.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-red-500/50" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-red-500/50" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-20 h-20 rounded-full bg-[#FF0000] flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </span>
            </span>
            <span className="absolute bottom-8 left-8 text-white font-black text-xl">Campus tour</span>
          </motion.a>
          {rest.map((g, i) => (
            <motion.div key={g.src} {...reveal(i + 1)} className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-auto">
              <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors group">
            View full gallery <ArrowRight className="w-4 h-4 group-hover:text-[#FF0000] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// §12 Final CTA + TNJEE contact/downloads (Home §14 treatment)
// ═════════════════════════════════════════════════════════════════════════════
export const FinalCta = () => {
  const brochure = tnjee.brochureUrl || tnjee.brochureWhatsApp;
  const downloads = [
    { label: 'TNJEE Brochure', href: brochure, external: true },
    { label: 'Admission Notice 2027', href: tnjee.admissionNoticeUrl, external: true },
    { label: 'Exam guides (on registration)', href: '#apply' },
    { label: 'Future-Ready Kit', href: '#kit' },
  ];
  return (
    <section className="py-24 bg-black relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.15)_0%,_transparent_70%)]" />
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.1), transparent, rgba(255,0,0,0.05))', backgroundSize: '200% 200%' }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...reveal()} className="text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Your seat at the School of the Future{' '}
            <span className="bg-[#FF0000] px-4 py-1 inline-block mt-2">starts here.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            One application. Two pathways. Last date: <Val v={tnjee.lastDate} />.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCta href="#apply" className="px-10 py-5 text-base">Apply for TNJEE 2027</PrimaryCta>
            <SecondaryCta href={brochure} external icon={Download} className="px-10 py-5 text-base bg-white/10 border-white/20">Get the Brochure</SecondaryCta>
          </div>
        </motion.div>

        <motion.div {...reveal(1)} className="mt-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-12">
          <div>
            <p className="text-white font-black text-lg mb-2">TNJEE 2027</p>
            <p className="text-gray-500 text-sm leading-relaxed">Techno National Joint Entrance Examination for admission to Techno India University, West Bengal.</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Contact</p>
            <p className="flex items-start gap-3 text-gray-400"><MapPin className="w-4 h-4 text-[#FF0000] mt-0.5 flex-shrink-0" />{tnjee.address}</p>
            <a href={`mailto:${tnjee.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"><Mail className="w-4 h-4 text-[#FF0000]" />{tnjee.email}</a>
            <a href={`tel:${tnjee.helplineTel}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"><Phone className="w-4 h-4 text-[#FF0000]" />{tnjee.helpline}</a>
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Downloads</p>
            <ul className="space-y-3 text-sm">
              {downloads.map((d) => (
                <li key={d.label}>
                  {d.href ? (
                    <a href={d.href} {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                      <Download className="w-4 h-4 text-[#FF0000]" /> {d.label}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-gray-600" title="Link pending">
                      <Download className="w-4 h-4" /> {d.label} <Val v="[link]" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
