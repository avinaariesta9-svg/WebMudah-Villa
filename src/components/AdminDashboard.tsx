import { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Filter,
  Home,
  MessageCircle,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
  FileSpreadsheet,
  AlertTriangle,
  Lock,
  ArrowRight,
} from 'lucide-react';
import {
  AdminBookingRecord,
  UnitManagementRecord,
  getStoredBookings,
  saveStoredBookings,
  getStoredUnits,
  saveStoredUnits,
  INITIAL_DEMO_BOOKINGS,
  INITIAL_DEMO_UNITS,
} from '../data/adminDemoData';
import BrandLogo from './BrandLogo';


interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  // Demo Login State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [demoPass, setDemoPass] = useState('admin123');

  // Active Tab: 'bookings' | 'rekap' | 'kalender' | 'units'
  const [activeTab, setActiveTab] = useState<'bookings' | 'rekap' | 'kalender' | 'units'>('bookings');

  // Stored Data State
  const [bookings, setBookings] = useState<AdminBookingRecord[]>(getStoredBookings);
  const [units, setUnits] = useState<UnitManagementRecord[]>(getStoredUnits);

  // Filter State
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist changes
  useEffect(() => {
    saveStoredBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredUnits(units);
  }, [units]);

  // Statistics calculation
  const totalBookingsCount = bookings.length;
  const newBookingsCount = bookings.filter((b) => b.statusBooking === 'Baru').length;
  const confirmedBookingsCount = bookings.filter((b) => b.statusBooking === 'Dikonfirmasi').length;
  const completedBookingsCount = bookings.filter((b) => b.statusBooking === 'Selesai').length;
  const totalNilaiBooking = bookings
    .filter((b) => b.statusBooking !== 'Dibatalkan')
    .reduce((acc, b) => acc + b.totalHarga, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Status Change Handlers
  const handleUpdateBookingStatus = (id: string, newStatus: AdminBookingRecord['statusBooking']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, statusBooking: newStatus } : b))
    );
  };

  const handleUpdatePaymentStatus = (id: string, newPaymentStatus: AdminBookingRecord['statusPembayaran']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, statusPembayaran: newPaymentStatus } : b))
    );
  };

  const handleUpdateUnitStatus = (id: string, newStatus: UnitManagementRecord['status']) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
  };

  const handleResetData = () => {
    if (confirm('Reset seluruh data demo ke awal?')) {
      setBookings(INITIAL_DEMO_BOOKINGS);
      setUnits(INITIAL_DEMO_UNITS);
      saveStoredBookings(INITIAL_DEMO_BOOKINGS);
      saveStoredUnits(INITIAL_DEMO_UNITS);
    }
  };

  // WhatsApp Contact Helper
  const openWhatsAppToGuest = (booking: AdminBookingRecord) => {
    const text = `Halo Kak ${booking.nama}, ini admin WebMudah Villa terkait reservasi Anda dengan nomor *${booking.nomorBooking}* (${booking.unit}) untuk tanggal ${booking.checkIn} s/d ${booking.checkOut}.`;
    const cleanPhone = booking.nomorWhatsApp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = statusFilter === 'Semua' || b.statusBooking === statusFilter;
    const matchesSearch =
      b.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.nomorBooking.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Simple Month Calendar for Demo (October 2026)
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Check if a day has bookings
  const getBookingsOnDay = (day: number) => {
    const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
    return bookings.filter((b) => {
      if (b.statusBooking === 'Dibatalkan') return false;
      return dateStr >= b.checkIn && dateStr <= b.checkOut;
    });
  };

  // Demo Login View if logged out
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 sm:p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Login Admin Demo</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Halaman ini khusus pengelola villa. Gunakan login demo untuk melihat dashboard dan kalender.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthenticated(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-left text-xs font-semibold text-slate-700 mb-1">
                Password Demo
              </label>
              <input
                type="password"
                value={demoPass}
                onChange={(e) => setDemoPass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              Masuk sebagai Admin Demo
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-xs text-slate-500 hover:text-slate-800"
            >
              Kembali ke Website Pengunjung
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md hidden xs:inline">
              Dashboard Admin Demo
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleResetData}
              title="Reset data demo ke awal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <span>Kembali ke Website</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-semibold text-slate-600 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'bookings'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Ikhtisar & Booking
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rekap')}
            className={`py-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'rekap'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Rekap Booking & Keuangan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kalender')}
            className={`py-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'kalender'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Kalender Ketersediaan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('units')}
            className={`py-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'units'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Manajemen Unit Villa
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* ======================================================== */}
        {/* TAB 1: IKHTISAR & DAFTAR BOOKING                         */}
        {/* ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* B. RINGKASAN JUMLAH BOOKING & TOTAL NILAI */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-xs text-slate-400 font-medium block">Total Booking</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">
                  {totalBookingsCount}
                </span>
                <span className="text-[11px] text-slate-500">Semua reservasi</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-xs text-amber-600 font-medium block">Booking Baru</span>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-600 mt-1 block">
                  {newBookingsCount}
                </span>
                <span className="text-[11px] text-slate-500">Perlu ditindaklanjuti</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-xs text-emerald-700 font-medium block">Dikonfirmasi</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-1 block">
                  {confirmedBookingsCount}
                </span>
                <span className="text-[11px] text-slate-500">Siap kedatangan</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-xs text-blue-600 font-medium block">Booking Selesai</span>
                <span className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1 block">
                  {completedBookingsCount}
                </span>
                <span className="text-[11px] text-slate-500">Telah check-out</span>
              </div>

              <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                <span className="text-xs text-slate-400 font-medium block">Total Nilai Booking</span>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1 block">
                  {formatRupiah(totalNilaiBooking)}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Berdasarkan data demo</span>
              </div>
            </div>

            {/* DAFTAR BOOKING DENGAN FILTER & SEARCH */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Daftar Booking Masuk
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kelola status reservasi dan hubungi tamu secara langsung via WhatsApp.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari nama / booking..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                    {(['Semua', 'Baru', 'Dikonfirmasi', 'Selesai'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                          statusFilter === st
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Cards / Table List */}
              <div className="divide-y divide-slate-100">
                {filteredBookings.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    Tidak ada data booking yang cocok dengan filter.
                  </div>
                ) : (
                  filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Left: Guest & Booking Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {b.nomorBooking}
                          </span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            {b.nama}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-600 font-medium">{b.unit}</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-500">{b.jumlahTamu}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                            {b.checkIn} s/d {b.checkOut}
                          </span>
                          <span>·</span>
                          <span>Total: <strong>{formatRupiah(b.totalHarga)}</strong></span>
                          <span>·</span>
                          <span>DP: <strong>{formatRupiah(b.dp)}</strong></span>
                          <span>·</span>
                          <span>Status Bayar: <span className="font-semibold text-emerald-800">{b.statusPembayaran}</span></span>
                        </div>
                      </div>

                      {/* Right: Status Change Dropdown & WhatsApp Button */}
                      <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
                        {/* Status Booking Selector */}
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-slate-400 hidden sm:inline">Status:</span>
                          <select
                            value={b.statusBooking}
                            onChange={(e) =>
                              handleUpdateBookingStatus(
                                b.id,
                                e.target.value as AdminBookingRecord['statusBooking']
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                              b.statusBooking === 'Baru'
                                ? 'bg-amber-50 border-amber-300 text-amber-800'
                                : b.statusBooking === 'Dikonfirmasi'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : b.statusBooking === 'Selesai'
                                ? 'bg-blue-50 border-blue-300 text-blue-800'
                                : 'bg-slate-50 border-slate-300 text-slate-600'
                            }`}
                          >
                            <option value="Baru">Baru</option>
                            <option value="Dikonfirmasi">Dikonfirmasi</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                          </select>
                        </div>

                        {/* Hubungi Tamu via WhatsApp Button */}
                        <button
                          type="button"
                          onClick={() => openWhatsAppToGuest(b)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                          title="Kirim pesan WhatsApp ke tamu"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi Tamu</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: REKAP BOOKING LENGKAP                             */}
        {/* ======================================================== */}
        {activeTab === 'rekap' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Rekap Reservasi & Keuangan Villa
                </h3>
                <p className="text-xs text-slate-500">
                  Laporan ringkas seluruh pesanan, rincian pembayaran DP, dan sisa tagihan.
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Total Nilai: <strong className="text-slate-900">{formatRupiah(totalNilaiBooking)}</strong> ({bookings.length} Pesanan)
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">No. Booking</th>
                    <th className="py-3 px-3">Nama Tamu</th>
                    <th className="py-3 px-3">Unit Villa</th>
                    <th className="py-3 px-3">Tanggal Menginap</th>
                    <th className="py-3 px-3 text-right">Total Harga</th>
                    <th className="py-3 px-3 text-right">DP (50%)</th>
                    <th className="py-3 px-3 text-right">Sisa Tagihan</th>
                    <th className="py-3 px-3">Status Bayar</th>
                    <th className="py-3 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.nomorBooking}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{b.nama}</td>
                      <td className="py-3 px-3">{b.unit}</td>
                      <td className="py-3 px-3 whitespace-nowrap">{b.checkIn} s/d {b.checkOut}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">{formatRupiah(b.totalHarga)}</td>
                      <td className="py-3 px-3 text-right text-emerald-700 font-medium">{formatRupiah(b.dp)}</td>
                      <td className="py-3 px-3 text-right text-slate-700 font-medium">{formatRupiah(b.sisaPembayaran)}</td>
                      <td className="py-3 px-3">
                        <select
                          value={b.statusPembayaran}
                          onChange={(e) =>
                            handleUpdatePaymentStatus(
                              b.id,
                              e.target.value as AdminBookingRecord['statusPembayaran']
                            )
                          }
                          className="px-2 py-1 rounded border text-[11px] font-medium bg-white"
                        >
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="DP Terbayar">DP Terbayar</option>
                          <option value="Lunas">Lunas</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => openWhatsAppToGuest(b)}
                          className="p-1.5 rounded-md hover:bg-slate-100 text-emerald-700"
                          title="Chat WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KALENDER KETERSEDIAAN                             */}
        {/* ======================================================== */}
        {activeTab === 'kalender' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Kalender Ketersediaan Demo — Oktober 2026
                </h3>
                <p className="text-xs text-slate-500">
                  Pantau tanggal terisi dan jadwal check-in / check-out tamu.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-400" />
                  <span>Tersedia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Terisi / Booking</span>
                </div>
              </div>
            </div>

            {/* Simple Grid Calendar View */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                <div key={d} className="font-bold text-slate-400 py-1 uppercase text-[10px]">
                  {d}
                </div>
              ))}

              {/* October 2026 starts on Thursday (offset 4) */}
              {[1, 2, 3, 4].map((empty) => (
                <div key={`empty-${empty}`} className="min-h-[64px] bg-slate-50/50 rounded-lg" />
              ))}

              {currentMonthDays.map((day) => {
                const dayBookings = getBookingsOnDay(day);
                const isOccupied = dayBookings.length > 0;

                return (
                  <div
                    key={day}
                    className={`min-h-[64px] p-1.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                      isOccupied
                        ? 'bg-amber-50/70 border-amber-300 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs">{day}</span>
                    {isOccupied && (
                      <div className="text-[10px] leading-tight font-medium text-amber-800 line-clamp-2">
                        {dayBookings[0].nama} ({dayBookings[0].unit.replace('Villa ', '')})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Daftar Rinci Jadwal Tamu Bulan Ini */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-800 block mb-2">
                Jadwal Tamu Oktober 2026:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bookings
                  .filter((b) => b.statusBooking !== 'Dibatalkan')
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
                    >
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{b.nama}</span>
                        <span className="text-emerald-700">{b.statusBooking}</span>
                      </div>
                      <p className="text-slate-600">{b.unit} · {b.jumlahTamu}</p>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {b.checkIn} s/d {b.checkOut}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: MANAJEMEN UNIT VILLA                              */}
        {/* ======================================================== */}
        {activeTab === 'units' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Manajemen Status Unit Villa
                </h3>
                <p className="text-xs text-slate-500">
                  Atur status kesiapan unit villa (Tersedia, Terisi, atau Perawatan). Perubahan disimpan ke localStorage browser.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {units.map((u) => (
                <div
                  key={u.id}
                  className="p-5 rounded-xl border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">Unit Villa</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          u.status === 'Tersedia'
                            ? 'bg-emerald-50 text-emerald-800'
                            : u.status === 'Terisi'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{u.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Kapasitas: {u.capacity}</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-2">
                      {formatRupiah(u.pricePerNight)} <span className="text-xs font-normal text-slate-400">/malam</span>
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                        Fasilitas Utama:
                      </span>
                      <ul className="text-xs text-slate-500 space-y-1">
                        {u.fasilitas.map((f) => (
                          <li key={f} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="pt-3 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Ubah Status Unit:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      {(['Tersedia', 'Terisi', 'Perawatan'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateUnitStatus(u.id, st)}
                          className={`py-1.5 px-1 rounded-md text-[11px] font-semibold transition-all ${
                            u.status === st
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
