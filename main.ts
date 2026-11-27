// main.ts — menyerahkan situs Rumah Tangga Cermat (Node 22, pustaka standar saja).
// Menyalin app/ dan screenshots/ dari samping berkas ini ke /output
// (di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output), lalu menulis
// /output/dossier.json dengan pustaka make.fun yang dibundel di vendor/.
// Jalankan: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Pemeriksaan awal: situs yang diserahkan harus punya halaman utama.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('main.ts: app/index.html tidak ditemukan di ' + here);
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan yang dipakai penilai: teks dossier paling banyak
// 160 KiB, paling banyak 4 tangkapan layar @ 256 KiB, app/ paling banyak
// 993 berkas dan direktori dengan total 16 MiB.
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(out, 'dossier.json');
writeFileSync(dossierPath, dossier);

// Ringkasan untuk log penilai: berapa berkas situs dan sebesar apa dossier.
function countFiles(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    n += statSync(p).isDirectory() ? countFiles(p) : 1;
  }
  return n;
}
console.log('Rumah Tangga Cermat: ' + countFiles(join(out, 'app')) + ' berkas app, dossier ' + statSync(dossierPath).size + ' byte -> ' + out);
