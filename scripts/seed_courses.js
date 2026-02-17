import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
    process.exit(1);
}

const db = createClient({ url, authToken });

const courses = [
    {
        "id": "btech-cse",
        "title": "B.Tech Computer Science & Engineering (CSE)",
        "description": "Comprehensive program covering core CS fundamentals, algorithms, and software engineering. Powered by Google Cloud.",
        "category": "School of Engineering & Technology",
        "link": "#"
    },
    {
        "id": "btech-cse-ai-ml",
        "title": "B.Tech CSE – AI/ML",
        "description": "Specialized curriculum focused on Artificial Intelligence and Machine Learning technologies. Powered by Google Cloud.",
        "category": "School of Engineering & Technology",
        "link": "#"
    },
    {
        "id": "btech-cse-data-science",
        "title": "B.Tech CSE – Data Science",
        "description": "Learn to analyze and interpret complex data to solve real-world problems. Powered by Google Cloud.",
        "category": "School of Engineering & Technology",
        "link": "#"
    },
    {
        "id": "btech-cse-cloud",
        "title": "B.Tech CSE – Cloud Computing",
        "description": "Master cloud infrastructure and deployment strategies. Powered by Google Cloud.",
        "category": "School of Engineering & Technology",
        "link": "#"
    },
    {
        "id": "mtech-cse-ai-ml",
        "title": "M.Tech CSE – AI/ML",
        "description": "Advanced postgraduate program for deep research in AI and Machine Learning.",
        "category": "School of Engineering & Technology",
        "link": "#"
    },
    {
        "id": "bca-data-science-ai",
        "title": "BCA with Data Science & AI",
        "description": "Industry-aligned Bachelor of Computer Applications integrating Data Science and AI concepts. Powered by IBM.",
        "category": "Information Technology & Applied Sciences",
        "link": "#"
    },
    {
        "id": "bsc-data-analytics-gen-ai",
        "title": "B.Sc (H) Data Analytics & Generative AI",
        "description": "Cutting-edge program focusing on data analytics and generative AI models. Powered by IBM.",
        "category": "Information Technology & Applied Sciences",
        "link": "#"
    },
    {
        "id": "bsc-cyber-security",
        "title": "B.Sc (H) Cyber Security & Ethical Hacking",
        "description": "Learn to protect digital assets and networks from cyber threats. Powered by IBM.",
        "category": "Information Technology & Applied Sciences",
        "link": "#"
    },
    {
        "id": "msc-data-science-ai",
        "title": "M.Sc in Data Science & AI",
        "description": "Master's program designed to provide advanced knowledge in data science and artificial intelligence.",
        "category": "Information Technology & Applied Sciences",
        "link": "#"
    },
    {
        "id": "phd-ai",
        "title": "Ph.D in AI",
        "description": "Doctoral program for researching and developing novel AI theories and applications.",
        "category": "Information Technology & Applied Sciences",
        "link": "#"
    },
    {
        "id": "bba-business-analytics",
        "title": "BBA Business Analytics & AI",
        "description": "Combine business management skills with data analytics and AI insights. Powered by IBM.",
        "category": "School of Business & Management",
        "link": "#"
    },
    {
        "id": "mba-business-analytics",
        "title": "MBA Business Analytics & AI",
        "description": "Advanced business administration program with a focus on analytics-driven decision making. Powered by IBM.",
        "category": "School of Business & Management",
        "link": "#"
    },
    {
        "id": "bba-hotel-hospitality",
        "title": "BBA Hotel & Hospitality Management",
        "description": "Prepare for a career in the dynamic hospitality industry with management training.",
        "category": "School of Business & Management",
        "link": "#"
    },
    {
        "id": "executive-mba",
        "title": "Executive MBA",
        "description": "Tailored for working professionals looking to accelerate their career growth.",
        "category": "School of Business & Management",
        "link": "#"
    },
    {
        "id": "bdes-visual-comm",
        "title": "B.Des Visual Communication & Digital Design",
        "description": "Explore visual storytelling and digital design principles for modern media.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bdes-game-art",
        "title": "B.Des Game Art & Design",
        "description": "Design immersive game environments, characters, and assets.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bdes-digital-product",
        "title": "B.Des Digital Product Design",
        "description": "Focus on user experience and interface design for digital products.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "mdes-advertising",
        "title": "M.Des Advertising, Design & Digital Communication",
        "description": "Advanced design studies focusing on advertising strategies and digital communication.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bsc-sound-engineering",
        "title": "B.Sc (H) in Sound Engineering",
        "description": "Technical program covering audio recording, mixing, and sound design.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bsc-game-development",
        "title": "B.Sc (H) in Game Development",
        "description": "Learn game programming and development using industry-standard engines.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bsc-filmmaking",
        "title": "B.Sc (H) in Filmmaking",
        "description": "Comprehensive course on film production, direction, and editing.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bsc-vfx-animation",
        "title": "B.Sc (H) in Visual Effects & Animation",
        "description": "Master the art of VFX and animation for film, TV, and games.",
        "category": "Creative Arts & Design",
        "link": "#"
    },
    {
        "id": "bsc-cardiovascular",
        "title": "B.Sc (H) Cardiovascular Technology",
        "description": "Specialized training in cardiovascular diagnostic and therapeutic procedures.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "bsc-anesthesia",
        "title": "B.Sc (H) Anesthesia and Operation Theater Technology",
        "description": "Prepare for a vital role in surgical teams managing anesthesia and OT equipment.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "bmlt",
        "title": "Bachelor of Medical Laboratory Technology (BMLT)",
        "description": "Learn to perform clinical laboratory tests for disease diagnosis and treatment.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "mmlt",
        "title": "Master of Medical Laboratory Technology (MMLT)",
        "description": "Advanced studies in medical laboratory sciences and technology.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "bmrit",
        "title": "Bachelor of Medical Radiology & Imaging Technology (BMRIT)",
        "description": "Focus on medical imaging techniques like X-ray, CT, and MRI.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "bpt",
        "title": "Bachelor of Physiotherapy (BPT)",
        "description": "Learn physical therapy techniques to help patients recover movement and manage pain.",
        "category": "Health & Allied Sciences",
        "link": "#"
    },
    {
        "id": "mpt",
        "title": "Master of Physiotherapy (MPT)",
        "description": "Advanced specialization in physiotherapy practices and research.",
        "category": "Health & Allied Sciences",
        "link": "#"
    }
];

async function seed() {
    console.log("Starting seed...");
    try {
        // Optional: Clear existing courses
        // await db.execute("DELETE FROM courses"); 
        // console.log("Cleared existing courses.");

        // Or just upsert/insert. Let's delete for clean slate if that's desired, 
        // but usually user might want to keep existing? 
        // The user said "These are the current programs, update accordingly".
        // I'll delete and re-insert to be safe and clean.

        await db.execute("DELETE FROM courses");
        console.log("Cleared courses table.");

        for (const course of courses) {
            const { id, title, description, category, link } = course;
            await db.execute({
                sql: "INSERT INTO courses (id, title, description, category, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                args: [id, title, description, category, link, 0]
            });
            console.log(`Inserted: ${title}`);
        }
        console.log("Seed complete!");
    } catch (e) {
        console.error("Error seeding:", e);
    }
}

seed();
