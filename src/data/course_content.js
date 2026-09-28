/**
 * course_content.js — per-course editorial content for /courses/:slug
 *
 * mock_courses.json carries identity + SEO meta for each programme. This file
 * carries the *body* of each course page: overview, curriculum, tools, career
 * outcomes and FAQs, so every course page is genuinely its own page rather
 * than one template repeated thirty times.
 *
 * Keyed by the `id` in mock_courses.json. Every field is optional — CourseDetail
 * renders only the sections a course actually has, so a new programme can ship
 * with a partial entry (or none at all) without breaking the page.
 *
 * NOTE FOR EDITORS: curriculum outlines and eligibility lines below are drafted
 * from standard discipline structure and should be signed off by the academic
 * office before launch. Fee figures are deliberately NOT stored here — they
 * live in mock_courses.json and only appear where the university has published
 * them.
 */

export const courseContent = {
  // ───────────────────────────────────────────────────────────
  // School of Engineering & Technology
  // ───────────────────────────────────────────────────────────
  'btech-cse-ai-ml': {
    eligibility: '10+2 with Physics, Mathematics and one of Chemistry / Computer Science',
    overview:
      'The AI/ML specialisation takes the full CSE core — data structures, operating systems, networks, databases — and layers a machine learning track on top of it from the second year onward. You move from classical statistical learning to deep neural networks, and every theory module is paired with a build: a recommender, a vision pipeline, a fine-tuned language model. Final-year work is a capstone on real data, supervised jointly by faculty and an industry mentor.',
    highlights: [
      { title: 'ML from second year, not final year', detail: 'Supervised learning starts in semester 3, so you have five semesters of model-building before you graduate — not one rushed elective.' },
      { title: 'Google Cloud as the default environment', detail: 'Training runs, notebooks and deployments happen on GCP — Vertex AI, BigQuery, Cloud Run — production tooling rather than a teaching sandbox.' },
      { title: 'Capstone on live data', detail: 'Final-year projects are scoped with a hiring partner and run on their problem, so the portfolio you interview with is real work.' },
      { title: 'Maths taught as ML maths', detail: 'Linear algebra, probability and optimisation are taught against the models that use them, rather than as isolated first-year papers.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Computing and mathematical foundations', modules: ['Programming with Python & C', 'Discrete Mathematics', 'Linear Algebra for Computing', 'Digital Logic & Computer Organisation', 'Data Structures'] },
      { year: 'Year 2', theme: 'Core CSE plus the machine learning entry track', modules: ['Algorithms & Complexity', 'Database Management Systems', 'Operating Systems', 'Probability & Statistics', 'Introduction to Machine Learning', 'Data Wrangling & Feature Engineering'] },
      { year: 'Year 3', theme: 'Deep learning and applied AI', modules: ['Deep Learning & Neural Networks', 'Computer Vision', 'Natural Language Processing', 'Computer Networks', 'Cloud & Distributed Systems', 'MLOps and Model Deployment'] },
      { year: 'Year 4', theme: 'Specialisation, internship and capstone', modules: ['Generative AI & Large Language Models', 'Reinforcement Learning', 'AI Ethics, Fairness & Governance', 'Industry Internship', 'Capstone Project'] },
    ],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Google Cloud Vertex AI', 'BigQuery', 'Docker', 'Git', 'Hugging Face'],
    whoFor: [
      'Students who want to build AI systems, not just use them',
      'Anyone comfortable with mathematics who wants that maths to pay off in code',
      'Students targeting engineering roles at product companies rather than pure services',
    ],
    industries: ['Product engineering', 'Fintech', 'Healthcare AI', 'E-commerce & recommendations', 'Research labs'],
    faqs: [
      { q: 'Do I need to know programming before joining?', a: 'No. Year 1 starts from first principles with Python and C. What helps far more is comfort with school-level mathematics, since the ML track leans on algebra and probability throughout.' },
      { q: 'How is this different from plain B.Tech CSE?', a: 'The CSE core is the same. The difference is roughly six additional AI/ML papers from semester 3 onward — machine learning, deep learning, computer vision, NLP, generative AI and MLOps — plus a capstone that has to ship a working model.' },
      { q: 'What kind of roles do graduates target?', a: 'AI Engineer, Machine Learning Engineer, Data Scientist and NLP Specialist are the common first-job titles. A number of students also go on to M.Tech or research programmes.' },
    ],
  },

  'btech-cse-data-science': {
    eligibility: '10+2 with Physics, Mathematics and one of Chemistry / Computer Science',
    overview:
      'Where the AI/ML track optimises for modelling, this one optimises for the whole data lifecycle — ingestion, warehousing, transformation, analysis and the decision that comes out the other end. You spend serious time on SQL and distributed data processing before you touch a model, because in practice that is where most of the work lives. BigQuery and the Google Cloud data stack are the working environment from year two.',
    highlights: [
      { title: 'Pipelines before models', detail: 'You learn to build and schedule a reliable data pipeline first — the part of the job most graduates are unprepared for.' },
      { title: 'SQL taken seriously', detail: 'Two full papers of database and analytical SQL, including window functions and query optimisation on warehouse-scale tables.' },
      { title: 'BigQuery-scale datasets', detail: 'Coursework runs against datasets large enough that naive approaches actually fail, so the lesson lands.' },
      { title: 'Statistics with consequences', detail: 'Experiment design and A/B testing are taught as decision tools, not as a formula sheet.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Computing and mathematical foundations', modules: ['Programming with Python', 'Discrete Mathematics', 'Linear Algebra', 'Computer Organisation', 'Data Structures'] },
      { year: 'Year 2', theme: 'Data engineering core', modules: ['Algorithms', 'Database Management Systems', 'Advanced & Analytical SQL', 'Probability & Inferential Statistics', 'Data Warehousing', 'Operating Systems'] },
      { year: 'Year 3', theme: 'Analytics, modelling and scale', modules: ['Machine Learning', 'Big Data & Distributed Processing', 'Data Visualisation & Storytelling', 'Cloud Data Platforms (BigQuery, Dataflow)', 'Experiment Design & A/B Testing', 'Time Series Analysis'] },
      { year: 'Year 4', theme: 'Specialisation, internship and capstone', modules: ['Deep Learning for Structured Data', 'Business Analytics & Decision Science', 'Data Governance & Privacy', 'Industry Internship', 'Capstone Project'] },
    ],
    tools: ['Python', 'SQL', 'Google BigQuery', 'Apache Spark', 'Airflow', 'dbt', 'Looker Studio', 'pandas', 'Tableau'],
    whoFor: [
      'Students who like finding the answer inside messy data',
      'Anyone aiming at analytics or data engineering roles rather than pure research',
      'Students who want a degree that maps directly onto a job description',
    ],
    industries: ['Consulting & analytics', 'Banking and financial services', 'Retail & supply chain', 'Product analytics', 'Public policy and research'],
    faqs: [
      { q: 'Data Science or AI/ML — which should I pick?', a: 'Pick Data Science if you are drawn to the question and the decision; pick AI/ML if you are drawn to the model and the system. Data Science graduates more often become analysts, data engineers and decision scientists; AI/ML graduates more often become ML engineers.' },
      { q: 'How much mathematics is involved?', a: 'Substantial, but applied — statistics and linear algebra dominate, and both are taught against real datasets rather than as abstract papers.' },
      { q: 'Is there an internship?', a: 'Yes, a structured industry internship in the final year, drawn from TIU\'s hiring partner network.' },
      { q: 'What tools will I actually be fluent in on graduating?', a: 'Python and SQL at working depth, plus BigQuery, Spark and at least one orchestration and one visualisation tool.' },
    ],
  },

  'btech-cse-cloud': {
    eligibility: '10+2 with Physics, Mathematics and one of Chemistry / Computer Science',
    overview:
      'A CSE degree where the deployment target is the cloud from the start. Alongside the standard core you go deep on networking, virtualisation, containers, infrastructure-as-code and site reliability — the skills that separate someone who can write a service from someone who can run one. Assessment leans towards working infrastructure: if it does not deploy, it does not count.',
    highlights: [
      { title: 'Infrastructure as coursework', detail: 'Terraform, Kubernetes and CI/CD pipelines are assessed artefacts, not slides.' },
      { title: 'Networking done properly', detail: 'Two papers on networks and distributed systems, because cloud failures are usually network failures.' },
      { title: 'Reliability engineering', detail: 'SRE practice — monitoring, incident response, error budgets — taught as its own module.' },
      { title: 'Cost as a design constraint', detail: 'Architecture decisions are graded on cost as well as correctness, the way they are in industry.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Computing foundations', modules: ['Programming with Python & C', 'Discrete Mathematics', 'Computer Organisation', 'Data Structures', 'Linux & Shell Fundamentals'] },
      { year: 'Year 2', theme: 'Systems and networks', modules: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management Systems', 'Virtualisation & Containers', 'Introduction to Cloud Computing'] },
      { year: 'Year 3', theme: 'Cloud architecture and operations', modules: ['Distributed Systems', 'Infrastructure as Code (Terraform)', 'Kubernetes & Container Orchestration', 'Cloud Security & IAM', 'DevOps and CI/CD', 'Site Reliability Engineering'] },
      { year: 'Year 4', theme: 'Specialisation, internship and capstone', modules: ['Multi-Cloud & Hybrid Architecture', 'Serverless and Event-Driven Design', 'Cloud Cost Engineering', 'Industry Internship', 'Capstone Project'] },
    ],
    tools: ['Google Cloud Platform', 'Kubernetes', 'Docker', 'Terraform', 'Linux', 'Jenkins / GitHub Actions', 'Prometheus & Grafana', 'Python', 'Go'],
    whoFor: [
      'Students who enjoy making systems run, not only making them work once',
      'Anyone targeting DevOps, SRE or platform engineering roles',
      'Students who like Linux, networks and the machinery underneath applications',
    ],
    industries: ['Cloud service providers', 'SaaS product companies', 'Banking infrastructure', 'Telecom', 'Managed services and consulting'],
    faqs: [
      { q: 'Is this just DevOps with a degree attached?', a: 'No — the CSE core is complete, so you graduate an engineer who can also operate infrastructure. That combination is what platform teams actually hire for.' },
      { q: 'Which cloud do I learn?', a: 'Google Cloud is the primary environment, with a final-year module on multi-cloud and hybrid architecture so the concepts transfer to AWS and Azure.' },
      { q: 'Do I need prior Linux experience?', a: 'No. Linux and shell fundamentals are a first-year module, taught from scratch.' },
      { q: 'What roles do graduates go into?', a: 'Cloud Architect, SRE, Platform Engineer and Cloud Security Analyst are the typical paths.' },
    ],
  },

  'btech-cse': {
    eligibility: '10+2 with Physics, Mathematics and one of Chemistry / Computer Science',
    overview:
      'The full computer science engineering degree, kept deliberately broad so you can choose a direction late rather than early. Years one and two build the core — programming, algorithms, systems, databases, networks. From year three you pick electives across AI, cloud, security and software engineering, and the Google Cloud track runs alongside whichever direction you take.',
    highlights: [
      { title: 'Breadth first, specialisation later', detail: 'You choose an elective direction in year three, after you have seen enough of the field to choose well.' },
      { title: 'Strong systems grounding', detail: 'Operating systems, networks and compilers are taught as full papers — the foundation that ages best.' },
      { title: 'Software engineering as practice', detail: 'Version control, code review, testing and agile delivery are built into project work from year two.' },
      { title: 'Cloud experience whichever track you pick', detail: 'The Google Cloud pathway runs in parallel regardless of which electives you choose.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Programming and mathematical foundations', modules: ['Programming with C & Python', 'Discrete Mathematics', 'Linear Algebra & Calculus', 'Digital Logic Design', 'Data Structures'] },
      { year: 'Year 2', theme: 'Core computer science', modules: ['Design & Analysis of Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Operating Systems', 'Computer Architecture', 'Software Engineering'] },
      { year: 'Year 3', theme: 'Systems, networks and electives', modules: ['Computer Networks', 'Theory of Computation', 'Compiler Design', 'Web & Application Development', 'Cloud Computing', 'Elective I (AI / Security / Data)'] },
      { year: 'Year 4', theme: 'Advanced electives, internship and capstone', modules: ['Elective II & III (specialisation track)', 'Distributed Systems', 'Professional Practice & Ethics', 'Industry Internship', 'Capstone Project'] },
    ],
    tools: ['Java', 'Python', 'C/C++', 'SQL', 'Git', 'Docker', 'Google Cloud Platform', 'React', 'Linux'],
    whoFor: [
      'Students who want the widest set of doors open at graduation',
      'Anyone unsure yet whether they lean towards AI, cloud, security or product engineering',
      'Students targeting software engineering roles across any industry',
    ],
    industries: ['Software products', 'IT services & consulting', 'Fintech', 'Startups', 'Higher study and research'],
    faqs: [
      { q: 'Should I take plain CSE or a specialisation?', a: 'Take plain CSE if you want to decide later — the elective structure lets you move towards AI, cloud or security in year three. Take a specialisation if you already know your direction and want more depth in it.' },
      { q: 'Can I still work in AI after plain CSE?', a: 'Yes. The AI electives and the Google Cloud track are available, and the core algorithms and mathematics are the same foundation the specialisation builds on.' },
      { q: 'Is placement support included?', a: 'Yes, through TIU\'s hiring partner network, with a structured internship in the final year.' },
      { q: 'How much of the course is project work?', a: 'Every semester from year two carries a project component, culminating in a year-long capstone.' },
    ],
  },

  'mtech-cse-ai-ml': {
    eligibility: 'B.E. / B.Tech in CSE, IT, ECE or a related branch, or MCA',
    overview:
      'A two-year research-oriented masters for engineers who want depth rather than another survey of the field. Coursework front-loads advanced machine learning theory and research methodology in year one; year two is largely thesis, with the expectation that the work is submitted to a peer-reviewed venue. Students typically work within a faculty research group rather than alone.',
    highlights: [
      { title: 'Publication is the expected outcome', detail: 'Thesis work is scoped towards IEEE or Springer submission, with supervision on writing as well as research.' },
      { title: 'Research methodology taught explicitly', detail: 'Literature review, experimental design and reproducibility are a graded module, not something you are left to absorb.' },
      { title: 'Work inside a research group', detail: 'Students join an active faculty group, so the thesis sits in a line of work rather than starting cold.' },
      { title: 'Route to a PhD', detail: 'The programme is structured so a strong thesis converts naturally into doctoral study at TIU or elsewhere.' },
    ],
    curriculum: [
      { year: 'Semester 1', theme: 'Advanced foundations', modules: ['Advanced Machine Learning', 'Mathematics for Machine Learning', 'Research Methodology & Academic Writing', 'Advanced Algorithms', 'Elective I'] },
      { year: 'Semester 2', theme: 'Specialised AI', modules: ['Deep Learning Architectures', 'Computer Vision or Natural Language Processing', 'Generative Models & LLMs', 'Elective II', 'Mini-Project'] },
      { year: 'Semester 3', theme: 'Thesis I', modules: ['Literature Survey & Problem Formulation', 'Experimental Setup & Baselines', 'Seminar Presentation'] },
      { year: 'Semester 4', theme: 'Thesis II', modules: ['Thesis Research & Experiments', 'Paper Writing & Submission', 'Thesis Defence'] },
    ],
    tools: ['PyTorch', 'JAX', 'Python', 'CUDA', 'Weights & Biases', 'LaTeX', 'Hugging Face', 'Google Cloud Vertex AI'],
    whoFor: [
      'Engineers who want to do research rather than apply existing tooling',
      'Graduates planning a PhD or a research-engineer role',
      'Working engineers looking to move from application development into ML research',
    ],
    industries: ['Corporate research labs', 'Academia', 'Deep-tech startups', 'Applied research in healthcare and finance'],
    faqs: [
      { q: 'Do I need prior research experience?', a: 'No. Research methodology is taught in semester 1, and the first year is designed to bring engineers from an industry or coursework background up to research standard.' },
      { q: 'Is the thesis mandatory?', a: 'Yes — semesters 3 and 4 are substantially thesis work, and defence is a degree requirement.' },
      { q: 'Can I do this while working?', a: 'The programme is full-time and lab-based, so it is difficult to combine with full-time employment.' },
      { q: 'Does this lead to a PhD?', a: 'It is one of the intended routes. TIU offers a PhD in AI in both full-time and part-time modes.' },
    ],
  },

  'phd-ai-full-time': {
    eligibility: 'Master\'s degree in CSE, IT, Data Science, Mathematics or a related discipline, with entrance test and interview',
    overview:
      'A full-time doctoral programme in artificial intelligence, structured around a supervised, original research contribution. The first year covers coursework and comprehensive examination; the remainder is research, with regular progress review by a doctoral committee. Scholars are expected to publish through the programme, not only at the end of it.',
    highlights: [
      { title: 'Doctoral committee review', detail: 'Progress is assessed by a committee at fixed intervals, so the work stays on track rather than drifting.' },
      { title: 'Publish during, not after', detail: 'Peer-reviewed output is expected across the programme, which strengthens the thesis and the academic CV simultaneously.' },
      { title: 'Teaching and mentoring experience', detail: 'Full-time scholars assist with undergraduate teaching, which matters for an academic career.' },
      { title: 'Access to campus AI labs', detail: 'Research runs on the same Google Cloud and IBM lab infrastructure used across the School of the Future.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Coursework and qualification', modules: ['Research Methodology', 'Advanced Topics in Machine Learning', 'Domain Elective', 'Comprehensive / Qualifying Examination'] },
      { year: 'Years 2–3', theme: 'Core research', modules: ['Literature Synthesis & Problem Definition', 'Experimental Programme', 'Conference & Journal Publication', 'Periodic Doctoral Committee Review'] },
      { year: 'Years 4–5', theme: 'Thesis and defence', modules: ['Thesis Writing', 'Pre-Submission Seminar', 'External Examination', 'Viva Voce'] },
    ],
    tools: ['PyTorch', 'Python', 'LaTeX', 'High-performance computing resources', 'Google Cloud Vertex AI'],
    whoFor: [
      'Master\'s graduates aiming at an academic or research career',
      'Candidates with a specific research question they want to pursue for several years',
      'Those seeking a research-scientist role in industry labs',
    ],
    industries: ['Academia', 'Industrial research labs', 'Government research organisations', 'Deep-tech founding teams'],
    faqs: [
      { q: 'How long does the programme take?', a: 'Typically four and a half to five and a half years full-time, depending on the research and the committee\'s assessment of readiness to submit.' },
      { q: 'Is coursework required?', a: 'Yes, in the first year, followed by a comprehensive examination before full research registration.' },
      { q: 'Do I need to find a supervisor before applying?', a: 'Identifying faculty whose work overlaps with your interests strengthens an application considerably, and supervision is confirmed as part of admission.' },
      { q: 'Is there a part-time option?', a: 'Yes — TIU offers a half-time PhD in AI for candidates who are working.' },
    ],
  },

  'phd-ai-half-time': {
    eligibility: 'Master\'s degree in a relevant discipline, plus employer consent where applicable; entrance test and interview',
    overview:
      'The part-time route to the same doctoral degree, designed for working professionals who want to pursue research without leaving their role. Coursework and committee reviews are scheduled to accommodate employment, and many scholars draw their research problem from their own industry context. The academic standard — comprehensive examination, publication, thesis defence — is identical to the full-time programme.',
    highlights: [
      { title: 'Same degree, different schedule', detail: 'Requirements and examination standards match the full-time programme; only the pace and contact pattern differ.' },
      { title: 'Research rooted in your work', detail: 'Scholars are encouraged to formulate a problem from their professional domain, which makes the research both tractable and useful.' },
      { title: 'Scheduled around employment', detail: 'Coursework and committee reviews are arranged so they can be met alongside a full-time role.' },
      { title: 'Industry-academia supervision', detail: 'Where appropriate, supervision can combine a faculty guide with an industry mentor.' },
    ],
    curriculum: [
      { year: 'Phase 1', theme: 'Coursework and qualification', modules: ['Research Methodology', 'Advanced Topics in Machine Learning', 'Domain Elective', 'Comprehensive / Qualifying Examination'] },
      { year: 'Phase 2', theme: 'Research programme', modules: ['Problem Formulation', 'Experimental Work', 'Publication', 'Doctoral Committee Reviews'] },
      { year: 'Phase 3', theme: 'Thesis and defence', modules: ['Thesis Writing', 'Pre-Submission Seminar', 'External Examination', 'Viva Voce'] },
    ],
    tools: ['PyTorch', 'Python', 'LaTeX', 'Google Cloud Vertex AI'],
    whoFor: [
      'Working professionals who want a doctorate without pausing their career',
      'Industry practitioners with a research problem already in view',
      'Candidates aiming to move into R&D leadership or teaching later',
    ],
    industries: ['Industrial R&D', 'Academia', 'Technology leadership', 'Consulting'],
    faqs: [
      { q: 'How is this different from the full-time PhD?', a: 'The degree and the academic requirements are the same. The difference is scheduling — coursework, reviews and residency requirements are arranged to fit alongside employment.' },
      { q: 'Do I need my employer\'s consent?', a: 'Where the research draws on your workplace or its data, written consent is generally required. The admissions office can confirm what applies in your case.' },
      { q: 'How long does it take?', a: 'Longer than the full-time route, since research progresses alongside a job. Duration is set in consultation with the doctoral committee.' },
      { q: 'Can my research topic come from my job?', a: 'Yes, and it is encouraged — provided the problem meets the originality standard and any confidentiality issues can be resolved.' },
    ],
  },
  // ───────────────────────────────────────────────────────────
  // Information Technology & Applied Sciences
  // ───────────────────────────────────────────────────────────
  'bca-data-science-ai': {
    eligibility: '10+2 in any stream with Mathematics or Computer Science as a subject',
    overview:
      'A four-year BCA that treats data science as the main subject rather than a final-semester elective. The computing core — programming, databases, web development — is built in the first two years, and from there the IBM-designed track takes over with analytics, machine learning and Watson-based AI application development. It suits students who want an applied, industry-facing route into data roles without a B.Tech entrance route.',
    highlights: [
      { title: 'Applied route into data roles', detail: 'Less theoretical load than B.Tech, more time on tools and delivery — built for students who want to be job-ready in analytics.' },
      { title: 'IBM-designed AI track', detail: 'Watson, SPSS and IBM Cloud tooling sit inside the coursework rather than alongside it.' },
      { title: 'Open to non-PCM students', detail: 'Accessible to commerce and humanities students with Mathematics or Computer Science at 10+2 level.' },
      { title: 'Portfolio over transcript', detail: 'Every specialisation semester carries a deliverable — a dashboard, a model, a deployed app — that goes into your portfolio.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Computing fundamentals', modules: ['Programming in Python', 'Computer Fundamentals & Architecture', 'Mathematics for Computing', 'Web Technologies', 'Database Concepts'] },
      { year: 'Year 2', theme: 'Software and data foundations', modules: ['Data Structures', 'Object-Oriented Programming (Java)', 'SQL & Relational Databases', 'Statistics for Data Science', 'Software Engineering', 'Data Visualisation'] },
      { year: 'Year 3', theme: 'Data science and AI core', modules: ['Machine Learning', 'Data Mining & Predictive Analytics', 'Python for Data Analysis', 'Cloud Computing with IBM Cloud', 'Business Intelligence', 'AI Application Development'] },
      { year: 'Year 4', theme: 'Advanced applications, internship and project', modules: ['Deep Learning Basics', 'Natural Language Processing with Watson', 'Big Data Technologies', 'Industry Internship', 'Major Project'] },
    ],
    tools: ['Python', 'SQL', 'IBM Watson Studio', 'IBM Cloud', 'Power BI', 'pandas & scikit-learn', 'Tableau', 'Excel'],
    whoFor: [
      'Students who want a data career without the B.Tech route',
      'Commerce or science students with Mathematics at school level',
      'Anyone who prefers applied, tool-led learning over heavy theory',
    ],
    industries: ['Analytics services', 'IT consulting', 'Banking operations', 'E-commerce', 'Healthcare analytics'],
    faqs: [
      { q: 'BCA or B.Tech CSE — which is right for me?', a: 'B.Tech goes deeper into engineering theory, mathematics and systems, and is the stronger route to core engineering roles. BCA is more applied and tool-focused, and is a faster route into analyst and developer roles. Both lead into data careers.' },
      { q: 'Can I do an MCA or M.Sc after this?', a: 'Yes. BCA graduates are eligible for MCA and, subject to the specific admission criteria, for M.Sc in Data Science and AI at TIU.' },
      { q: 'Do I need Mathematics at 10+2?', a: 'Mathematics or Computer Science as a 10+2 subject is the standard requirement. The admissions team can confirm eligibility for your particular combination.' },
      { q: 'Is this a three-year or four-year BCA?', a: 'This is the four-year programme, which allows the full data science and AI specialisation plus an industry internship.' },
    ],
  },

  'bsc-cyber-security': {
    eligibility: '10+2 in Science, or any stream with Mathematics / Computer Science',
    overview:
      'A hands-on security degree built around the attacker\'s perspective and the defender\'s response. You learn networks and operating systems properly first, because you cannot attack or defend a system you do not understand, then move through penetration testing, digital forensics, incident response and secure development. Lab work runs on isolated environments — you break things in a range built for it.',
    highlights: [
      { title: 'Dedicated cyber range', detail: 'Offensive exercises run in an isolated lab environment, so the practice is real without being reckless.' },
      { title: 'Both sides of the fence', detail: 'Penetration testing and SOC/blue-team defence are both full modules — most graduates start on the defensive side.' },
      { title: 'Forensics and legal context', detail: 'Digital forensics is paired with cyber law and evidence handling, which matters for investigative roles.' },
      { title: 'IBM security tooling', detail: 'Enterprise SIEM and threat-intelligence workflows are taught on IBM\'s security stack.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Computing and network foundations', modules: ['Programming with Python', 'Computer Networks', 'Operating Systems & Linux', 'Mathematics & Discrete Structures', 'Introduction to Information Security'] },
      { year: 'Year 2', theme: 'Security core', modules: ['Cryptography', 'Network Security', 'Web Application Security', 'Database Security', 'Scripting for Security', 'Security Operations Fundamentals'] },
      { year: 'Year 3', theme: 'Offensive and defensive practice', modules: ['Ethical Hacking & Penetration Testing', 'Digital Forensics', 'Malware Analysis', 'Cloud Security', 'Incident Response & SOC Operations', 'Cyber Law & Compliance'] },
      { year: 'Year 4', theme: 'Specialisation, internship and project', modules: ['Threat Intelligence', 'Red Team / Blue Team Exercises', 'Governance, Risk & Compliance', 'Industry Internship', 'Major Project'] },
    ],
    tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'IBM QRadar', 'Splunk', 'Nmap', 'Python', 'Autopsy'],
    whoFor: [
      'Students who instinctively ask how a system could be broken',
      'Anyone targeting SOC, penetration testing or forensics roles',
      'Students who want lab-heavy learning rather than lecture-heavy learning',
    ],
    industries: ['Banking and financial services', 'Managed security service providers', 'IT consulting', 'Government and defence', 'Product security teams'],
    faqs: [
      { q: 'Is ethical hacking actually legal?', a: 'Yes, when performed with authorisation. The programme covers the legal framework alongside the technique, and all offensive practice happens inside a sanctioned lab environment.' },
      { q: 'Do I need a Science background?', a: 'A science stream is the usual route, but students from other streams with Mathematics or Computer Science at 10+2 are considered.' },
      { q: 'What is the first job likely to be?', a: 'Most graduates start as SOC Analyst, Security Analyst or Junior Penetration Tester. Forensics roles usually follow a couple of years of experience.' },
    ],
  },

  'bsc-data-analytics-gen-ai': {
    eligibility: '10+2 in any stream with Mathematics or Statistics as a subject',
    overview:
      'An undergraduate degree built around where analytics is actually heading — classical data analysis in the first half, generative AI and large language models in the second. You learn to query, model and visualise data, then move on to prompt engineering, retrieval-augmented generation and building applications on top of foundation models. The IBM track supplies the tooling.',
    highlights: [
      { title: 'Generative AI as core curriculum', detail: 'LLMs, prompting, fine-tuning and RAG are full modules, not a guest lecture.' },
      { title: 'Analytics foundation first', detail: 'You learn statistics and SQL before touching foundation models, so the AI work rests on something solid.' },
      { title: 'Build and deploy LLM applications', detail: 'Coursework includes shipping a working AI application, not only calling an API in a notebook.' },
      { title: 'Responsible AI module', detail: 'Bias, hallucination, evaluation and governance are taught as engineering problems.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Data foundations', modules: ['Programming with Python', 'Statistics & Probability', 'Database Systems and SQL', 'Data Visualisation', 'Mathematics for Data Science'] },
      { year: 'Year 2', theme: 'Analytics core', modules: ['Exploratory Data Analysis', 'Machine Learning Fundamentals', 'Business Analytics', 'Data Wrangling & ETL', 'Predictive Modelling', 'Dashboarding with Power BI'] },
      { year: 'Year 3', theme: 'Generative AI', modules: ['Deep Learning Foundations', 'Natural Language Processing', 'Large Language Models & Transformers', 'Prompt Engineering', 'Retrieval-Augmented Generation', 'IBM watsonx Application Development'] },
      { year: 'Year 4', theme: 'Advanced practice, internship and project', modules: ['Fine-Tuning & Model Evaluation', 'AI Agents and Automation', 'Responsible & Explainable AI', 'Industry Internship', 'Major Project'] },
    ],
    tools: ['Python', 'SQL', 'IBM watsonx', 'Hugging Face', 'LangChain', 'Power BI', 'pandas', 'Vector databases'],
    whoFor: [
      'Students who want to work with generative AI as builders rather than users',
      'Anyone drawn to analytics but wanting the newest layer of the field as well',
      'Students from any 10+2 stream with a mathematics or statistics background',
    ],
    industries: ['AI product companies', 'Analytics consulting', 'Marketing and content technology', 'Fintech', 'Enterprise automation'],
    faqs: [
      { q: 'Will generative AI still matter by the time I graduate?', a: 'The specific models will change; the underlying skills — evaluation, retrieval, data quality, deployment — transfer. That is why the first two years are spent on analytics fundamentals rather than on today\'s tooling.' },
      { q: 'Do I need a coding background?', a: 'No. Python starts from first principles in year one.' },
      { q: 'How is this different from the BCA with Data Science and AI?', a: 'The BCA is a broader computing degree with a data specialisation. This B.Sc is narrower and goes further into analytics and generative AI specifically.' },
      { q: 'What can I study after this?', a: 'M.Sc in Data Science and AI, MCA, or an MBA in Business Analytics are all common next steps.' },
    ],
  },

  'msc-data-science-ai': {
    eligibility: 'Bachelor\'s degree with Mathematics or Statistics, or a computing degree (B.Sc / BCA / B.Tech)',
    overview:
      'A two-year postgraduate programme for graduates who already have quantitative grounding and want to convert it into data science practice at depth. Year one covers statistical learning, machine learning and big data engineering at a level that assumes mathematical maturity; year two is specialisation plus a dissertation, which may be taken in industry.',
    highlights: [
      { title: 'Assumes the maths, goes deeper', detail: 'Statistical learning is taught at postgraduate depth rather than re-teaching undergraduate foundations.' },
      { title: 'Dissertation can be industry-based', detail: 'Year-two research may be hosted with a partner organisation on a live problem.' },
      { title: 'Engineering as well as modelling', detail: 'Big data systems and deployment are taught alongside modelling, which is what separates a data scientist from a notebook user.' },
      { title: 'Route into research or industry', detail: 'The dissertation structure supports both a PhD application and an industry data science role.' },
    ],
    curriculum: [
      { year: 'Semester 1', theme: 'Statistical and computational foundations', modules: ['Statistical Learning Theory', 'Advanced Python for Data Science', 'Database & Data Warehouse Systems', 'Linear Algebra & Optimisation', 'Data Visualisation'] },
      { year: 'Semester 2', theme: 'Machine learning and scale', modules: ['Machine Learning', 'Deep Learning', 'Big Data Technologies (Spark, Hadoop)', 'Time Series & Forecasting', 'Cloud Data Platforms'] },
      { year: 'Semester 3', theme: 'Specialisation', modules: ['Natural Language Processing or Computer Vision', 'Generative AI & Foundation Models', 'MLOps & Model Deployment', 'Elective', 'Dissertation Phase I'] },
      { year: 'Semester 4', theme: 'Dissertation', modules: ['Dissertation Phase II', 'Industry Project or Research Thesis', 'Viva Voce'] },
    ],
    tools: ['Python', 'R', 'PyTorch', 'Apache Spark', 'SQL', 'Docker', 'MLflow', 'Google Cloud / IBM Cloud'],
    whoFor: [
      'Graduates with a quantitative degree moving into data science',
      'B.Sc / BCA graduates wanting postgraduate depth before entering the field',
      'Candidates considering a PhD but wanting a taught programme first',
    ],
    industries: ['Data science teams', 'Quantitative finance', 'Research and analytics consulting', 'Healthcare and bioinformatics', 'Technology products'],
    faqs: [
      { q: 'Can I join from a non-computing background?', a: 'Yes, if your bachelor\'s degree included Mathematics or Statistics. The programme assumes quantitative maturity more than prior programming depth, though Python is expected early.' },
      { q: 'Is the dissertation industry or academic?', a: 'Either. Students can take an industry-hosted project or a research thesis, depending on whether they are heading towards a job or a PhD.' },
      { q: 'How does this compare to the M.Tech in AI/ML?', a: 'The M.Tech is an engineering degree with a research thesis and an engineering entry requirement. The M.Sc is open to science graduates and balances statistics and data practice more heavily.' },
      { q: 'What roles does it lead to?', a: 'Senior Data Scientist, ML Engineer, Research Scientist and Analytics Lead are the common destinations.' },
    ],
  },

  'bsc-agriculture': {
    eligibility: '10+2 with Physics, Chemistry and Biology / Mathematics or Agriculture',
    overview:
      'A four-year professional degree covering the full agricultural sciences — agronomy, soil science, horticulture, plant protection and agricultural economics — with substantial field and farm practice. The final year includes the Rural Agricultural Work Experience programme, where students live and work with farming communities and run an agri-enterprise project of their own.',
    highlights: [
      { title: 'Field work, not only classroom', detail: 'Crop cycles, soil testing and farm management are learned on instructional farm plots across all four years.' },
      { title: 'RAWEP in the final year', detail: 'The Rural Agricultural Work Experience programme places students with farming communities for extended, supervised practice.' },
      { title: 'Agri-technology included', detail: 'Precision agriculture, remote sensing and farm data tools are part of the later curriculum.' },
      { title: 'Route to public-sector roles', detail: 'The degree is the standard qualification for agricultural officer, extension and banking-sector agri roles.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Foundations of agricultural science', modules: ['Fundamentals of Agronomy', 'Soil Science', 'Plant Biochemistry', 'Agricultural Meteorology', 'Introductory Horticulture'] },
      { year: 'Year 2', theme: 'Crops, protection and genetics', modules: ['Crop Production Technology', 'Genetics & Plant Breeding', 'Entomology', 'Plant Pathology', 'Agricultural Microbiology', 'Farm Machinery'] },
      { year: 'Year 3', theme: 'Management, economics and technology', modules: ['Agricultural Economics & Marketing', 'Irrigation & Water Management', 'Post-Harvest Technology', 'Precision Agriculture & Remote Sensing', 'Seed Technology', 'Animal Husbandry'] },
      { year: 'Year 4', theme: 'Field practice and enterprise', modules: ['Rural Agricultural Work Experience (RAWEP)', 'Agri-Entrepreneurship Project', 'Extension Education', 'Experiential Learning Module'] },
    ],
    tools: ['Soil testing laboratory', 'GIS & remote sensing software', 'Farm machinery', 'Instructional farm plots', 'Tissue culture laboratory'],
    whoFor: [
      'Students from a biology or agriculture background at 10+2',
      'Anyone aiming at agricultural officer, extension or agri-business roles',
      'Students interested in food systems, sustainability and rural enterprise',
    ],
    industries: ['Agri-business and inputs', 'Banking (agricultural credit)', 'Government agriculture departments', 'Food processing', 'Agri-tech startups'],
    faqs: [
      { q: 'Do I need Biology at 10+2?', a: 'Physics, Chemistry and Biology is the usual combination, though Mathematics or Agriculture in place of Biology is generally acceptable. The admissions office can confirm for your subject combination.' },
      { q: 'What is RAWEP?', a: 'The Rural Agricultural Work Experience Programme — a final-year placement where students work directly with farming communities and run a supervised agri-enterprise project.' },
      { q: 'Are government jobs available after this degree?', a: 'B.Sc Agriculture is the standard qualification for agricultural officer and extension officer recruitment, and for agriculture-specialist posts in public sector banks.' },
      { q: 'Can I pursue a master\'s afterwards?', a: 'Yes — M.Sc in Agriculture across specialisations such as agronomy, horticulture or plant breeding.' },
    ],
  },

  // ───────────────────────────────────────────────────────────
  // School of Business & Management
  // ───────────────────────────────────────────────────────────
  'bba-business-analytics': {
    eligibility: '10+2 in any stream',
    overview:
      'A management degree for students who want to make decisions with evidence. The BBA core — marketing, finance, operations, organisational behaviour — is taught alongside an analytics track that builds from spreadsheets to SQL to predictive modelling, using IBM tooling. The emphasis throughout is on translating a business question into a data question and back again.',
    highlights: [
      { title: 'Business first, analytics as the method', detail: 'You learn the functional areas properly, then learn to analyse them — which is what analyst roles actually require.' },
      { title: 'From Excel to Python', detail: 'The analytics track progresses deliberately, so students from any 10+2 stream can follow it.' },
      { title: 'IBM analytics tooling', detail: 'Cognos, SPSS and watsonx are used in coursework, not just named in it.' },
      { title: 'Case-based assessment', detail: 'Much of the grading is live cases and presentations rather than written examinations alone.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Management foundations', modules: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Business Statistics', 'Business Communication', 'Spreadsheet Analytics'] },
      { year: 'Year 2', theme: 'Functional areas and data skills', modules: ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Operations Management', 'SQL & Databases for Business', 'Data Visualisation'] },
      { year: 'Year 3', theme: 'Applied business analytics', modules: ['Predictive Analytics', 'Marketing & Customer Analytics', 'Financial Analytics', 'Python for Business Analytics', 'Supply Chain Analytics', 'Business Intelligence with IBM Cognos'] },
      { year: 'Year 4', theme: 'Strategy, internship and project', modules: ['Strategic Management', 'Decision Science & Optimisation', 'Entrepreneurship', 'Industry Internship', 'Capstone Project'] },
    ],
    tools: ['Excel', 'SQL', 'Python', 'IBM Cognos Analytics', 'IBM SPSS', 'Power BI', 'Tableau'],
    whoFor: [
      'Students who want a business career but not an innumerate one',
      'Anyone targeting business analyst, consulting or product roles',
      'Students from commerce, science or humanities backgrounds alike',
    ],
    industries: ['Consulting', 'Fintech and banking', 'E-commerce and retail', 'Product management', 'Market research'],
    faqs: [
      { q: 'Do I need Mathematics at 10+2?', a: 'No. The analytics track starts from business statistics and spreadsheets and builds up, so students from any stream can follow it.' },
      { q: 'Is this a technical degree?', a: 'It is a management degree with genuine technical content. You will write SQL and Python, but the framing is always a business decision rather than an engineering problem.' },
      { q: 'What about an MBA afterwards?', a: 'A common path. Many graduates work for two or three years as analysts first, which strengthens an MBA application considerably.' },
      { q: 'What is the first job usually?', a: 'Business Analyst, Data Analyst, Growth Analyst or Associate Consultant.' },
    ],
  },

  'mba-ibm': {
    eligibility: 'Bachelor\'s degree in any discipline; entrance test / interview as per admission policy',
    overview:
      'A two-year MBA where the analytics and technology content is built into the general management curriculum rather than offered as a side specialisation. Year one covers the standard management core; year two is specialisation — marketing, finance, HR or operations — taught with the data tooling that each of those functions now runs on. A summer internship sits between the two years.',
    highlights: [
      { title: 'Analytics inside every specialisation', detail: 'Whether you take finance or marketing, the second year is taught with the data tooling that function actually uses.' },
      { title: 'Summer internship between years', detail: 'An eight-to-ten week placement that frequently converts into a pre-placement offer.' },
      { title: 'Analytics tooling taught in context', detail: 'IBM analytics platforms are used inside the functional modules rather than as a standalone unit.' },
      { title: 'Live consulting projects', detail: 'Second-year teams work on scoped problems with partner organisations.' },
    ],
    curriculum: [
      { year: 'Semester 1', theme: 'Management core', modules: ['Marketing Management', 'Financial Accounting', 'Organisational Behaviour', 'Managerial Economics', 'Quantitative Techniques', 'Business Communication'] },
      { year: 'Semester 2', theme: 'Core and analytics foundations', modules: ['Financial Management', 'Operations Management', 'Human Resource Management', 'Business Research Methods', 'Business Analytics Foundations', 'Strategic Management'] },
      { year: 'Summer', theme: 'Industry immersion', modules: ['Summer Internship Project'] },
      { year: 'Semester 3', theme: 'Specialisation', modules: ['Specialisation Electives (Marketing / Finance / HR / Operations)', 'Predictive Analytics for Managers', 'IBM Cognos & Data-Driven Decision Making', 'Live Consulting Project'] },
      { year: 'Semester 4', theme: 'Strategy and capstone', modules: ['Corporate Strategy', 'Business Ethics & Governance', 'AI for Business Leaders', 'Dissertation / Capstone'] },
    ],
    tools: ['Excel', 'IBM Cognos Analytics', 'IBM SPSS', 'Power BI', 'SQL', 'Tableau'],
    whoFor: [
      'Graduates from any discipline moving into management roles',
      'Candidates who want an MBA that takes data seriously',
      'Early-career professionals returning for a full-time postgraduate degree',
    ],
    industries: ['Consulting', 'Banking and financial services', 'FMCG and retail', 'Technology product management', 'Operations and supply chain'],
    faqs: [
      { q: 'Do I need work experience to apply?', a: 'No, the programme admits fresh graduates. Work experience strengthens the classroom and often the outcome, but it is not a bar to entry.' },
      { q: 'Which specialisation should I choose?', a: 'The choice is made at the end of year one, after the core has given you exposure to each function — and after the summer internship, which is often the most useful signal.' },
      { q: 'How is this different from the Working Professional MBA?', a: 'This is the full-time programme with a summer internship and on-campus placement support. The Working Professional MBA is designed to be taken alongside a job.' },
      { q: 'What does the IBM collaboration actually add?', a: 'The analytics modules are taught on IBM tooling, so the platforms you use in the classroom are the ones used in industry.' },
    ],
  },

  'working-professional-mba': {
    eligibility: 'Bachelor\'s degree with relevant full-time work experience',
    overview:
      'An MBA structured around the constraint that matters most to working professionals: time. Classes run on weekends and in the evenings, coursework is assessed through workplace-applicable projects, and the cohort is made up of people with real organisational context to bring to a case discussion. The degree is the same; the delivery is built to survive a full-time job.',
    highlights: [
      { title: 'Weekend and evening delivery', detail: 'Scheduled so the programme fits around employment rather than competing with it.' },
      { title: 'Projects drawn from your own workplace', detail: 'Assessment is designed so coursework can address problems you are already responsible for.' },
      { title: 'A cohort with experience', detail: 'Peers bring functional and sectoral depth, which changes the quality of case discussion considerably.' },
      { title: 'No career break required', detail: 'Designed for professionals seeking promotion or a functional switch without leaving their role.' },
    ],
    curriculum: [
      { year: 'Semester 1', theme: 'Management core', modules: ['Managerial Economics', 'Financial Accounting', 'Organisational Behaviour', 'Marketing Management', 'Quantitative Methods'] },
      { year: 'Semester 2', theme: 'Functional depth', modules: ['Financial Management', 'Operations & Supply Chain', 'Human Capital Management', 'Business Analytics', 'Strategic Management'] },
      { year: 'Semester 3', theme: 'Specialisation and leadership', modules: ['Specialisation Electives', 'Leadership & Change Management', 'Project Management', 'Digital Transformation'] },
      { year: 'Semester 4', theme: 'Strategy and capstone', modules: ['Corporate Strategy', 'Business Ethics & Governance', 'Workplace Capstone Project', 'Viva Voce'] },
    ],
    tools: ['Excel', 'Power BI', 'SQL fundamentals', 'Project management tooling'],
    whoFor: [
      'Professionals with several years of experience seeking a management role',
      'Specialists moving into general management or cross-functional leadership',
      'Anyone who needs the qualification without a career break',
    ],
    industries: ['Technology and IT services', 'Manufacturing and operations', 'Banking and insurance', 'Healthcare administration', 'Family business and entrepreneurship'],
    faqs: [
      { q: 'How much work experience do I need?', a: 'The programme is built for candidates already in full-time employment. The admissions office can confirm the current minimum for your profile.' },
      { q: 'When are classes held?', a: 'On weekends and in the evenings, so the programme can be taken alongside full-time work.' },
      { q: 'Is the degree the same as the full-time MBA?', a: 'It is an MBA with the same academic standard. The difference is delivery format and the absence of a summer internship, since participants are already employed.' },
      { q: 'Can my employer sponsor me?', a: 'Many participants are employer-sponsored. The admissions team can provide the documentation most organisations ask for.' },
    ],
  },

  'bsc-hotel-hospitality': {
    eligibility: '10+2 in any stream',
    overview:
      'A hospitality degree that treats the operational trades — kitchen, front office, housekeeping, food and beverage service — as the foundation, then builds management on top of them. Training kitchens and a model front office are used from the first year, and industrial training in an operating hotel is part of the programme. Graduates come out able to run a shift, not only describe one.',
    highlights: [
      { title: 'Trained in working kitchens', detail: 'Production, bakery and service labs on campus, with practical assessment throughout.' },
      { title: 'Industrial training in industry', detail: 'A structured placement in an operating hotel, across departments.' },
      { title: 'Revenue and operations management', detail: 'Later years cover revenue management, costing and property systems, which is what promotion depends on.' },
      { title: 'Hospital and healthcare administration track', detail: 'The programme covers healthcare facility management alongside hotels, widening the career options.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Core operations', modules: ['Food Production Fundamentals', 'Food & Beverage Service', 'Front Office Operations', 'Accommodation & Housekeeping', 'Hospitality Communication'] },
      { year: 'Year 2', theme: 'Advanced operations and support functions', modules: ['Advanced Food Production', 'Bakery & Confectionery', 'Hotel Accounting', 'Nutrition & Food Science', 'Hospitality Law', 'Facility Planning'] },
      { year: 'Year 3', theme: 'Management layer', modules: ['Hotel & Hospital Administration', 'Revenue Management', 'Marketing for Hospitality', 'Human Resource Management', 'Property Management Systems', 'Industrial Training'] },
      { year: 'Year 4', theme: 'Specialisation and project', modules: ['Strategic Hospitality Management', 'Event & Banquet Management', 'Entrepreneurship in Hospitality', 'Industry Internship', 'Major Project'] },
    ],
    tools: ['Training kitchens & bakery labs', 'Model front office', 'Property management systems', 'Restaurant training facility'],
    whoFor: [
      'Students who want a career in hotels, healthcare facilities or events',
      'Anyone who prefers practical, people-facing work to desk-bound study',
      'Students interested in hospitality entrepreneurship',
    ],
    industries: ['Hotels and resorts', 'Hospital and healthcare administration', 'Cruise lines and aviation', 'Events and catering', 'Food and beverage entrepreneurship'],
    faqs: [
      { q: 'Do I need a science background?', a: 'No, the programme is open to students from any 10+2 stream.' },
      { q: 'How much of the course is practical?', a: 'A large proportion. Kitchen, service, front office and housekeeping labs run from year one, alongside industrial training in an operating property.' },
      { q: 'Does this cover hospital management too?', a: 'Yes — the programme covers hospital and healthcare facility administration alongside hotel operations, which broadens the career options.' },
      { q: 'What are typical starting roles?', a: 'Management trainee positions in hotels, front office or F&B supervisory roles, and healthcare facility administration roles.' },
    ],
  },

  // ───────────────────────────────────────────────────────────
  // Creative Arts & Design
  // ───────────────────────────────────────────────────────────
  'bdes-visual-comm': {
    eligibility: '10+2 in any stream; portfolio and / or design aptitude assessment',
    overview:
      'A design degree covering the full visual communication range — typography, branding, editorial, motion and digital. The first year is a common design foundation built on drawing, colour, form and composition; from year two the work becomes brief-driven, with live client projects and a graduating portfolio that is assessed as a professional body of work rather than a set of assignments.',
    highlights: [
      { title: 'Foundation year in craft', detail: 'Drawing, colour theory and composition before software — the part that distinguishes a designer from a tool operator.' },
      { title: 'Live briefs from year two', detail: 'Real clients, real constraints, real feedback, supervised by faculty.' },
      { title: 'Portfolio as the final assessment', detail: 'Graduation rests on a portfolio reviewed the way a studio would review it.' },
      { title: 'Motion and digital included', detail: 'Animation, UI and motion graphics sit alongside print, because brand work now spans all of it.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Design foundation', modules: ['Drawing & Visualisation', 'Colour Theory', 'Elements & Principles of Design', 'Typography I', 'History of Art & Design', 'Digital Tools Foundation'] },
      { year: 'Year 2', theme: 'Communication craft', modules: ['Typography II', 'Graphic Design & Layout', 'Illustration', 'Photography', 'Print Production', 'Brand Identity Basics'] },
      { year: 'Year 3', theme: 'Applied and digital communication', modules: ['Branding & Identity Systems', 'Motion Graphics', 'UI & Interaction Design', 'Editorial & Publication Design', 'Packaging Design', 'Advertising Campaigns'] },
      { year: 'Year 4', theme: 'Professional practice and degree project', modules: ['Design Research', 'Studio Internship', 'Professional Practice & Portfolio', 'Degree Project'] },
    ],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Adobe After Effects', 'Figma', 'Cinema 4D'],
    whoFor: [
      'Students with visual instinct who want to make it professional',
      'Anyone targeting studio, agency or in-house brand design roles',
      'Students who want a broad design base before specialising',
    ],
    industries: ['Design studios', 'Advertising agencies', 'In-house brand teams', 'Publishing and media', 'Freelance practice'],
    faqs: [
      { q: 'Do I need to be able to draw already?', a: 'Not to a professional standard. Drawing is taught from foundation level in year one; what matters at entry is visual curiosity and willingness to work at it.' },
      { q: 'Is a portfolio required to apply?', a: 'A portfolio and / or a design aptitude assessment is part of admission. It need not be professional work — school projects and personal work are acceptable.' },
      { q: 'B.Des Visual Communication or Digital Product Design?', a: 'Visual Communication is broader and brand- and craft-led. Digital Product Design is narrower and focused on interfaces, UX process and digital products.' },
      { q: 'Which software will I learn?', a: 'The Adobe suite for craft, Figma for digital and interface work, plus motion tooling in year three.' },
    ],
  },

  'bdes-game-art': {
    eligibility: '10+2 in any stream; portfolio and / or design aptitude assessment',
    overview:
      'A game art degree built around the production pipeline an actual studio uses: concept, modelling, texturing, rigging, lighting, and integration into a live engine. You work in Blender and Maya and ship into Unreal and Unity, so the work you make is playable rather than only renderable. Final-year students produce a portfolio piece built to the standards a studio art test expects.',
    highlights: [
      { title: 'Full art pipeline, engine to engine', detail: 'Concept through to in-engine asset, so you understand where your work goes and why it breaks.' },
      { title: 'Studio-standard portfolio', detail: 'Final-year work is built to the specification of a studio art test, not a college submission.' },
      { title: 'Technical art included', detail: 'Topology, UVs, LODs and performance budgets are taught properly — the constraints that separate hireable game art from pretty renders.' },
      { title: 'Team production project', detail: 'A cross-disciplinary team project with game development students, run like a small production.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Art foundation', modules: ['Drawing & Anatomy', 'Colour & Light', 'Design Fundamentals', 'Digital Painting', 'Introduction to 3D', 'Game Studies'] },
      { year: 'Year 2', theme: 'Asset creation', modules: ['3D Modelling (Hard Surface & Organic)', 'Sculpting with ZBrush', 'UV Mapping & Texturing', 'Concept Art', 'Character Design', 'Environment Design'] },
      { year: 'Year 3', theme: 'Production pipeline', modules: ['Rigging & Animation', 'PBR Texturing & Substance', 'Lighting & Rendering', 'Unreal Engine Art Pipeline', 'Technical Art & Optimisation', 'Level Art'] },
      { year: 'Year 4', theme: 'Specialisation and degree project', modules: ['Advanced Character or Environment Specialisation', 'Team Production Project', 'Studio Internship', 'Portfolio & Degree Project'] },
    ],
    tools: ['Blender', 'Autodesk Maya', 'ZBrush', 'Substance Painter', 'Unreal Engine', 'Unity', 'Adobe Photoshop'],
    whoFor: [
      'Students who want to make the art that goes into games',
      'Anyone aiming at 3D modelling, concept art or environment art roles',
      'Students willing to build a serious portfolio over four years',
    ],
    industries: ['Game studios', 'Animation and VFX', 'Advertising and CGI', 'Virtual production', 'Freelance and outsourcing studios'],
    faqs: [
      { q: 'Game Art or Game Development — which one?', a: 'Game Art is the visual side: modelling, texturing, environments, characters. Game Development is the engineering side: gameplay code, systems, engine work. Students from both meet on the team production project.' },
      { q: 'Do I need prior 3D experience?', a: 'No. Year one starts with drawing and design fundamentals, and 3D is introduced from scratch.' },
      { q: 'What does a studio actually look at when hiring?', a: 'The portfolio, almost exclusively — which is why the final year is structured around producing one to studio specification.' },
      { q: 'Which engine do you teach?', a: 'Unreal Engine is the primary art pipeline, with Unity covered as well.' },
    ],
  },

  'bdes-digital-product': {
    eligibility: '10+2 in any stream; portfolio and / or design aptitude assessment',
    overview:
      'A product design degree focused on digital interfaces and the process behind them — research, information architecture, interaction, prototyping, testing and design systems. The work is method-led: every project begins with users and a problem statement, and is assessed on the reasoning as much as the visual outcome. Graduates leave with case studies, which is what product design hiring actually looks at.',
    highlights: [
      { title: 'Case studies, not screenshots', detail: 'Projects are documented as end-to-end case studies with research, iteration and rationale.' },
      { title: 'User research taught as a discipline', detail: 'Interviewing, synthesis and usability testing are full modules with real participants.' },
      { title: 'Design systems and handoff', detail: 'Components, tokens and developer handoff are covered, because that is where the job mostly lives.' },
      { title: 'Work with engineering students', detail: 'Cross-disciplinary projects with CSE students, so you learn to design against real technical constraints.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Design foundation', modules: ['Design Fundamentals', 'Drawing & Visualisation', 'Typography', 'Colour & Composition', 'Introduction to Human-Centred Design', 'Digital Tools'] },
      { year: 'Year 2', theme: 'Interaction core', modules: ['User Research Methods', 'Information Architecture', 'Interaction Design', 'Wireframing & Prototyping', 'Visual Interface Design', 'Design Psychology'] },
      { year: 'Year 3', theme: 'Product practice', modules: ['Design Systems', 'Usability Testing & Evaluation', 'Service Design', 'Motion & Micro-interactions', 'Front-End Fundamentals for Designers', 'Product Strategy'] },
      { year: 'Year 4', theme: 'Professional practice and degree project', modules: ['Advanced Design Research', 'Industry Internship', 'Portfolio & Case Study Development', 'Degree Project'] },
    ],
    tools: ['Figma', 'Adobe XD', 'Framer', 'Miro', 'Maze / UserTesting', 'Adobe Creative Suite', 'HTML & CSS basics'],
    whoFor: [
      'Students drawn to how things work as much as how they look',
      'Anyone targeting UX, UI or product design roles at technology companies',
      'Students who enjoy research, structure and iteration',
    ],
    industries: ['Technology products and SaaS', 'Fintech', 'Design consultancies', 'E-commerce', 'Startups'],
    faqs: [
      { q: 'Do I need to know how to code?', a: 'No, though the programme includes front-end fundamentals so you can design realistically and hand off cleanly.' },
      { q: 'How is this different from Visual Communication?', a: 'Visual Communication is broader and craft-led — brand, print, motion, editorial. Digital Product Design is narrower and process-led, focused on interfaces, research and product thinking.' },
      { q: 'What do employers ask for?', a: 'A portfolio of case studies showing your process, not only final screens. The final year is structured around producing exactly that.' },
      { q: 'Is there an internship?', a: 'Yes, an industry internship in the final year.' },
    ],
  },

  'mdes-advertising': {
    eligibility: 'Bachelor\'s degree in design, fine arts, mass communication or a related field; portfolio review',
    overview:
      'A two-year masters for graduates who want to lead creative work rather than execute it. The programme combines strategy — brand positioning, consumer insight, campaign planning — with advanced craft across film, digital and experiential media. Year two centres on a self-directed thesis campaign, developed to the standard of a professional pitch.',
    highlights: [
      { title: 'Strategy and craft together', detail: 'You learn to build the argument for a campaign as well as to make it.' },
      { title: 'Thesis campaign as a pitch', detail: 'The final project is developed and defended the way an agency would pitch it to a client.' },
      { title: 'Across all contemporary media', detail: 'Film, social, experiential and digital campaigns, not print-era advertising theory.' },
      { title: 'Portfolio built for creative leadership roles', detail: 'Aimed at art direction and creative strategy positions rather than entry-level execution.' },
    ],
    curriculum: [
      { year: 'Semester 1', theme: 'Strategy and insight', modules: ['Advertising Strategy & Brand Positioning', 'Consumer Behaviour & Insight', 'Advanced Visual Communication', 'Copywriting & Concept Development', 'Design Research Methods'] },
      { year: 'Semester 2', theme: 'Campaign craft', modules: ['Integrated Campaign Planning', 'Film & Video Advertising', 'Digital & Social Media Campaigns', 'Art Direction', 'Experiential & Environmental Design'] },
      { year: 'Semester 3', theme: 'Specialisation and industry', modules: ['Creative Direction', 'Media Planning & Analytics', 'Agency Internship', 'Thesis Phase I — Research & Proposition'] },
      { year: 'Semester 4', theme: 'Thesis campaign', modules: ['Thesis Phase II — Campaign Development', 'Portfolio & Pitch Presentation', 'Professional Practice'] },
    ],
    tools: ['Adobe Creative Suite', 'Premiere Pro & After Effects', 'Figma', 'Social analytics platforms', 'Cinema 4D'],
    whoFor: [
      'Design and communication graduates aiming at creative leadership',
      'Working creatives returning for strategic depth',
      'Candidates targeting art direction or creative strategy roles',
    ],
    industries: ['Advertising agencies', 'Brand consultancies', 'In-house creative teams', 'Digital marketing', 'Independent creative practice'],
    faqs: [
      { q: 'Can I apply from a non-design bachelor\'s degree?', a: 'Yes, from design, fine arts, mass communication or a related field, subject to portfolio review. The portfolio matters more than the specific degree title.' },
      { q: 'Is a portfolio required?', a: 'Yes, portfolio review is part of admission.' },
      { q: 'Is the programme more strategic or more hands-on?', a: 'Both, deliberately. Semester one is strategy-heavy, semester two is craft-heavy, and the thesis requires you to carry an idea from proposition through to execution.' },
      { q: 'What roles does it lead to?', a: 'Creative Director, Art Director, Brand Strategist and Digital Marketing Lead are the common destinations.' },
    ],
  },

  'bsc-sound-engineering': {
    eligibility: '10+2 in any stream',
    overview:
      'A studio-based degree in audio production, delivered with Seamedu. You work across recording, mixing, mastering, live sound and post-production for film and games, learning on the consoles and digital audio workstations the industry actually uses. Critical listening is trained deliberately from the first year, because it is the skill everything else rests on.',
    highlights: [
      { title: 'Studio time from year one', detail: 'Recording and mixing practice in equipped studios rather than only simulation.' },
      { title: 'Critical listening trained', detail: 'Ear training is a structured module — the difference between an engineer and an operator.' },
      { title: 'Live sound as well as studio', detail: 'Front-of-house, monitoring and live rig work, which is where much of the paid work is.' },
      { title: 'Delivered with Seamedu', detail: 'Industry partner delivery with practitioners teaching alongside faculty.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Audio fundamentals', modules: ['Acoustics & Physics of Sound', 'Critical Listening & Ear Training', 'Introduction to DAWs', 'Music Theory Basics', 'Signal Flow & Studio Setup'] },
      { year: 'Year 2', theme: 'Recording and mixing', modules: ['Multitrack Recording', 'Microphone Techniques', 'Mixing Fundamentals', 'Audio Electronics', 'MIDI & Virtual Instruments', 'Digital Audio Theory'] },
      { year: 'Year 3', theme: 'Advanced production', modules: ['Advanced Mixing & Mastering', 'Live Sound Reinforcement', 'Sound Design for Film', 'Game Audio & Interactive Sound', 'Post-Production & Foley', 'Studio Management'] },
      { year: 'Year 4', theme: 'Specialisation and project', modules: ['Specialisation (Music / Film / Game Audio)', 'Industry Internship', 'Portfolio Development', 'Final Production Project'] },
    ],
    tools: ['Pro Tools', 'Ableton Live', 'Logic Pro', 'Studio consoles & outboard', 'Wwise / FMOD', 'Waves plugins'],
    whoFor: [
      'Musicians and audio enthusiasts who want to work behind the desk',
      'Anyone targeting studio, live sound or post-production roles',
      'Students interested in game audio and sound design',
    ],
    industries: ['Music production', 'Film and OTT post-production', 'Live events and touring', 'Game audio', 'Broadcast and podcasting'],
    faqs: [
      { q: 'Do I need to be a musician?', a: 'It helps but is not required. Music theory basics are taught in year one, and many strong engineers come from a technical rather than a performing background.' },
      { q: 'Which DAW will I learn?', a: 'Pro Tools as the industry standard, alongside Ableton Live and Logic Pro, plus Wwise and FMOD for interactive audio.' },
      { q: 'Is freelancing realistic after this?', a: 'Many graduates work freelance across live sound, podcast and post-production while building studio credits. The programme includes studio management and professional practice for that reason.' },
      { q: 'What is the Seamedu collaboration?', a: 'Seamedu is TIU\'s industry delivery partner for the media programmes, bringing practitioner-led teaching and studio infrastructure.' },
    ],
  },

  'bsc-game-development': {
    eligibility: '10+2 in any stream; Mathematics at 10+2 is an advantage',
    overview:
      'The engineering side of games, delivered with Seamedu. You learn C# and C++, the mathematics games actually need, and the systems that make a game work — physics, AI, networking, optimisation. Every year ends with a shipped build, and the final year runs a team production with game art students, mirroring how studios are structured.',
    highlights: [
      { title: 'You ship a game every year', detail: 'Each year ends with a playable build, so you accumulate four projects rather than one rushed final submission.' },
      { title: 'Game maths taught in context', detail: 'Vectors, matrices and quaternions taught against the movement and camera problems that need them.' },
      { title: 'Team production with artists', detail: 'The final-year project pairs developers with game art students, run like a small studio.' },
      { title: 'Both major engines', detail: 'Unity with C# and Unreal with C++ and Blueprints, so you are not locked to one pipeline.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Programming foundations', modules: ['Programming with C#', 'Mathematics for Games', 'Game Design Fundamentals', 'Introduction to Unity', 'Game Studies & History'] },
      { year: 'Year 2', theme: 'Gameplay systems', modules: ['Object-Oriented Programming & Data Structures', 'Gameplay Programming', 'Game Physics', 'Level Design', 'UI/UX for Games', '2D & 3D Game Production'] },
      { year: 'Year 3', theme: 'Advanced engineering', modules: ['C++ and Unreal Engine', 'Game AI & Behaviour Systems', 'Multiplayer & Networking', 'Graphics Programming & Shaders', 'Performance Optimisation', 'Mobile & Cross-Platform Development'] },
      { year: 'Year 4', theme: 'Production and release', modules: ['Team Production Project', 'Game Monetisation & Publishing', 'Industry Internship', 'Portfolio & Final Build'] },
    ],
    tools: ['Unity', 'Unreal Engine', 'C#', 'C++', 'Git & Perforce', 'Blender', 'Visual Studio'],
    whoFor: [
      'Students who want to build games as engineers',
      'Anyone targeting gameplay, engine or tools programming roles',
      'Students who like both code and creative problem-solving',
    ],
    industries: ['Game studios', 'Mobile gaming', 'Simulation and training software', 'AR/VR development', 'Interactive media'],
    faqs: [
      { q: 'Do I need prior programming experience?', a: 'No. C# is taught from scratch in year one, though comfort with mathematics helps considerably.' },
      { q: 'Game Development or Game Art?', a: 'Development is code — gameplay systems, physics, AI, networking. Art is visual — modelling, texturing, environments. Students from both work together on the final-year production.' },
      { q: 'Can I work outside games with this degree?', a: 'Yes. The engine, graphics and simulation skills transfer to AR/VR, simulation, visualisation and training software.' },
      { q: 'What do studios look for?', a: 'Shipped projects and a portfolio of playable builds — which is why the programme requires one every year.' },
    ],
  },

  'bsc-filmmaking': {
    eligibility: '10+2 in any stream',
    overview:
      'A production-led filmmaking degree delivered with Seamedu, covering direction, cinematography, editing, sound and production management. You shoot from the first year and the workload is built around completed films rather than exercises — a short every semester, a substantial graduation film in the final year, made under professional constraints of schedule and budget.',
    highlights: [
      { title: 'You shoot from semester one', detail: 'Production begins immediately; theory is taught against footage you have actually made.' },
      { title: 'Every department, then a specialisation', detail: 'Direction, camera, edit and sound in the early years, so you choose a department knowing what each involves.' },
      { title: 'Graduation film under real constraints', detail: 'Schedule, budget and crew discipline are part of the assessment.' },
      { title: 'Festival and distribution literacy', detail: 'The final year covers festival strategy, distribution and pitching.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Film fundamentals', modules: ['Film Language & Appreciation', 'Screenwriting Basics', 'Camera & Lighting Fundamentals', 'Editing Fundamentals', 'Sound for Film', 'First Short Film'] },
      { year: 'Year 2', theme: 'Craft departments', modules: ['Direction & Actor Work', 'Cinematography', 'Advanced Editing & Grading', 'Production Design', 'Production Management & Budgeting', 'Documentary Practice'] },
      { year: 'Year 3', theme: 'Advanced production', modules: ['Advanced Screenwriting', 'Multi-Camera & Studio Production', 'Post-Production Workflow', 'Colour Grading', 'Advertising & Music Video Production', 'Specialisation Elective'] },
      { year: 'Year 4', theme: 'Graduation film and industry', modules: ['Graduation Film', 'Film Business, Festivals & Distribution', 'Industry Internship', 'Showreel & Portfolio'] },
    ],
    tools: ['Cinema cameras & lighting kits', 'Adobe Premiere Pro', 'DaVinci Resolve', 'Avid Media Composer', 'Pro Tools', 'Final Draft'],
    whoFor: [
      'Students who want to make films rather than study them',
      'Anyone aiming at direction, cinematography or editing',
      'Students prepared for irregular hours and demanding production schedules',
    ],
    industries: ['Film and OTT production', 'Advertising and branded content', 'Documentary', 'Television and broadcast', 'Independent practice'],
    faqs: [
      { q: 'Do I need my own camera equipment?', a: 'No. Production equipment is provided for coursework, including cameras, lighting and sound kits.' },
      { q: 'When do I choose a specialisation?', a: 'From year three, after two years of working across direction, camera, editing and sound — so the choice is informed.' },
      { q: 'Is there an internship?', a: 'Yes, an industry internship in the final year alongside the graduation film.' },
      { q: 'What do I graduate with?', a: 'A showreel and a completed graduation film, which is what production houses assess.' },
    ],
  },

  'bsc-vfx-animation': {
    eligibility: '10+2 in any stream',
    overview:
      'A degree in visual effects and animation delivered with Seamedu, built around the post-production pipeline: modelling, animation, FX simulation, lighting, rendering and compositing. Training follows industry workflow, so you learn to work to shot specifications and hand off cleanly between departments — the practical reality of VFX work, which is almost always collaborative.',
    highlights: [
      { title: 'Pipeline discipline', detail: 'You learn to work to shot specs and hand off between departments, which is how VFX is actually produced.' },
      { title: 'Compositing taken seriously', detail: 'Nuke-based compositing is a full track, and it is where most entry-level VFX hiring happens.' },
      { title: 'Both animation and effects', detail: 'Character animation and FX simulation are both covered before you specialise.' },
      { title: 'Shot-based portfolio', detail: 'Final-year output is a breakdown reel built to studio expectations.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Art and 3D foundations', modules: ['Drawing & Anatomy', 'Design Fundamentals', 'Introduction to 3D Modelling', 'Digital Imaging', 'Principles of Animation'] },
      { year: 'Year 2', theme: 'Animation and asset craft', modules: ['Character Modelling & Sculpting', 'Texturing & Shading', 'Rigging', 'Character Animation', 'Lighting & Rendering', 'Match Moving & Tracking'] },
      { year: 'Year 3', theme: 'Effects and compositing', modules: ['FX Simulation (Fluids, Particles, Cloth)', 'Compositing with Nuke', 'Rotoscoping & Clean-up', 'Dynamics & Destruction', 'Advanced Rendering', 'Pipeline & Production Workflow'] },
      { year: 'Year 4', theme: 'Specialisation and reel', modules: ['Specialisation (Animation / FX / Compositing)', 'Industry Internship', 'Demo Reel Production', 'Final Project'] },
    ],
    tools: ['Autodesk Maya', 'Houdini', 'Nuke', 'ZBrush', 'Substance Painter', 'Adobe After Effects', 'Blender'],
    whoFor: [
      'Students who want to work in film, OTT or advertising post-production',
      'Anyone drawn to animation, simulation or compositing',
      'Students prepared to build a reel over four years',
    ],
    industries: ['VFX studios', 'Animation studios', 'Film and OTT post-production', 'Advertising and CGI', 'Game cinematics'],
    faqs: [
      { q: 'VFX or Game Art — what is the difference?', a: 'VFX is offline rendering for film and video, where quality is the constraint. Game art is real-time, where performance budgets constrain everything. The craft overlaps; the pipelines and priorities differ.' },
      { q: 'Do I need drawing skills?', a: 'Drawing and anatomy are taught from foundation in year one. Prior skill helps but is not required.' },
      { q: 'What gets me hired?', a: 'A demo reel with a clear breakdown of what you did on each shot. The final year is structured around producing one.' },
      { q: 'Which department should I aim for?', a: 'Compositing and roto/clean-up have the largest entry-level intake; animation and FX are more competitive. You specialise in year four after trying each.' },
    ],
  },

  // ───────────────────────────────────────────────────────────
  // Health & Allied Sciences
  // ───────────────────────────────────────────────────────────
  'bsc-cardiovascular': {
    overview:
      'A four-year allied health degree training cardiac care technologists — the people who run the cath lab, operate echocardiography equipment and support interventional cardiology procedures. Classroom work in cardiac anatomy, physiology and instrumentation is followed by extended clinical training in hospital settings, delivered in partnership with Emversity.',
    highlights: [
      { title: 'Clinical rotations in hospitals', detail: 'Supervised placements in cardiology departments, not only simulation.' },
      { title: 'Equipment-specific training', detail: 'Cath lab systems, ECG, echocardiography and haemodynamic monitoring taught on the equipment itself.' },
      { title: 'A recognised shortage area', detail: 'Cardiac care technologists are in structural short supply as interventional cardiology volumes grow.' },
      { title: 'Delivered with Emversity', detail: 'Industry partner delivery with hospital placement support built into the programme.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Biomedical foundations', modules: ['Human Anatomy', 'Human Physiology', 'Biochemistry', 'Medical Terminology', 'Basic Life Support & Patient Care'] },
      { year: 'Year 2', theme: 'Cardiac sciences', modules: ['Cardiac Anatomy & Physiology', 'Pathology of Cardiovascular Disease', 'Pharmacology', 'Electrocardiography', 'Medical Instrumentation'] },
      { year: 'Year 3', theme: 'Diagnostics and intervention', modules: ['Echocardiography', 'Cardiac Catheterisation Techniques', 'Haemodynamic Monitoring', 'Electrophysiology', 'Interventional Cardiology Support', 'Clinical Posting'] },
      { year: 'Year 4', theme: 'Clinical internship', modules: ['Supervised Clinical Internship', 'Advanced Cath Lab Practice', 'Research Project', 'Professional Ethics & Documentation'] },
    ],
    tools: ['Cath lab systems', 'Echocardiography machines', 'ECG and Holter equipment', 'Haemodynamic monitors', 'Simulation laboratory'],
    whoFor: [
      'Biology students who want a clinical career without an MBBS route',
      'Anyone drawn to procedural, equipment-led hospital work',
      'Students who want a defined professional role on graduation',
    ],
    industries: ['Cardiac hospitals and cath labs', 'Multi-speciality hospitals', 'Medical device companies', 'Diagnostic centres'],
    faqs: [
      { q: 'What does a cardiovascular technologist actually do?', a: 'Operates and monitors cardiac diagnostic and interventional equipment — running echocardiograms, assisting in catheterisation procedures, monitoring haemodynamics during intervention, and supporting electrophysiology work.' },
      { q: 'Is this an alternative to MBBS?', a: 'It is a different profession, not a substitute. Technologists are clinical specialists in cardiac procedures and equipment, working alongside cardiologists rather than practising medicine.' },
      { q: 'How much clinical exposure is there?', a: 'Clinical postings begin in year three and the fourth year is substantially a supervised hospital internship.' },
      { q: 'Are the fees for the full programme?', a: 'The fee shown on this page is the total programme fee. The admissions team can explain the payment schedule and any scholarship options.' },
    ],
  },

  'bsc-anesthesia': {
    overview:
      'A four-year degree training anaesthesia and operation theatre technologists — the clinical staff who prepare and manage the OT environment, set up anaesthesia equipment and monitor patients through surgery. The programme combines anatomy, physiology and pharmacology with extended theatre-based clinical training, delivered in partnership with Emversity.',
    highlights: [
      { title: 'Theatre-based clinical training', detail: 'Supervised practice in operating theatres across surgical specialities.' },
      { title: 'Anaesthesia equipment and monitoring', detail: 'Ventilators, anaesthesia workstations and patient monitoring taught hands-on.' },
      { title: 'Sterilisation and OT protocol', detail: 'Infection control and theatre discipline taught as core competence, since it defines the role.' },
      { title: 'Delivered with Emversity', detail: 'Industry partner delivery with structured hospital placement.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Biomedical foundations', modules: ['Human Anatomy', 'Human Physiology', 'Biochemistry', 'Microbiology & Infection Control', 'Basic Life Support'] },
      { year: 'Year 2', theme: 'Anaesthesia sciences', modules: ['Pharmacology of Anaesthetic Agents', 'Applied Anatomy for Anaesthesia', 'Anaesthesia Equipment & Gas Supply', 'Patient Monitoring', 'Pathology'] },
      { year: 'Year 3', theme: 'Operation theatre practice', modules: ['Operation Theatre Techniques', 'Sterilisation & Asepsis', 'Regional & General Anaesthesia Support', 'Critical Care & ICU Practice', 'Emergency & Trauma Management', 'Clinical Posting'] },
      { year: 'Year 4', theme: 'Clinical internship', modules: ['Supervised Clinical Internship', 'Advanced OT & ICU Practice', 'Research Project', 'Professional Ethics & Documentation'] },
    ],
    tools: ['Anaesthesia workstations', 'Ventilators', 'Patient monitoring systems', 'Sterilisation equipment', 'Simulation laboratory'],
    whoFor: [
      'Biology students seeking a clinical career outside MBBS',
      'Anyone suited to high-stakes, protocol-driven theatre environments',
      'Students who want a defined hospital role on graduation',
    ],
    industries: ['Hospitals and surgical centres', 'Critical care units', 'Emergency and trauma services', 'Medical device and equipment companies'],
    faqs: [
      { q: 'What does an anaesthesia technologist do?', a: 'Prepares and checks anaesthesia equipment, assists the anaesthetist through induction and recovery, monitors the patient during surgery, and manages theatre readiness and sterile protocol.' },
      { q: 'Is the work only in operating theatres?', a: 'Mostly, but the training also covers ICU and emergency practice, and many technologists work across critical care.' },
      { q: 'How much clinical training is included?', a: 'Clinical posting begins in year three, with the fourth year largely a supervised hospital internship.' },
      { q: 'Can I study further afterwards?', a: 'Yes — M.Sc programmes in anaesthesia technology and allied health sciences, and hospital administration routes.' },
    ],
  },

  'bpt': {
    eligibility: '10+2 with Physics, Chemistry and Biology',
    overview:
      'The Bachelor of Physiotherapy — a four-and-a-half-year professional degree including a compulsory six-month clinical internship. Training covers musculoskeletal, neurological, cardiorespiratory and sports physiotherapy, moving from anatomy and exercise physiology in the early years to supervised patient management in the later ones.',
    highlights: [
      { title: 'Six-month compulsory internship', detail: 'Rotating supervised clinical practice across specialities before the degree is awarded.' },
      { title: 'All major specialities covered', detail: 'Musculoskeletal, neurological, cardiorespiratory, paediatric and sports physiotherapy.' },
      { title: 'Hands-on manual therapy training', detail: 'Assessment and manual technique taught in practical labs from year two.' },
      { title: 'Route to independent practice', detail: 'Graduates can work in hospitals, sports settings or their own practice, subject to registration.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Basic sciences', modules: ['Human Anatomy', 'Human Physiology', 'Biochemistry', 'Exercise Therapy Fundamentals', 'Electrotherapy Fundamentals'] },
      { year: 'Year 2', theme: 'Applied sciences', modules: ['Pathology & Microbiology', 'Pharmacology', 'Biomechanics & Kinesiology', 'Exercise Therapy II', 'Electrotherapy II', 'Psychology & Sociology'] },
      { year: 'Year 3', theme: 'Clinical foundations', modules: ['General Medicine & Surgery', 'Orthopaedics', 'Neurology', 'Cardiorespiratory Physiotherapy', 'Clinical Assessment & Diagnosis', 'Clinical Posting'] },
      { year: 'Year 4', theme: 'Specialised physiotherapy', modules: ['Musculoskeletal Physiotherapy', 'Neurological Physiotherapy', 'Sports Physiotherapy', 'Community-Based Rehabilitation', 'Research Methodology & Project', 'Clinical Posting'] },
      { year: 'Internship', theme: 'Six-month supervised practice', modules: ['Rotating Clinical Internship across specialities'] },
    ],
    tools: ['Electrotherapy equipment', 'Exercise therapy gymnasium', 'Gait analysis', 'Manual therapy laboratory', 'Clinical assessment tools'],
    whoFor: [
      'PCB students who want a hands-on clinical profession',
      'Anyone interested in rehabilitation, sports or movement science',
      'Students who eventually want independent practice',
    ],
    industries: ['Hospitals and rehabilitation centres', 'Sports teams and academies', 'Orthopaedic and neuro clinics', 'Community health', 'Private practice'],
    faqs: [
      { q: 'Why is the programme four and a half years?', a: 'Four years of academic study plus a compulsory six-month supervised clinical internship, which is a requirement for the degree.' },
      { q: 'Can I specialise in sports physiotherapy?', a: 'Sports physiotherapy is covered in year four, and MPT offers a dedicated specialisation route afterwards.' },
      { q: 'Do I need Biology at 10+2?', a: 'Yes, Physics, Chemistry and Biology is the standard requirement.' },
      { q: 'Can physiotherapists practise independently?', a: 'Graduates work in hospitals, sports settings and private practice, subject to the applicable registration requirements.' },
    ],
  },

  'mpt': {
    eligibility: 'BPT degree with completed clinical internship',
    overview:
      'A two-year postgraduate physiotherapy degree taken in a chosen specialisation — musculoskeletal, neurological, cardiorespiratory or sports. The programme combines advanced clinical reasoning and evidence-based practice with a research dissertation, and is the standard route into senior clinical, specialist and academic roles.',
    highlights: [
      { title: 'Specialisation from the start', detail: 'You select a clinical stream at admission and go deep rather than broad.' },
      { title: 'Evidence-based practice', detail: 'Critical appraisal and research methods are core, which is what separates specialist from generalist practice.' },
      { title: 'Dissertation', detail: 'An original research project, supervised and defended.' },
      { title: 'Route to senior and academic roles', detail: 'MPT is the usual qualification for department head, specialist and teaching positions.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Advanced foundations', modules: ['Advanced Biomechanics & Kinesiology', 'Exercise Physiology', 'Research Methodology & Biostatistics', 'Advanced Electrotherapy', 'Clinical Reasoning & Differential Diagnosis'] },
      { year: 'Year 2', theme: 'Specialisation and research', modules: ['Specialisation Clinical Practice (Musculoskeletal / Neuro / Cardiorespiratory / Sports)', 'Advanced Manual Therapy', 'Evidence-Based Practice Seminar', 'Dissertation', 'Clinical Teaching Practice'] },
    ],
    tools: ['Advanced electrotherapy equipment', 'Gait and motion analysis', 'Manual therapy laboratory', 'Statistical software'],
    whoFor: [
      'BPT graduates seeking specialist clinical depth',
      'Physiotherapists aiming at academic or research careers',
      'Practitioners moving towards department leadership',
    ],
    industries: ['Speciality hospitals', 'Sports medicine', 'Academic institutions', 'Rehabilitation leadership', 'Private specialist practice'],
    faqs: [
      { q: 'Which specialisation should I choose?', a: 'The choice is usually driven by the patient population you found most engaging during your BPT internship. Musculoskeletal and sports are the most competitive; neurological and cardiorespiratory have strong hospital demand.' },
      { q: 'Is the dissertation compulsory?', a: 'Yes, it is a degree requirement and runs through the second year.' },
      { q: 'Can I teach after MPT?', a: 'Yes — MPT is the standard qualification for physiotherapy faculty roles, and the programme includes clinical teaching practice.' },
      { q: 'Do I need to have completed my BPT internship?', a: 'Yes, a completed BPT including the compulsory clinical internship is required.' },
    ],
  },

  'bmrit': {
    eligibility: '10+2 with Physics, Chemistry and Biology / Mathematics',
    overview:
      'A four-year degree in medical radiology and imaging technology, training the technologists who operate X-ray, CT, MRI and ultrasound equipment. The programme covers radiation physics and protection, cross-sectional anatomy and imaging protocol alongside extended clinical training in hospital radiology departments.',
    highlights: [
      { title: 'Every major imaging modality', detail: 'X-ray, CT, MRI, ultrasound and nuclear medicine, taught on equipment and in clinical postings.' },
      { title: 'Radiation safety as core competence', detail: 'Radiation physics and protection are full modules, since the responsibility is legal as well as clinical.' },
      { title: 'Cross-sectional anatomy', detail: 'Taught specifically for imaging interpretation and protocol selection.' },
      { title: 'Clinical postings in radiology departments', detail: 'Supervised practice in working hospital imaging units.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Biomedical and physics foundations', modules: ['Human Anatomy', 'Human Physiology', 'Radiation Physics', 'Medical Terminology', 'Patient Care & Ethics'] },
      { year: 'Year 2', theme: 'Radiographic technique', modules: ['Radiographic Techniques & Positioning', 'Radiation Protection & Safety', 'Image Processing & Quality Assurance', 'Pathology', 'Cross-Sectional Anatomy'] },
      { year: 'Year 3', theme: 'Advanced modalities', modules: ['Computed Tomography', 'Magnetic Resonance Imaging', 'Ultrasonography', 'Contrast Media & Special Procedures', 'Nuclear Medicine Basics', 'Clinical Posting'] },
      { year: 'Year 4', theme: 'Clinical practice and project', modules: ['Interventional Radiology Support', 'Radiotherapy Fundamentals', 'Supervised Clinical Internship', 'Research Project'] },
    ],
    tools: ['X-ray and fluoroscopy units', 'CT scanner', 'MRI systems', 'Ultrasound equipment', 'PACS and imaging workstations'],
    whoFor: [
      'Science students seeking a technical clinical role',
      'Anyone drawn to imaging technology and diagnostic work',
      'Students wanting a defined hospital profession on graduation',
    ],
    industries: ['Hospital radiology departments', 'Diagnostic imaging centres', 'Medical imaging equipment companies', 'Teleradiology services'],
    faqs: [
      { q: 'Is working with radiation safe?', a: 'With correct protocol, yes. Radiation protection and safety is a full module and governs practice throughout the clinical training — it is the profession\'s central discipline.' },
      { q: 'Do radiographers interpret scans?', a: 'Radiologists report and diagnose; technologists acquire the images, select and execute protocol, and ensure image quality. The technologist\'s judgement directly determines whether a scan is diagnostic.' },
      { q: 'Which modality has the best prospects?', a: 'CT and MRI skills are in strongest demand, and both are covered in year three with clinical exposure.' },
      { q: 'Can I study further?', a: 'Yes — M.Sc in medical imaging technology and related allied health postgraduate routes.' },
    ],
  },

  'mmlt': {
    eligibility: 'B.Sc in Medical Laboratory Technology or an equivalent allied health degree',
    overview:
      'A two-year postgraduate degree in medical laboratory technology for graduates who want to move from bench work into specialist, supervisory or research roles. The programme covers advanced clinical biochemistry, haematology, microbiology and molecular diagnostics, alongside laboratory quality management and a research dissertation.',
    highlights: [
      { title: 'Molecular diagnostics', detail: 'PCR, sequencing and molecular techniques taught at postgraduate depth — the fastest-growing area of laboratory practice.' },
      { title: 'Quality management and accreditation', detail: 'NABL-standard quality systems and laboratory management, which is what supervisory roles require.' },
      { title: 'Research dissertation', detail: 'An original project, supervised and defended.' },
      { title: 'Route to laboratory leadership', detail: 'Prepares graduates for senior technologist, quality officer and laboratory director tracks.' },
    ],
    curriculum: [
      { year: 'Year 1', theme: 'Advanced laboratory sciences', modules: ['Advanced Clinical Biochemistry', 'Advanced Haematology & Blood Banking', 'Advanced Clinical Microbiology', 'Immunology & Serology', 'Research Methodology & Biostatistics'] },
      { year: 'Year 2', theme: 'Specialisation, management and research', modules: ['Molecular Diagnostics & Cytogenetics', 'Histopathology & Cytology', 'Laboratory Quality Management & Accreditation', 'Clinical Posting', 'Dissertation'] },
    ],
    tools: ['Automated analysers', 'PCR and molecular laboratory', 'Flow cytometry', 'Histopathology laboratory', 'Laboratory information systems'],
    whoFor: [
      'BMLT graduates seeking specialist or supervisory roles',
      'Laboratory professionals moving towards quality and management',
      'Candidates interested in diagnostic research',
    ],
    industries: ['Hospital and reference laboratories', 'Diagnostic chains', 'Biotechnology and pharmaceutical research', 'Public health laboratories', 'Academia'],
    faqs: [
      { q: 'What does MMLT add over BMLT?', a: 'Depth in molecular and specialised diagnostics, plus laboratory quality management and research training — which is what distinguishes a senior technologist or quality officer from a bench technician.' },
      { q: 'Is the dissertation compulsory?', a: 'Yes, it runs through the second year and is a degree requirement.' },
      { q: 'Can I work in research afterwards?', a: 'Yes. Graduates move into biotechnology and pharmaceutical research, and the dissertation is a reasonable foundation for doctoral study.' },
      { q: 'Are there teaching opportunities?', a: 'MMLT is a common qualification for allied health faculty positions.' },
    ],
  },

};

export const getCourseContent = (id) => courseContent[id] || null;

export default courseContent;
