/**
 * Data terpusat untuk WebMudah Villa
 * Tahap 1 + Tahap 2
 */

export const VILLA_INFO = {
  name: 'WebMudah Villa',
  tagline: 'Tempat Nyaman untuk Liburan Bersama Keluarga',
  description:
    'Nikmati suasana villa yang tenang, asri, dan privat bersama keluarga tercinta. Dilengkapi fasilitas lengkap, kebersihan prima, serta lokasi strategis yang memudahkan perjalanan liburan Anda.',
  phoneDisplay: '+62 812-3456-7890',
  whatsappNumber: '6281234567890',
  address: 'Jl. Cemara Asri No. 24, Kawasan Wisata Sejuk, Jawa Barat',
  serviceHours: 'Setiap hari, 08.00 - 21.00 WIB',
  checkIn: '14.00 WIB',
  checkOut: '12.00 WIB',
  capacity: '6 – 10 Orang',
  bedroomCount: '3 Kamar Tidur Nyaman',
  bathroomCount: '2 Kamar Mandi Bersih',
  pool: 'Kolam Renang Privat',
  logo: '/src/assets/images/webmudah_villa_logo_1792139959299.jpg',
};

export const VILLA_LOGO = '/src/assets/images/webmudah_villa_logo_1792139959299.jpg';


export const ADVANTAGES = [
  {
    id: 'nyaman',
    title: 'Nyaman',
    subtitle: 'Ketenangan & Privasi Maksimal',
    description:
      'Didesain dengan tata ruang terbuka yang sejuk, kasur berkualitas tinggi berstandar hotel, dan ruang kumpul keluarga yang lega untuk beristirahat tanpa gangguan.',
  },
  {
    id: 'bersih',
    title: 'Bersih',
    subtitle: 'Sanitasi & Kerapian Terjaga',
    description:
      'Pembersihan menyeluruh dilakukan sebelum setiap tamu tiba. Linen, seprai, dan handuk selalu diganti baru untuk menjamin kesegaran dan higienitas.',
  },
  {
    id: 'lokasi',
    title: 'Lokasi Strategis',
    subtitle: 'Akses Jalan Lebar & Dekat Fasilitas',
    description:
      'Hanya 5–10 menit ke minimarket, pusat kuliner lokal, dan tempat wisata populer. Akses mobil mudah tanpa jalan sempit atau tanjakan ekstrem.',
  },
  {
    id: 'keluarga',
    title: 'Cocok untuk Keluarga',
    subtitle: 'Fasilitas Ramah Anak & Orang Tua',
    description:
      'Dilengkapi dapur lengkap untuk memasak bersama, ruang makan lapang, teras santai di tepi kolam, dan lingkungan yang aman bagi anak-anak bermain.',
  },
];

export interface VillaUnit {
  id: string;
  name: string;
  image: string;
  capacity: string;
  beds: string;
  pricePerNight: string;
  priceNumber: number;
  description: string;
  highlights: string[];
}

export const VILLA_UNITS: VillaUnit[] = [
  {
    id: 'deluxe-family',
    name: 'Villa Deluxe Family',
    image: '/src/assets/images/villa_bedroom_family_1792136148049.jpg',
    capacity: '4 – 6 Tamu',
    beds: '2 King Bed',
    pricePerNight: 'Rp 1.250.000',
    priceNumber: 1250000,
    description:
      'Pilihan ideal untuk keluarga kecil atau liburan akhir pekan. Memiliki 2 kamar tidur bernuansa hangat, ruang kumpul nyaman, serta akses langsung ke taman samping.',
    highlights: ['2 Kamar Tidur AC', 'Ruang Duduk Keluarga', 'Kamar Mandi Water Heater', 'Smart TV & WiFi'],
  },
  {
    id: 'grand-suite',
    name: 'Villa Grand Suite',
    image: '/src/assets/images/villa_living_room_1792136147862.jpg',
    capacity: '6 – 8 Tamu',
    beds: '3 Bed (2 King + 1 Twin)',
    pricePerNight: 'Rp 1.850.000',
    priceNumber: 1850000,
    description:
      'Unit terfavorit untuk keluarga besar dengan ruang keluarga berplafon tinggi, dapur bersih berpintu kaca lebar, dan pemandangan asri menghadap kolam renang.',
    highlights: ['3 Kamar Tidur Luas', 'Dapur & Kulkas Lengkap', 'Dekat Kolam Renang', 'Balkon Pemandangan'],
  },
  {
    id: 'private-pool-residence',
    name: 'Villa Private Pool Residence',
    image: '/src/assets/images/hero_villa_facade_1792136146057.jpg',
    capacity: '8 – 10 Tamu',
    beds: '4 Bed (3 King + 1 Twin)',
    pricePerNight: 'Rp 2.450.000',
    priceNumber: 2450000,
    description:
      'Hunian villa satu kompleks utuh dengan privasi 100%. Dilengkapi kolam renang pribadi luas, teras santai outdoor, dan parkir luas untuk 4 mobil.',
    highlights: ['4 Kamar Tidur Keluarga', 'Kolam Renang Privat Eksklusif', 'Gazebo & Teras BBQ', 'Dapur Kering & Basah'],
  },
];

export const VILLA_FACILITIES = [
  {
    id: 'wifi',
    title: 'WiFi Cepat & Stabil',
    description: 'Koneksi internet nirkabel gratis di seluruh area villa untuk hiburan atau kebutuhan kerja.',
  },
  {
    id: 'ac',
    title: 'AC di Setiap Ruangan',
    description: 'Pendingin ruangan sejuk dan terawat di setiap kamar tidur dan ruang utama villa.',
  },
  {
    id: 'kamar-mandi',
    title: 'Kamar Mandi Bersih',
    description: 'Water heater air hangat, rainfall shower, sabun/sampo, dan handuk bersih higienis.',
  },
  {
    id: 'dapur',
    title: 'Dapur Siap Masak',
    description: 'Kompor, dispenser galon, kulkas, microwave, wajan, piring, serta peralatan makan lengkap.',
  },
  {
    id: 'parkir',
    title: 'Parkir Pribadi Luas',
    description: 'Area parkir aman di dalam gerbang villa, muat hingga 3–4 mobil keluarga.',
  },
  {
    id: 'kolam-renang',
    title: 'Kolam Renang Privat',
    description: 'Kolam renang pribadi dengan air jernih dan kedalaman bertingkat yang ramah anak.',
  },
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Kolam Renang & Fasad Utama',
    category: 'Eksterior',
    image: '/src/assets/images/hero_villa_facade_1792136146057.jpg',
  },
  {
    id: 'gal-2',
    title: 'Ruang Keluarga Santai',
    category: 'Interior',
    image: '/src/assets/images/villa_living_room_1792136147862.jpg',
  },
  {
    id: 'gal-3',
    title: 'Kamar Tidur Utama Bersih',
    category: 'Kamar Tidur',
    image: '/src/assets/images/villa_bedroom_family_1792136148049.jpg',
  },
  {
    id: 'gal-4',
    title: 'Dapur Bersih & Meja Makan',
    category: 'Dapur',
    image: '/src/assets/images/villa_kitchen_dining_1792136495092.jpg',
  },
  {
    id: 'gal-5',
    title: 'Kamar Mandi Modern & Higienis',
    category: 'Kamar Mandi',
    image: '/src/assets/images/villa_bathroom_modern_1792136496219.jpg',
  },
  {
    id: 'gal-6',
    title: 'Balkon Santai Pemandangan Asri',
    category: 'Outdoor',
    image: '/src/assets/images/villa_exterior_balcony_1792136496865.jpg',
  },
];

export const PRICING_INFO = {
  weekday: {
    label: 'Hari Kerja (Senin – Kamis)',
    price: 'Mulai Rp 1.250.000',
    unit: '/ malam',
    note: 'Pilihan hemat untuk liburan keluarga yang tenang dan santai tanpa keramaian.',
    benefits: ['Akses seluruh fasilitas villa', 'Check-in 14.00, check-out 12.00', 'Diskon menginap >2 malam'],
  },
  weekend: {
    label: 'Akhir Pekan (Jumat – Minggu)',
    price: 'Mulai Rp 1.650.000',
    unit: '/ malam',
    note: 'Waktu terbaik untuk berkumpul akhir pekan bersama seluruh keluarga tercinta.',
    benefits: ['Akses seluruh fasilitas villa', 'Prioritas early check-in (bila kosong)', 'Bantuan staf villa ramah'],
  },
  termsNote:
    '*Catatan: Tarif dapat mengalami penyesuaian pada periode libur nasional, Idul Fitri, Natal, dan Tahun Baru (High Season). Silakan hubungi pengelola via WhatsApp untuk memastikan ketersediaan tanggal dan harga terkini.',
};

export const FAQ_ITEMS = [
  {
    question: 'Berapa kapasitas villa?',
    answer:
      'WebMudah Villa memiliki kapasitas fleksibel mulai dari 4 hingga 10 orang tergantung pilihan unit. Seluruh unit didesain lapang agar keluarga dapat beristirahat dan berkumpul dengan leluasa.',
  },
  {
    question: 'Apakah tersedia WiFi?',
    answer:
      'Ya, tersedia fasilitas WiFi nirkabel berkecepatan tinggi tanpa biaya tambahan di seluruh area dalam maupun luar ruangan villa, stabil untuk kebutuhan hiburan keluarga maupun streaming.',
  },
  {
    question: 'Apakah bisa untuk keluarga?',
    answer:
      'Sangat bisa dan memang dikhususkan untuk keluarga! Kami menyediakan fasilitas ramah anak seperti kolam renang berkedalaman aman, dapur lengkap untuk memasak makanan keluarga, serta lingkungan yang tenang dan bebas gangguan.',
  },
  {
    question: 'Bagaimana cara melakukan reservasi?',
    answer:
      'Reservasi sangat mudah dan praktis melalui WhatsApp. Anda cukup menekan tombol "Tanya & Booking via WhatsApp", sampaikan tanggal rencana liburan dan jumlah anggota keluarga, lalu admin kami akan memverifikasi ketersediaan dan detail kedatangan Anda.',
  },
];

export const VILLA_PHOTOS = {
  hero: '/src/assets/images/hero_villa_facade_1792136146057.jpg',
  livingRoom: '/src/assets/images/villa_living_room_1792136147862.jpg',
  bedroom: '/src/assets/images/villa_bedroom_family_1792136148049.jpg',
  gardenPatio: '/src/assets/images/villa_garden_patio_1792136147550.jpg',
  kitchen: '/src/assets/images/villa_kitchen_dining_1792136495092.jpg',
  bathroom: '/src/assets/images/villa_bathroom_modern_1792136496219.jpg',
  poolSunset: '/src/assets/images/villa_pool_sunset_1792136496986.jpg',
  balcony: '/src/assets/images/villa_exterior_balcony_1792136496865.jpg',
};

export interface BookingFormData {
  nama: string;
  nomorWhatsApp: string;
  unit: string;
  checkIn: string;
  checkOut: string;
  jumlahTamu: string;
  catatan?: string;
}

export const PAYMENT_INFO = {
  bankName: 'Bank Contoh',
  accountNumber: '1234567890',
  accountHolder: 'WebMudah Villa',
  qrisMerchant: 'WebMudah Villa (NMID: ID1029384756)',
};

export interface PaymentConfirmationData {
  nama: string;
  nomorWhatsApp?: string;
  nomorBooking: string;
  unit: string;
  checkIn: string;
  checkOut: string;
  jumlahTamu: string;
  jumlahPembayaran: string;
  metodePembayaran: string;
}

/**
 * Format pesan konfirmasi pembayaran WhatsApp otomatis:
 *
 * Assalamu’alaikum, saya sudah melakukan pembayaran untuk reservasi villa.
 *
 * Nama:
 * Nomor Booking:
 * Unit:
 * Check-in:
 * Check-out:
 * Jumlah tamu:
 * Jumlah pembayaran:
 * Metode pembayaran:
 *
 * Bukti pembayaran saya lampirkan melalui WhatsApp.
 *
 * Mohon dikonfirmasi. Terima kasih.
 */
export function generatePaymentConfirmationWhatsAppUrl(data: PaymentConfirmationData): string {
  const message = `Assalamu’alaikum, saya sudah melakukan pembayaran untuk reservasi villa.

Nama: ${data.nama.trim()}
Nomor Booking: ${data.nomorBooking.trim()}
Unit: ${data.unit}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Jumlah tamu: ${data.jumlahTamu}
Jumlah pembayaran: ${data.jumlahPembayaran}
Metode pembayaran: ${data.metodePembayaran}

Bukti pembayaran saya lampirkan melalui WhatsApp.

Mohon dikonfirmasi. Terima kasih.`;

  return `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateBookingWhatsAppUrl(data: BookingFormData): string {
  const catatanText = data.catatan && data.catatan.trim() ? data.catatan.trim() : '-';

  const message = `Assalamu’alaikum, saya ingin melakukan reservasi.

Nama: ${data.nama.trim()}
Nomor WhatsApp: ${data.nomorWhatsApp.trim()}
Unit: ${data.unit}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Jumlah tamu: ${data.jumlahTamu}
Catatan: ${catatanText}

Mohon informasi ketersediaan dan total harga. Terima kasih.`;

  return `https://wa.me/${VILLA_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}


