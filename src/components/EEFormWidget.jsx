import { useEffect, useState } from 'react';

/**
 * ExtraEdge lead form, sandboxed in a blob iframe so its global CSS/JS
 * cannot leak into the site. Same embed the /apply and IIT KGP pages use,
 * with the form id made configurable.
 */
const EEFormWidget = ({ formId = 'form-8', title = 'Admissions Enquiry Form', tone = 'dark' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(520);
  const [iframeUrl, setIframeUrl] = useState('');
  const mountId = `ee-${formId}`;

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'EE_WIDGET_LOADED') setIsLoading(false);
      // ignore collapsed reports (e.g. before the form script renders)
      if (event.data && event.data.type === 'EE_WIDGET_HEIGHT' && event.data.height > 200) setIframeHeight(event.data.height);
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
(function(){var s=${JSON.stringify(window.location.search)};if(s)try{history.replaceState(null,'',s);}catch(_){}})();
</script>
<div class="ee-form-widget" id="${mountId}"></div>
<script>
function reportHeight(){var h=document.body.scrollHeight;window.parent.postMessage({type:'EE_WIDGET_HEIGHT',height:h},'*');}
window.addEventListener("DOMContentLoaded",function(){
window.ee_form_widget_baseurl="https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/ee-form-widget/";
if(!document.getElementById("__formWidgetCss")){var e=document.createElement("link");e.id="__formWidgetCss";e.rel="stylesheet";e.href=window.ee_form_widget_baseurl+"css/stylesheet.min.css";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e);}
var t=document.createElement("script");t.type="text/javascript";
t.onload=async function(){var w=new eeFormWidget();await w.init("softiu",${JSON.stringify(formId)},${JSON.stringify(mountId)});window.parent.postMessage({type:'EE_WIDGET_LOADED'},'*');setTimeout(reportHeight,300);setTimeout(reportHeight,1000);};
t.src=window.ee_form_widget_baseurl+"js/eeFormWidget.min.js";document.getElementsByTagName("head")[0].appendChild(t);});
if(window.ResizeObserver){new ResizeObserver(reportHeight).observe(document.documentElement);}
</script>
</body>
</html>`;

    // Persist UTM params for attribution (same behaviour as the other form embeds)
    try {
      const params = new URLSearchParams(window.location.search);
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'channel'];
      if (keys.some((k) => params.has(k))) {
        let url = window.location.href;
        if (params.has('channel') && !params.has('utm_source')) {
          const u = new URL(url);
          u.searchParams.set('utm_source', params.get('channel'));
          url = u.href;
        }
        localStorage.setItem('stored_url', JSON.stringify({ url, expiry: Date.now() + 2592000000 }));
      }
    } catch { /* storage unavailable */ }

    const blob = new Blob([widgetCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);

    return () => {
      window.removeEventListener('message', handleMessage);
      URL.revokeObjectURL(url);
    };
  }, [formId, mountId]);

  const shell = tone === 'light'
    ? 'bg-white border border-gray-100 shadow-lg'
    : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl';

  return (
    <div className={`relative rounded-3xl ${shell}`} style={{ padding: '10px 5px', height: iframeHeight + 40 }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 rounded-3xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500" />
        </div>
      )}
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          title={title}
          className={`w-full border-0 z-10 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundColor: 'transparent', height: iframeHeight }}
        />
      )}
    </div>
  );
};

export default EEFormWidget;
