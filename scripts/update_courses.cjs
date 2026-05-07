const fs = require('fs');
const path = '/Users/aritrabose/Desktop/SOF/tiu-replica/src/data/mock_courses.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const updates = {
    'btech-cse-ai-ml': "This is TIU's flagship B.Tech CSE course in Kolkata — purpose-built for students who want to lead in Artificial Intelligence and Machine Learning. Widely regarded as one of the best AI courses after 12th available in India, this program combines rigorous academics with Google Cloud certifications and real-world AI projects.",
    'btech-cse-data-science': "Enrol in the most comprehensive data science course in Kolkata at the undergraduate level. Students learn to build end-to-end data pipelines, master statistical modelling, and use Python, SQL, and Google BigQuery on live datasets. A top choice among b tech colleges in West Bengal for data-driven careers.",
    'btech-cse-cloud': "One of the most advanced cloud computing courses in Kolkata, this program covers cloud architecture, DevOps, Kubernetes, microservices, and Google Cloud Platform in depth. Ideal for students pursuing a B.Tech college in West Bengal that offers enterprise-grade technology exposure.",
    'bca-data-science-ai': "An industry-aligned Bachelor of Computer Applications integrating data science and AI concepts with IBM-powered training. This program functions as a best IT training institute in Kolkata experience within a structured university framework, complete with IBM certifications.",
    'bsc-data-analytics-gen-ai': "A cutting-edge AI learning course in Kolkata at the undergraduate level. Students master Generative AI, LLMs, data analytics, and IBM AI tools, equipping them for the next generation of AI-driven industries. One of the best AI courses in India for science graduates.",
    'mtech-cse-ai-ml': "The most advanced M.Tech college in Kolkata experience for engineers seeking deep research expertise in AI and Machine Learning. Students publish in IEEE and Springer conferences, work on funded research projects, and earn industry certifications. As the top AI/ML courses in Kolkata at the postgraduate level, this program attracts engineers from across West Bengal and beyond.",
    'mba-ibm': "An analytics-driven MBA co-designed with IBM. Combines business administration with data science, AI tools, and strategic management, a strong choice among private colleges in Kolkata for management education."
};

data.forEach(course => {
    if (updates[course.id]) {
        course.description = updates[course.id];
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log('Successfully updated mock_courses.json');
