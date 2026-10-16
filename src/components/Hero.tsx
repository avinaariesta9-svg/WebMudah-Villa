import { MessageCircle, Check, MapPin } from 'lucide-react';
import { VILLA_INFO } from '../data/villaData';

interface HeroProps {
  onBookingClick?: () => void;
}

export default function Hero({ onBookingClick }: HeroProps) {
  const handleBooking = (e: React.MouseEvent) => {
    if (onBookingClick) {
      e.preventDefault();
      onBookingClick();
    }
  };

  return (
    <section id="beranda" className="relative bg-white pt-6 pb-6 sm:pt-10 sm:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Location / Category Anchor (Unboxed metadata with separator, zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
          <span className="flex items-center gap-1 font-medium text-emerald-800">
            <MapPin className="w-3.5 h-3.5" />
            Kawasan Wisata Sejuk, Jawa Barat
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Homestay & Family Villa</span>
        </div>

        {/* Hero Title & Description */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.15] text-balance">
            {VILLA_INFO.tagline}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            {VILLA_INFO.description}
          </p>
        </div>

        {/* Primary Action Button & Quick Trust Points */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
          <a
            href="#form-booking"
            onClick={handleBooking}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-base hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-sm shadow-emerald-700/10 min-h-[48px] touch-manipulation cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>Booking via WhatsApp</span>
          </a>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Respon Cepat</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tanpa Biaya Admin</span>
            </div>
          </div>
        </div>

        {/* Key Features Strip below Hero */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-700">
          <div>
            <span className="block text-xs text-slate-400 font-medium">Kapasitas Tamu</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">{VILLA_INFO.capacity}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Kamar Tidur</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">{VILLA_INFO.bedroomCount}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Fasilitas Air</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">{VILLA_INFO.pool}</span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium">Privasi</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900">Satu Villa Utuh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
