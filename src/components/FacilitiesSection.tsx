import { Wifi, Wind, Bath, Utensils, Car, Waves } from 'lucide-react';
import { VILLA_FACILITIES } from '../data/villaData';

export default function FacilitiesSection() {
  const getFacilityIcon = (id: string) => {
    switch (id) {
      case 'wifi':
        return <Wifi className="w-5 h-5 text-emerald-700" />;
      case 'ac':
        return <Wind className="w-5 h-5 text-emerald-700" />;
      case 'kamar-mandi':
        return <Bath className="w-5 h-5 text-emerald-700" />;
      case 'dapur':
        return <Utensils className="w-5 h-5 text-emerald-700" />;
      case 'parkir':
        return <Car className="w-5 h-5 text-emerald-700" />;
      case 'kolam-renang':
        return <Waves className="w-5 h-5 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <section id="fasilitas" className="py-12 sm:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Fasilitas Lengkap
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Fasilitas Utama untuk Kenyamanan Anda
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Semua fasilitas dirawat secara berkala untuk memastikan Anda dan keluarga menikmati masa tinggal yang menyenangkan.
          </p>
        </div>

        {/* 6 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {VILLA_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="p-5 sm:p-6 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 shrink-0 flex items-center justify-center">
                {getFacilityIcon(facility.id)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {facility.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
