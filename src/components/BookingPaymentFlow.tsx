import { useState, useEffect } from 'react';
import {
  Calendar,
  CreditCard,
  QrCode,
  Check,
  Copy,
  Send,
  AlertCircle,
  ArrowLeft,
  Upload,
  CheckCircle2,
  FileCheck,
  HelpCircle,
} from 'lucide-react';
import {
  VILLA_INFO,
  VILLA_UNITS,
  PAYMENT_INFO,
  generatePaymentConfirmationWhatsAppUrl,
  generateBookingWhatsAppUrl,
  PaymentConfirmationData,
} from '../data/villaData';

interface BookingPaymentFlowProps {
  selectedUnit?: string;
  onUnitChange?: (unit: string) => void;
}

export default function BookingPaymentFlow({
  selectedUnit = '',
  onUnitChange,
}: BookingPaymentFlowProps) {
  // Step tracker: 1 = Form Booking, 2 = Ringkasan & Pembayaran, 3 = Konfirmasi Pembayaran
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Booking counter (WMV-2026-001, 002, etc.)
  const [bookingCounter, setBookingCounter] = useState(1);
  const [activeBookingNumber, setActiveBookingNumber] = useState('WMV-2026-001');

  // Form Fields
  const [nama, setNama] = useState('');
  const [nomorWhatsApp, setNomorWhatsApp] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [jumlahTamu, setJumlahTamu] = useState('4 – 6 Orang');
  const [unit, setUnit] = useState(selectedUnit || VILLA_UNITS[0].name);
  const [catatan, setCatatan] = useState('');

  // Payment Options
  const [paymentType, setPaymentType] = useState<'dp' | 'full'>('dp');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'qris'>('transfer');

  // Confirmation Form Fields
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationNotice, setConfirmationNotice] = useState(false);

  // Sync when unit selected from parent
  useEffect(() => {
    if (selectedUnit) {
      setUnit(selectedUnit);
    }
  }, [selectedUnit]);

  // Calculate pricing
  const currentUnitObj = VILLA_UNITS.find((u) => u.name === unit) || VILLA_UNITS[0];
  const pricePerNight = currentUnitObj.priceNumber;

  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const totalPrice = pricePerNight * nights;
  const dpAmount = Math.round(totalPrice * 0.5);
  const payAmount = paymentType === 'dp' ? dpAmount : totalPrice;
  const remainingAmount = paymentType === 'dp' ? totalPrice - dpAmount : 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Step 1 -> Step 2 (Proceed to payment)
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validasi Sederhana
    if (!nama.trim()) {
      setErrorMessage('Mohon isi Nama lengkap Anda.');
      return;
    }
    if (!nomorWhatsApp.trim()) {
      setErrorMessage('Mohon isi Nomor WhatsApp Anda yang aktif.');
      return;
    }
    if (!checkIn) {
      setErrorMessage('Mohon pilih Tanggal Check-in.');
      return;
    }
    if (!checkOut) {
      setErrorMessage('Mohon pilih Tanggal Check-out.');
      return;
    }
    if (checkOut < checkIn) {
      setErrorMessage('Tanggal Check-out tidak boleh lebih awal dari Tanggal Check-in.');
      return;
    }
    if (!jumlahTamu) {
      setErrorMessage('Mohon tentukan Jumlah Tamu.');
      return;
    }
    if (!unit) {
      setErrorMessage('Mohon pilih Unit Villa.');
      return;
    }

    // Generate formatted Booking Number
    const padded = String(bookingCounter).padStart(3, '0');
    const bNum = `WMV-2026-${padded}`;
    setActiveBookingNumber(bNum);

    setStep(2);
    // Smooth scroll to top of booking container
    const container = document.getElementById('form-booking');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 2 -> Step 3 ("Saya Sudah Bayar")
  const handleAlreadyPaid = () => {
    setStep(3);
    const container = document.getElementById('form-booking');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 3: Kirim Konfirmasi ke WhatsApp
  const handleSendConfirmationToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmationNotice(true);

    const confirmationData: PaymentConfirmationData = {
      nama,
      nomorWhatsApp,
      nomorBooking: activeBookingNumber,
      unit,
      checkIn,
      checkOut,
      jumlahTamu,
      jumlahPembayaran: formatRupiah(payAmount),
      metodePembayaran:
        paymentMethod === 'transfer'
          ? `Transfer Bank (${PAYMENT_INFO.bankName})`
          : 'QRIS',
    };

    const waUrl = generatePaymentConfirmationWhatsAppUrl(confirmationData);

    // Increment booking counter for the next session
    setBookingCounter((prev) => prev + 1);

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 250);
  };

  // Optional: direct inquiry to WA without payment
  const handleDirectWhatsAppInquiry = () => {
    const url = generateBookingWhatsAppUrl({
      nama: nama || 'Tamu',
      nomorWhatsApp: nomorWhatsApp || '-',
      unit,
      checkIn: checkIn || 'TBA',
      checkOut: checkOut || 'TBA',
      jumlahTamu,
      catatan,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div
      id="form-booking"
      className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs scroll-mt-24 transition-all"
    >
      {/* Progress Steps Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            1
          </span>
          <span className={step === 1 ? 'text-slate-900' : 'text-slate-400'}>
            Isi Booking
          </span>

          <span className="text-slate-300">/</span>

          <span
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
              step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            2
          </span>
          <span className={step === 2 ? 'text-slate-900' : 'text-slate-400'}>
            Pembayaran
          </span>

          <span className="text-slate-300">/</span>

          <span
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
              step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            3
          </span>
          <span className={step === 3 ? 'text-slate-900' : 'text-slate-400'}>
            Konfirmasi
          </span>
        </div>

        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((prev) => (prev === 3 ? 2 : 1))}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        )}
      </div>

      {/* ========================================================== */}
      {/* STEP 1: FORM BOOKING                                       */}
      {/* ========================================================== */}
      {step === 1 && (
        <div>
          <div className="mb-5">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              Langkah 1 dari 3
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Formulir Reservasi Villa
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan lengkapi tanggal dan data pemesanan untuk melihat rincian total biaya & melanjutkan pembayaran.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Perhatian: </span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleProceedToPayment} noValidate className="space-y-4">
            {/* Field: Nama */}
            <div>
              <label htmlFor="booking-nama" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Lengkap Pemesan <span className="text-rose-500">*</span>
              </label>
              <input
                id="booking-nama"
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Field: Nomor WhatsApp */}
            <div>
              <label htmlFor="booking-wa" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
              </label>
              <input
                id="booking-wa"
                type="tel"
                placeholder="Contoh: 081234567890"
                value={nomorWhatsApp}
                onChange={(e) => {
                  setNomorWhatsApp(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Field: Pilihan Unit Villa */}
            <div>
              <label htmlFor="booking-unit" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pilihan Unit Villa <span className="text-rose-500">*</span>
              </label>
              <select
                id="booking-unit"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  if (onUnitChange) onUnitChange(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              >
                {VILLA_UNITS.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.capacity} · {u.pricePerNight})
                  </option>
                ))}
              </select>
            </div>

            {/* Field: Check-in & Check-out */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="booking-checkin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tanggal Check-in <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="booking-checkout" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tanggal Check-out <span className="text-rose-500">*</span>
                </label>
                <input
                  id="booking-checkout"
                  type="date"
                  min={checkIn || undefined}
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Field: Jumlah Tamu */}
            <div>
              <label htmlFor="booking-tamu" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jumlah Tamu <span className="text-rose-500">*</span>
              </label>
              <select
                id="booking-tamu"
                value={jumlahTamu}
                onChange={(e) => setJumlahTamu(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              >
                <option value="2 – 4 Orang">2 – 4 Orang</option>
                <option value="4 – 6 Orang">4 – 6 Orang</option>
                <option value="6 – 8 Orang">6 – 8 Orang</option>
                <option value="8 – 10 Orang">8 – 10 Orang</option>
                <option value="Lebih dari 10 Orang">Lebih dari 10 Orang</option>
              </select>
            </div>

            {/* Field: Catatan Tambahan (Opsional) */}
            <div>
              <label htmlFor="booking-catatan" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="booking-catatan"
                rows={2}
                placeholder="Contoh: Request kasur tambahan, jam tiba sore, atau info balita..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 text-white font-semibold text-sm sm:text-base hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm shadow-emerald-700/10 min-h-[48px] touch-manipulation cursor-pointer"
              >
                <span>Lihat Total & Lanjut Pembayaran</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppInquiry}
                className="w-full mt-2 text-center text-xs text-slate-500 hover:text-emerald-700 py-1 font-medium transition-colors"
              >
                Atau langsung tanya ketersediaan via WhatsApp
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================== */}
      {/* STEP 2: RINGKASAN BOOKING & INFORMASI PEMBAYARAN           */}
      {/* ========================================================== */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                Langkah 2 dari 3
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                No. Booking: {activeBookingNumber}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Ringkasan Booking & Pembayaran
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Periksa ringkasan biaya dan pilih opsi pembayaran Anda di bawah.
            </p>
          </div>

          {/* 7. RINGKASAN BOOKING CARD */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/90 text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-slate-200 font-semibold text-slate-900">
              <span>Detail Reservasi</span>
              <span>{activeBookingNumber}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Nama Pemesan:</span>
              <span className="font-medium text-slate-800">{nama}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Pilihan Unit:</span>
              <span className="font-medium text-slate-800">{unit}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Jadwal Menginap:</span>
              <span className="font-medium text-slate-800">
                {checkIn} s/d {checkOut} ({nights} Malam)
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Jumlah Tamu:</span>
              <span className="font-medium text-slate-800">{jumlahTamu}</span>
            </div>

            <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200/60">
              <span>Harga per Malam:</span>
              <span className="font-medium text-slate-800">{formatRupiah(pricePerNight)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Durasi Menginap:</span>
              <span className="font-medium text-slate-800">{nights} Malam</span>
            </div>

            <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Harga:</span>
              <span className="text-emerald-700">{formatRupiah(totalPrice)}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-500 pt-1">
              <span>Jumlah DP (50%):</span>
              <span className="font-medium text-slate-700">{formatRupiah(dpAmount)}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-500">
              <span>Sisa Pembayaran (Pelunasan):</span>
              <span className="font-medium text-slate-700">{formatRupiah(remainingAmount)}</span>
            </div>
          </div>

          {/* 1. PILIHAN PEMBAYARAN: DP 50% vs Pelunasan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilih Skema Pembayaran:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType('dp')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  paymentType === 'dp'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">DP 50%</span>
                  {paymentType === 'dp' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="text-sm font-extrabold text-emerald-700">
                  {formatRupiah(dpAmount)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Sisa dibayarkan saat check-in
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('full')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  paymentType === 'full'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Pelunasan (100%)</span>
                  {paymentType === 'full' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="text-sm font-extrabold text-emerald-700">
                  {formatRupiah(totalPrice)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Lunas penuh di awal
                </div>
              </button>
            </div>
          </div>

          {/* METODE PEMBAYARAN: Transfer Bank vs QRIS */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilih Metode Pembayaran:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-emerald-600 bg-emerald-50/40 text-emerald-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-medium'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm">Transfer Bank</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-emerald-600 bg-emerald-50/40 text-emerald-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-medium'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm">QRIS</span>
              </button>
            </div>
          </div>

          {/* 2. INFORMASI PEMBAYARAN CARD */}
          <div className="p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Jumlah yang Harus Ditransfer
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700">
                {formatRupiah(payAmount)}
              </span>
            </div>

            {paymentMethod === 'transfer' ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Nama Bank</span>
                  <span className="font-semibold text-slate-800">{PAYMENT_INFO.bankName}</span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Nomor Rekening</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base sm:text-lg font-mono font-bold text-slate-900 tracking-wider">
                      {PAYMENT_INFO.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PAYMENT_INFO.accountNumber)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                      title="Salin nomor rekening"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copySuccess ? 'Tersalin!' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Atas Nama</span>
                  <span className="font-semibold text-slate-800">{PAYMENT_INFO.accountHolder}</span>
                </div>
              </div>
            ) : (
              /* QRIS Placeholder Container */
              <div className="text-center py-2 space-y-3">
                <span className="text-xs text-slate-500 block">
                  Scan QRIS di bawah menggunakan GoPay, OVO, Dana, BCA, atau Mobile Banking apa saja:
                </span>

                {/* Styled QRIS Placeholder Frame */}
                <div className="inline-block p-4 rounded-xl border border-slate-300 bg-white shadow-2xs">
                  <div className="w-48 h-48 mx-auto bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center p-3 relative">
                    <QrCode className="w-28 h-28 text-slate-800 mb-1" />
                    <span className="text-[10px] font-bold tracking-tight text-slate-800">
                      QRIS STANDAR PEMBAYARAN
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {PAYMENT_INFO.qrisMerchant}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Nominal: <strong>{formatRupiah(payAmount)}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Action: "Saya Sudah Bayar" Button */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleAlreadyPaid}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 text-white font-semibold text-sm sm:text-base hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm shadow-emerald-700/10 min-h-[48px] touch-manipulation cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Saya Sudah Bayar</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1 font-medium transition-colors"
            >
              Ubah Data Reservasi
            </button>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* STEP 3: FORM KONFIRMASI PEMBAYARAN                         */}
      {/* ========================================================== */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              Langkah 3 dari 3
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Konfirmasi Bukti Pembayaran
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Kirimkan konfirmasi pembayaran ke WhatsApp admin agar reservasi Anda dapat segera diverifikasi.
            </p>
          </div>

          {confirmationNotice && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Berhasil disiapkan: </span>
                <span>
                  Membuka WhatsApp admin ({VILLA_INFO.phoneDisplay}). Silakan kirim pesan dan lampirkan bukti transfer Anda di chat WhatsApp.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSendConfirmationToWhatsApp} className="space-y-4">
            {/* Form Fields Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Pemesan
                </label>
                <input
                  type="text"
                  value={nama}
                  readOnly
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  value={nomorWhatsApp}
                  readOnly
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Booking
                </label>
                <input
                  type="text"
                  value={activeBookingNumber}
                  readOnly
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-900 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Pembayaran
                </label>
                <input
                  type="text"
                  value={`${formatRupiah(payAmount)} (${paymentType === 'dp' ? 'DP 50%' : 'Lunas'})`}
                  readOnly
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm bg-emerald-50 text-emerald-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Metode Pembayaran
              </label>
              <input
                type="text"
                value={
                  paymentMethod === 'transfer'
                    ? `Transfer Bank - ${PAYMENT_INFO.bankName} (${PAYMENT_INFO.accountNumber})`
                    : 'QRIS'
                }
                readOnly
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-800 font-medium"
              />
            </div>

            {/* 3. UPLOAD BUKTI PEMBAYARAN PLACEHOLDER / INPUT */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Bukti Pembayaran
              </label>
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors bg-slate-50/50">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  {uploadedFile ? (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <FileCheck className="w-5 h-5" />
                      <span className="text-xs font-semibold">{uploadedFile.name}</span>
                      <span className="text-[10px] text-slate-400">
                        ({Math.round(uploadedFile.size / 1024)} KB)
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-medium text-slate-700">
                        Pilih foto atau tangkapan layar bukti transfer
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        Format JPG, PNG, atau PDF (Maks. 5MB)
                      </span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
                <span>
                  Lampirkan juga foto bukti transfer ini di obrolan WhatsApp admin.
                </span>
              </p>
            </div>

            {/* Verification Disclaimer (Aturan Penting: Jangan mengklaim pembayaran sudah berhasil sebelum diverifikasi) */}
            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-800 leading-relaxed">
              <strong>Catatan Verifikasi:</strong> Reservasi Anda akan berstatus <em>menunggu konfirmasi</em> sampai admin villa mengecek dan memvalidasi mutasi pembayaran di rekening/QRIS melalui WhatsApp.
            </div>

            {/* 4. TOMBOL KIRIM KONFIRMASI KE WHATSAPP */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 text-white font-semibold text-sm sm:text-base hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm shadow-emerald-700/10 min-h-[48px] touch-manipulation cursor-pointer"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Kirim Konfirmasi ke WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
