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
      <ScrollToTop />
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
      </div>
    </Router>
  );
}

export default App;
