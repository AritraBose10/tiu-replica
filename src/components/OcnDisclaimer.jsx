// Mandatory IIT Kharagpur OCN disclaimer — verbatim from PS/OCN/BRAND/2026-01 §4.1.
// Must appear legibly, in the same field of view as any IIT Kharagpur reference.
// Do not paraphrase: changes need fresh ProofSlate approval.
export const OCN_DISCLAIMER = "IIT Kharagpur provides specific micro-specialisation course(s) to students of this programme through its Outreach Course Network. The degree/programme is awarded solely by Techno India University. IIT Kharagpur does not award, co-award, or endorse any degree of Techno India University. All IIT Kharagpur credentials (OCN Student Identity Card, institutional email ID, OCN Micro-Specialisation Certificate, and OCN Alumni Status) are subject to IIT Kharagpur's policies and conferred at its sole discretion.";

const tones = {
  dark: {
    box: 'border-white/12 bg-white/[0.04]',
    label: 'text-gray-500',
    text: 'text-gray-300',
  },
  light: {
    box: 'border-gray-200 bg-gray-50',
    label: 'text-gray-500',
    text: 'text-gray-700',
  },
};

export const DisclaimerPanel = ({ className = '', tone = 'dark', compact = false }) => {
  const t = tones[tone] || tones.dark;
  return (
    <div className={`rounded-xl border ${t.box} ${compact ? 'px-4 py-3' : 'px-5 py-4'} ${className}`}>
      <p className={`text-[10px] font-black tracking-widest uppercase ${t.label} ${compact ? 'mb-1.5' : 'mb-2'}`}>Important — please read</p>
      <p className={`${t.text} ${compact ? 'text-[12px]' : 'text-[13px]'} leading-relaxed`}>{OCN_DISCLAIMER}</p>
    </div>
  );
};

export default DisclaimerPanel;
