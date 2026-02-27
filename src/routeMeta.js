export const HOSTNAME = 'https://www.technoindiauniversity.ai';
export const EXCLUDED_ROUTES = ['/admin', '/events-demo'];

// Titles and descriptions are exact duplicates from each page's <SEO /> component
export const routeMeta = {
  '/': {
    title: 'Apply For Future-Ready Industry Courses with Google & IBM | School Of The Future',
    description: "Study AI, Cloud, CSE, Business, Design & more at School of the Future's innovative Google & IBM-powered UG, PG & Ph.D. programs. Real projects, certifications, 500+ hiring partners. Admissions 2026 open.",
    changefreq: 'daily',
    priority: 1.0
  },
  '/courses': {
    title: 'Future-Ready Programs After 12th & Graduation | School of the Future',
    description: 'Explore UG, PG & PhD programs in AI, Data Science, Business Analytics, Design, Media & Allied Health at the School of the Future.',
    changefreq: 'weekly',
    priority: 0.9
  },
  '/about': {
    title: 'About School Of The Future | Legacy of Innovation & Learning',
    description: 'Discover the School of the Future’s mission and vision. Backed by seasoned industry experts and academic leaders, 15,000+ students and global partners drive innovation-led education.',
    changefreq: 'monthly',
    priority: 0.8
  },
  '/admissions': {
    title: 'School Of The Future Admissions 2026 | Apply for Future-Ready Degrees',
    description: 'Admissions open for 2026 at School Of The Future. Google & IBM-powered programs, strong placements, scholarships and industry internships. Apply today.',
    changefreq: 'weekly',
    priority: 0.9
  },
  '/google-ibm-course': { // Included as requested in spec
    title: 'Future-Ready Programs After 12th & Graduation | School of the Future',
    description: 'Explore UG, PG & PhD programs in AI, Data Science, Business Analytics, Design, Media & Allied Health at the School of the Future.',
    changefreq: 'weekly',
    priority: 0.9
  },
  '/contact': {
    title: 'Contact School Of The Future | Admissions & Campus Visit',
    description: 'Reach School Of The Future for admissions, program queries and application guidance. Call 08062642222 or email for quick assistance..',
    changefreq: 'monthly',
    priority: 0.8
  },
  '/faq': {
    title: 'FAQs | School of the Future | Techno India University',
    description: 'Find answers to frequently asked questions about admissions, programs, fees, scholarships, and campus life at the School of the Future.',
    changefreq: 'monthly',
    priority: 0.7
  },
  '/events': {
    title: 'What’s Happening at School Of The Future | Events And Workshops',
    description: 'Browse School Of The Future’s event calendar featuring workshops, tech summits, cultural fests, industry collaborations, and student activities.',
    changefreq: 'weekly',
    priority: 0.8
  },
  '/approvals': {
    title: 'SOF Accreditation & Approvals | UGC, NAAC, AICTE',
    description: 'School Of The Future is accredited by UGC, NAAC, AICTE & AIU. Discover our regulatory approvals, rankings and commitment to quality education.',
    changefreq: 'monthly',
    priority: 0.7
  }
};
