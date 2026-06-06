import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EEFormWidget = () => {
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
 <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl" style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
 {isLoading && (
 <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-3xl">
 <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500" />
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

const AdmissionsForm = () => {
 return (
 <section className="py-24 px-4 bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center min-h-screen">
 <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center relative z-10">
 {/* Left Text */}
 <div>
 <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
 Ready to <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
 Apply?
 </span>
 </h2>
 <p className="text-xl text-gray-400 mb-8 max-w-md">
 Seats are limited and programs are in high demand. Apply early to secure your
 preferred program and scholarship consideration.
 </p>

 <div className="flex flex-col gap-3 mb-8">
 <a
 href="https://wa.me/916292233351?text=Hi%2C%20I%20want%20the%20SoF%20course%20brochure"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-semibold hover:bg-green-500/20 transition-all"
 >
 📱 Get Course List &amp; Brochure on WhatsApp
 </a>
 <a
 href="#"
 className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
 >
 📞 Book a 10-Minute Counselling Call
 </a>
 </div>

 <div className="flex gap-4">
 <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
 <h4 className="text-2xl font-bold text-red-500">2026</h4>
 <p className="text-sm text-gray-500">Intake Open</p>
 </div>
 <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
 <h4 className="text-2xl font-bold text-white">Rolling</h4>
 <p className="text-sm text-gray-500">Admissions</p>
 </div>
 </div>
 </div>

 {/* Right: EE Form Widget */}
 <motion.div
 initial={{ opacity: 0, x: 40 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.7 }}
 >
 <EEFormWidget />
 </motion.div>
 </div>
 </section>
 );
};

export default AdmissionsForm;
