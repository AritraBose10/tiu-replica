import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Admissions from './pages/Admissions';
import Approvals from './pages/Approvals';
import Events from './pages/Events';
import { AnimatePresence } from 'framer-motion';

// Engagement Components
import StickyApplyButton from './components/StickyApplyButton';
import WhatsAppButton from './components/WhatsAppButton';
import ExitIntentPopup from './components/ExitIntentPopup';
import LeadMagnetBanner from './components/LeadMagnetBanner';

// Admin imports
import { AuthProvider } from './components/admin/AuthProvider';
import AdminGuard from './components/admin/AdminGuard';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminEvents from './pages/admin/AdminEvents';
import AdminFAQs from './pages/admin/AdminFAQs';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminPartners from './pages/admin/AdminPartners';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminGallery from './pages/admin/AdminGallery';
import AdminScholarships from './pages/admin/AdminScholarships';
import AdminRecruiters from './pages/admin/AdminRecruiters';
import AdminSettings from './pages/admin/AdminSettings';
import './styles/admin.css';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const NotFound = () => (
  <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
    <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* ── Admin Routes (no Navbar/Footer) ── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="faqs" element={<AdminFAQs />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="scholarships" element={<AdminScholarships />} />
            <Route path="recruiters" element={<AdminRecruiters />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ── Public Routes ── */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-white">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/approvals" element={<Approvals />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <StickyApplyButton />
              <WhatsAppButton />
              <ExitIntentPopup />
              <LeadMagnetBanner />
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
