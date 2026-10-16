import { VILLA_INFO, VILLA_PHOTOS } from '../data/villaData';

export default function AboutSection() {
  return (
    <section id="tentang" className="py-12 sm:py-20 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Tentang Villa
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Kenyamanan Rumah Sendiri dengan Suasana Liburan Menenangkan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {VILLA_INFO.name} didirikan dengan komitmen memberikan ruang berkumpul yang hangat,
            privat, dan tenang bagi keluarga. Setiap sudut dirancang untuk memastikan Anda dan
            keluarga dapat melepas penat dari kesibukan kota dengan rasa aman dan nyaman.
          </p>
        </div>

        {/* Gallery Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Ruang Keluarga */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              <img
                src={VILLA_PHOTOS.livingRoom}
                alt="Ruang keluarga WebMudah Villa yang luas dan terang"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base text-slate-900">Ruang Keluarga Lega</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sofa empuk yang cukup untuk seluruh keluarga, bukaan jendela kaca besar menghadap
                  taman hijau, dan sirkulasi udara alami yang segar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                Area Kumpul · Santai Bersama
              </div>
            </div>
          </div>

          {/* Card 2: Kamar Tidur */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              <img
                src={VILLA_PHOTOS.bedroom}
                alt="Kamar tidur utama WebMudah Villa dengan kasur king-size bersih dan nyaman"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base text-slate-900">Kamar Tidur Bersih & Tenang</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kasur premium berbalut seprai katun putih yang senantiasa bersih, pencahayaan
                  lembut, dan suasana hening untuk tidur malam yang pulas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                3 Kamar Tidur · Linen Higienis
              </div>
            </div>
          </div>

          {/* Card 3: Teras & Kolam Renang */}
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              <img
                src={VILLA_PHOTOS.gardenPatio}
                alt="Area teras santai dan kolam renang WebMudah Villa yang asri"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base text-slate-900">Teras & Kolam Renang Privat</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kolam renang bersih dengan kedalaman ramah anak dan keluarga, dikelilingi pepohonan
                  asri serta meja santai untuk sarapan atau bersantai sore.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                Kolam Privat · Udara Sejuk
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
