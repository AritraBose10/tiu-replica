import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ExtraEdge widget embedded in an iframe (same technique as AdmissionsHero)
const BrochureFormWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [iframeHeight, setIframeHeight] = useState(480);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'EE_WIDGET_LOADED') {
                setIsLoading(false);
            }
            if (event.data && event.data.type === 'EE_WIDGET_HEIGHT') {
                setIframeHeight(event.data.height);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const widgetCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { margin: 0; padding: 0; background: transparent; font-family: sans-serif; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
            </style>
        </head>
        <body>
            <div class="ee-form-widget" id="ee-form-9"></div>

            <script>
                function reportHeight() {
                    var h = document.body.scrollHeight;
                    window.parent.postMessage({ type: 'EE_WIDGET_HEIGHT', height: h }, '*');
                }

                window.addEventListener("DOMContentLoaded", function() {
                    window.ee_form_widget_baseurl = "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";

                    if (!document.getElementById("__formWidgetCss")) {
                        var e = document.createElement("link");
                        e.id = "__formWidgetCss";
                        e.rel = "stylesheet";
                        e.href = window.ee_form_widget_baseurl + "css/stylesheet.min.css";
                        e.type = "text/css";
                        document.getElementsByTagName("head")[0].appendChild(e);
                    }

                    var t = document.createElement("script");
                    t.type = "text/javascript";
                    t.onload = async function() {
                        var _eeFormWidget = new eeFormWidget();
                        await _eeFormWidget.init("softiu", "form-9", "ee-form-9");
                        window.parent.postMessage({ type: 'EE_WIDGET_LOADED' }, '*');
                        setTimeout(reportHeight, 300);
                        setTimeout(reportHeight, 1000);
                    };
                    t.src = window.ee_form_widget_baseurl + "js/eeFormWidget.min.js";
                    document.getElementsByTagName("head")[0].appendChild(t);
                });

                if (window.ResizeObserver) {
                    new ResizeObserver(reportHeight).observe(document.documentElement);
                }
            <\/script>
        </body>
        </html>
    `;

    return (
        <div className="relative w-full" style={{ height: iframeHeight + 20 }}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 rounded-xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500" />
                </div>
            )}
            <iframe
                srcDoc={widgetCode}
                title="Download Brochure Form"
                className={`w-full border-0 rounded-xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ height: iframeHeight, backgroundColor: 'transparent' }}
            />
        </div>
    );
};

const ExitIntentPopup = () => {
    const [show, setShow] = useState(false);

    const triggerPopup = useCallback(() => {
        if (sessionStorage.getItem('exitPopupShown')) return;
        sessionStorage.setItem('exitPopupShown', 'true');
        setShow(true);
    }, []);

    useEffect(() => {
        // Desktop: mouse leaves viewport from the top
        const handleMouseOut = (e) => {
            if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
                triggerPopup();
            }
        };
        document.addEventListener('mouseout', handleMouseOut);

        // Mobile fallback: show after 30s of idle
        const timer = setTimeout(() => {
            triggerPopup();
        }, 30000);

        return () => {
            document.removeEventListener('mouseout', handleMouseOut);
            clearTimeout(timer);
        };
    }, [triggerPopup]);

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

                        <div className="p-4">
                            {/* ExtraEdge Form Widget */}
                            <BrochureFormWidget />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExitIntentPopup;
