import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '917071967998';
  const message = 'Assalamu Alaikum! I viewed your marriage biodata and would like to connect.';
  
  const handleWhatsAppClick = () => {
    // Using wa.me format which is the official WhatsApp click-to-chat
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 btn-gold-gradient rounded-full flex items-center justify-center shadow-lg group cursor-pointer active:scale-95 transition-transform tap-highlight-none"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
      
      {/* Tooltip - Hidden on mobile */}
      <span className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
      </span>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-20 pointer-events-none" />
    </button>
  );
};

export default WhatsAppButton;
