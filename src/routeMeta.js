export const HOSTNAME = 'https://www.technoindiauniversity.ai';
export const EXCLUDED_ROUTES = ['/admin', '/events-demo', '/thank-you'];

// Titles and descriptions are exact duplicates from each page's <SEO /> component
export const routeMeta = {
  '/': {
    title: 'Techno India University | Best Engineering College in Kolkata',
    description: "Techno India University — among the best engineering colleges in Kolkata. B.Tech, M.Tech & AI/ML courses powered by Google Cloud & IBM. Admissions 2026 open.",
    changefreq: 'daily',
    priority: 1.0
  },
  '/courses': {
    title: 'B.Tech, M.Tech, AI & Data Science Courses in Kolkata | Techno India University',
    description: 'Explore B.Tech CSE, M.Tech AI/ML, Data Science, Cloud Computing & AI courses in Kolkata at Techno India University. Powered by Google Cloud & IBM. Admissions 2026 open.',
    changefreq: 'weekly',
    priority: 0.9
  },
  ‘/about’: {
    title: ‘About Techno India University | Top Private Engineering College in West Bengal’,
    description: ‘Learn about Techno India University — one of the top private engineering colleges in West Bengal. Established in 2000, UGC-recognised, NAAC-accredited, and powered by Google Cloud & IBM.’,
    changefreq: 'monthly',
    priority: 0.8
  },
  ‘/apply’: {
    title: ‘Admissions 2026 | B.Tech, AI & MBA Programs | Techno India University Kolkata’,
    description: ‘Apply for 2026 admissions at Techno India University — one of the top private engineering colleges in West Bengal. B.Tech CSE, AI/ML, Data Science, Cloud Computing & more. Apply now.’,
    changefreq: 'weekly',
    priority: 0.9
  },
  '/cloud-ai-certification-courses-kolkata': {
    title: 'AI, Cloud & Data Science Courses in Kolkata | Google Cloud & IBM Certifications | TIU',
    description: 'Join the best AI training Institution in Kolkata. Earn Google Cloud & IBM certifications embedded in your B.Tech or BCA degree. AI/ML, Cloud Computing & Data Science courses in Kolkata. Admissions 2026.',
    changefreq: 'weekly',
    priority: 0.9
  },
  '/contact': {
    title: 'Contact Techno India University | Admissions & Campus Visit',
    description: 'Reach Techno India University’s School Of The Future for admissions, program queries and application guidance. Call 08062642222 or email for quick assistance..',
    changefreq: 'monthly',
    priority: 0.8
  },
  '/faq': {
    title: 'FAQs | B.Tech, AI & Engineering Admissions | Techno India University Kolkata',
    description: 'Got questions about B.Tech CSE, AI/ML, data science or cloud computing programs at Techno India University? Find answers here. Top engineering college in Kolkata. Admissions 2026.',
    changefreq: 'monthly',
    priority: 0.7
  },
  '/events': {
    title: 'What’s Happening at Techno India University | Events And Workshops',
    description: 'Browse the event calendar of Techno India University’s School of the Future, featuring workshops, tech summits, cultural fests, industry collaborations, and student activities.',
    changefreq: 'weekly',
    priority: 0.8
  },
  '/approvals': {
    title: 'Accreditation & Approvals | UGC, NAAC, AICTE',
    description: 'Techno India University’s School Of The Future is accredited by UGC, NAAC, AICTE & AIU. Discover our regulatory approvals, rankings and commitment to quality education.',
    changefreq: 'monthly',
    priority: 0.7
  }
};
