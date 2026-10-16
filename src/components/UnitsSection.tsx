import { useState } from 'react';
import { Users, Bed, Check, MessageCircle, X } from 'lucide-react';
import { VILLA_UNITS, VillaUnit } from '../data/villaData';

interface UnitsSectionProps {
  onBookUnit?: (unitName: string) => void;
}

export default function UnitsSection({ onBookUnit }: UnitsSectionProps) {
  const [selectedUnit, setSelectedUnit] = useState<VillaUnit | null>(null);

  const handleBookingClick = (unitName: string) => {
    if (selectedUnit) {
      setSelectedUnit(null);
    }
    if (onBookUnit) {
      onBookUnit(unitName);
    } else {
      const formEl = document.getElementById('form-booking');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="unit-kamar" className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Pilihan Unit
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Kamar & Unit Villa Pilihan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Pilihan unit yang dirancang bersih, tenang, dan lapang untuk disesuaikan dengan jumlah anggota keluarga Anda.
          </p>
        </div>

        {/* 3 Unit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {VILLA_UNITS.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-slate-300 transition-all flex flex-col"
            >
              {/* Unit Photo */}
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-103"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {unit.name}
                  </h3>

                  {/* Clean unboxed metadata with separators */}
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-700" />
                      {unit.capacity}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-emerald-700" />
                      {unit.beds}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {unit.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {unit.highlights.slice(0, 2).map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Mulai dari</span>
                    <div className="text-base font-bold text-slate-900">
                      {unit.pricePerNight}
                      <span className="text-xs font-normal text-slate-500"> /mlm</span>
                    </div>
                  </div>

                  {/* Action Buttons: Booking via WhatsApp + Lihat Detail */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => handleBookingClick(unit.name)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs touch-manipulation min-h-[42px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Booking via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedUnit(unit)}
                      className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors whitespace-nowrap min-h-[42px]"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUnit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl border border-slate-200 animate-fadeIn">
            <div className="relative aspect-[16/10] bg-slate-100">
              <img
                src={selectedUnit.image}
                alt={selectedUnit.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedUnit(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-white shadow-xs focus:outline-none"
                aria-label="Tutup detail unit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedUnit.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span>{selectedUnit.capacity}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedUnit.beds}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-slate-400">Tarif mulai</span>
                  <span className="text-base font-bold text-emerald-700">{selectedUnit.pricePerNight}</span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedUnit.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-800 block mb-2">Fasilitas Khusus Unit:</span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {selectedUnit.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookingClick(selectedUnit.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Booking via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit(null)}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
