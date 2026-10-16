import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { VILLA_INFO } from '../data/villaData';

export default function LocationSection() {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Kawasan Wisata Sejuk Puncak Jawa Barat'
  )}`;

  return (
    <section id="lokasi" className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Akses & Peta
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Lokasi WebMudah Villa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Berada di lingkungan asri pegunungan yang tenang, dengan akses aspal mulus dan mudah dijangkau dari pusat kota.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Direction Guide (Left 5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Compass className="w-4 h-4" />
                <span>Petunjuk Arah</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Alamat Resmi
              </h3>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {VILLA_INFO.address}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span><strong>Akses Kendaraan:</strong> Jalan aspal lebar, mudah dilalui mobil keluarga / minibus.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span><strong>Patokan Sekitar:</strong> 300 meter setelah Gerbang Wisata Alam Pinus, belok kiri ke Jl. Cemara Asri.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span><strong>Fasilitas Terdekat:</strong> 5 menit ke minimarket 24 jam & sentra oleh-oleh.</span>
                </div>
              </div>
            </div>

            {/* Tombol Lihat Lokasi */}
            <div className="mt-8 pt-4">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Lihat Lokasi di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Google Maps Placeholder Area (Right 7 cols) */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl border border-slate-200/90 overflow-hidden relative min-h-[320px] sm:min-h-[380px] flex items-center justify-center">
            {/* Visual Map Grid Pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px), radial-gradient(#94a3b8 1px, #f8fafc 1px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            />

            {/* Simulated Road Lines for Map Vibe */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 stroke-slate-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M-50 80 Q 200 120 400 60 T 900 140" fill="none" strokeWidth="8" />
              <path d="M120 -50 Q 180 200 240 450" fill="none" strokeWidth="6" />
              <path d="M350 -50 Q 300 150 450 450" fill="none" strokeWidth="10" strokeDasharray="6 4" />
              <path d="M-50 280 Q 300 260 700 320" fill="none" strokeWidth="12" />
            </svg>

            {/* Map Placeholder Content Box */}
            <div className="relative z-10 p-6 text-center max-w-sm mx-auto bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200/90 shadow-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>

              <h4 className="text-base font-bold text-slate-900">
                {VILLA_INFO.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {VILLA_INFO.address}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
                <span>Area Peta Interaktif (Placeholder)</span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Buka Petunjuk Arah Peta</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
