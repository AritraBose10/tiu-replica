/**
 * TNJEE 2027 landing page content (/tnjee).
 *
 * Every value still wrapped in [square brackets] is a placeholder awaiting real
 * data. The page renders those with a dashed "pending" style so they are easy
 * to spot in review. Replace the string and the styling disappears.
 *
 * IIT Kharagpur OCN copy on this page follows PS/OCN/BRAND/2026-01:
 *  - the TIU degree is always the headline; OCN is a micro-specialisation add-on
 *  - OCN content sits in its own block, separate from degree listings
 *  - the mandatory disclaimer (src/components/OcnDisclaimer.jsx) is in the same
 *    field of view as every IIT Kharagpur reference, including above the fold
 *  - credential names use the exact approved phrasing (§3)
 * Any edit to OCN wording needs fresh ProofSlate approval before it goes live.
 */

export const isPlaceholder = (v) => typeof v === 'string' && v.trim().startsWith('[');

// ─── Global facts ─────────────────────────────────────────────────────────────
export const tnjee = {
  lastDate: '[DD.MM.2027]',
  examDate: '[Exam date]',
  helpline: '080 6264 2222',
  helplineTel: '08062642222',
  email: 'info@technoindiauniversity.ai',
  address: 'EM-4, Sector V, Salt Lake, Kolkata 700091',
  // Downloads: set to a real URL to enable; null falls back to WhatsApp request
  brochureUrl: null,
  admissionNoticeUrl: null,
  brochureWhatsApp: "https://wa.me/916292233351?text=Hi%2C%20I'd%20like%20the%20TNJEE%202027%20brochure",
  // ExtraEdge form used for the common application (same widget as the site's enquiry form)
  eeFormId: 'form-8',
  campusTourUrl: '[YouTube campus tour URL]',
};

export const announcementItems = [
  'TNJEE 2027 · Applications Open',
  'Admission Notice 2027',
  'Two Pathways · One Application',
  'Free Future-Ready Kit on Registration',
  `Admission Helpline · ${tnjee.helpline}`,
];

export const sectionNav = [
  { id: 'pathway-01', label: 'B.Tech CSE · Google Cloud' },
  { id: 'pathway-02', label: 'Courses with IBM' },
  { id: 'kit', label: 'Free Kit' },
  { id: 'apply', label: 'How to Apply' },
  { id: 'placements', label: 'Placements' },
  { id: 'campus', label: 'Campus' },
];

export const heroFacts = [
  { label: 'Last date to apply', value: tnjee.lastDate },
  { label: 'Exam mode', value: `Online · ${tnjee.examDate}` },
  { label: 'Programmes', value: 'UG · PG · Ph.D.' },
];

// ─── Pathway 01 ───────────────────────────────────────────────────────────────
export const pathway01 = {
  tag: 'Pathway 01',
  title: 'B.Tech CSE with Google Cloud',
  short: 'Four-year Techno India University B.Tech degrees with Google Cloud skills every semester',
  intro:
    'Four-year B.Tech degrees awarded solely by Techno India University, with Google Cloud skills earned every semester. The programme includes IIT Kharagpur OCN micro-specialisation course(s) delivered through the Outreach Course Network.',
  programmes: [
    { slug: 'btech-cse', title: 'B.Tech CSE', desc: 'Computer Science & Engineering' },
    { slug: 'btech-cse-ai-ml', title: 'CSE (AI-ML)', desc: 'Artificial Intelligence & Machine Learning' },
    { slug: 'btech-cse-data-science', title: 'CSE (Data Science)', desc: 'Data engineering, analytics & ML' },
    { slug: 'btech-cse-cloud', title: 'CSE (Cloud Computing)', desc: 'Cloud architecture & DevOps on Google Cloud' },
  ],
  highlights: [
    { title: 'Google Cloud, every semester', desc: "Earn Google Cloud badges and certifications each semester through the programme's Google Cloud collaboration." },
    { title: 'A Google Cloud digital campus', desc: 'Techno India was the first institution in Eastern India to launch a Digital Campus on Google Cloud.' },
    { title: 'Industry immersion', desc: "First-year students have visited Google's India headquarters as part of industry immersion." },
  ],
  testimonial: {
    quote: 'A cutting-edge curriculum, mentors and industry experts, and a visit to Google India headquarters — a dream come true.',
    name: 'Priyanka Sen',
    meta: 'B.Tech CSE (AI/ML), Batch 2024–2028',
  },
};

// Dedicated OCN block — kept separate from the degree list (brand guideline §5)
export const ocnBlock = {
  kicker: 'Add-on micro-specialisation',
  title: 'IIT Kharagpur OCN micro-specialisation',
  body:
    'Techno India University is an onboarded partner of the IIT Kharagpur Outreach Course Network, via ProofSlate. Students can earn an IIT Kharagpur OCN Micro-Specialisation Certificate alongside their Techno India University degree.',
  credentials: [
    'IIT Kharagpur OCN Micro-Specialisation Certificate upon successful completion',
    'IIT Kharagpur OCN Student Identity Card for the programme duration',
    'IIT Kharagpur OCN email ID for the programme duration',
    'IIT Kharagpur OCN Alumni Status upon successful completion',
  ],
  note: "Benefits available to qualifying learners, at IIT Kharagpur's sole discretion. Not guaranteed.",
  moreLink: '/btech-admission-iit-kharagpur-collaboration',
};

// ─── Pathway 02 ───────────────────────────────────────────────────────────────
export const pathway02 = {
  tag: 'Pathway 02',
  title: 'Courses with IBM',
  short: 'Data, AI and business programmes with IBM certifications',
  intro:
    'Data, AI and business courses where IBM badges and certifications sit inside the curriculum, semester after semester.',
  programmes: [
    { slug: 'bca-data-science-ai', level: '4-year UG', title: 'BCA', desc: 'Data Science & AI' },
    { slug: 'bba-business-analytics', level: '4-year UG', title: 'BBA', desc: 'Business Analytics' },
    { slug: 'bsc-data-analytics-gen-ai', level: '4-year UG', title: 'B.Sc', desc: 'Data Analytics' },
    { slug: 'mba-ibm', level: 'PG', title: 'MBA', desc: '[Specialisation]' },
  ],
  highlights: [
    { title: 'IBM badges & certifications', desc: 'Earn IBM credentials each semester, so your CV builds as your degree does.' },
    { title: 'Data, AI and analytics at the core', desc: 'Curricula shaped around the tools and problems employers hire for in data and business roles.' },
    { title: 'Mentored from day one', desc: 'A dedicated mentor for every programme and batch, plus a placement-readiness track in aptitude and soft skills.' },
  ],
};

export const examGuides = {
  p01: {
    kicker: 'Exam pattern & syllabus · Pathway 01',
    title: 'Know exactly what your TNJEE paper will ask',
    sub: 'The complete guide to the paper for B.Tech CSE with Google Cloud.',
    items: ['Section-wise question split, marks and duration', 'Full syllabus, topic by topic', 'Marking scheme and eligibility', 'Sample questions with worked solutions'],
  },
  p02: {
    kicker: 'Exam pattern & syllabus · Pathway 02',
    title: 'Walk into the exam already knowing the paper',
    sub: 'The complete guide to the paper for courses with IBM.',
    items: ['Section-wise question split, marks and duration', 'Full syllabus for UG and PG courses', 'Marking scheme and eligibility', 'Sample questions with worked solutions'],
  },
};

// ─── Future-Ready Kit ─────────────────────────────────────────────────────────
export const kit = {
  stats: [
    { value: '[__]', label: 'students have unlocked the kit' },
    { value: '[Top scorers]', label: 'Top scorers' },
    { value: '[Mock-test scholarship / benefit]', label: 'Mock-test benefit' },
  ],
  items: [
    { icon: 'FileCheck2', title: 'Full-length mock tests', desc: 'One for each pathway, scored, with your section-wise performance.' },
    { icon: 'Map', title: 'AI Career Map 2027', desc: 'The tech and data roles companies are hiring for, the skills each needs, and the course that gets you there.' },
    { icon: 'Sparkles', title: 'Live AI masterclass seat', desc: 'Build your first AI project with School of the Future faculty.', extra: '[Topic · Date]' },
    { icon: 'Compass', title: 'Which course fits you?', desc: 'A 10-question match that points you to AI-ML, Data Science, Cloud or an IBM course.' },
  ],
};

// ─── Application steps ────────────────────────────────────────────────────────
export const steps = [
  { title: 'Register & pick your pathway', desc: 'Unlock your exam guide and Future-Ready Kit, then complete the application before the last date.' },
  { title: 'Upload documents', desc: 'Photograph, signature and marksheet.' },
  { title: 'Take TNJEE online', desc: 'Sit the paper for your chosen pathway.' },
  { title: 'Attend counselling', desc: 'Confirm your programme and secure your seat.' },
];

// ─── Careers ──────────────────────────────────────────────────────────────────
export const careerStats = [
  { value: '[___]', label: 'Recruiting partners' },
  { value: '[__ LPA]', label: 'Highest package' },
  { value: '[__ LPA]', label: 'Average package' },
  { value: '[__%]', label: 'Students with internships' },
];

// Same recruiter set the /apply page already shows
const R = (name, file = name) => ({ name, logo: `/assets/recruiters/Placement_Drive_Logos/${file}.png` });
export const recruiters = [
  R('Accenture'), R('Adani'), R('Adobe'), R('Amazon'), R('Capgemini'), R('Cisco'),
  R('Cognizant'), R('Deloitte'), R('Flipkart'), R('Google'), R('HCL Technologies', 'HCL_Technologies'), R('IBM'),
  R('Infosys'), R('Intel'), R('KPMG'), R('L&T'), R('HDFC Bank'), R('ICICI Bank'),
];

export const internshipPartners = Array.from({ length: 6 }, () => '[Internship partner]');

export const readiness = [
  { title: 'Placement readiness from year one', desc: 'Aptitude and soft-skills tracks with readiness checkpoints across every batch.' },
  { title: 'Industry certifications on your CV', desc: 'Google Cloud and IBM credentials earned during the degree.' },
  { title: 'A mentor for every batch', desc: 'One mentor per programme per batch, reporting to the Head of School.' },
];

// ─── Who we are ───────────────────────────────────────────────────────────────
export const institutions = [
  { key: 'tig', name: 'Techno India Group', body: 'One of the largest educational conglomerates in Eastern India, with alumni working across leading multinationals. The first in Eastern India to launch a Digital Campus on Google Cloud.' },
  { key: 'tiu', name: 'Techno India University, West Bengal', body: "A university built on innovation, research and industry-ready learning, at Salt Lake Sector V — the heart of Kolkata's IT hub." },
  { key: 'sof', name: 'School of the Future', body: 'Launched in 2024 to deliver four-year, industry-integrated degrees with Google Cloud and IBM — certifications every semester, mentors for every batch.' },
];

export const groupStats = [
  { value: '[__]+', label: 'Schools' },
  { value: '[__]+', label: 'Faculty & researchers' },
  { value: '[__]+', label: 'Academic programmes' },
  { value: '[__]+', label: 'Students' },
  { value: '[__]+', label: 'Global alumni' },
];

export const leaders = [
  {
    name: 'Prof. Goutam Roy Chowdhury',
    role: 'Chairman, Techno India Group · Chancellor, Techno India University',
    quote: 'Our aim is not to make people literate but to educate them in how best to use their knowledge and skills. I welcome students from all sectors to experience their academics with Techno India Group.',
    photo: null,
  },
  {
    name: 'Prof. Meghdut Roy Chowdhury',
    role: 'Executive Director & Chief Innovation Officer, Techno India Group',
    quote: 'We empower students not just with knowledge, but with the confidence to lead and inspire change. Join us, and let your future take centre stage.',
    photo: null,
  },
];

// ─── Student voices, press, gallery ───────────────────────────────────────────
export const studentVoices = [
  { quote: 'A visit to Google, no-code sessions and the ESD programme, backed by practical learning and dedicated mentorship.', name: 'Anushka Mondal', meta: 'B.Tech CSE (Data Science) · 2024–2028' },
  { quote: 'Industry-ready skills through tech sessions, startup ideation and an industry immersion visit to Google India HQ.', name: 'Joyjit Das', meta: 'B.Tech CSE (AI/ML) · 2024–2028' },
  { quote: 'The syllabus is always aligned with industry trends, and the faculty are genuinely supportive.', name: 'Suchismita Behera', meta: 'B.Tech CSE (AI/ML) · 2024–2028' },
  { quote: '[Quote from a BCA / BBA / B.Sc student on the IBM programme]', name: '[Student name]', meta: '[IBM programme] · [Batch]' },
];

// url: null until the article link is confirmed
export const press = [
  { outlet: 'Business Standard', headline: 'Techno India Group partners with Google for specialised B.Tech programmes', url: null },
  { outlet: 'The Telegraph', headline: 'TIU and IBM launch UG programmes in business analytics and data science', url: null },
  { outlet: 'Business Standard', headline: 'Techno India University launches the School of the Future', url: null },
  { outlet: 'The Hindu', headline: 'Shankar Mahadevan and Shabana Azmi receive honorary doctorates from TIU', url: null },
];

export const gallery = [
  { src: '/assets/images/campus.webp', alt: 'Techno India University campus building, Salt Lake Sector V' },
  { src: '/assets/images/c1.webp', alt: 'Techno India University main entrance lobby' },
  { src: '/assets/images/google.webp', alt: 'School of the Future students at Google India headquarters' },
  { src: '/assets/images/hackathon1.webp', alt: 'Students at a School of the Future hackathon' },
  { src: '/assets/images/seminar.webp', alt: 'Seminar in the university auditorium' },
];
