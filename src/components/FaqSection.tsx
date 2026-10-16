import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, VILLA_INFO } from '../data/villaData';

export default function FaqSection() {
  // First item open by default for immediate preview
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const waUrl = `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Halo WebMudah Villa, saya ingin bertanya lebih lanjut seputar fasilitas dan reservasi.'
  )}`;

  return (
    <section id="faq" className="py-12 sm:py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Tanya Jawab
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Jawaban singkat seputar fasilitas, kapasitas, dan cara reservasi villa kami.
          </p>
        </div>

        {/* 4 FAQ Accordion Items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Punya pertanyaan lain yang belum terjawab?{' '}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Tanyakan langsung via WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
