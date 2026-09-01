/**
 * Open Graph obrázek 1200 × 630.
 *
 * Skládá se výhradně z dodaných prvků: pozadí --bg #F4E1D0, textura noise.png
 * dlážděná po 126 px při opacity 0,5 a horizontální logotyp ze složky „03 Logo".
 * Žádný nový text, žádná nová barva.
 *
 * Dev-only nástroj:  cd tools && npm install && node make-og.mjs
 */

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;
const NOISE_SIZE = 126;
const NOISE_OPACITY = 0.5;
const LOGO_WIDTH = 560;

// Textura: zmenšit na 126 px a zeslabit alfa kanál na polovinu, ať odpovídá
// tomu, co dělá `.bmv-noise-layer { opacity: .5 }` na webu.
const noise = await sharp(join(root, 'assets', 'img', 'noise.png'))
  .resize(NOISE_SIZE, NOISE_SIZE)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 3; i < noise.data.length; i += 4) {
  noise.data[i] = Math.round(noise.data[i] * NOISE_OPACITY);
}

const noiseTile = await sharp(noise.data, {
  raw: { width: NOISE_SIZE, height: NOISE_SIZE, channels: 4 },
}).png().toBuffer();

const logoSvg = await readFile(join(root, 'assets', 'logo', 'bmv-logo-horizontalni.svg'));
const logo = await sharp(logoSvg, { density: 300 })
  .resize({ width: LOGO_WIDTH })
  .png()
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp({
  create: { width: W, height: H, channels: 4, background: '#F4E1D0' },
})
  .composite([
    { input: noiseTile, tile: true, blend: 'over' },
    {
      input: logo,
      left: Math.round((W - LOGO_WIDTH) / 2),
      top: Math.round((H - logoMeta.height) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(root, 'assets', 'img', 'og.png'));

console.log(`og.png — ${W}×${H}`);
