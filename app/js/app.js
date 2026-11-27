// app.js — perute, keadaan, dan pengabelan. Satu tugas: menjalankan situs.
// Rute hash: #/beranda, #/amplop, #/simulator, #/tujuan, #/diari, #/sumber.

import { MONTHS, MONTH_ORDER, monthData, ENVELOPES } from './data.js';
import { homeView, envelopesView, simulatorView, goalsView, sourcesView } from './views.js';
import { diaryView } from './diary.js';
import { SIM_DEFAULTS } from './simulator.js';

const STORAGE_KEY = 'rumah-tangga-cermat-v1';

const state = {
  monthKey: '2026-11',
  route: 'beranda',
  sim: { ...SIM_DEFAULTS },
  goalExtra: {},
  priceId: 'beras',
  // Transaksi tambahan pengguna: { '2026-11': { makanan: [[hari, ket, jumlah], ...] } }
  userTx: loadUserTx(),
};

function loadUserTx() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    return {};
  }
}

function saveUserTx() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userTx));
  } catch (e) {
    // Penyimpanan penuh atau dimatikan: situs tetap jalan, transaksi tidak tersimpan.
  }
}

// Bulan efektif: data dasar ditambah transaksi pengguna, lalu dihitung ulang.
export function effectiveMonth(key) {
  const base = monthData(key);
  const extra = state.userTx[key] || {};
  const tx = {};
  for (const env of ENVELOPES) {
    tx[env.id] = (base.tx[env.id] || []).concat(extra[env.id] || []);
  }
  const spent = {};
  for (const env of ENVELOPES) {
    spent[env.id] = tx[env.id].reduce((s, t) => s + t[2], 0);
  }
  const spentTotal = ENVELOPES.reduce((s, e) => s + spent[e.id], 0);
  return { ...base, tx, spent, spentTotal, remaining: base.incomeTotal - spentTotal };
}

const ROUTES = {
  beranda: () => homeView({ monthKey: state.monthKey, month: effectiveMonth(state.monthKey) }),
  amplop: () => envelopesView({ monthKey: state.monthKey, month: effectiveMonth(state.monthKey) }),
  simulator: () => simulatorView({ monthKey: state.monthKey, month: effectiveMonth(state.monthKey), sim: state.sim }),
  tujuan: () => goalsView({ monthKey: state.monthKey, month: effectiveMonth(state.monthKey), goalExtra: state.goalExtra }),
  diari: () => diaryView(state.priceId),
  sumber: () => sourcesView(),
};

const TITLES = {
  beranda: 'Beranda',
  amplop: 'Amplop Anggaran',
  simulator: 'Simulator “Bagaimana Jika”',
  tujuan: 'Tujuan dan Utang',
  diari: 'Diari Harga',
  sumber: 'Sumber Data',
};

function render() {
  const hash = location.hash.replace(/^#\/?/, '') || 'beranda';
  const route = ROUTES[hash] ? hash : 'beranda';
  state.route = route;
  const root = document.getElementById('app');
  root.innerHTML = ROUTES[route]();
  document.title = 'Rumah Tangga Cermat — ' + TITLES[route];
  document.querySelectorAll('.nav-link').forEach((a) => {
    const on = a.getAttribute('href') === '#/' + route;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  wire(route);
  window.scrollTo(0, 0);
}

function wire(route) {
  const monthSelect = document.getElementById('month-select');
  if (monthSelect) {
    monthSelect.addEventListener('change', () => {
      state.monthKey = monthSelect.value;
      render();
    });
  }
  if (route === 'amplop') {
    const form = document.getElementById('add-tx');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const envelope = String(fd.get('envelope'));
      const day = Math.max(1, Math.min(30, Number(fd.get('day')) || 1));
      const desc = String(fd.get('desc')).trim().slice(0, 80);
      const amount = Math.round(Number(fd.get('amount')) || 0);
      if (!desc || amount < 1000) return;
      if (!state.userTx[state.monthKey]) state.userTx[state.monthKey] = {};
      if (!state.userTx[state.monthKey][envelope]) state.userTx[state.monthKey][envelope] = [];
      state.userTx[state.monthKey][envelope].push([day, desc, amount]);
      saveUserTx();
      render();
      const note = document.getElementById('add-tx');
      if (note) note.insertAdjacentHTML('afterend', '<p class="ok" role="status">Transaksi tersimpan: ' + desc + ' sebesar Rp' + amount.toLocaleString('id-ID') + '.</p>');
    });
    const reset = document.getElementById('reset-tx');
    if (reset) {
      reset.addEventListener('click', () => {
        delete state.userTx[state.monthKey];
        saveUserTx();
        render();
      });
    }
  }
  if (route === 'simulator') {
    const bind = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        state.sim[key] = Number(el.value);
        render();
        const again = document.getElementById(id);
        if (again) again.focus();
      });
    };
    bind('sim-beras', 'berasPct');
    bind('sim-bensin', 'bensinPct');
    bind('sim-spp', 'sppPct');
    bind('sim-listrik', 'listrikPct');
    bind('sim-lembur', 'lembur');
    const reset = document.getElementById('sim-reset');
    if (reset) reset.addEventListener('click', () => { state.sim = { ...SIM_DEFAULTS }; render(); });
  }
  if (route === 'tujuan') {
    document.querySelectorAll('.goal-extra').forEach((el) => {
      el.addEventListener('input', () => {
        state.goalExtra[el.getAttribute('data-goal')] = Number(el.value);
        render();
      });
    });
  }
  if (route === 'diari') {
    document.querySelectorAll('[data-price]').forEach((el) => {
      el.addEventListener('click', () => {
        state.priceId = el.getAttribute('data-price');
        render();
      });
    });
  }
}

window.addEventListener('hashchange', render);
render();
