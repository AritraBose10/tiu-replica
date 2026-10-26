// Photos shown on the /gallery page. Width/height are the source dimensions,
// used to reserve space (no layout shift) and to balance the masonry columns.
export const GALLERY_CATEGORIES = ['Campus', 'Industry', 'Hackathons', 'Workshops', 'Events', 'Clubs & Culture', 'Milestones'];

const img = (file) => `/assets/images/${file}`;

export const galleryImages = [
 { src: img('campus.webp'), width: 1920, height: 1280, category: 'Campus', title: 'Our Campus', alt: 'Techno India University campus building in Kolkata surrounded by greenery' },
 { src: img('c1.webp'), width: 1920, height: 1331, category: 'Campus', title: 'Main Entrance', alt: 'Techno India University main entrance lobby with reception desk' },
 { src: img('c2.webp'), width: 1920, height: 1080, category: 'Industry', title: 'Google for Education Summit', alt: 'School of the Future students at the Google for Education Leadership Summit' },
 { src: img('admc2.webp'), width: 1920, height: 1081, category: 'Industry', title: 'Leadership Summit: Higher Education', alt: 'Students and faculty posing together at the Google for Education Leadership Summit' },
 { src: img('industryexposure.webp'), width: 1600, height: 900, category: 'Industry', title: 'Fireside Chat with Google', alt: 'Students on stage after a fireside chat at the Google for Education Leadership Summit' },
 { src: img('sec2.webp'), width: 1920, height: 1279, category: 'Industry', title: 'Techno India Welcomes Team Google', alt: 'Students and faculty with visiting Google team in front of a welcome banner on campus' },
 { src: img('google2.webp'), width: 1920, height: 1081, category: 'Industry', title: 'Google Campus Visit', alt: 'Students standing beside the Google logo during an industry visit' },
 { src: img('ibmasmi.webp'), width: 1920, height: 1142, category: 'Industry', title: 'Visit to IBM', alt: 'Students in formal wear with mentors at the IBM office reception' },
 { src: img('c4.webp'), width: 960, height: 1280, category: 'Hackathons', title: 'Hackathon Squad', alt: 'School of the Future student team posing at a hackathon venue' },
 { src: img('hackathon1.webp'), width: 1920, height: 1319, category: 'Hackathons', title: 'Building Under Pressure', alt: 'Students coding on laptops during a hackathon' },
 { src: img('hackathonwin.webp'), width: 960, height: 1280, category: 'Hackathons', title: 'Hackathon Winners', alt: 'Winning hackathon team holding certificates and prizes' },
 { src: img('svyasa.webp'), width: 1920, height: 1920, category: 'Hackathons', title: 'IBM Expert Labs National Hackathon', alt: 'Student team on stage at the IBM Expert Labs national hackathon' },
 { src: img('TechFests.webp'), width: 1920, height: 1175, category: 'Hackathons', title: 'Campus Code Sprint', alt: 'Hall full of students working on laptops during a coding contest' },
 { src: img('f1.webp'), width: 1920, height: 1280, category: 'Workshops', title: 'Live Coding Session', alt: 'Speaker presenting code on a large screen to students' },
 { src: img('f2.webp'), width: 1920, height: 1280, category: 'Workshops', title: 'Hands-on with Industry Tools', alt: 'Instructor explaining a data pipeline on an interactive smart board' },
 { src: img('f3.webp'), width: 1920, height: 1388, category: 'Workshops', title: 'Guest Speaker Session', alt: 'Guest speaker in conversation with students during an interactive session' },
 { src: img('f4.webp'), width: 1920, height: 1334, category: 'Workshops', title: 'Lab Day', alt: 'Students working on laptops during a hands-on lab session' },
 { src: img('masterclass.webp'), width: 1920, height: 1280, category: 'Workshops', title: 'Industry Masterclass', alt: 'Industry expert teaching data preparation in a classroom masterclass' },
 { src: img('livecodingprojects.webp'), width: 1920, height: 1277, category: 'Workshops', title: 'Project Work', alt: 'Close-up of a student programming on a laptop' },
 { src: img('c5.webp'), width: 1920, height: 1280, category: 'Events', title: 'Seminar Series', alt: 'Students attending a seminar in the university auditorium' },
 { src: img('seminar.webp'), width: 1920, height: 1277, category: 'Events', title: 'Hands Up!', alt: 'Students raising their hands during an auditorium session' },
 { src: img('FAQ.webp'), width: 1920, height: 1277, category: 'Events', title: 'Audience Q&A', alt: 'Smiling students raising hands to ask questions at an event' },
 { src: img('startup.webp'), width: 1600, height: 993, category: 'Events', title: 'Startup Showcase', alt: 'Audience at an open-air startup event on a rooftop' },
 { src: img('Student.webp'), width: 1920, height: 1078, category: 'Events', title: "Freshers' Orientation", alt: "Collage of moments from the Google Developer Student Clubs freshers' orientation" },
 { src: img('Cultural.webp'), width: 5649, height: 3759, category: 'Clubs & Culture', title: 'Cultural Night', alt: 'Students performing a traditional dance on a brightly lit stage' },
 { src: img('techclubsession.webp'), width: 740, height: 500, category: 'Clubs & Culture', title: 'Drone Club Launch', alt: 'Students and faculty unveiling drones at a tech club launch' },
 { src: img('techcommunities.webp'), width: 558, height: 372, category: 'Clubs & Culture', title: 'Tech Community Meetup', alt: 'Members of a student tech community at a meetup' },
 { src: img('admc1.webp'), width: 1920, height: 1252, category: 'Milestones', title: 'New Programmes with IBM', alt: 'Faculty and guests on stage at the launch of new BCA programmes in collaboration with IBM' },
 { src: img('images.webp'), width: 1280, height: 702, category: 'Milestones', title: 'Certified!', alt: 'Students holding up their course completion certificates' },
 { src: img('design.webp'), width: 630, height: 420, category: 'Milestones', title: 'Graduation Day', alt: 'Graduates in gowns tossing their caps in celebration' },
];
