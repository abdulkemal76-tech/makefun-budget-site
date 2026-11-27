// charts.js — diagram SVG polos, tanpa pustaka. Satu tugas: menggambar.

import { rupiahShort } from './format.js';

// Diagram donat: bagian-bagian {label, value, color}. Mengembalikan string SVG.
export function donut(parts, size = 220, thickness = 34) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const rings = parts.map((p) => {
    const frac = p.value / total;
    const dash = frac * circ;
    const gap = circ - dash;
    const s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + p.color + '" stroke-width="' + thickness + '" stroke-dasharray="' + dash.toFixed(2) + ' ' + gap.toFixed(2) + '" stroke-dashoffset="' + (-offset).toFixed(2) + '" />';
    offset += dash;
    return s;
  }).join('');
  const center = '<text x="' + cx + '" y="' + (cy - 6) + '" text-anchor="middle" class="donut-total">' + rupiahShort(total) + '</text>'
    + '<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" class="donut-label">terpakai</text>';
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Diagram donat pengeluaran" class="donut">' + rings + center + '</svg>';
}

// Bilah mendatar satu amplop: terpakai dibanding anggaran.
export function bar(spent, planned, color) {
  const pct = planned > 0 ? Math.min(100, (spent / planned) * 100) : 0;
  const over = spent > planned;
  return '<div class="bar" role="img" aria-label="Terpakai ' + Math.round(pct) + ' persen dari anggaran">'
    + '<div class="bar-fill' + (over ? ' bar-over' : '') + '" style="width:' + pct.toFixed(1) + '%;background:' + color + '"></div></div>';
}

// Grafik garis kecil untuk diari harga: points [{label, value}].
export function lineChart(points, color, width = 640, height = 220) {
  const padL = 64;
  const padR = 12;
  const padT = 14;
  const padB = 30;
  const values = points.map((p) => p.value);
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  min -= span * 0.15;
  max += span * 0.15;
  const x = (i) => padL + (i * (width - padL - padR)) / Math.max(1, points.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (height - padT - padB);
  const line = points.map((p, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(p.value).toFixed(1)).join(' ');
  const dots = points.map((p, i) => '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) + '" r="4" fill="' + color + '"><title>' + p.label + ': Rp' + p.value.toLocaleString('id-ID') + '</title></circle>').join('');
  const labels = points.map((p, i) => '<text x="' + x(i).toFixed(1) + '" y="' + (height - 8) + '" text-anchor="middle" class="chart-axis">' + p.label + '</text>').join('');
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + f * (max - min);
    const gy = y(v);
    return '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (width - padR) + '" y2="' + gy.toFixed(1) + '" class="chart-grid" />'
      + '<text x="' + (padL - 8) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="end" class="chart-axis">' + rupiahShort(v) + '</text>';
  }).join('');
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="Grafik garis harga" class="line-chart">' + grid
    + '<path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />'
    + dots + labels + '</svg>';
}

// Bilah kemajuan tujuan: terkumpul dibanding target.
export function progressBar(saved, target, color) {
  const pct = target > 0 ? Math.min(100, (saved / target) * 100) : 0;
  return '<div class="bar" role="img" aria-label="Terkumpul ' + Math.round(pct) + ' persen dari target">'
    + '<div class="bar-fill" style="width:' + pct.toFixed(1) + '%;background:' + color + '"></div></div>';
}
