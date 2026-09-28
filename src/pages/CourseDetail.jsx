import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Award, Briefcase, Building2, Calendar,
  CheckCircle2, ChevronDown, ChevronRight, Clock, GraduationCap, IndianRupee,
  Sparkles, Target, Users,
} from 'lucide-react';
import coursesData from '../data/mock_courses.json';
import { getCourseContent } from '../data/course_content';
import { getCareerPaths } from '../utils/careerPaths';
import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Evergreen, already-published claims reused verbatim from other TIU pages
// (Home / GoogleIBMCourse). Used only as a fallback for courses that do not
// yet have their own highlights in course_content.js.
const PROOF_POINTS = [
  { title: 'Embedded certifications', detail: '10+ industry certifications earned inside the degree, not sold as an add-on.' },
  { title: '200+ hiring partners', detail: 'Structured internships fed into the curriculum through TIU\'s partner network.' },
  { title: '90%+ placement record', detail: 'Across TIU\'s School of the Future programmes.' },
  { title: 'Co-designed coursework', detail: 'Built with Google Cloud and IBM engineers rather than adapted from a generic syllabus.' },
];

const Section = ({ id, title, icon: Icon, children, delay = 0, className = '' }) => (
  <motion.section
    id={id}
    {...fadeUp}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ ...fadeUp.transition, delay }}
    className={`mt-20 scroll-mt-28 ${className}`}
  >
    <div className="flex items-center gap-3 mb-6">
      {Icon && <Icon className="w-5 h-5 text-[#FF0000] shrink-0" />}
      <h2 className="text-2xl md:text-[27px] font-black leading-tight">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const FaqItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.03] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-semibold text-white text-[15px] leading-snug">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {/* Answer stays in the DOM so crawlers and prerendered HTML see it */}
      <div className={open ? 'block' : 'hidden'}>
        <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const { slug } = useParams();
  const course = useMemo(() => coursesData.find((c) => c.id === slug), [slug]);
  const content = useMemo(() => getCourseContent(slug), [slug]);

  const related = useMemo(() => {
    if (!course) return [];
    return coursesData
      .filter((c) => c.id !== course.id && c.category === course.category)
      .slice(0, 3);
  }, [course]);

  if (!course) return <Navigate to="/courses" replace />;

  const shortTitle = course.title.replace(/\s*(Powered by|in Collaboration with Powered by)\s*(GOOGLE|IBM)\s*$/i, '').trim();
  const eligibility = course.eligibility || content?.eligibility || '10+2 pass (stream as per program)';

  const title = course.seoTitle || `${course.title} | Fees, Eligibility & Curriculum | Techno India University`;
  const description = course.seoDescription || `${course.description} Explore eligibility, duration, and how to apply for ${course.title} at Techno India University, Kolkata.`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    url: `https://www.technoindiauniversity.ai/courses/${course.id}`,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: 'Techno India University',
      sameAs: 'https://www.technoindiauniversity.ai',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      duration: course.duration || undefined,
      location: {
        '@type': 'Place',
        name: 'Techno India University, Kolkata',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'IN',
        },
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.technoindiauniversity.ai/apply',
        availability: 'https://schema.org/InStock',
      },
    },
  };

  const faqSchema = content?.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const facts = [
    { icon: Clock, label: 'Duration', value: course.duration || '4 Years' },
    { icon: GraduationCap, label: 'Eligibility', value: eligibility },
    ...(course.fee ? [{ icon: IndianRupee, label: 'Programme Fee', value: course.fee }] : []),
    ...(course.partner ? [{ icon: Award, label: 'Delivery Partner', value: course.partner }] : []),
  ];

  const highlights = content?.highlights?.length ? content.highlights : PROOF_POINTS;

  const navLinks = [
    content?.overview && { href: '#overview', label: 'Overview' },
    { href: '#careers', label: 'Careers' },
    content?.faqs?.length && { href: '#faqs', label: 'FAQs' },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#020205] text-white relative overflow-x-hidden selection:bg-[#FF0000] selection:text-white">
      <SEO title={title} description={description} />
      <SchemaInjector schema={courseSchema} />
      {faqSchema && <SchemaInjector schema={faqSchema} />}

      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF0000]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-28 relative z-10">

        {/* Breadcrumb trail */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-10 font-medium flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/courses" className="hover:text-white transition-colors">Programs &amp; Courses</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-300">{course.title}</span>
        </nav>

        {/* Hero */}
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 bg-white/5 text-white/70 text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-[#FF0000]" />
            {course.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 max-w-3xl">
            {course.seoH1 || course.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-8">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF0000] text-white text-sm font-bold hover:bg-[#e00000] transition-colors shadow-[0_0_30px_rgba(255,0,0,0.25)]"
            >
              Apply for This Program
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Compare All Programs
            </Link>
          </div>
        </motion.div>

        {/* Quick facts strip */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
        >
          {facts.map((f, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <f.icon className="w-5 h-5 text-[#FF0000] mb-3" />
              <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1">{f.label}</div>
              <div className="text-white font-semibold text-sm leading-snug">{f.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Jump nav */}
        {navLinks.length > 2 && (
          <motion.nav
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            aria-label="On this page"
            className="flex flex-wrap gap-2 mt-8"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-semibold px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-[#FF0000]/40 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}

        {/* Overview */}
        {content?.overview && (
          <Section id="overview" title={`About the ${shortTitle} programme`} icon={Target} delay={0.15}>
            <p className="text-gray-300 text-[17px] leading-[1.8] max-w-3xl">
              {content.overview}
            </p>
          </Section>
        )}

        {/* Why this programme */}
        <Section id="why" title={`Why study ${shortTitle} at TIU`} icon={CheckCircle2} delay={0.15}>
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[15px] mb-1.5 leading-snug">{h.title}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{h.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Who it's for */}
        {content?.whoFor?.length > 0 && (
          <Section id="who" title="Who this programme suits" icon={Users} delay={0.15}>
            <ul className="grid sm:grid-cols-2 gap-3">
              {content.whoFor.map((w, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <Users className="w-4 h-4 text-[#FF0000] shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Careers */}
        <Section id="careers" title="Where this degree takes you" icon={Briefcase} delay={0.15}>
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-3">Roles graduates target</div>
          <div className="flex flex-wrap gap-3">
            {getCareerPaths(course.title).map((path, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-white/5 text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                {path}
              </span>
            ))}
          </div>

          {content?.industries?.length > 0 && (
            <>
              <div className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-3 mt-8">
                Industries that hire
              </div>
              <div className="flex flex-wrap gap-3">
                {content.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-white/[0.03] text-gray-300 text-sm font-medium px-4 py-2.5 rounded-xl border border-white/10"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                    {ind}
                  </span>
                ))}
              </div>
            </>
          )}
        </Section>

        {/* FAQs */}
        {content?.faqs?.length > 0 && (
          <Section id="faqs" title={`${shortTitle}: common questions`} icon={Sparkles} delay={0.15}>
            <div className="space-y-3">
              {content.faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </Section>
        )}

        {/* Related programs */}
        {related.length > 0 && (
          <Section id="related" title={`Related programs in ${course.category}`} delay={0.15} className="mt-20 pt-14 border-t border-white/10">
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((c) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-[#FF0000]/30 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-bold text-white text-sm leading-snug group-hover:text-[#FF0000] transition-colors">{c.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 shrink-0 group-hover:text-[#FF0000] transition-colors" />
                  </div>
                  <span className="text-xs text-gray-500">{c.duration || '4 Years'}</span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Closing CTA */}
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="mt-20 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 rounded-3xl p-10 text-center"
        >
          <Calendar className="w-8 h-8 text-[#FF0000] mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-3">Admissions for 2026 are open</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Talk to the admissions team about eligibility, scholarships, and the application timeline for {course.title}.
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF0000] text-white text-sm font-bold hover:bg-[#e00000] transition-colors"
          >
            Start Your Application
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default CourseDetail;
