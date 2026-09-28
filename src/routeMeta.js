export const HOSTNAME = 'https://www.technoindiauniversity.ai';
export const EXCLUDED_ROUTES = ['/admin', '/events-demo', '/thank-you', '/pg-thank-you'];

// Titles and descriptions are exact duplicates from each page's <SEO /> component
export const routeMeta = {
 '/': {
 title: 'Techno India University: Top Engineering College in Kolkata | B.tech CSE With AI',
 description: "Join Techno India University, a leading engineering college in Kolkata, and pursue b.tech CSE in AI & ML, Data Science, Cloud Computing, and other emerging technologies with Google and IBM, backed by a 90%+ placement record.",
 changefreq: 'daily',
 priority: 1.0
 },
 '/courses': {
 title: 'B.Tech, M.Tech, CSE, AI ML, Data Science & Cloud Computing Courses | Techno India University',
 description: "Explore B.Tech CSE, AI ML, Data Science & Cloud Computing, BCA, BBA, B.Sc, Law, Design, Nursing and M.Tech at Kolkata's best engineering college. Google & IBM certified. 90%+ placements. Admissions open.",
 changefreq: 'weekly',
 priority: 0.9
 },
 '/about': {
 title: "About Techno India University's School Of The Future | Best B.Tech Engineering College & AI Institute in Kolkata",
 description: "Discover the mission and vision of Techno India University's School of the Future, a leading B.Tech engineering college. Backed by seasoned industry experts and academic leaders, 15,000+ students and global partners drive innovation-led AI course.",
 changefreq: 'monthly',
 priority: 0.8
 },
 '/apply': {
 title: 'Admission Open for AI Courses in CSE, Design, MBA & More Under Techno India University',
 description: "Admissions open for 2026 at Techno India University's School of the Future, the best B.Tech engineering college. Explore Google- and IBM-powered programs, strong placements, scholarships, and industry internships. Apply today.",
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
 description: "Reach Techno India University's School Of The Future for admissions, program queries and application guidance. Call 08062642222 or email for quick assistance.",
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
 title: "What's Happening at Techno India University | Events And Workshops",
 description: "Browse the event calendar of Techno India University's School of the Future, featuring workshops, tech summits, cultural fests, industry collaborations, and student activities.",
 changefreq: 'weekly',
 priority: 0.8
 },
 '/approvals': {
 title: 'Accreditation & Approvals | UGC, NAAC, AICTE',
 description: "Techno India University's School Of The Future is accredited by UGC, NAAC, AICTE & AIU. Discover our regulatory approvals, rankings and commitment to quality education.",
 changefreq: 'monthly',
 priority: 0.7
 },
 '/blogs': {
 title: 'TIU Blog | AI, Tech, Career & Campus Stories | Techno India University',
 description: 'Read the latest articles, tutorials, career guides, and campus stories from Techno India University\'s School of the Future — written by students, faculty, and industry veterans.',
 changefreq: 'weekly',
 priority: 0.8
 },
 '/pg-programs-for-professionals': {
 title: 'MBA, M.Tech, M.Sc & Ph.D for Working Professionals | Techno India University',
 description: 'Weekend & hybrid MBA, M.Tech, M.Sc and Ph.D programmes for working professionals at Techno India University — UGC-recognised, same degree as full-time, EMI available. Check your eligibility.',
 changefreq: 'weekly',
 priority: 0.9
 },
 '/btech-admission-iit-kharagpur-collaboration': {
 title: 'B.Tech CSE Admissions 2026 | Techno India University',
 description: 'B.Tech CSE degrees awarded solely by Techno India University, School of the Future. Programme includes IIT Kharagpur OCN micro-specialisation course(s) delivered through the Outreach Course Network. Admissions 2026 open.',
 changefreq: 'weekly',
 priority: 0.85
 },

 // ── Course detail pages (/courses/:slug) ──────────────────────────
 // Generated from src/data/mock_courses.json — titles/descriptions are
 // exact duplicates of each course's seoTitle/seoDescription (or a
 // generated fallback where no seoTitle is set yet).
 '/courses/btech-cse-ai-ml': {
 title: 'B.Tech CSE AI & ML Course in Kolkata | Artificial Intelligence Engineering | TIU',
 description: 'B.Tech CSE with AI & ML at Techno India University — a Google Cloud-powered artificial intelligence engineering degree in Kolkata. Live AI/ML projects, embedded certifications, 90%+ placement record. Admissions 2026 open.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/btech-cse-data-science': {
 title: 'B.Tech CSE Data Science Course in Kolkata | TIU x Google Cloud',
 description: 'B.Tech CSE in Data Science at Techno India University — build data pipelines, statistical models, and BigQuery projects with embedded Google Cloud certification. One of Kolkata\'s most comprehensive data science engineering courses.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/btech-cse-cloud': {
 title: 'Cloud Computing Course in Kolkata | B.Tech CSE Cloud Computing | TIU',
 description: 'B.Tech CSE in Cloud Computing at Techno India University, Kolkata — cloud architecture, DevOps, Kubernetes and Google Cloud Platform, taught with enterprise-grade tooling. Embedded Google Cloud certification, 90%+ placement record.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/btech-cse': {
 title: 'B.Tech in Computer Science & Engineering (CSE) in Kolkata | TIU x Google Cloud',
 description: 'B.Tech in Computer Science and Engineering at Techno India University, Kolkata — programming, algorithms, computer architecture and software engineering, with embedded Google Cloud certification and a 90%+ placement record.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/bca-data-science-ai': {
 title: 'BCA with Data Science and AI Powered by IBM | Fees, Eligibility & Curriculum | Techno India University',
 description: 'An industry-aligned Bachelor of Computer Applications integrating data science and AI concepts with IBM-powered training. This program functions as a best IT training institute in Kolkata experience within a structured university framework, complete with IBM certifications. Explore eligibility, duration, and how to apply for BCA with Data Science and AI Powered by IBM at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-hotel-hospitality': {
 title: 'B.Sc (H) Hotel and Hospital Management | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Prepare for a career in the dynamic hospitality industry with management training. Explore eligibility, duration, and how to apply for B.Sc (H) Hotel and Hospital Management at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bba-business-analytics': {
 title: 'BBA Business Analytics Course in Kolkata | Business Analyst Training | TIU x IBM',
 description: 'BBA in Business Analytics at Techno India University, Kolkata, powered by IBM — hands-on business analyst training with real datasets and BI tooling, embedded IBM certification, and placement support.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/bsc-cyber-security': {
 title: 'B.Sc (H) Cyber Security and Ethical Hacking Powered by IBM | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Learn to protect digital assets and networks from cyber threats. Explore eligibility, duration, and how to apply for B.Sc (H) Cyber Security and Ethical Hacking Powered by IBM at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-data-analytics-gen-ai': {
 title: 'B.Sc (H) Data Analytics and Generative AI Powered by IBM | Fees, Eligibility & Curriculum | Techno India University',
 description: 'A cutting-edge AI learning course in Kolkata at the undergraduate level. Students master Generative AI, LLMs, data analytics, and IBM AI tools, equipping them for the next generation of AI-driven industries. One of the best AI courses in India for science graduates. Explore eligibility, duration, and how to apply for B.Sc (H) Data Analytics and Generative AI Powered by IBM at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/mba-ibm': {
 title: 'MBA - Powered by IBM | Fees, Eligibility & Curriculum | Techno India University',
 description: 'An analytics-driven MBA co-designed with IBM. Combines business administration with data science, AI tools, and strategic management, a strong choice among private colleges in Kolkata for management education. Explore eligibility, duration, and how to apply for MBA - Powered by IBM at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/working-professional-mba': {
 title: 'Working Professional MBA | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Tailored for working professionals looking to accelerate their career growth. Explore eligibility, duration, and how to apply for Working Professional MBA at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bdes-visual-comm': {
 title: 'B. Des Visual Communication & Digital Design | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Explore visual storytelling and digital design principles for modern media. Explore eligibility, duration, and how to apply for B. Des Visual Communication & Digital Design at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bdes-game-art': {
 title: 'B. Des Game Art & Design | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Design immersive game environments, characters, and assets. Explore eligibility, duration, and how to apply for B. Des Game Art & Design at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bdes-digital-product': {
 title: 'B. Des Digital Product Design | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Focus on user experience and interface design for digital products. Explore eligibility, duration, and how to apply for B. Des Digital Product Design at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/mdes-advertising': {
 title: 'M.Des in Advertising, design and digital communications | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Advanced design studies focusing on advertising strategies and digital communication. Explore eligibility, duration, and how to apply for M.Des in Advertising, design and digital communications at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-cardiovascular': {
 title: 'B.Sc (H) Cardiovascular Technology | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Train in the diagnosis, monitoring, and treatment support of cardiovascular diseases. Operate ECG machines, echocardiography equipment, cardiac catheterisation lab tech, and vascular diagnostic tools. AR/VR simulation training, NCAHP-aligned curriculum, and placement facilitation through 500+ healthcare employer partners via Emversity. Explore eligibility, duration, and how to apply for B.Sc (H) Cardiovascular Technology at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-anesthesia': {
 title: 'B.Sc (H) Anesthesia and Operation Theater Technology | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Prepare to become skilled anaesthesia technologists and operation theatre professionals. Covers pre-operative assessment, anaesthesia delivery assistance, patient monitoring, OT equipment management, and sterilisation protocols. AR/VR simulation training, NCAHP-aligned curriculum, and placement facilitation through 500+ healthcare employer partners via Emversity. Explore eligibility, duration, and how to apply for B.Sc (H) Anesthesia and Operation Theater Technology at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-sound-engineering': {
 title: 'B.Sc (H) in Sound Engineering | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Technical program covering audio recording, mixing, and sound design. Explore eligibility, duration, and how to apply for B.Sc (H) in Sound Engineering at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-game-development': {
 title: 'B.Sc (H) in Game Development | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Learn game programming and development using industry-standard engines. Explore eligibility, duration, and how to apply for B.Sc (H) in Game Development at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-filmmaking': {
 title: 'B.Sc (H) in Filmmaking | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Comprehensive course on film production, direction, and editing. Explore eligibility, duration, and how to apply for B.Sc (H) in Filmmaking at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-vfx-animation': {
 title: 'B.Sc (H) in Visual Effects & Animation | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Master the art of VFX and animation for film, TV, and games. Explore eligibility, duration, and how to apply for B.Sc (H) in Visual Effects & Animation at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/mtech-cse-ai-ml': {
 title: 'M.Tech CSE AI/ML | Fees, Eligibility & Curriculum | Techno India University',
 description: 'The most advanced M.Tech college in Kolkata experience for engineers seeking deep research expertise in AI and Machine Learning. Students publish in IEEE and Springer conferences, work on funded research projects, and earn industry certifications. As the top AI/ML courses in Kolkata at the postgraduate level, this program attracts engineers from across West Bengal and beyond. Explore eligibility, duration, and how to apply for M.Tech CSE AI/ML at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bsc-agriculture': {
 title: 'B.Sc Agriculture | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Comprehensive studies in modern agricultural sciences and farming technologies. Explore eligibility, duration, and how to apply for B.Sc Agriculture at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/msc-data-science-ai': {
 title: 'MSc. In Data Science AI | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Advanced postgraduate program in Data Science and Artificial Intelligence covering machine learning, deep learning, and data engineering. Explore eligibility, duration, and how to apply for MSc. In Data Science AI at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/bpt': {
 title: 'BPT — Bachelor of Physiotherapy Course in Kolkata | Techno India University',
 description: 'BPT (Bachelor of Physiotherapy) at Techno India University, Kolkata — a 4.5-year physiotherapy course preparing students for clinical practice in rehabilitation and therapeutic care, with placement support.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/bmrit': {
 title: 'BMRIT — Medical Radiology & Imaging Technology Course in Kolkata | TIU',
 description: 'BMRIT (Bachelor of Medical Radiation and Imaging Technology) at Techno India University, Kolkata — hands-on training in medical radiology, imaging diagnostics, and radiation safety.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/mpt': {
 title: 'MPT — Master of Physiotherapy Course in Kolkata | Techno India University',
 description: 'MPT (Master of Physiotherapy) at Techno India University, Kolkata — advanced clinical specialisation in physical therapy and rehabilitation sciences for BPT graduates.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/mmlt': {
 title: 'MMLT — Master of Medical Laboratory Technology in Kolkata | TIU',
 description: 'MMLT (Master of Medical Laboratory Technology) at Techno India University, Kolkata — advanced expertise in laboratory diagnostics and clinical pathology for science and MLT graduates.',
 changefreq: 'monthly',
 priority: 0.85
 },
 '/courses/phd-ai-full-time': {
 title: 'PhD in AI (Full Time) | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Full-time doctoral research program in Artificial Intelligence covering advanced research methodologies, publications, and innovation at the frontier of AI. Explore eligibility, duration, and how to apply for PhD in AI (Full Time) at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
 '/courses/phd-ai-half-time': {
 title: 'PhD in AI (Half Time) | Fees, Eligibility & Curriculum | Techno India University',
 description: 'Part-time doctoral research program in Artificial Intelligence designed for working professionals seeking to pursue advanced research alongside their careers. Explore eligibility, duration, and how to apply for PhD in AI (Half Time) at Techno India University, Kolkata.',
 changefreq: 'monthly',
 priority: 0.6
 },
};
