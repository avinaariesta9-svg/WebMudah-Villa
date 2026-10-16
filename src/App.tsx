/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MediaShowcase from './components/MediaShowcase';
import AboutSection from './components/AboutSection';
import AdvantagesSection from './components/AdvantagesSection';
import UnitsSection from './components/UnitsSection';
import FacilitiesSection from './components/FacilitiesSection';
import GallerySection from './components/GallerySection';
import PricingSection from './components/PricingSection';
import LocationSection from './components/LocationSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminDashboard from './components/AdminDashboard';
import { VILLA_UNITS } from './data/villaData';

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState<string>(VILLA_UNITS[0].name);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Helper to scroll smoothly to the Booking Form and focus the first field
  const scrollToBookingForm = (unitName?: string) => {
    if (unitName) {
      setSelectedUnit(unitName);
    }
    const formElement = document.getElementById('form-booking');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const nameInput = document.getElementById('booking-nama');
        if (nameInput) {
          nameInput.focus();
        }
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Baris 1 — Header (Nama/logo villa, menu navigasi, tombol Admin Demo) */}
      <Navbar onOpenAdmin={() => setShowAdminDashboard(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Baris 2 — Hero (Judul utama, deskripsi singkat, tombol Booking via WhatsApp) */}
        <Hero onBookingClick={() => scrollToBookingForm()} />

        {/* Baris 3 — Galeri Slider + Video YouTube (16:9) */}
        <MediaShowcase />

        {/* Section Singkat Tentang Villa */}
        <AboutSection />

        {/* Section Keunggulan Villa */}
        <AdvantagesSection />

        {/* Section Kamar / Pilihan Unit Villa */}
        <UnitsSection onBookUnit={(unitName) => scrollToBookingForm(unitName)} />

        {/* Section Fasilitas */}
        <FacilitiesSection />

        {/* Section Galeri Foto */}
        <GallerySection />

        {/* Section Daftar Harga */}
        <PricingSection />

        {/* Section Lokasi & Peta */}
        <LocationSection />

        {/* Section FAQ / Tanya Jawab */}
        <FaqSection />

        {/* Section Kontak Sederhana & Form Booking via WhatsApp */}
        <ContactSection
          selectedUnit={selectedUnit}
          onUnitChange={(unit) => setSelectedUnit(unit)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setShowAdminDashboard(true)} />

      {/* Tombol Kontak Cepat WhatsApp (Sangat nyaman di HP Android) */}
      <FloatingWhatsApp />

      {/* Dashboard Admin Demo (Tahap 5) */}
      {showAdminDashboard && (
        <AdminDashboard onClose={() => setShowAdminDashboard(false)} />
      )}
    </div>
  );
}
