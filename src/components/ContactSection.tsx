import { MapPin, Phone, Clock, Calendar, MessageCircle } from 'lucide-react';
import { VILLA_INFO } from '../data/villaData';
import BookingPaymentFlow from './BookingPaymentFlow';

interface ContactSectionProps {
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
}

export default function ContactSection({ selectedUnit = '', onUnitChange }: ContactSectionProps) {
  const directWaUrl = `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Assalamu’alaikum, saya ingin bertanya dan melakukan booking villa untuk keluarga.'
  )}`;

  return (
    <section id="kontak" className="py-12 sm:py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Reservasi & Kontak
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Pemesanan, Pembayaran & Informasi Kontak
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Lengkapi data reservasi untuk melihat total biaya, memilih opsi DP 50% atau pelunasan, dan mengirim konfirmasi transfer ke WhatsApp admin villa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (Left 5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Informasi Pengelola Villa
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-400">Alamat Villa</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {VILLA_INFO.address}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kawasan asri, akses mobil nyaman, parkir pribadi luas.
                </p>
              </div>
            </div>

            {/* WhatsApp Phone */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-400">Nomor WhatsApp Admin</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {VILLA_INFO.phoneDisplay}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Admin siap melayani konsultasi dan verifikasi pembayaran.
                </p>
              </div>
            </div>

            {/* Service & Operational Hours */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-400">Jam Layanan & Respon</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {VILLA_INFO.serviceHours}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Respon cepat dan ramah setiap hari.
                </p>
              </div>
            </div>

            {/* Check-in / Check-out */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-400">Jadwal Menginap</span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  Check-in {VILLA_INFO.checkIn} · Check-out {VILLA_INFO.checkOut}
                </p>
              </div>
            </div>

            {/* Tombol Booking via WhatsApp pada Bagian Kontak */}
            <div className="pt-2 border-t border-slate-100">
              <span className="block text-xs font-medium text-slate-400 mb-2">
                Ingin konsultasi langsung tanpa form?
              </span>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 active:bg-slate-950 transition-colors shadow-xs touch-manipulation min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Booking via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form Booking & Pembayaran Flow (Right 7 cols) */}
          <div className="lg:col-span-7">
            <BookingPaymentFlow
              selectedUnit={selectedUnit}
              onUnitChange={onUnitChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
