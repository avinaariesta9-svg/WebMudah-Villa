import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/villaData';

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<{
    id: string;
    title: string;
    category: string;
    image: string;
  } | null>(null);

  return (
    <section id="galeri" className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Galeri Foto
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Suasana & Ruangan Villa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Lihat setiap sudut WebMudah Villa yang bersih, terawat, dan siap menyambut kedatangan Anda.
          </p>
        </div>

        {/* 6 Images Grid - Mobile friendly (1-col on tiny screens, 2-col on mobile/tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80 cursor-pointer aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              tabIndex={0}
              role="button"
              aria-label={`Buka foto ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveImage(item);
                }
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-104"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover / Touch Overlay Card Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-4 transition-opacity duration-200">
                <div className="flex items-center justify-between w-full text-white">
                  <div>
                    <span className="block text-[11px] text-emerald-300 font-medium tracking-wide">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold drop-shadow-xs">
                      {item.title}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700/20"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-900">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors focus:outline-none"
                aria-label="Tutup preview foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between bg-white text-slate-800">
              <div>
                <span className="text-xs text-emerald-700 font-medium">{activeImage.category}</span>
                <h4 className="text-sm sm:text-base font-bold">{activeImage.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
