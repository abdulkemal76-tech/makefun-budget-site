// diary.js — tampilan Diari Harga: tabel harga dan grafik garis.
// Satu tugas: mengubah PRICE_DIARY menjadi HTML.

import { PRICE_DIARY } from './data.js';
import { rupiah } from './format.js';
import { lineChart } from './charts.js';

// Ringkasan satu komoditas: harga terbaru, perubahan sejak pencatatan pertama.
export function priceSummary(item) {
  const first = item.rows[0][1];
  const last = item.rows[item.rows.length - 1][1];
  const change = last - first;
  const pct = first ? (change / first) * 100 : 0;
  return { first, last, change, pct };
}

export function diaryView(selectedId) {
  const item = PRICE_DIARY.find((p) => p.id === selectedId) || PRICE_DIARY[0];
  const summary = priceSummary(item);
  const arrow = summary.change > 0 ? 'naik' : summary.change < 0 ? 'turun' : 'tetap';
  const chartPoints = item.rows.map(([label, value]) => ({ label, value }));

  const cards = PRICE_DIARY.map((p) => {
    const s = priceSummary(p);
    const dir = s.change > 0 ? '▲' : s.change < 0 ? '▼' : '—';
    return '<button class="price-card' + (p.id === item.id ? ' active' : '') + '" data-price="' + p.id + '" aria-pressed="' + (p.id === item.id) + '">'
      + '<span class="price-card-name">' + p.name + '</span>'
      + '<span class="price-card-value">' + rupiah(s.last) + ' / ' + p.unit + '</span>'
      + '<span class="price-card-change">' + dir + ' ' + rupiah(Math.abs(s.change)) + ' sejak ' + p.rows[0][0] + '</span>'
      + '</button>';
  }).join('');

  const tableRows = item.rows.map(([date, price]) => '<tr><td>' + date + ' 2026</td><td class="num">' + rupiah(price) + ' per ' + item.unit + '</td></tr>').join('');

  return '<section class="page-head"><h1>Diari Harga</h1>'
    + '<p>Harga barang yang keluarga ini benar-benar beli, dicatat dari pemantauan resmi. '
    + 'Harga hari ini: <strong>' + item.name + ' ' + rupiah(summary.last) + ' per ' + item.unit + '</strong> '
    + '(' + item.rows[item.rows.length - 1][0] + ' November 2026), ' + arrow + ' '
    + rupiah(Math.abs(summary.change)) + ' (' + Math.abs(summary.pct).toFixed(1).replace('.', ',') + '%) sejak ' + item.rows[0][0] + '.</p></section>'
    + '<div class="price-grid">' + cards + '</div>'
    + '<div class="panel"><h2>Pergerakan harga — ' + item.name + '</h2>'
    + '<p class="muted">' + item.source + '. ' + (item.note || '') + '</p>'
    + lineChart(chartPoints, '#2e7d4f')
    + '<table class="table"><thead><tr><th>Tanggal</th><th class="num">Harga</th></tr></thead><tbody>' + tableRows + '</tbody></table>'
    + '<p class="muted">Harga terendah: ' + rupiah(Math.min.apply(null, item.rows.map((r) => r[1]))) + ' · Harga tertinggi: '
    + rupiah(Math.max.apply(null, item.rows.map((r) => r[1]))) + ' · Rata-rata periode ini: ' + rupiah(item.rows.reduce((s, r) => s + r[1], 0) / item.rows.length) + ' per ' + item.unit + '.</p>'
    + '</div>'
    + '<div class="panel"><h2>Kenapa dicatat?</h2>'
    + '<p>Keluarga Hartono mencatat harga setiap belanja supaya tahu kapan beras dan minyak sedang mahal. '
    + 'Bulan ini telur turun dari Rp31.450 (16 November) ke Rp28.100 (26 November), jadi lauk telur lebih sering masuk menu. '
    + 'Beras medium Jakarta bergerak Rp13.500–Rp14.542 per kg; keluarga membeli 25 kg sebulan, jadi selisih Rp1.000 per kg berarti Rp25.000 sebulan.</p>'
    + '<p><a class="btn" href="#/sumber">Lihat semua sumber data</a></p></div>';
}
