import { useState } from 'react';
import { Menu, X, MessageCircle, Shield } from 'lucide-react';
import { VILLA_INFO } from '../data/villaData';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export default function Navbar({ onOpenAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopNavLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Unit', href: '#unit-kamar' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Harga', href: '#harga' },
    { label: 'Lokasi', href: '#lokasi' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const mobileNavLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Villa', href: '#tentang' },
    { label: 'Pilihan Unit', href: '#unit-kamar' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Galeri Foto', href: '#galeri' },
    { label: 'Daftar Harga', href: '#harga' },
    { label: 'Lokasi', href: '#lokasi' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontak Kami', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Logo */}
        <a
          href="#beranda"
          className="group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <BrandLogo size="sm" />
        </a>

        {/* Zone 2: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
          {desktopNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action, Admin Demo & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Admin Demo Button */}
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="Buka Dashboard Admin Demo"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>Admin Demo</span>
            </button>
          )}

          {/* Booking via WhatsApp Button */}
          <a
            href="#form-booking"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors whitespace-nowrap shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Booking via WhatsApp</span>
          </a>

          {/* Mobile Menu Button - min 44px touch target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 shadow-lg animate-fadeIn max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {mobileNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700 active:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 space-y-2">
              <a
                href="#form-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Booking via WhatsApp</span>
              </a>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Buka Dashboard Admin Demo</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
