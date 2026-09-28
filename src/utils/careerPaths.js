// Career paths lookup keyed by a substring of the course title.
// Shared between the Courses listing (flip-card back face) and CourseDetail
// so both surfaces stay in sync.
export const careerPathsMap = {
  'Computer Science': ['Software Engineer', 'Cloud Architect', 'DevOps Lead', 'Full-Stack Developer'],
  'AI': ['AI Engineer', 'ML Researcher', 'Data Scientist', 'NLP Specialist'],
  'Data Science': ['Data Scientist', 'Analytics Engineer', 'BI Developer', 'Data Architect'],
  'Cloud': ['Cloud Architect', 'SRE Engineer', 'Platform Engineer', 'Cloud Security Analyst'],
  'M.Tech': ['AI Research Scientist', 'ML Lead', 'Deep Learning Engineer', 'Computer Vision Engineer'],
  'BCA': ['Data Analyst', 'Junior Data Scientist', 'AI Developer', 'BI Analyst'],
  'Data Analytics': ['GenAI Developer', 'Prompt Engineer', 'Data Analyst', 'AI Product Manager'],
  'Cyber': ['Security Analyst', 'Penetration Tester', 'SOC Analyst', 'Cybersecurity Consultant'],
  'M.Sc': ['Senior Data Scientist', 'ML Engineer', 'Research Scientist', 'Analytics Lead'],
  'BBA Business': ['Business Analyst', 'Product Manager', 'Growth Strategist', 'Fintech Analyst'],
  'MBA Business': ['Strategy Consultant', 'VP Analytics', 'Product Director', 'Data-Driven CEO'],
  'Hotel': ['Hotel Manager', 'F&B Director', 'Revenue Manager', 'Hospitality Consultant'],
  'Executive MBA': ['C-Suite Executive', 'VP Operations', 'Managing Director', 'Entrepreneur'],
  'Visual Communication': ['Brand Designer', 'Art Director', 'UX Designer', 'Creative Lead'],
  'Game Art': ['Game Artist', '3D Modeler', 'Concept Artist', 'Environment Designer'],
  'Product Design': ['UX/UI Designer', 'Product Designer', 'Interaction Designer', 'Design Strategist'],
  'Advertising': ['Creative Director', 'Ad Strategist', 'Brand Manager', 'Digital Marketing Lead'],
  'Sound': ['Sound Engineer', 'Audio Producer', 'Mixing Engineer', 'Studio Manager'],
  'Game Development': ['Game Developer', 'Unity Engineer', 'Gameplay Programmer', 'Technical Designer'],
  'Gaming': ['Game Developer', 'Unity Engineer', 'Gameplay Programmer', 'Technical Designer'],
  'Filmmaking': ['Film Director', 'Cinematographer', 'Editor', 'Documentary Filmmaker'],
  'Visual Effects': ['VFX Artist', '3D Animator', 'Motion Graphics Designer', 'Compositing Artist'],
  'VFX': ['VFX Artist', '3D Animator', 'Motion Graphics Designer', 'Compositing Artist'],
  'Cardiovascular': ['Cath Lab Technologist', 'Echocardiography Technician', 'Electrophysiology Lab Tech', 'Cardiac Device Specialist'],
  'Anesthesia': ['Anesthesia Technologist', 'OT Technician', 'Perfusionist', 'Clinical Coordinator'],
  'Anaesthesia': ['Anaesthesia Technologist', 'OT Technician', 'Perfusionist', 'Clinical Coordinator'],
  'BMLT': ['Lab Technologist', 'Pathology Analyst', 'Research Technician', 'QC Officer'],
  'Medical Lab': ['Lab Technologist', 'Pathology Analyst', 'Research Technician', 'QC Officer'],
  'MMLT': ['Senior Lab Scientist', 'Lab Director', 'Clinical Researcher', 'Biotech Consultant'],
  'BMRIT': ['Radiologic Technologist', 'MRI Technician', 'CT Scan Specialist', 'Imaging Physicist'],
  'UX': ['UX/UI Designer', 'Product Designer', 'Interaction Designer', 'Design Strategist'],
  'Agriculture': ['Agronomist', 'Farm Manager', 'Agriculture Consultant', 'Research Scientist'],
  'LLB': ['Corporate Advocate', 'Legal Consultant', 'Litigator', 'Compliance Officer'],
  'Nursing': ['Nurse', 'Clinical Specialist', 'Nurse Educator', 'Hospital Administrator'],
  'LL.B': ['Advocate', 'Corporate Lawyer', 'Legal Consultant', 'Judicial Officer'],
  'B.Com': ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Audit Associate'],
  'Media Science': ['Journalist', 'Public Relations Officer', 'Digital Content Creator', 'Media Planner'],
  'Microbiology': ['Biotechnologist', 'Microbiologist', 'Quality Control Analyst', 'Research Technician'],
  'Biotechnology': ['Biotechnologist', 'Microbiologist', 'Quality Control Analyst', 'Research Technician'],
  'Physiotherapy': ['Physiotherapist', 'Sports Rehab Specialist', 'Clinical Physiotherapist', 'Rehab Consultant'],
  'BPT': ['Physiotherapist', 'Sports Rehab Specialist', 'Clinical Physiotherapist', 'Rehab Consultant'],
  'MPT': ['Senior Physiotherapist', 'Clinical Specialist', 'Rehab Department Head', 'Sports Medicine Consultant'],
  'PhD': ['Research Scientist', 'Academic Faculty', 'AI Research Lead', 'Innovation Consultant'],
};

/** Match a course title to career paths from the lookup map. */
export const getCareerPaths = (title) => {
  if (!title) return ['Industry Professional', 'Specialist', 'Researcher'];
  for (const [key, paths] of Object.entries(careerPathsMap)) {
    if (title.includes(key)) return paths;
  }
  return ['Industry Professional', 'Specialist', 'Consultant', 'Entrepreneur'];
};
