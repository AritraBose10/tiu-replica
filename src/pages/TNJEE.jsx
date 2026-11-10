import SEO from '../components/SEO';
import SchemaInjector from '../components/SchemaInjector';
import { AnnouncementBar, TnjeeHero, SectionNav } from '../components/tnjee/TnjeeHero';
import {
  CollaborationsStrip, PathwayOne, PathwayTwo, FutureReadyKit, CommonApplication,
  Placements, WhoWeAre, StudentVoices, InTheNews, CampusGallery, FinalCta,
} from '../components/tnjee/TnjeeSections';

// Content lives in src/data/tnjee.js. SEO copy deliberately avoids implying any
// IIT Kharagpur affiliation (PS/OCN/BRAND/2026-01 §5, websites).
const TITLE = 'TNJEE 2027 | Techno India University Admissions — B.Tech CSE with Google Cloud & IBM Courses';
const DESCRIPTION = 'Apply for TNJEE 2027, the entrance exam for Techno India University, West Bengal. One application, two pathways: B.Tech CSE with Google Cloud, or BCA, BBA, B.Sc and MBA courses with IBM at the School of the Future.';

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: 'TNJEE 2027 — Techno National Joint Entrance Examination',
  description: DESCRIPTION,
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  organizer: {
    '@type': 'CollegeOrUniversity',
    name: 'Techno India University, West Bengal',
    url: 'https://www.technoindiauniversity.ai',
  },
  location: { '@type': 'VirtualLocation', url: 'https://www.technoindiauniversity.ai/tnjee' },
};

const TNJEE = () => (
  <div className="bg-white selection:bg-[#FF0000] selection:text-white">
    <SEO title={TITLE} description={DESCRIPTION} />
    <SchemaInjector schema={pageSchema} />

    <AnnouncementBar />
    <TnjeeHero />
    <SectionNav />
    <CollaborationsStrip />
    <PathwayOne />
    <PathwayTwo />
    <FutureReadyKit />
    <CommonApplication />
    <Placements />
    <WhoWeAre />
    <StudentVoices />
    <InTheNews />
    <CampusGallery />
    <FinalCta />
  </div>
);

export default TNJEE;
