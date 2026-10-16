import { Sparkles, Bed, MapPin, Users } from 'lucide-react';
import { ADVANTAGES } from '../data/villaData';

export default function AdvantagesSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'nyaman':
        return <Bed className="w-5 h-5 text-emerald-700" />;
      case 'bersih':
        return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case 'lokasi':
        return <MapPin className="w-5 h-5 text-emerald-700" />;
      case 'keluarga':
        return <Users className="w-5 h-5 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <section id="keunggulan" className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Keunggulan Villa
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Mengapa Memilih WebMudah Villa?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Prioritas utama kami adalah memberikan pengalaman berlibur yang tanpa rasa khawatir
            dengan standar kenyamanan dan kebersihan terbaik.
          </p>
        </div>

        {/* 4 Core Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ADVANTAGES.map((item, index) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                  {getIcon(item.id)}
                </div>
                <div className="text-xs font-medium text-slate-400 mb-1">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-emerald-800 mb-2">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
