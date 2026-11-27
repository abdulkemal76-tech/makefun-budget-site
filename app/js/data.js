// data.js — semua angka Rumah Tangga Cermat.
// Angka pasar bersumber (lihat SOURCES.md di root repo dan halaman Sumber Data).
// Angka keluarga (sewa, gaji Sari, cicilan, target) adalah angka rumah tangga
// fiktif yang disusun konsisten dengan angka sumber. Terpakai dihitung dari
// daftar transaksi, jadi penjumlahan selalu konsisten.

export const FAMILY = {
  name: 'Keluarga Hartono',
  place: 'Cakung, Jakarta Timur',
  home: 'Rumah kontrakan dua kamar, sewa Rp900.000 per bulan',
  members: [
    { name: 'Budi Hartono', role: 'Ayah, 38 tahun', job: 'Staf gudang, gaji Rp5.800.000 per bulan (sedikit di atas UMP DKI Jakarta 2026 Rp5.729.876)' },
    { name: 'Sari Hartono', role: 'Ibu, 35 tahun', job: 'Admin toko daring paruh waktu, penghasilan Rp2.500.000–Rp2.700.000 per bulan' },
    { name: 'Putri Hartono', role: 'Anak pertama, 12 tahun', job: 'SMP kelas 7, SPP Rp650.000 per bulan' },
    { name: 'Dimas Hartono', role: 'Anak kedua, 9 tahun', job: 'SD kelas 3, SPP Rp450.000 per bulan' },
  ],
};

// Amplop: warna dipakai di diagram dan bilah.
export const ENVELOPES = [
  { id: 'makanan', name: 'Makanan', color: '#2e7d4f', light: '#dcefe2', desc: 'Belanja pasar, beras, lauk, dan bekal anak.' },
  { id: 'transport', name: 'Transport', color: '#1d6fa8', light: '#d8eaf5', desc: 'Bensin Pertalite, TransJakarta, ojek, dan parkir.' },
  { id: 'sekolah', name: 'Sekolah', color: '#7a4fa3', light: '#e9ddf3', desc: 'SPP dua anak, buku, les, dan kegiatan sekolah.' },
  { id: 'rumah', name: 'Rumah', color: '#b06a1e', light: '#f5e3cd', desc: 'Sewa, listrik, air, internet, gas, dan pulsa.' },
  { id: 'kesehatan', name: 'Kesehatan', color: '#b23a48', light: '#f6dadd', desc: 'Iuran BPJS Kesehatan Kelas III empat orang, obat, dan vitamin.' },
  { id: 'tabungan', name: 'Tabungan', color: '#0f766e', light: '#d2ece9', desc: 'Dana darurat, tabungan pendidikan, dan tabungan liburan.' },
  { id: 'lainnya', name: 'Lainnya', color: '#5b6470', light: '#e3e6ea', desc: 'Pakaian, kebersihan, hiburan keluarga, dan keperluan tak terduga.' },
];

// tx: [tanggal, keterangan, jumlah]
export const MONTHS = {
  '2026-09': {
    label: 'September 2026',
    income: { budi: 5800000, sari: 2500000 },
    planned: { makanan: 2300000, transport: 850000, sekolah: 1300000, rumah: 1500000, kesehatan: 350000, tabungan: 1200000, lainnya: 800000 },
    tx: {
      makanan: [[5, 'Belanja pasar dan warung minggu ke-1', 530000], [12, 'Belanja pasar dan warung minggu ke-2', 530000], [19, 'Belanja pasar dan warung minggu ke-3', 530000], [26, 'Belanja pasar dan warung minggu ke-4', 530000]],
      transport: [[2, 'Bensin Pertalite 30 liter', 300000], [10, 'Ojek daring ke pasar', 42500], [16, 'Bensin Pertalite 30 liter', 300000], [25, 'Bensin Pertalite 9,5 liter', 95000], [30, 'TransJakarta 15 perjalanan', 52500]],
      sekolah: [[1, 'SPP Dimas (SD)', 450000], [1, 'SPP Putri (SMP)', 650000], [6, 'Buku tulis dan alat tulis', 120000], [13, 'Les matematika Putri', 80000]],
      rumah: [[1, 'Sewa rumah', 900000], [3, 'Token listrik 1.300 VA', 300000], [5, 'Air PAM', 80000], [8, 'Internet rumah', 120000], [12, 'Gas LPG 3 kg, 3 tabung', 54000], [20, 'Pulsa dua nomor', 26000]],
      kesehatan: [[1, 'BPJS Kesehatan 4 orang Kelas III', 140000], [9, 'Obat batuk Dimas', 90000], [16, 'Vitamin C', 80000]],
      tabungan: [[1, 'Dana darurat', 500000], [1, 'Tabungan pendidikan', 400000], [15, 'Tabungan liburan', 300000]],
      lainnya: [[6, 'Sepatu sekolah Putri', 320000], [11, 'Potong rambut dua anak', 70000], [14, 'Servis motor', 110000], [19, 'Sabun dan sampo', 95000], [23, 'Kado ulang tahun tetangga', 85000], [25, 'Jajan dan bekal tambahan', 170000]],
    },
  },
  '2026-10': {
    label: 'Oktober 2026',
    income: { budi: 5800000, sari: 2600000 },
    planned: { makanan: 2350000, transport: 900000, sekolah: 1300000, rumah: 1550000, kesehatan: 350000, tabungan: 1200000, lainnya: 750000 },
    tx: {
      makanan: [[3, 'Belanja pasar dan warung minggu ke-1', 550000], [10, 'Belanja pasar dan warung minggu ke-2', 555000], [17, 'Belanja pasar dan warung minggu ke-3', 550000], [24, 'Belanja pasar dan warung minggu ke-4', 555000]],
      transport: [[2, 'Bensin Pertalite 30 liter', 300000], [9, 'Ojek daring ke pasar', 47500], [13, 'Bensin Pertalite 30 liter', 300000], [20, 'Parkir motor sebulan', 25000], [24, 'Bensin Pertalite 12 liter', 120000], [31, 'TransJakarta 15 perjalanan', 52500]],
      sekolah: [[1, 'SPP Dimas (SD)', 450000], [1, 'SPP Putri (SMP)', 650000], [6, 'Buku tulis dan alat tulis', 100000], [13, 'Les matematika Putri', 100000]],
      rumah: [[1, 'Sewa rumah', 900000], [3, 'Token listrik 1.300 VA', 300000], [5, 'Air PAM', 80000], [8, 'Internet rumah', 120000], [12, 'Gas LPG 3 kg, 3 tabung', 54000], [20, 'Pulsa dua nomor', 66000]],
      kesehatan: [[1, 'BPJS Kesehatan 4 orang Kelas III', 140000], [9, 'Obat flu Putri', 65000], [16, 'Vitamin C', 60000]],
      tabungan: [[1, 'Dana darurat', 500000], [1, 'Tabungan pendidikan', 400000], [15, 'Tabungan liburan', 300000]],
      lainnya: [[6, 'Baju seragam Dimas', 200000], [11, 'Tas sekolah Putri', 150000], [14, 'Servis motor', 120000], [19, 'Sabun dan sampo', 95000], [23, 'Kado ulang tahun tetangga', 85000], [25, 'Jajan dan bekal tambahan', 130000]],
    },
  },
  '2026-11': {
    label: 'November 2026',
    income: { budi: 5800000, sari: 2700000 },
    planned: { makanan: 2400000, transport: 900000, sekolah: 1350000, rumah: 1550000, kesehatan: 350000, tabungan: 1200000, lainnya: 750000 },
    tx: {
      makanan: [[1, 'Belanja pasar mingguan', 312000], [3, 'Beras medium 25 kg', 356250], [5, 'Telur dan roti', 87500], [8, 'Ayam dan sayur pasar', 214000], [10, 'Minyak goreng 2 liter', 48500], [12, 'Gula dan kopi warung', 63000], [15, 'Belanja pasar mingguan', 298000], [18, 'Ayam 2 kg', 74900], [21, 'Belanja pasar mingguan', 305000], [24, 'Telur 2 kg dan tempe', 71000], [26, 'Jajan anak dan bekal', 96500], [27, 'Sayur dan buah', 253350]],
      transport: [[1, 'Bensin Pertalite 30 liter', 300000], [3, 'TransJakarta 5 perjalanan', 17500], [7, 'Ojek daring ke pasar', 39500], [12, 'Bensin Pertalite 30 liter', 300000], [14, 'TransJakarta 5 perjalanan', 17500], [18, 'Parkir motor sebulan', 25000], [21, 'TransJakarta 5 perjalanan', 17500], [24, 'Bensin Pertalite 9,5 liter', 95000]],
      sekolah: [[1, 'SPP Dimas (SD)', 450000], [1, 'SPP Putri (SMP)', 650000], [5, 'Buku tulis dan alat tulis', 95000], [10, 'Les matematika Putri', 100000], [20, 'Uang saku kegiatan sekolah', 55000]],
      rumah: [[1, 'Sewa rumah', 900000], [3, 'Token listrik 1.300 VA', 300000], [5, 'Air PAM', 80000], [8, 'Internet rumah', 120000], [12, 'Gas LPG 3 kg, 3 tabung', 54000], [20, 'Pulsa dua nomor', 51000]],
      kesehatan: [[1, 'BPJS Kesehatan 4 orang Kelas III', 140000], [9, 'Obat flu Dimas', 45000], [16, 'Vitamin C', 60000]],
      tabungan: [[1, 'Dana darurat', 500000], [1, 'Tabungan pendidikan', 400000], [15, 'Tabungan liburan', 300000]],
      lainnya: [[6, 'Seragam olahraga Dimas', 150000], [11, 'Potong rambut dua anak', 70000], [14, 'Nonton bioskop sekeluarga', 180000], [19, 'Sabun dan sampo', 95000], [23, 'Kado ulang tahun tetangga', 85000], [25, 'Servis motor', 110000]],
    },
  },
};

export const MONTH_ORDER = ['2026-09', '2026-10', '2026-11'];

// ---- Turunan: selalu dihitung dari angka di atas, tidak ditempel. ----
export function monthData(key) {
  const m = MONTHS[key];
  const spent = {};
  for (const env of ENVELOPES) {
    spent[env.id] = (m.tx[env.id] || []).reduce((s, t) => s + t[2], 0);
  }
  const incomeTotal = m.income.budi + m.income.sari;
  const plannedTotal = ENVELOPES.reduce((s, e) => s + m.planned[e.id], 0);
  const spentTotal = ENVELOPES.reduce((s, e) => s + spent[e.id], 0);
  return { ...m, key, spent, incomeTotal, plannedTotal, spentTotal, remaining: incomeTotal - spentTotal };
}

// ---- Simulator "Bagaimana jika" ----
// Basis bulanan yang dipakai simulator (dari anggaran November 2026).
export const SIM_BASE = {
  berasKgPerBulan: 25,
  berasHargaPerKg: 14250, // Info Pangan Jakarta, 24 Nov 2026
  bensinLiterPerBulan: 69.5,
  bensinHargaPerLiter: 10000, // Pertalite, November 2026
  sppPerBulan: 1100000, // SD 450.000 + SMP 650.000
  listrikPerBulan: 300000, // token 1.300 VA, Rp1.444,70/kWh
};

// ---- Tujuan dan utang ----
export const GOALS = [
  {
    id: 'darurat',
    name: 'Dana darurat',
    target: 6000000,
    saved: 3200000,
    monthly: 500000,
    note: 'Target enam juta rupiah: tiga bulan pengeluaran pokok keluarga. Ditabung Rp500.000 setiap awal bulan.',
  },
  {
    id: 'pendidikan',
    name: 'Tabungan pendidikan anak',
    target: 4800000,
    saved: 2100000,
    monthly: 400000,
    note: 'Untuk biaya masuk SMP Dimas tahun depan. Ditabung Rp400.000 setiap awal bulan.',
  },
  {
    id: 'liburan',
    name: 'Liburan keluarga ke Ancol',
    target: 1500000,
    saved: 900000,
    monthly: 300000,
    note: 'Liburan sehari ke Ancol naik TransJakarta: tiket, makan, dan jajan. Ditabung Rp300.000 setiap pertengahan bulan.',
  },
];

export const DEBT = {
  name: 'Cicilan motor Honda Beat',
  total: 4800000,
  paid: 2400000,
  monthly: 400000,
  note: 'Cicilan Rp400.000 per bulan selama 12 bulan. Sudah dibayar 6 kali, tersisa 6 kali.',
};

// ---- Diari harga ----
// Harga PIHPS Nasional (rata-rata nasional) dan Info Pangan Jakarta (beras).
// Setiap baris: [tanggal, harga]. Harga per kg, kecuali Pertalite per liter
// dan LPG per tabung 3 kg.
export const PRICE_DIARY = [
  {
    id: 'beras', name: 'Beras medium', unit: 'kg', source: 'Info Pangan Jakarta — harga rata-rata pasar DKI Jakarta',
    rows: [['19 Nov', 14542], ['22 Nov', 13500], ['23 Nov', 14167], ['24 Nov', 14250], ['26 Nov', 13917]],
  },
  {
    id: 'telur', name: 'Telur ayam ras', unit: 'kg', source: 'PIHPS Bank Indonesia — rata-rata nasional',
    rows: [['11 Nov', 28350], ['16 Nov', 31450], ['18 Nov', 29000], ['22 Nov', 28900], ['24 Nov', 28400], ['26 Nov', 28100]],
  },
  {
    id: 'ayam', name: 'Daging ayam ras', unit: 'kg', source: 'PIHPS Bank Indonesia — rata-rata nasional',
    rows: [['11 Nov', 39600], ['16 Nov', 41800], ['18 Nov', 38700], ['22 Nov', 38550], ['24 Nov', 37250], ['26 Nov', 37450]],
  },
  {
    id: 'minyak', name: 'Minyak goreng kemasan', unit: 'kg', source: 'PIHPS Bank Indonesia — rata-rata nasional, kemasan bermerek 1',
    rows: [['11 Nov', 25700], ['16 Nov', 28000], ['18 Nov', 24350], ['22 Nov', 24300], ['24 Nov', 24250], ['26 Nov', 24400]],
  },
  {
    id: 'gula', name: 'Gula pasir lokal', unit: 'kg', source: 'PIHPS Bank Indonesia — rata-rata nasional',
    rows: [['11 Nov', 19950], ['18 Nov', 19600], ['22 Nov', 19600], ['24 Nov', 19800], ['25 Nov', 19500]],
  },
  {
    id: 'pertalite', name: 'Pertalite', unit: 'liter', source: 'Pertamina — harga DKI Jakarta, tidak berubah sepanjang November 2026',
    rows: [['1 Nov', 10000], ['11 Nov', 10000], ['16 Nov', 10000], ['24 Nov', 10000], ['27 Nov', 10000]],
  },
  {
    id: 'lpg', name: 'Gas LPG 3 kg', unit: 'tabung', source: 'Kemenko Pangan dan Pertamina — harga pengecer DKI Jakarta',
    rows: [['5 Nov', 22000], ['23 Nov', 18000], ['27 Nov', 18000]],
    note: 'Harga di pengecer sempat Rp22.000–Rp24.000; pemerintah menetapkan batas tertinggi pengecer Rp18.000 lewat Kopdes Merah Putih pada 23 November 2026.',
  },
];

// ---- Sumber data (nama + tanggal; tanpa tautan, situs berjalan luring) ----
export const SOURCES = [
  { figure: 'UMP DKI Jakarta 2026 Rp5.729.876', source: 'Pemprov DKI Jakarta — Keputusan Gubernur Nomor 1142 Tahun 2025, diumumkan 24 Desember 2025' },
  { figure: 'Harga pangan (beras, telur, ayam, minyak, gula)', source: 'PIHPS Bank Indonesia — Pusat Informasi Harga Pangan Strategis Nasional, 11–26 November 2026' },
  { figure: 'Harga beras medium Jakarta Rp13.500–Rp14.542/kg', source: 'Info Pangan Jakarta — Dinas Ketahanan Pangan, Kelautan dan Pertanian DKI Jakarta, 19–26 November 2026' },
  { figure: 'Pertalite Rp10.000/liter; Pertamax Rp15.950/liter', source: 'Pertamina Patra Niaga — harga DKI Jakarta, peninjauan 1 November 2026' },
  { figure: 'Tarif listrik 1.300 VA Rp1.444,70/kWh', source: 'Kementerian ESDM / PLN — tarif Triwulan IV-2026, Oktober–Desember 2026' },
  { figure: 'LPG 3 kg: pangkalan Rp16.000, pengecer maks. Rp18.000', source: 'Kemenko Pangan dan Pertamina — 23 November 2026; Pergub DKI Nomor 4 Tahun 2015' },
  { figure: 'TransJakarta Rp3.500 sekali jalan', source: 'Pemprov DKI Jakarta / Dishub DKI — tarif reguler 2026, dikonfirmasi Juli 2026' },
  { figure: 'SPP SD swasta Rp200.000–Rp1.500.000; SMP swasta Rp250.000–Rp2.000.000 per bulan', source: 'Seqolah — panduan biaya SPP sekolah swasta 2026; Kidly — biaya masuk TK dan SD Jakarta 2026' },
  { figure: 'KJP Plus: tambahan SPP swasta SD Rp130.000, SMP Rp170.000 per bulan', source: 'Dinas Pendidikan DKI Jakarta — pencairan KJP Plus Tahap II 2026, 5 November 2026' },
  { figure: 'Iuran BPJS Kesehatan Kelas III Rp35.000 per orang per bulan', source: 'BPJS Kesehatan — Peraturan Presiden Nomor 63 Tahun 2022' },
];
