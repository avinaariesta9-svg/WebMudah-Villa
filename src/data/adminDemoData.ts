/**
 * Data demo awal untuk Dashboard Admin WebMudah Villa (Tahap 5)
 * Disimpan dan disinkronkan ke localStorage browser agar interaktif.
 */

export interface AdminBookingRecord {
  id: string;
  nomorBooking: string;
  nama: string;
  nomorWhatsApp: string;
  unit: string;
  checkIn: string;
  checkOut: string;
  jumlahTamu: string;
  totalHarga: number;
  dp: number;
  sisaPembayaran: number;
  statusPembayaran: 'DP Terbayar' | 'Lunas' | 'Menunggu Verifikasi';
  statusBooking: 'Baru' | 'Dikonfirmasi' | 'Selesai' | 'Dibatalkan';
  createdAt: string;
}

export interface UnitManagementRecord {
  id: string;
  name: string;
  capacity: string;
  pricePerNight: number;
  status: 'Tersedia' | 'Terisi' | 'Perawatan';
  fasilitas: string[];
}

export const INITIAL_DEMO_BOOKINGS: AdminBookingRecord[] = [
  {
    id: 'b-001',
    nomorBooking: 'WMV-2026-001',
    nama: 'Budi Santoso',
    nomorWhatsApp: '6281298765432',
    unit: 'Villa Grand Suite',
    checkIn: '2026-10-20',
    checkOut: '2026-10-22',
    jumlahTamu: '6 Orang',
    totalHarga: 3700000,
    dp: 1850000,
    sisaPembayaran: 1850000,
    statusPembayaran: 'DP Terbayar',
    statusBooking: 'Dikonfirmasi',
    createdAt: '2026-10-15',
  },
  {
    id: 'b-002',
    nomorBooking: 'WMV-2026-002',
    nama: 'Siti Rahmawati',
    nomorWhatsApp: '6281311223344',
    unit: 'Villa Private Pool Residence',
    checkIn: '2026-10-24',
    checkOut: '2026-10-26',
    jumlahTamu: '8 Orang',
    totalHarga: 4900000,
    dp: 4900000,
    sisaPembayaran: 0,
    statusPembayaran: 'Lunas',
    statusBooking: 'Dikonfirmasi',
    createdAt: '2026-10-15',
  },
  {
    id: 'b-003',
    nomorBooking: 'WMV-2026-003',
    nama: 'Hendra Gunawan',
    nomorWhatsApp: '6285778899001',
    unit: 'Villa Deluxe Family',
    checkIn: '2026-10-28',
    checkOut: '2026-10-29',
    jumlahTamu: '4 Orang',
    totalHarga: 1250000,
    dp: 625000,
    sisaPembayaran: 625000,
    statusPembayaran: 'Menunggu Verifikasi',
    statusBooking: 'Baru',
    createdAt: '2026-10-16',
  },
  {
    id: 'b-004',
    nomorBooking: 'WMV-2026-004',
    nama: 'Dewi Lestari',
    nomorWhatsApp: '6281900112233',
    unit: 'Villa Grand Suite',
    checkIn: '2026-10-10',
    checkOut: '2026-10-12',
    jumlahTamu: '6 Orang',
    totalHarga: 3700000,
    dp: 3700000,
    sisaPembayaran: 0,
    statusPembayaran: 'Lunas',
    statusBooking: 'Selesai',
    createdAt: '2026-10-05',
  },
];

export const INITIAL_DEMO_UNITS: UnitManagementRecord[] = [
  {
    id: 'u-1',
    name: 'Villa Deluxe Family',
    capacity: '4 – 6 Tamu',
    pricePerNight: 1250000,
    status: 'Tersedia',
    fasilitas: ['2 King Bed', 'AC', 'Kamar Mandi Water Heater', 'WiFi'],
  },
  {
    id: 'u-2',
    name: 'Villa Grand Suite',
    capacity: '6 – 8 Tamu',
    pricePerNight: 1850000,
    status: 'Terisi',
    fasilitas: ['3 Bed', 'AC', 'Dapur Lengkap', 'Akses Kolam Renang'],
  },
  {
    id: 'u-3',
    name: 'Villa Private Pool Residence',
    capacity: '8 – 10 Tamu',
    pricePerNight: 2450000,
    status: 'Tersedia',
    fasilitas: ['4 Bed', 'AC', 'Kolam Renang Privat', 'Teras BBQ'],
  },
];

const STORAGE_KEY_BOOKINGS = 'webmudah_villa_admin_bookings_v1';
const STORAGE_KEY_UNITS = 'webmudah_villa_admin_units_v1';

export function getStoredBookings(): AdminBookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return INITIAL_DEMO_BOOKINGS;
}

export function saveStoredBookings(bookings: AdminBookingRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  } catch {
    // fallback
  }
}

export function getStoredUnits(): UnitManagementRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_UNITS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return INITIAL_DEMO_UNITS;
}

export function saveStoredUnits(units: UnitManagementRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(units));
  } catch {
    // fallback
  }
}
