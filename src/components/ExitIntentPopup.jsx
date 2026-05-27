import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import iitkgpFlyer from '../assets/iitkgp.jpg';

const ALLOWED_PATHS = ['/', '/admissions', '/apply'];

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ALLOWED_PATHS.includes(pathname)) {
      setShow(false);
      return;
    }

    setShow(false);

    // Desktop: mouse leaves viewport from the top
    const handleMouseOut = (e) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener('mouseout', handleMouseOut);

    // Auto popup after 6 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 6000);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(timer);
    };
  }, [pathname]);

  if (!ALLOWED_PATHS.includes(pathname)) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Top red accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #FF0000, #CC0000)' }}
            />

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flyer Image */}
            <img
              src={iitkgpFlyer}
              alt="IIT KGP Event Flyer"
              className="w-full object-cover"
            />

            {/* Apply Now Button */}
            <div className="p-4 flex justify-center">
              <button
                onClick={() => {
                  setShow(false);
                  navigate('/admissions');
                }}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white text-base tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(90deg, #FF0000, #CC0000)' }}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
