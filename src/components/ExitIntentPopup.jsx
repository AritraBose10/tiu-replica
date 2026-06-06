import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
// Keep flyer import commented for potential restore:
// import iitkgpFlyer from '../assets/iitkgp.webp';

const ALLOWED_PATHS = ['/', '/admissions', '/apply'];

// External Admissions Form Widget (Embedded via Iframe to ensure script isolation and proper loading)
const AdmissionsFormWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(520);
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EE_WIDGET_LOADED') setIsLoading(false);
      if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') setIframeHeight(event.data.height);
    };
    window.addEventListener('message', handleMessage);

    const widgetCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
</style>
</head>
<body>
<script>
(function(){try{var s=window.parent.location.search;if(s)history.replaceState(null,'',s);}catch(e){}})();
<\/script>
<div class="ee-form-widget" id="ee-form-8"></div>
<script>
function reportHeight(){var h=document.body.scrollHeight;window.parent.postMessage({type:'EE_WIDGET_HEIGHT',height:h},'*');}
window.addEventListener("DOMContentLoaded",function(){
window.ee_form_widget_baseurl="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
if(!document.getElementById("__formWidgetCss")){var e=document.createElement("link");e.id="__formWidgetCss";e.rel="stylesheet";e.href=window.ee_form_widget_baseurl+"css/stylesheet.min.css";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e);}
var t=document.createElement("script");t.type="text/javascript";
t.onload=async function(){var w=new eeFormWidget();await w.init("softiu","form-8","ee-form-8");window.parent.postMessage({type:'EE_WIDGET_LOADED'},'*');setTimeout(reportHeight,300);setTimeout(reportHeight,1000);};
t.src=window.ee_form_widget_baseurl+"js/eeFormWidget.min.js";document.getElementsByTagName("head")[0].appendChild(t);});
if(window.ResizeObserver){new ResizeObserver(reportHeight).observe(document.documentElement);}
<\/script>
</body>
</html>`;

     try{var _qs=window.location.search,_p=new URLSearchParams(_qs);if(_p.has("utm_source")||_p.has("utm_medium")||_p.has("utm_campaign")){localStorage.setItem("stored_url",JSON.stringify({url:window.location.href,expiry:Date.now()+2592000000}));}}catch(_e){}
 const blob = new Blob([widgetCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);

    return () => {
      window.removeEventListener('message', handleMessage);
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="w-full relative flex flex-col transition-all duration-300" style={{ padding: '0px 5px', height: iframeHeight }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl transition-opacity duration-300">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          title="Admissions Enquiry Form"
          className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: 'transparent', height: iframeHeight }}
        />
      )}
    </div>
  );
};

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
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-4"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Top red accent bar */}
            <div
              className="h-1 w-[calc(100%+2rem)] -ml-4 -mt-4 mb-4"
              style={{ background: 'linear-gradient(90deg, #FF0000, #CC0000)' }}
            />

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-[80]"
              aria-label="Close popup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Admissions Enquiry Form Widget */}
            <div className="text-center pt-6 pb-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">Apply Now</h2>
              <p className="text-gray-400 text-xs mt-1">Fill out the quick form below to proceed.</p>
            </div>
            
            <AdmissionsFormWidget />

            {/* Original Flyer & Button commented out for potential restore:
            <img
              src={iitkgpFlyer}
              alt="IIT KGP Event Flyer"
              className="w-full object-cover"
            />
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
            */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
