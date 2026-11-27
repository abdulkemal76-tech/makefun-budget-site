// simulator.js — mesin "Bagaimana jika". Satu tugas: menghitung ulang
// anggaran bulan berjalan dari perubahan harga dan penghasilan.

import { SIM_BASE } from './data.js';

// Hitung ulang anggaran dari slider. Semua delta dalam rupiah.
// params: { berasPct, bensinPct, sppPct, listrikPct, lembur }
//   berasPct: kenaikan harga beras (%), bensinPct: kenaikan Pertalite (%),
//   sppPct: kenaikan SPP (%), listrikPct: kenaikan tarif listrik (%),
//   lembur: tambahan penghasilan dari lembur (Rp).
export function simulate(month, params) {
  const berasCost = SIM_BASE.berasKgPerBulan * SIM_BASE.berasHargaPerKg;
  const bensinCost = SIM_BASE.bensinLiterPerBulan * SIM_BASE.bensinHargaPerLiter;
  const berasDelta = Math.round(berasCost * (params.berasPct / 100));
  const bensinDelta = Math.round(bensinCost * (params.bensinPct / 100));
  const sppDelta = Math.round(SIM_BASE.sppPerBulan * (params.sppPct / 100));
  const listrikDelta = Math.round(SIM_BASE.listrikPerBulan * (params.listrikPct / 100));

  const envelopes = {};
  for (const key of Object.keys(month.planned)) {
    envelopes[key] = { planned: month.planned[key], spent: month.spent[key] };
  }
  // Delta diterapkan ke terpakai: keluarga tetap belanja jumlah yang sama,
  // hanya harganya yang naik.
  envelopes.makanan.spent += berasDelta;
  envelopes.transport.spent += bensinDelta;
  envelopes.sekolah.spent += sppDelta;
  envelopes.rumah.spent += listrikDelta;

  const income = month.incomeTotal + params.lembur;
  const spentTotal = Object.values(envelopes).reduce((s, e) => s + e.spent, 0);
  const plannedTotal = month.plannedTotal;
  const remaining = income - spentTotal;
  const totalDelta = berasDelta + bensinDelta + sppDelta + listrikDelta;

  // Saran: amplop apa yang paling masuk akal dipangkas bila defisit.
  let advice = '';
  if (remaining >= 0) {
    advice = 'Masih surplus ' + remaining + ' rupiah. Kenaikan ini masih tertutup oleh sisa anggaran bulan ini.';
  } else {
    const cut = Math.abs(remaining);
    const flexible = envelopes.lainnya.spent + envelopes.makanan.spent - berasDelta;
    if (cut <= envelopes.lainnya.spent) {
      advice = 'Defisit ' + cut + ' rupiah. Pangkas amplop Lainnya (belanja tak terduga dan hiburan) sebesar itu, bulan ini masih aman.';
    } else if (cut <= flexible) {
      advice = 'Defisit ' + cut + ' rupiah. Kurangi jajan dan belanja tak terduga, lalu masak lebih banyak di rumah: gabungan amplop Lainnya dan Makanan masih menutupnya.';
    } else {
      advice = 'Defisit ' + cut + ' rupiah — lebih besar dari semua pos fleksibel. Perlu tambahan penghasilan atau menunda tabungan bulan ini, dan bicarakan ulang SPP dengan sekolah.';
    }
  }

  return {
    envelopes, income, spentTotal, plannedTotal, remaining, totalDelta,
    deltas: { beras: berasDelta, bensin: bensinDelta, spp: sppDelta, listrik: listrikDelta },
    advice,
  };
}

export const SIM_DEFAULTS = { berasPct: 10, bensinPct: 0, sppPct: 0, listrikPct: 0, lembur: 0 };
