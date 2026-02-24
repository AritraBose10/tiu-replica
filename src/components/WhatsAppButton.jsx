import { useEffect } from 'react';

const WhatsAppButton = () => {
    useEffect(() => {
        window.chatWidgetConfig = {
            whatsappNumber: "916292090138",
            welcomeMessage: "Hey 👋,\nHow can we help you?",
            buttonText: "Chat on Whatsapp",
            profileName: "Kraya AI",
            profileImageUrl: "https://api.kraya-ai.com/images/kraya-logo.png",
            appUrl: "https://api.kraya-ai.com"
        };

        // Inject CSS to push widget above sticky apply bar on mobile
        if (!document.getElementById('__krayaPositionFix')) {
            const style = document.createElement('style');
            style.id = '__krayaPositionFix';
            style.textContent = `
                @media (max-width: 768px) {
                    /* Push Kraya chat widget above the sticky Apply bar (~64px tall) */
                    #kraya-chat-widget,
                    [id*="kraya"],
                    [class*="kraya-chat"],
                    [class*="chat-widget-container"],
                    [class*="whatsapp-widget"],
                    .widget-container {
                        bottom: 80px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Avoid loading twice
        if (document.getElementById('__krayaChatWidget')) return;

        const script = document.createElement('script');
        script.id = '__krayaChatWidget';
        script.src = "https://api.kraya-ai.com/widget/chat.js?v=1771933931284";
        script.async = true;

        // After script loads, use MutationObserver to find and reposition widget on mobile
        script.onload = () => {
            if (window.innerWidth > 768) return;

            const observer = new MutationObserver(() => {
                // Try to find the widget root — Kraya typically appends a fixed div to body
                const fixedEls = document.querySelectorAll('body > div[style*="position: fixed"], body > div[style*="position:fixed"]');
                fixedEls.forEach(el => {
                    const style = window.getComputedStyle(el);
                    // Target bottom-right fixed elements (the widget)
                    if (style.bottom !== 'auto' && style.right !== 'auto') {
                        el.style.setProperty('bottom', '80px', 'important');
                    }
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });

            // Stop observing after 5s
            setTimeout(() => observer.disconnect(), 5000);
        };

        document.head.appendChild(script);
    }, []);

    return null;
};

export default WhatsAppButton;
