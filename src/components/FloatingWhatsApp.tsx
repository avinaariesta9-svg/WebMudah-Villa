import { MessageCircle } from 'lucide-react';
import { VILLA_INFO } from '../data/villaData';

export default function FloatingWhatsApp() {
  const waUrl = `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Halo WebMudah Villa, saya ingin bertanya ketersediaan dan booking untuk liburan keluarga.'
  )}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6 pointer-events-auto"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-full shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95 touch-manipulation group"
        aria-label="Hubungi WebMudah Villa melalui WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold tracking-wide hidden xs:inline sm:inline">
          Tanya WA
        </span>
      </a>
    </aside>
  );
}
