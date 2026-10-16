import { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, AlertCircle } from 'lucide-react';
import { VILLA_PHOTOS } from '../data/villaData';

// URL Video placeholder YouTube yang dapat diganti dengan mudah sewaktu-waktu:
// Rasio 16:9, autoplay=0 (tidak memutar otomatis)
const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/7V2GzY3Zz68?autoplay=0&rel=0';

const SLIDER_IMAGES = [
  {
    id: 1,
    url: VILLA_PHOTOS.hero,
    title: 'Fasad Utama & Kolam Renang Pribadi',
    caption: 'Suasana asri dan privat untuk liburan seluruh keluarga.',
  },
  {
    id: 2,
    url: VILLA_PHOTOS.livingRoom,
    title: 'Ruang Keluarga Santai & Terbuka',
    caption: 'Plafon tinggi dengan sirkulasi udara pegunungan yang segar.',
  },
  {
    id: 3,
    url: VILLA_PHOTOS.bedroom,
    title: 'Kamar Tidur Utama Nyaman & Bersih',
    caption: 'Linen katun putih berstandar hotel dan pencahayaan lembut.',
  },
  {
    id: 4,
    url: VILLA_PHOTOS.gardenPatio,
    title: 'Teras Santai di Tepi Kolam',
    caption: 'Tempat ideal untuk sarapan atau bersantai di sore hari.',
  },
];

export default function MediaShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-8 sm:py-14 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Jelajah Villa
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Foto Unggulan & Video Suasana Villa
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Geser slider foto atau tonton video suasana untuk melihat keindahan dan kenyamanan WebMudah Villa secara langsung.
          </p>
        </div>

        {/* Baris 3: Grid 2 Kolom (Slider Gambar + Video YouTube) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* 1. SLIDER GAMBAR VILLA (4 Gambar Dummy, Panah, Indikator) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-2xs">
            {/* Slide Viewport */}
            <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden group">
              <img
                src={SLIDER_IMAGES[currentSlide].url}
                alt={SLIDER_IMAGES[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-300"
                loading="lazy"
              />

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                <span className="text-[11px] font-semibold text-emerald-300 block">
                  Foto {currentSlide + 1} dari {SLIDER_IMAGES.length}
                </span>
                <h4 className="text-sm sm:text-base font-bold leading-tight">
                  {SLIDER_IMAGES[currentSlide].title}
                </h4>
                <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
                  {SLIDER_IMAGES[currentSlide].caption}
                </p>
              </div>

              {/* Tombol Panah Kiri */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Tombol Panah Kanan */}
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slider Dots / Indikator Posisi */}
            <div className="p-3.5 bg-white flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Pilih foto:
              </span>
              <div className="flex items-center gap-1.5">
                {SLIDER_IMAGES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx
                        ? 'w-6 bg-emerald-600'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Lihat foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. VIDEO YOUTUBE (Iframe Embed Responsif 16:9, Autoplay=0) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-2xs">
            {/* 16:9 Video Container */}
            <div className="relative aspect-video bg-slate-900 w-full overflow-hidden flex items-center justify-center">
              {!videoError && YOUTUBE_EMBED_URL ? (
                <iframe
                  src={YOUTUBE_EMBED_URL}
                  title="Video Suasana WebMudah Villa"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className="p-6 text-center text-slate-400 flex flex-col items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-slate-500 mb-2" />
                  <p className="text-sm font-medium">Video villa belum tersedia</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Silakan hubungi admin via WhatsApp untuk mendapatkan video tur terbaru.
                  </p>
                </div>
              )}
            </div>

            {/* Video Footer Caption */}
            <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium text-slate-800">
                <Video className="w-4 h-4 text-emerald-600" />
                <span>Video Tur WebMudah Villa (16:9)</span>
              </div>
              <span className="text-[11px] text-slate-400">Putar manual (bebas kuota)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
