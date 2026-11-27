// goals.js — hitung lini masa tujuan menabung dan pelunasan utang.
// Satu tugas: aritmetika tujuan, tanpa tampilan.

import { bulanIndonesia } from './format.js';

// Lini masa menabung: mulai dari tabungan yang sudah ada, tambah setoran
// bulanan sampai target tercapai. Mengembalikan baris per bulan:
// { bulan, setoran, terkumpul, selesai }.
export function goalTimeline(goal, startMonthKey, extraMonthly = 0) {
  const monthly = goal.monthly + extraMonthly;
  const rows = [];
  let saved = goal.saved;
  let offset = 1; // bulan pertama adalah bulan setelah bulan berjalan
  while (saved < goal.target && offset <= 60) {
    const deposit = Math.min(monthly, goal.target - saved);
    saved += deposit;
    rows.push({
      bulan: bulanIndonesia(startMonthKey, offset),
      setoran: deposit,
      terkumpul: saved,
      selesai: saved >= goal.target,
    });
    offset += 1;
  }
  return { rows, monthly, monthsNeeded: rows.length, finishMonth: rows.length ? rows[rows.length - 1].bulan : null };
}

// Lini masa pelunasan utang: sisa utang berkurang sebesar cicilan per bulan.
export function debtTimeline(debt, startMonthKey) {
  const rows = [];
  let remaining = debt.total - debt.paid;
  let offset = 1;
  while (remaining > 0 && offset <= 60) {
    const pay = Math.min(debt.monthly, remaining);
    remaining -= pay;
    rows.push({
      bulan: bulanIndonesia(startMonthKey, offset),
      cicilan: pay,
      sisa: remaining,
      lunas: remaining <= 0,
    });
    offset += 1;
  }
  return { rows, monthsLeft: rows.length, finishMonth: rows.length ? rows[rows.length - 1].bulan : null };
}
