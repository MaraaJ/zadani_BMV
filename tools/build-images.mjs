/**
 * Převod dodaných fotografií do AVIF + WebP ve třech šířkách
 * a jednoho JPEG fallbacku pro prohlížeče bez podpory obou formátů.
 *
 * Dev-only nástroj. Odevzdaný web ho nepotřebuje — spouští se jednorázově,
 * když se změní zdrojová fotografie ve složce „04 Obrázky".
 *
 *   cd tools && npm install && node build-images.mjs
 */

import { mkdir, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'BMV strategy', '04 Obrázky');
const outDir = join(root, 'assets', 'img');

const WIDTHS = [640, 960, 1280];
const FALLBACK_WIDTH = 960;

const PHOTOS = [
  { src: 'bmv-foto-01-vyroba.png', name: 'foto-01-vyroba' },
  { src: 'bmv-foto-02-logistika.png', name: 'foto-02-logistika' },
  { src: 'bmv-foto-03-nemovitosti.png', name: 'foto-03-nemovitosti' },
  { src: 'bmv-foto-04-parky.png', name: 'foto-04-parky' },
];

await mkdir(outDir, { recursive: true });

// Staré varianty pryč, ať ve složce nezůstane nic po předchozím běhu.
for (const file of await readdir(outDir)) {
  if (/^foto-\d\d-.+-\d+\.(avif|webp|jpg|png)$/.test(file)) {
    await unlink(join(outDir, file));
  }
}

for (const photo of PHOTOS) {
  const input = join(srcDir, photo.src);
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);

  for (const width of widths) {
    const base = sharp(input).resize({ width, withoutEnlargement: true });
    const stem = join(outDir, `${photo.name}-${width}`);

    await Promise.all([
      base.clone().avif({ quality: 55, effort: 6 }).toFile(`${stem}.avif`),
      base.clone().webp({ quality: 76, effort: 6 }).toFile(`${stem}.webp`),
    ]);
  }

  const fallbackWidth = Math.min(FALLBACK_WIDTH, meta.width);
  await sharp(input)
    .resize({ width: fallbackWidth, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(join(outDir, `${photo.name}-${fallbackWidth}.jpg`));

  console.log(
    `${photo.name}: ${meta.width}×${meta.height} → avif/webp ${widths.join(', ')} px · jpg ${fallbackWidth} px`,
  );
}

console.log('Hotovo.');
