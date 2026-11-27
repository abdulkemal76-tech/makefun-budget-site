// views.js — tampilan tiap halaman. Satu tugas: mengubah data menjadi HTML.

import { ENVELOPES, MONTH_ORDER, FAMILY, GOALS, DEBT, SOURCES } from './data.js';
import { rupiah, persen, tanggalLengkap } from './format.js';
import { donut, bar, progressBar } from './charts.js';
import { goalTimeline, debtTimeline } from './goals.js';
import { simulate, SIM_DEFAULTS } from './simulator.js';

function monthSelector(currentKey) {
  const options = MONTH_ORDER.map((k) => {
    const label = k === '2026-09' ? 'September 2026' : k === '2026-10' ? 'Oktober 2026' : 'November 2026';
    return '<option value="' + k + '"' + (k === currentKey ? ' selected' : '') + '>' + label + '</option>';
  }).join('');
  return '<label class="month-pick">Bulan <select id="month-select" aria-label="Pilih bulan">' + options + '</select></label>';
}

function envelopeRows(month) {
  return ENVELOPES.map((env) => {
    const planned = month.planned[env.id];
    const spent = month.spent[env.id];
    const rest = planned - spent;
    const pct = planned > 0 ? (spent / planned) * 100 : 0;
    const status = spent > planned ? '<span class="tag tag-over">Lewat ' + rupiah(spent - planned) + '</span>'
      : rest === 0 ? '<span class="tag">Pas</span>'
      : '<span class="tag tag-ok">Sisa ' + rupiah(rest) + '</span>';
    return '<article class="env-card"><a class="env-link" href="#/amplop">'
      + '<span class="env-dot" style="background:' + env.color + '"></span>'
      + '<span class="env-name">' + env.name + '</span>' + status + '</a>'
      + '<p class="env-nums"><strong>' + rupiah(spent) + '</strong> dari ' + rupiah(planned) + ' (' + persen(pct) + ')</p>'
      + bar(spent, planned, env.color)
      + '<p class="muted">' + env.desc + '</p></article>';
  }).join('');
}

export function homeView(ctx) {
  const month = ctx.month;
  const parts = ENVELOPES.map((e) => ({ label: e.name, value: month.spent[e.id], color: e.color }));
  const surplus = month.remaining;
  const members = FAMILY.members.map((m) => '<li><strong>' + m.name + '</strong> — ' + m.role + '. ' + m.job + '.</li>').join('');
  return '<section class="hero"><div><p class="eyebrow">Anggaran rumah tangga · ' + month.label + '</p>'
    + '<h1>Rumah Tangga Cermat</h1>'
    + '<p class="lede">Anggaran ' + FAMILY.name + ', keluarga empat orang di ' + FAMILY.place + '. '
    + 'Setiap rupiah punya amplopnya sendiri, dan setiap angka di halaman ini bisa dilacak sampai ke struk belanjanya.</p>'
    + '<p><a class="btn" href="#/amplop">Lihat amplop bulan ini</a> <a class="btn btn-ghost" href="#/simulator">Coba simulator “Bagaimana jika”</a></p></div>'
    + '<div class="hero-card"><p class="muted">Pemasukan ' + month.label + '</p><p class="big">' + rupiah(month.incomeTotal) + '</p>'
    + '<p class="muted">Budi ' + rupiah(month.income.budi) + ' · Sari ' + rupiah(month.income.sari) + '</p>'
    + '<p class="muted">Terpakai <strong>' + rupiah(month.spentTotal) + '</strong> · Sisa <strong class="' + (surplus >= 0 ? 'ok' : 'bad') + '">' + rupiah(surplus) + '</strong></p>'
    + '<p class="muted">Anggaran direncanakan ' + rupiah(month.plannedTotal) + ' — sama dengan pemasukan, tidak lebih.</p></div></section>'
    + '<section class="toolbar">' + monthSelector(ctx.monthKey)
    + '<p class="muted">Ubah bulan untuk melihat anggaran dan pengeluaran bulan itu. Data September dan Oktober sudah ditutup.</p></section>'
    + '<section class="grid-2"><div class="panel"><h2>Ke mana uang pergi</h2>' + donut(parts)
    + '<ul class="legend">' + ENVELOPES.map((e) => '<li><span class="env-dot" style="background:' + e.color + '"></span>' + e.name + ' — ' + rupiah(month.spent[e.id]) + '</li>').join('') + '</ul></div>'
    + '<div class="panel"><h2>Amplop bulan ini</h2><div class="env-list">' + envelopeRows(month) + '</div></div></section>'
    + '<section class="panel"><h2>Keluarga di balik angka ini</h2><ul class="family">' + members + '</ul>'
    + '<p>' + FAMILY.home + '. Listrik memakai token 1.300 VA dengan tarif Rp1.444,70 per kWh. '
    + 'Budi berangkat kerja naik motor dan TransJakarta; anak-anak sekolah swasta di dekat rumah.</p>'
    + '<p><a href="#/tujuan">Lihat tujuan menabung keluarga</a> · <a href="#/diari">Lihat diari harga pasar</a> · <a href="#/sumber">Lihat sumber semua angka</a></p></section>'
    + '<section class="panel tips"><h2>Tiga hal yang berhasil pada November 2026</h2><ol>'
    + '<li><strong>Telur turun harga.</strong> Telur ayam ras turun dari Rp31.450 (16 November) ke Rp28.100 (26 November), jadi menu telur lebih sering dan amplop Makanan masih sisa Rp220.000.</li>'
    + '<li><strong>Bensin terkendali.</strong> Pertalite tetap Rp10.000 per liter sepanjang November, jadi amplop Transport tidak jebol meski motor dipakai setiap hari.</li>'
    + '<li><strong>Tabungan jalan terus.</strong> Rp1.200.000 sudah disisihkan di awal bulan — dana darurat, pendidikan, dan liburan — sebelum uang sempat terpakai.</li>'
    + '</ol></section>';
}

export function envelopesView(ctx) {
  const month = ctx.month;
  const cards = ENVELOPES.map((env) => {
    const planned = month.planned[env.id];
    const spent = month.spent[env.id];
    const rest = planned - spent;
    const txs = (month.tx[env.id] || []).map((t) => '<li><span class="tx-date">' + tanggalLengkap(t[0], ctx.monthKey) + '</span><span class="tx-desc">' + t[1] + '</span><span class="tx-amount">' + rupiah(t[2]) + '</span></li>').join('');
    return '<article class="panel env-detail" id="amplop-' + env.id + '"><h2><span class="env-dot" style="background:' + env.color + '"></span> ' + env.name + '</h2>'
      + '<p class="env-nums"><strong>' + rupiah(spent) + '</strong> terpakai dari ' + rupiah(planned) + ' · Sisa <strong class="' + (rest >= 0 ? 'ok' : 'bad') + '">' + rupiah(rest) + '</strong></p>'
      + bar(spent, planned, env.color)
      + '<p class="muted">' + env.desc + '</p>'
      + '<h3>Transaksi ' + month.label + '</h3><ul class="tx-list">' + txs + '</ul></article>';
  }).join('');

  const options = ENVELOPES.map((e) => '<option value="' + e.id + '">' + e.name + '</option>').join('');
  return '<section class="page-head"><h1>Amplop Anggaran</h1>'
    + '<p>Metode amplop: pemasukan dibagi ke tujuh amplop di awal bulan. Kalau satu amplop habis, uang diambil dari amplop lain — dengan sadar, bukan diam-diam. '
    + 'Transaksi di bawah ini adalah catatan belanja sebenarnya ' + FAMILY.name + ' pada ' + month.label + '.</p></section>'
    + '<section class="toolbar">' + monthSelector(ctx.monthKey)
    + '<button class="btn btn-ghost" id="reset-tx" type="button">Kembalikan catatan seperti semula</button></section>'
    + '<section class="panel"><h2>Tambah transaksi</h2>'
    + '<form id="add-tx" class="form-grid"><label>Amplop <select name="envelope" required>' + options + '</select></label>'
    + '<label>Tanggal <input type="number" name="day" min="1" max="31" value="28" required></label>'
    + '<label>Keterangan <input type="text" name="desc" maxlength="80" placeholder="Misalnya: Beras 10 kg" required></label>'
    + '<label>Jumlah (Rp) <input type="number" name="amount" min="1000" step="500" placeholder="50000" required></label>'
    + '<button class="btn" type="submit">Simpan transaksi</button></form>'
    + '<p class="muted">Transaksi yang ditambahkan tersimpan di peramban ini saja dan langsung mengubah angka amplop di semua halaman.</p></section>'
    + '<div class="env-grid">' + cards + '</div>';
}

export function simulatorView(ctx) {
  const p = ctx.sim;
  const result = simulate(ctx.month, p);
  const verdictClass = result.remaining >= 0 ? 'verdict-ok' : 'verdict-bad';
  const verdictText = result.remaining >= 0
    ? 'Masih surplus ' + rupiah(result.remaining) + ' — bulan ini aman.'
    : 'Defisit ' + rupiah(Math.abs(result.remaining)) + ' — anggaran bulan ini tidak cukup.';
  const slider = (id, label, value, max, unit, hint) => '<label class="sim-row"><span class="sim-label">' + label + ' <strong>' + value + unit + '</strong></span>'
    + '<input type="range" id="' + id + '" min="0" max="' + max + '" step="1" value="' + value + '" aria-label="' + label + '">'
    + '<span class="muted">' + hint + '</span></label>';
  const bars = ENVELOPES.map((env) => {
    const e = result.envelopes[env.id];
    return '<li><span class="env-dot" style="background:' + env.color + '"></span>' + env.name
      + ' — <strong>' + rupiah(e.spent) + '</strong> dari ' + rupiah(e.planned)
      + (e.spent > e.planned ? ' <span class="tag tag-over">Lewat ' + rupiah(e.spent - e.planned) + '</span>' : '') + '</li>';
  }).join('');
  return '<section class="page-head"><h1>Simulator “Bagaimana Jika”</h1>'
    + '<p>Geser pengatur di bawah ini dan lihat bulan ini berubah secara langsung. Harga dasarnya nyata: beras medium Rp14.250 per kg (Info Pangan Jakarta, 24 November 2026), '
    + 'Pertalite Rp10.000 per liter, SPP dua anak Rp1.100.000 per bulan, dan token listrik Rp300.000 per bulan. Keluarga membeli 25 kg beras dan memakai 69,5 liter bensin sebulan.</p></section>'
    + '<div class="grid-2"><section class="panel"><h2>Ubah keadaan</h2>'
    + slider('sim-beras', 'Harga beras naik', p.berasPct, 30, '%', 'Beras 25 kg sebulan: tiap +10% menambah Rp35.625 ke amplop Makanan.')
    + slider('sim-bensin', 'Harga Pertalite naik', p.bensinPct, 30, '%', 'Bensin 69,5 liter sebulan: tiap +10% menambah Rp69.500 ke amplop Transport.')
    + slider('sim-spp', 'SPP naik', p.sppPct, 20, '%', 'SPP dua anak Rp1.100.000: tiap +10% menambah Rp110.000 ke amplop Sekolah.')
    + slider('sim-listrik', 'Tarif listrik naik', p.listrikPct, 20, '%', 'Token listrik Rp300.000: tiap +10% menambah Rp30.000 ke amplop Rumah.')
    + '<label class="sim-row"><span class="sim-label">Lembur Budi <strong>' + rupiah(p.lembur) + '</strong></span>'
    + '<input type="range" id="sim-lembur" min="0" max="500000" step="50000" value="' + p.lembur + '" aria-label="Lembur Budi">'
    + '<span class="muted">Tambahan penghasilan bulan ini, sampai Rp500.000.</span></label>'
    + '<p><button class="btn btn-ghost" id="sim-reset" type="button">Atur ulang ke awal</button></p></section>'
    + '<section class="panel"><h2>Hasil bulan ini</h2>'
    + '<p class="verdict ' + verdictClass + '">' + verdictText + '</p>'
    + '<p>Pemasukan menjadi <strong>' + rupiah(result.income) + '</strong> · Terpakai menjadi <strong>' + rupiah(result.spentTotal) + '</strong> · '
    + 'Kenaikan harga menambah pengeluaran <strong>' + rupiah(result.totalDelta) + '</strong>.</p>'
    + '<ul class="sim-list">' + bars + '</ul>'
    + '<p><strong>Saran:</strong> ' + result.advice + '</p>'
    + '<p class="muted">Rincian kenaikan: beras +' + rupiah(result.deltas.beras) + ', bensin +' + rupiah(result.deltas.bensin) + ', SPP +' + rupiah(result.deltas.spp) + ', listrik +' + rupiah(result.deltas.listrik) + '.</p>'
    + '</section></div>'
    + '<section class="panel"><h2>Contoh yang sudah dihitung</h2><ul>'
    + '<li><strong>Beras naik 10% saja</strong> (Rp14.250 menjadi Rp15.675 per kg): Makanan naik Rp35.625, sisa bulan ini tinggal ' + rupiah(ctx.month.remaining - 35625) + '.</li>'
    + '<li><strong>SPP naik 10%</strong> (Rp1.100.000 menjadi Rp1.210.000): Sekolah lewat anggaran Rp110.000 — harus diambil dari amplop Lainnya.</li>'
    + '<li><strong>Beras +10% dan bensin +10% bersamaan</strong>: pengeluaran naik Rp105.125. Tanpa lembur, sisa bulan ini tinggal ' + rupiah(ctx.month.remaining - 105125) + '.</li>'
    + '</ul><p><a href="#/amplop">Kembali ke amplop</a> · <a href="#/diari">Cek harga pasar minggu ini</a></p></section>';
}

export function goalsView(ctx) {
  const month = ctx.month;
  const goalCards = GOALS.map((g) => {
    const extra = ctx.goalExtra[g.id] || 0;
    const t = goalTimeline(g, ctx.monthKey, extra);
    const rows = t.rows.map((r) => '<tr><td>' + r.bulan + '</td><td class="num">' + rupiah(r.setoran) + '</td><td class="num">' + rupiah(r.terkumpul) + '</td><td>' + (r.selesai ? 'Tercapai' : '—') + '</td></tr>').join('');
    return '<article class="panel"><h2>' + g.name + '</h2><p>' + g.note + '</p>'
      + '<p class="env-nums"><strong>' + rupiah(g.saved) + '</strong> dari target ' + rupiah(g.target) + ' (' + persen((g.saved / g.target) * 100) + ')</p>'
      + progressBar(g.saved, g.target, '#0f766e')
      + '<p>Menabung <strong>' + rupiah(t.monthly) + ' per bulan</strong> — selesai dalam <strong>' + t.monthsNeeded + ' bulan</strong>, pada <strong>' + t.finishMonth + '</strong>.</p>'
      + '<label class="sim-row"><span class="sim-label">Tambah setoran bulanan <strong>' + rupiah(extra) + '</strong></span>'
      + '<input type="range" class="goal-extra" data-goal="' + g.id + '" min="0" max="500000" step="50000" value="' + extra + '" aria-label="Tambah setoran ' + g.name + '">'
      + '<span class="muted">Geser untuk melihat lini masa berubah: setoran lebih besar berarti selesai lebih cepat.</span></label>'
      + '<table class="table"><thead><tr><th>Bulan</th><th class="num">Setoran</th><th class="num">Terkumpul</th><th>Status</th></tr></thead><tbody>' + rows + '</tbody></table></article>';
  }).join('');

  const d = debtTimeline(DEBT, ctx.monthKey);
  const debtRows = d.rows.map((r) => '<tr><td>' + r.bulan + '</td><td class="num">' + rupiah(r.cicilan) + '</td><td class="num">' + rupiah(r.sisa) + '</td><td>' + (r.lunas ? 'Lunas' : '—') + '</td></tr>').join('');
  const debtPaid = DEBT.paid;
  return '<section class="page-head"><h1>Tujuan dan Utang</h1>'
    + '<p>Tiga tujuan menabung dan satu cicilan motor. Semua lini masa dihitung dari setoran bulanan yang sebenarnya — bukan janji. '
    + 'Bulan berjalan: ' + month.label + '.</p></section>'
    + '<div class="goal-grid">' + goalCards + '</div>'
    + '<section class="panel"><h2>' + DEBT.name + '</h2><p>' + DEBT.note + '</p>'
    + '<p class="env-nums"><strong>' + rupiah(debtPaid) + '</strong> sudah dibayar dari total ' + rupiah(DEBT.total) + ' · Sisa <strong>' + rupiah(DEBT.total - debtPaid) + '</strong></p>'
    + progressBar(debtPaid, DEBT.total, '#b06a1e')
    + '<p>Cicilan <strong>' + rupiah(DEBT.monthly) + ' per bulan</strong> — lunas dalam <strong>' + d.monthsLeft + ' bulan</strong>, pada <strong>' + d.finishMonth + '</strong>.</p>'
    + '<table class="table"><thead><tr><th>Bulan</th><th class="num">Cicilan</th><th class="num">Sisa utang</th><th>Status</th></tr></thead><tbody>' + debtRows + '</tbody></table>'
    + '<p class="muted">Setelah motor lunas pada ' + d.finishMonth + ', cicilan Rp400.000 per bulan itu dialihkan ke dana darurat — dana darurat akan penuh dua bulan lebih cepat.</p></section>'
    + '<section class="panel"><h2>Aturan main keluarga</h2><ol>'
    + '<li>Tabungan disisihkan di awal bulan, sebelum uang belanja disentuh.</li>'
    + '<li>Dana darurat hanya dipakai untuk keadaan darurat sungguhan: sakit, motor rusak parah, atau kehilangan penghasilan.</li>'
    + '<li>Kalau satu bulan defisit, tabungan liburan yang dipotong duluan — dana darurat dan pendidikan tidak boleh disentuh.</li>'
    + '</ol><p><a href="#/simulator">Uji ketahanan anggaran di simulator</a></p></section>';
}

export function sourcesView() {
  const items = SOURCES.map((s) => '<li><strong>' + s.figure + '</strong><br><span class="muted">' + s.source + '.</span></li>').join('');
  return '<section class="page-head"><h1>Sumber Data</h1>'
    + '<p>Setiap angka pasar di situs ini berasal dari pemantauan resmi yang tercantum di bawah. '
    + 'Situs ini berjalan sepenuhnya luring, jadi sumber ditulis berdasarkan nama dan tanggalnya — daftar tautan lengkapnya ada di berkas SOURCES.md di repositori situs ini.</p></section>'
    + '<section class="panel"><ol class="sources">' + items + '</ol></section>'
    + '<section class="panel"><h2>Yang fiktif dan yang nyata</h2>'
    + '<p><strong>Nyata:</strong> semua harga pasar, tarif, dan upah di atas — UMP, harga beras, telur, ayam, minyak, gula, Pertalite, tarif listrik, LPG, TransJakarta, kisaran SPP, bantuan KJP Plus, dan iuran BPJS.</p>'
    + '<p><strong>Fiktif tapi konsisten:</strong> Keluarga Hartono adalah keluarga contoh. Gaji Sari, sewa rumah kontrakan, cicilan motor, dan target tabungan adalah angka rumah tangga contoh yang disusun agar seluruh penjumlahan di situs ini cocok: pemasukan sama dengan jumlah ketujuh amplop, dan terpakai sama dengan jumlah seluruh transaksi yang tercatat.</p>'
    + '<p>Angka diperbarui terakhir: 27 November 2026.</p></section>';
}
