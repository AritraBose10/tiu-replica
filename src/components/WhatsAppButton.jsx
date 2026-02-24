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
