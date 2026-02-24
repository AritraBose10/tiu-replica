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

        // Inject CSS to push widget above sticky Apply bar on mobile + hide text label
        if (!document.getElementById('__krayaPositionFix')) {
            const style = document.createElement('style');
            style.id = '__krayaPositionFix';
            style.textContent = `
                /* Hide "WhatsApp Us" text label on all screen sizes */
                .kraya-floating-chat-icon .kraya-floating-whatsapp-container {
                    display: none !important;
                }

                @media (max-width: 768px) {
                    .kraya-floating-chat-icon {
                        bottom: 80px !important;
                        z-index: 70 !important;
                    }
                    .kraya-floating-chat-box {
                        bottom: 150px !important;
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
        document.head.appendChild(script);
    }, []);

    return null;
};

export default WhatsAppButton;
