/**
 * Kontrola českých nezlomitelných mezer po jednopísmenných předložkách
 * a spojkách (v, s, z, k, o, a, i, u) ve viditelném textu index.html.
 *
 * Dev-only nástroj. Odevzdaný web ho nepotřebuje.
 *
 *   cd tools && node nbsp.mjs
 */

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(join(root, 'index.html'), 'utf8');

const body = html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html;

const text = body
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(p|h[1-6]|li|div|section|article|address|blockquote|figcaption|header|footer|nav)>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, '\u00a0')
  .replace(/&amp;/gi, '&')
  .replace(/&#160;/g, '\u00a0')
  .replace(/[ \t]+/g, ' ')
  .replace(/ *\n */g, '\n');

const PREP = 'vszkoaiu';
const re = new RegExp(`(?:^|\\s)([${PREP}${PREP.toUpperCase()}]) (\\S+)`, 'gm');

const hits = [];
let match;
while ((match = re.exec(text)) !== null) {
  const before = text.slice(Math.max(0, match.index - 24), match.index).replace(/\s+/g, ' ');
  const snippet = `${before}${match[0]}`.trim();
  hits.push(snippet);
}

if (hits.length) {
  console.log(`Nalezeno ${hits.length} míst bez nezlomitelné mezery:\n`);
  for (const hit of hits) console.log(' ', hit);
  process.exitCode = 1;
} else {
  console.log('OK — jednopísmenné předložky a spojky mají nezlomitelnou mezeru.');
}
