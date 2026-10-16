import { VILLA_INFO } from '../data/villaData';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="bg-white border-t border-slate-200/80 py-10 sm:py-14 text-slate-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm">
              Penginapan keluarga yang nyaman, asri, dan bersih di kawasan wisata sejuk Jawa Barat.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#beranda" className="hover:text-slate-900 transition-colors">
              Beranda
            </a>
            <a href="#unit-kamar" className="hover:text-slate-900 transition-colors">
              Unit Villa
            </a>
            <a href="#fasilitas" className="hover:text-slate-900 transition-colors">
              Fasilitas
            </a>
            <a href="#galeri" className="hover:text-slate-900 transition-colors">
              Galeri
            </a>
            <a href="#harga" className="hover:text-slate-900 transition-colors">
              Harga
            </a>
            <a href="#lokasi" className="hover:text-slate-900 transition-colors">
              Lokasi
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              FAQ
            </a>
            <a href="#kontak" className="hover:text-slate-900 transition-colors">
              Kontak
            </a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hover:text-emerald-700 transition-colors font-semibold text-emerald-800"
              >
                Admin Demo
              </button>
            )}
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {currentYear} {VILLA_INFO.name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-2">
            <span>{VILLA_INFO.phoneDisplay}</span>
            <span aria-hidden="true">·</span>
            <span>{VILLA_INFO.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
