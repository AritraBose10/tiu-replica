import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { reveal } from './motion';
import { ArrowRight } from 'lucide-react';
import { isPlaceholder } from '../../data/tnjee';

// Placeholder-aware value: [bracketed] strings render as a dashed "pending" chip
export const Val = ({ v, className = '', tone = 'dark' }) => {
  if (!isPlaceholder(v)) return <span className={className}>{v}</span>;
  const chip = tone === 'light'
    ? 'border-gray-300 text-gray-400 bg-gray-50'
    : 'border-white/20 text-white/40 bg-white/[0.03]';
  return (
    <span className={`${className} inline-block border border-dashed rounded-md px-1.5 ${chip}`} title="Placeholder — awaiting data">
      {v}
    </span>
  );
};

// Section kicker pills — dark variant from WhatIsSoF, light from GoogleIBMBanner
export const Kicker = ({ children, tone = 'dark', className = '' }) =>
  tone === 'light' ? (
    <span className={`inline-block bg-red-100 text-[#FF0000] text-sm font-semibold px-5 py-2 rounded-full mb-6 relative border border-red-500/20 shadow-sm ${className}`}>
      {children}
      <span className="absolute inset-0 rounded-full animate-pulse bg-red-500/10" />
    </span>
  ) : (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6 ${className}`}>
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-red-500 text-sm font-semibold tracking-wide uppercase">{children}</span>
    </span>
  );

export const SectionHead = ({ kicker, title, accent, sub, tone = 'dark', center = false, className = '' }) => (
  <motion.div {...reveal()} className={`${center ? 'text-center mx-auto' : ''} max-w-4xl mb-14 ${className}`}>
    {kicker && <Kicker tone={tone}>{kicker}</Kicker>}
    <h2 className={`text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6 ${tone === 'light' ? 'text-black' : 'text-white'}`}>
      {title}{' '}
      {accent && (tone === 'light'
        ? <span className="text-[#FF0000]">{accent}</span>
        : <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">{accent}</span>)}
    </h2>
    {sub && (tone === 'light'
      ? <p className={`text-lg text-gray-500 max-w-2xl border-l-4 border-red-500 pl-6 py-1 ${center ? 'mx-auto text-left' : ''}`}>{sub}</p>
      : <p className={`text-gray-400 text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>{sub}</p>)}
  </motion.div>
);

// Buttons — same shapes as Hero / Home CTAs
export const PrimaryCta = ({ href, to, children, className = '', icon = true }) => {
  const cls = `inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#CC0000] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105 ${className}`;
  const inner = <>{children}{icon && <ArrowRight className="w-4 h-4" />}</>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
};

export const SecondaryCta = ({ href, children, tone = 'dark', className = '', external = false, icon: Icon }) => {
  const cls = tone === 'light'
    ? 'border border-black/15 text-black hover:bg-black/5 hover:border-black/40'
    : 'border border-white/30 text-white hover:bg-white/10 hover:border-white/60';
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 ${cls} ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}{children}
    </a>
  );
};

// Red corner brackets used on cards across the site
// (static class strings so Tailwind can see them; `hover` reveals on group-hover)
export const Corners = ({ hover = false }) => {
  const c = hover
    ? 'border-white/0 group-hover:border-red-500/40 transition-colors duration-500'
    : 'border-red-500/40';
  return (
    <>
      <div className={`absolute top-0 left-0 w-12 h-12 border-t border-l rounded-tl-2xl pointer-events-none ${c}`} />
      <div className={`absolute bottom-0 right-0 w-12 h-12 border-b border-r rounded-br-2xl pointer-events-none ${c}`} />
    </>
  );
};

export const GridBg = ({ opacity = 'opacity-[0.03]' }) => (
  <div className={`absolute inset-0 ${opacity} pointer-events-none`}
    style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
    }} />
);
