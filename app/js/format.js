// format.js — pemformatan rupiah, tanggal, dan persen. Satu tugas saja.

export function rupiah(n) {
  const v = Math.round(n);
  const sign = v < 0 ? '-' : '';
  const digits = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return sign + 'Rp' + digits;
}

export function rupiahShort(n) {
  const v = Math.round(n);
  if (Math.abs(v) >= 1000000) {
    const jt = v / 1000000;
    return 'Rp' + (Number.isInteger(jt) ? String(jt) : jt.toFixed(1).replace('.', ',')) + ' jt';
  }
  if (Math.abs(v) >= 1000) return 'Rp' + Math.round(v / 1000) + ' rb';
  return 'Rp' + String(v);
}

export function persen(n, decimals = 0) {
  return n.toFixed(decimals).replace('.', ',') + '%';
}

// Tanggal "3 Nov 2026" dari nomor hari dan kunci bulan '2026-11'.
export function tanggalLengkap(hari, key) {
  const [tahun, bulan] = key.split('-').map(Number);
  const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return hari + ' ' + namaBulan[bulan - 1] + ' ' + tahun;
}

// Nama bulan Indonesia dari kunci '2026-11' dan offset bulan.
export function bulanIndonesia(key, offset = 0) {
  const [tahun, bulan] = key.split('-').map(Number);
  const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  let b = bulan - 1 + offset;
  let t = tahun + Math.floor(b / 12);
  b = ((b % 12) + 12) % 12;
  return namaBulan[b] + ' ' + t;
}
