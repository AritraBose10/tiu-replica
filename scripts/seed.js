/**
 * Database Seed Script
 * Run with: node scripts/seed.js
 * Creates all tables and seeds them with existing hardcoded data.
 */
import 'dotenv/config';
import { createClient } from '@libsql/client';

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function seed() {
    console.log('🔧 Creating tables...');

    // ── Create Tables ──
    await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      link TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      time TEXT,
      location TEXT,
      category TEXT,
      image TEXT,
      attendees INTEGER DEFAULT 0,
      featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'upcoming',
      link TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      course TEXT,
      quote TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      image TEXT,
      company TEXT,
      row_num INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS approvals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      full_name TEXT NOT NULL,
      logo TEXT,
      description TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS scholarships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      coverage INTEGER,
      coverage_label TEXT,
      criteria TEXT,
      benefits TEXT DEFAULT '[]',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS recruiters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      src TEXT NOT NULL,
      alt TEXT,
      caption TEXT,
      category TEXT,
      span TEXT DEFAULT 'col-span-1 row-span-1',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

    console.log('✅ Tables created');

    // ── Seed Courses ──
    console.log('📚 Seeding courses...');
    const courses = [
        { id: 'btech-cse-google', title: 'B.Tech in Computer Science & Engineering (Powered by Google)', description: 'A flagship program designed in collaboration with Google, focusing on full-stack development, cloud computing, and software engineering principles.', category: 'Engineering', link: '#' },
        { id: 'btech-cse-ai-ml', title: 'B.Tech in CSE - AI & Machine Learning', description: 'Master the future of technology with a specialized curriculum in Artificial Intelligence and Machine Learning, including deep learning and neural networks.', category: 'Engineering', link: '#' },
        { id: 'bca-data-science-ibm', title: 'BCA with Data Science & AI (Powered by IBM)', description: "An industry-aligned Bachelor of Computer Applications program integrating IBM's expertise in Data Science and Artificial Intelligence.", category: 'Computer Applications', link: '#' },
        { id: 'bba-business-analytics', title: 'BBA in Business Analytics (Powered by IBM)', description: 'Combine business acumen with data analysis skills. Learn to drive business decisions using big data, predictive modeling, and statistical analysis.', category: 'Management', link: '#' },
        { id: 'btech-cybersecurity-ibm', title: 'B.Tech in CSE - Cybersecurity (Powered by IBM)', description: 'Protect the digital world with this specialized program covering network security, ethical hacking, cryptography, and IBM security tools.', category: 'Engineering', link: '#' },
        { id: 'bsc-gaming-ar-vr', title: 'B.Sc in Gaming & AR/VR Development', description: 'Dive into the world of immersive technologies. Learn game design, augmented reality, and virtual reality development with industry-standard tools.', category: 'Science', link: '#' },
        { id: 'mtech-cloud-google', title: 'M.Tech in Cloud Computing (Powered by Google)', description: 'An advanced program focused on Google Cloud Platform, distributed systems, containerization, and enterprise-grade cloud architecture.', category: 'Engineering', link: '#' },
        { id: 'btech-cse-data-science', title: 'B.Tech in CSE - Data Science', description: 'A comprehensive program covering statistics, machine learning, big data technologies, and data visualization for aspiring data professionals.', category: 'Engineering', link: '#' },
        { id: 'btech-iot-ibm', title: 'B.Tech in CSE - IoT (Powered by IBM)', description: 'Learn to connect the physical and digital worlds. Study sensor technology, embedded systems, and IBM Watson IoT platform.', category: 'Engineering', link: '#' },
        { id: 'mba-digital-marketing', title: 'MBA in Digital Marketing & Analytics', description: 'Master modern marketing with a focus on SEO, social media strategy, marketing automation, and data-driven campaign management.', category: 'Management', link: '#' },
        { id: 'bsc-forensic-science', title: 'B.Sc in Forensic Science & Criminology', description: 'Explore the science behind crime investigation, including DNA analysis, digital forensics, toxicology, and crime scene management.', category: 'Science', link: '#' },
        { id: 'btech-robotics-ai', title: 'B.Tech in Robotics & AI', description: 'Build the machines of the future. Study robotics engineering, computer vision, autonomous systems, and intelligent automation.', category: 'Engineering', link: '#' },
        { id: 'bdes-ux-ui', title: 'B.Des in UX/UI Design', description: 'Become a design thinker. Learn user experience research, interface design, prototyping, and design systems for digital products.', category: 'Design', link: '#' },
        { id: 'btech-blockchain', title: 'B.Tech in CSE - Blockchain Technology', description: 'Understand the future of decentralized systems. Study blockchain architecture, smart contracts, DeFi, and Web3 development.', category: 'Engineering', link: '#' },
    ];
    for (let i = 0; i < courses.length; i++) {
        const c = courses[i];
        await db.execute({
            sql: 'INSERT OR IGNORE INTO courses (id, title, description, category, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
            args: [c.id, c.title, c.description, c.category, c.link, i],
        });
    }

    // ── Seed Events ──
    console.log('📅 Seeding events...');
    const events = [
        { id: 'event-1', title: 'TechNova 2026 – National Tech Fest', description: 'A flagship 3-day technology festival featuring coding competitions, hackathons, robotics challenges, and guest lectures from industry leaders.', date: 'March 15-17, 2026', time: '9:00 AM - 6:00 PM', location: 'Main Campus Auditorium', category: 'Technical', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', attendees: 500, featured: 1, status: 'upcoming' },
        { id: 'event-2', title: 'AI & Machine Learning Workshop', description: 'Hands-on workshop on building AI models using TensorFlow and PyTorch. Learn from Google-certified ML engineers.', date: 'February 28, 2026', time: '10:00 AM - 4:00 PM', location: 'Computer Science Lab 3', category: 'Workshop', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', attendees: 150, featured: 0, status: 'upcoming' },
        { id: 'event-3', title: 'Annual Cultural Fest – Aarambh 2026', description: 'Experience the vibrant culture of TIU with music, dance, art, drama competitions, celebrity performances, and more.', date: 'April 5-7, 2026', time: '11:00 AM - 10:00 PM', location: 'Open Air Theatre', category: 'Cultural', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop', attendees: 2000, featured: 1, status: 'upcoming' },
        { id: 'event-4', title: 'IBM Cloud Computing Seminar', description: 'Learn about enterprise cloud solutions, hybrid cloud architecture, and IBM Cloud platform from IBM engineers.', date: 'March 5, 2026', time: '2:00 PM - 5:00 PM', location: 'Seminar Hall A', category: 'Seminar', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', attendees: 200, featured: 0, status: 'upcoming' },
        { id: 'event-5', title: 'Inter-University Cricket Tournament', description: 'Annual inter-university cricket championship. Top teams from 20+ universities compete for the TIU Trophy.', date: 'March 20-25, 2026', time: '8:00 AM - 5:00 PM', location: 'TIU Sports Ground', category: 'Sports', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop', attendees: 500, featured: 0, status: 'upcoming' },
        { id: 'event-6', title: 'Google Developer Student Clubs Meetup', description: 'Monthly meetup for Google DSC members. This session covers Flutter development and Firebase integration.', date: 'February 22, 2026', time: '3:00 PM - 6:00 PM', location: 'Innovation Hub, Building C', category: 'Technical', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', attendees: 100, featured: 0, status: 'upcoming' },
        { id: 'event-7', title: 'Startup Pitch Day – Season 5', description: 'Student entrepreneurs pitch their startup ideas to a panel of investors and industry mentors. Top ideas receive seed funding.', date: 'April 12, 2026', time: '10:00 AM - 3:00 PM', location: 'Entrepreneurship Cell', category: 'Seminar', image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2070&auto=format&fit=crop', attendees: 300, featured: 0, status: 'upcoming' },
        { id: 'event-8', title: 'Cybersecurity CTF Challenge', description: 'Capture the Flag competition for cybersecurity enthusiasts. Test your skills in web exploitation, cryptography, and forensics.', date: 'March 10, 2026', time: '9:00 AM - 9:00 PM', location: 'Cyber Lab, Building D', category: 'Technical', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', attendees: 120, featured: 0, status: 'upcoming' },
        // Past events
        { id: 'past-0', title: 'Techno India University to host School of Future, in collaboration with IBM and Google', description: 'Techno India University has collaborated with Google and IBM to form a School of Future.', date: 'May 25, 2024', time: 'Completed', location: 'Techno India University', category: 'Past', image: 'https://technotimes.info/wp-content/uploads/2024/05/20240525_141634-1024x768.jpg', attendees: 0, featured: 0, status: 'past', link: 'https://technotimes.info/2024/05/25/techno-india-university-to-host-school-of-future-in-collaboration-with-ibm-and-google/' },
        { id: 'past-1', title: 'Techno India University, West Bengal and Google Cloud India Sign MoU', description: 'Techno India University has entered into a strategic partnership with Google Cloud India by signing a MoU.', date: 'May 22, 2024', time: 'Completed', location: 'Techno India University', category: 'Past', image: 'https://technotimes.info/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-21-at-20.19.46.jpeg', attendees: 0, featured: 0, status: 'past', link: 'https://technotimes.info/2024/05/22/techno-india-university-west-bengal-and-google-cloud-india-sign-mou-to-transform-digital-education/' },
    ];
    for (let i = 0; i < events.length; i++) {
        const e = events[i];
        await db.execute({
            sql: 'INSERT OR IGNORE INTO events (id, title, description, date, time, location, category, image, attendees, featured, status, link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            args: [e.id, e.title, e.description, e.date, e.time, e.location, e.category, e.image, e.attendees, e.featured, e.status, e.link || '', i],
        });
    }

    // ── Seed FAQs ──
    console.log('❓ Seeding FAQs...');
    const faqs = [
        { question: 'How are emerging technologies integrated into learning?', answer: 'Our curriculum is designed in collaboration with Google and IBM to incorporate the latest technologies including AI, Machine Learning, Cloud Computing, and Cybersecurity. Students work on real-world projects and gain industry certifications.' },
        { question: 'What career paths can graduates pursue?', answer: 'Graduates can pursue careers as Software Engineers, Data Scientists, AI/ML Engineers, Cloud Architects, UI/UX Designers, Digital Marketers, and more. Our placement cell connects students with top tech companies.' },
        { question: 'What are the eligibility criteria and admission requirements?', answer: 'Eligibility varies by program. Engineering courses require 10+2 with PCM, while other programs accept students from any stream. Apply through our online portal and complete the document submission process.' },
        { question: 'How is the teaching and learning approach structured?', answer: 'We follow a blended learning approach combining classroom instruction, hands-on labs, industry projects, and internships. Faculty includes industry experts and certified Google/IBM trainers.' },
    ];
    for (let i = 0; i < faqs.length; i++) {
        await db.execute({
            sql: 'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
            args: [faqs[i].question, faqs[i].answer, i],
        });
    }

    // ── Seed Testimonials ──
    console.log('💬 Seeding testimonials...');
    const testimonials = [
        // Row 1
        { name: 'Aarav Sharma', course: 'B.Tech CSE, Batch 2024', quote: "The Google-powered curriculum at TIU completely transformed my career. I went from learning basics to deploying production ML models in just two years.", rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', company: 'Google', row_num: 1 },
        { name: 'Priya Patel', course: 'BCA AI & Data Science, Batch 2024', quote: "IBM's certification program gave me an edge no other university could. I was hired before my final semester even started.", rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', company: 'IBM', row_num: 1 },
        { name: 'Rohan Das', course: 'B.Tech CSE, Batch 2023', quote: "TIU gave me access to Google Cloud labs, real-world internships, and a network that opened doors I didn't know existed. Best decision of my life.", rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', company: 'Startup Founder', row_num: 1 },
        { name: 'Ananya Roy', course: 'B.Sc Data Science, Batch 2024', quote: "TIU's data science program is world-class. The curriculum is constantly updated and the placement cell worked tirelessly for us.", rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', company: 'Amazon', row_num: 1 },
        { name: 'Vikram Iyer', course: 'M.Tech Cloud Computing, Batch 2024', quote: "The hands-on Google Cloud projects were incredible. I built and deployed real applications that I still showcase in interviews today.", rating: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', company: 'DeepMind', row_num: 1 },
        // Row 2
        { name: 'Sneha Mukherjee', course: 'BBA, Batch 2024', quote: "The industry exposure at TIU is unmatched. Regular guest lectures from CEOs and startup founders gave me a perspective no textbook ever could.", rating: 5, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', company: 'McKinsey', row_num: 2 },
        { name: 'Arjun Mehta', course: 'B.Tech ECE, Batch 2023', quote: "From IoT labs to robotics competitions, TIU pushed me beyond my limits. I got placed at Samsung with a package I never imagined.", rating: 5, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', company: 'Samsung', row_num: 2 },
        { name: 'Ishita Sen', course: 'B.Sc Biotechnology, Batch 2024', quote: "TIU bridged the gap between academia and industry perfectly. The research opportunities and mentorship here are truly exceptional.", rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', company: 'Biocon', row_num: 2 },
        { name: 'Kabir Ahmed', course: 'B.Tech Mechanical, Batch 2024', quote: "From Formula Student racing to industry internships in Germany, TIU gave me global exposure I never imagined possible.", rating: 5, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', company: 'Siemens', row_num: 2 },
        { name: 'Diya Ghosh', course: 'M.Sc Computer Science, Batch 2024', quote: "The AI research lab at TIU is world-class. I published two papers and the faculty mentorship was beyond what I expected from any Indian university.", rating: 5, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', company: 'IBM', row_num: 2 },
    ];
    for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];
        await db.execute({
            sql: 'INSERT INTO testimonials (name, course, quote, rating, image, company, row_num, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            args: [t.name, t.course, t.quote, t.rating, t.image, t.company, t.row_num, i],
        });
    }

    // ── Seed Partners ──
    console.log('🤝 Seeding partners...');
    const partners = [
        { name: 'Google', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'IBM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
        { name: 'Microsoft', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
        { name: 'AWS', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
        { name: 'Cisco', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
        { name: 'Oracle', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    ];
    for (let i = 0; i < partners.length; i++) {
        await db.execute({
            sql: 'INSERT INTO partners (name, logo_url, sort_order) VALUES (?, ?, ?)',
            args: [partners[i].name, partners[i].logo_url, i],
        });
    }

    // ── Seed Approvals ──
    console.log('🏛️ Seeding approvals...');
    const approvals = [
        { name: 'UGC', full_name: 'University Grants Commission', logo: 'https://static.wixstatic.com/media/4d76fa_22977ebae1bc4181b6af13c54d0ec195~mv2.jpg', description: 'Recognized by India\'s apex body for higher education standards and quality assurance.' },
        { name: 'AICTE', full_name: 'All India Council for Technical Education', logo: 'https://static.wixstatic.com/media/4d76fa_20b732a7a0df4f1aacbee92f04803ff1~mv2.jpg', description: 'Approved for delivering world-class technical and management education programs.' },
        { name: 'BCI', full_name: 'Bar Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_b4b6e0c8ec2d4b84b19ea16dbcfd016a~mv2.jpg', description: 'Affiliated for offering accredited Law programs meeting national legal education standards.' },
        { name: 'PCI', full_name: 'Pharmacy Council of India', logo: 'https://static.wixstatic.com/media/4d76fa_0f94f520580d4155ac4f8ccb065da04b~mv2.jpg', description: 'Approved for pharmaceutical sciences programs with industry-aligned curriculum.' },
        { name: 'COA', full_name: 'Council of Architecture', logo: 'https://static.wixstatic.com/media/4d76fa_85c506123858458bbddc73a0ff910cc4~mv2.jpg', description: 'Recognized for Architecture programs fostering creative design and urban planning.' },
        { name: 'INC', full_name: 'Indian Nursing Council', logo: 'https://static.wixstatic.com/media/4d76fa_df762dfb25974f669d9704d2d5fd127e~mv2.jpg', description: 'Approved for Nursing programs ensuring healthcare education excellence.' },
    ];
    for (let i = 0; i < approvals.length; i++) {
        const a = approvals[i];
        await db.execute({
            sql: 'INSERT INTO approvals (name, full_name, logo, description, sort_order) VALUES (?, ?, ?, ?, ?)',
            args: [a.name, a.full_name, a.logo, a.description || '', i],
        });
    }

    // ── Seed Scholarships ──
    console.log('🎓 Seeding scholarships...');
    const scholarships = [
        { title: 'Merit Scholarship', coverage: 100, coverage_label: 'Up to 100% Tuition', criteria: 'Top academic performers in 10+2 or equivalent examinations with 90%+ aggregate.', benefits: ['Full tuition waiver', 'Book allowance', 'Priority lab access'] },
        { title: 'Need-Based Aid', coverage: 75, coverage_label: 'Up to 75% Tuition', criteria: 'Students from economically weaker sections with demonstrated financial need.', benefits: ['Tuition reduction', 'Hostel fee support', 'Exam fee waiver'] },
        { title: 'Sports Excellence', coverage: 50, coverage_label: 'Up to 50% Tuition', criteria: 'National or state-level athletes with verified sports authority certificates.', benefits: ['Tuition reduction', 'Sports kit provided', 'Flexible attendance'] },
    ];
    for (let i = 0; i < scholarships.length; i++) {
        const s = scholarships[i];
        await db.execute({
            sql: 'INSERT INTO scholarships (title, coverage, coverage_label, criteria, benefits, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
            args: [s.title, s.coverage, s.coverage_label, s.criteria, JSON.stringify(s.benefits), i],
        });
    }

    // ── Seed Recruiters ──
    console.log('🏢 Seeding recruiters...');
    const recruiters = ['Google', 'IBM', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'Cognizant', 'HCL', 'Tech Mahindra', 'Capgemini', 'Oracle', 'SAP'];
    for (let i = 0; i < recruiters.length; i++) {
        await db.execute({
            sql: 'INSERT INTO recruiters (name, sort_order) VALUES (?, ?)',
            args: [recruiters[i], i],
        });
    }

    // ── Seed Gallery ──
    console.log('🖼️ Seeding gallery...');
    const gallery = [
        { src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop', alt: 'AI Research Lab', caption: 'Next-Gen AI Research Lab', category: 'Innovation Labs', span: 'col-span-2 row-span-2' },
        { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop', alt: 'Workshop Session', caption: 'Google Cloud Training', category: 'AI Workshops', span: 'col-span-1 row-span-1' },
        { src: 'https://images.unsplash.com/photo-1504384764586-bb4cee6e1b87?q=80&w=2070&auto=format&fit=crop', alt: 'Hackathon', caption: 'National Hackathon Finals', category: 'Hackathons', span: 'col-span-1 row-span-1' },
        { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', alt: 'Study Tour', caption: 'Silicon Valley Study Tour', category: 'Study Tours', span: 'col-span-1 row-span-2' },
        { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop', alt: 'Startup Incubation', caption: 'Student Founder Workspace', category: 'Startup Incubation', span: 'col-span-1 row-span-2' },
        { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', alt: 'Incubation Meeting', caption: 'Venture Capital Pitch Day', category: 'Startup Incubation', span: 'col-span-1 row-span-1' },
        { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop', alt: 'Industry Visit', caption: 'Microsoft India HQ Visit', category: 'Study Tours', span: 'col-span-1 row-span-1' },
        { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', alt: 'Robotics Lab', caption: 'Robotics Innovation Center', category: 'Innovation Labs', span: 'col-span-1 row-span-1' },
    ];
    for (let i = 0; i < gallery.length; i++) {
        const g = gallery[i];
        await db.execute({
            sql: 'INSERT INTO gallery_images (src, alt, caption, category, span, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
            args: [g.src, g.alt, g.caption, g.category, g.span, i],
        });
    }

    // ── Seed Site Settings ──
    console.log('⚙️ Seeding site settings...');
    const settings = {
        hero: {
            heading: 'SHAPE YOUR FUTURE',
            subheading: 'at',
            university: 'TECHNO INDIA UNIVERSITY',
            subtitle: 'The School of the Future offers cutting-edge programs designed in collaboration with Google & IBM',
        },
        home_stats: [
            { icon: 'Users', value: '5 Lakh+', label: 'Alumni Network' },
            { icon: 'GraduationCap', value: '50+', label: 'Programs' },
            { icon: 'Building', value: '25+', label: 'Years of Excellence' },
            { icon: 'Globe', value: '500+', label: 'Industry Partners' },
        ],
        about_hero: { heading: 'Shaping Tomorrow', established: 'Established in 2000' },
        about_features: [
            { icon: 'Lightbulb', title: 'Built for Innovation', description: 'Curriculum designed to foster creative thinking and problem-solving skills for the modern world.' },
            { icon: 'Users', title: 'Expert Faculty', description: 'Learn from industry veterans and academic pioneers who bring real-world experience to the classroom.' },
            { icon: 'Globe', title: 'Real-World Exposure', description: 'Internships, industry projects, and global collaborations prepare you for success anywhere.' },
            { icon: 'Rocket', title: 'Entrepreneurial Mindset', description: 'We nurture innovators, risk-takers, and future business leaders through dedicated programs.' },
        ],
        about_stats: [
            { value: '25', suffix: '+', label: 'Years of Excellence' },
            { value: '15000', suffix: '+', label: 'Students Enrolled' },
            { value: '500', suffix: '+', label: 'Expert Faculty' },
            { value: '50', suffix: '+', label: 'Global Partners' },
        ],
        about_mission: {
            mission: 'To provide accessible, high-quality education that empowers students to become innovative thinkers, responsible citizens, and global leaders.',
            vision: 'To be a world-class university recognized for academic excellence, cutting-edge research, and its contribution to society.',
        },
        contact_info: {
            phone: '08062642222',
            email: 'admissions@technoindiauniversity.com',
            address: 'EM-4, Salt Lake, Sector V, Kolkata',
        },
        career_packages: [
            { label: 'Highest Package', value: 42, suffix: ' LPA', barWidth: 100 },
            { label: 'Average Package', value: 8.5, suffix: ' LPA', barWidth: 60 },
            { label: 'Median Package', value: 6, suffix: ' LPA', barWidth: 42 },
        ],
        career_stats: [
            { icon: 'TrendingUp', value: '95%', label: 'Placement Rate', color: 'text-emerald-400' },
            { icon: 'Building2', value: '300+', label: 'Recruiting Companies', color: 'text-blue-400' },
            { icon: 'Handshake', value: '1200+', label: 'Offers Made (2025)', color: 'text-amber-400' },
            { icon: 'ArrowUpRight', value: '40%', label: 'YoY Package Growth', color: 'text-red-400' },
        ],
        career_ibm_text: {
            title: 'Mandatory IBM Internship',
            description: 'Every student at School of the Future completes a structured internship with IBM, gaining hands-on experience in enterprise technology, cloud computing, and AI — guaranteed before graduation.',
        },
        admissions_stats: [
            { id: 1, value: '95%', label: 'Placement', radius: 60 },
            { id: 2, value: '300+', label: 'Recruiters', radius: 55 },
            { id: 3, value: '₹42L', label: 'Highest CTC', radius: 50 },
            { id: 4, value: '50+', label: 'Programs', radius: 45 },
            { id: 5, value: 'AICTE', label: 'Approved', radius: 50 },
        ],
        whysof_differentiators: [
            { icon: 'BrainCircuit', title: 'AI-Powered Learning', description: 'Personalized learning paths powered by artificial intelligence that adapt to your pace and style.' },
            { icon: 'Cpu', title: 'Industry-Integrated Curriculum', description: 'Curriculum co-designed with Google & IBM engineers, updated every semester to match industry demands.' },
            { icon: 'Users', title: 'Certified Expert Faculty', description: 'Learn from Google & IBM certified trainers with 10+ years of real-world tech industry experience.' },
            { icon: 'Briefcase', title: 'Mandatory Tech Internships', description: 'Every student completes structured internships at top tech companies before graduating.' },
        ],
        whysof_video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        google_ibm_dark: {
            certifications: [
                { icon: 'Cloud', label: 'Google Cloud', color: 'text-blue-400' },
                { icon: 'Shield', label: 'IBM Cybersecurity', color: 'text-green-400' },
                { icon: 'BookOpen', label: 'AI & ML', color: 'text-purple-400' },
                { icon: 'Award', label: 'Data Science', color: 'text-amber-400' },
            ],
            stats: [
                { value: '20+', label: 'Certifications' },
                { value: '50+', label: 'Industry Courses' },
            ],
        },
        footer: { copyright: 'Techno India University. Website Created By: FRIX Studio' },
        navbar_links: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Admissions', path: '/admissions' },
            { name: 'Approvals', path: '/approvals' },
            { name: 'Events', path: '/events' },
            { name: 'FAQ', path: '/faq' },
            { name: 'Google and IBM Courses', path: '/courses' },
        ],
        how_to_apply: [
            { number: '01', title: 'Get in Touch', description: 'Connect with our admissions team through call, WhatsApp, or by filling the enquiry form.', icon: 'Phone' },
            { number: '02', title: 'Document Submission', description: 'Submit your academic documents and complete the application form with required details.', icon: 'FileText' },
            { number: '03', title: 'Campus Tour', description: 'Visit our campus to explore facilities, meet faculty, and experience the TIU environment.', icon: 'Building' },
            { number: '04', title: 'Decision', description: 'Receive your admission decision and complete the enrollment process to begin your journey.', icon: 'CheckCircle' },
        ],
    };

    for (const [key, value] of Object.entries(settings)) {
        await db.execute({
            sql: 'INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)',
            args: [key, JSON.stringify(value)],
        });
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('   Tables: courses, events, faqs, testimonials, partners, approvals, scholarships, recruiters, gallery_images, site_settings');
}

seed().catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
