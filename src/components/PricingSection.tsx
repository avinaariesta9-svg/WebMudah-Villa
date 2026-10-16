import { Check, MessageCircle, AlertCircle } from 'lucide-react';
import { PRICING_INFO, VILLA_INFO } from '../data/villaData';

export default function PricingSection() {
  const getWaUrl = (type: string) => {
    const text = `Halo ${VILLA_INFO.name}, saya ingin bertanya tarif dan ketersediaan untuk sewa ${type}.`;
    return `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="harga" className="py-12 sm:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Estimasi Tarif
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Daftar Harga Menginap
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Tarif transparan tanpa biaya tersembunyi. Dapatkan harga terbaik dengan memesan langsung melalui pengelola kami.
          </p>
        </div>

        {/* Pricing Cards Grid (Weekday & Weekend) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Card 1: Weekday */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                Hari Biasa
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {PRICING_INFO.weekday.label}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {PRICING_INFO.weekday.note}
              </p>

              <div className="mt-5 pb-5 border-b border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {PRICING_INFO.weekday.price}
                </span>
                <span className="text-xs text-slate-500"> {PRICING_INFO.weekday.unit}</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-600">
                {PRICING_INFO.weekday.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={getWaUrl('Weekday (Senin-Kamis)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Tarif Weekday</span>
              </a>
            </div>
          </div>

          {/* Card 2: Weekend */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-600 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                Paling Diminati
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {PRICING_INFO.weekend.label}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {PRICING_INFO.weekend.note}
              </p>

              <div className="mt-5 pb-5 border-b border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {PRICING_INFO.weekend.price}
                </span>
                <span className="text-xs text-slate-500"> {PRICING_INFO.weekend.unit}</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-600">
                {PRICING_INFO.weekend.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={getWaUrl('Weekend (Jumat-Minggu)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Tarif Weekend</span>
              </a>
            </div>
          </div>
        </div>

        {/* Note Regarding Price Changes */}
        <div className="mt-6 max-w-4xl p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {PRICING_INFO.termsNote}
          </p>
        </div>
      </div>
    </section>
  );
}
