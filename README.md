# BMV strategy — onepage web

Statický jednostránkový web pro **BMV strategy s.r.o.** naprogramovaný podle dodaného designu
(`BMV strategy/01 Design/bmv-desktop-1440.pdf` a `bmv-mobil-390.pdf`).

---

## Jak to spustit

Web je čistě statický a nepotřebuje build server ani internetové připojení.

**Nejjednodušeji:** otevřít `index.html` v prohlížeči.

**Doporučeně** (kvůli korektnímu MIME typu fontů a testům Lighthouse):

```bash
npx serve .
# nebo
python3 -m http.server 8000
```

Nasazení na hosting = nahrát obsah repozitáře tak, jak je. Žádný build krok neprobíhá.

---

## Čím je to postavené

- **Ručně psané HTML + CSS + vanilla JS.** Žádný framework, žádný bundler, žádná runtime závislost.
- **Nulové externí zdroje.** Fonty, obrázky, logo i skripty jsou lokální — web funguje offline.
  Žádná CDN, žádná analytika, žádné trackery, žádné cookies, a tedy ani cookie lišta.
- **Design tokeny převzaté 1:1** z `BMV strategy/02 Kód – reference/design-system/tokens/`.
  Hodnoty se nepřepisovaly, upravily se pouze relativní cesty k fontům a textuře.
- **Geist a Geist Mono** hostované lokálně ve `woff2`, `font-display: swap`.
  Latin i latin-ext (diakritika) jsou v jednom souboru na rodinu — Safari
  u variabilního písma nenasazuje druhý `@font-face` podle `unicode-range`.

Vývojářské nástroje ve složce `tools/` (převod obrázků, generování OG, kontrola české
typografie) **nejsou součástí odevzdaného webu** — spouští se jednorázově při vývoji.

```bash
cd tools && npm install
node build-images.mjs   # AVIF + WebP + JPEG fallback
node make-og.mjs        # OG 1200×630
node nbsp.mjs           # kontrola nezlomitelných mezer
```

---

## Struktura

```
index.html              jediná stránka
assets/css/tokens.css   doslovné převzetí design-system/tokens/*.css
assets/css/layout.css   sazba sekcí podle PDF
assets/css/motion.css   veškerý pohyb, celý uvnitř @media (prefers-reduced-motion: no-preference)
assets/js/main.js       odhalování při scrollu, kotvy, mobilní menu
assets/fonts/           Geist 400–900 (latin, latin-ext) + Geist Mono
assets/img/             fotografie v AVIF/WebP/JPEG, noise.png, og.png
assets/logo/            logotypy a favicon v SVG
tools/                  dev-only skripty, nejsou součástí webu
```

---

## Pohyb a přístupnost

Design systém popisuje značku jako *„téměř statickou — je to sazba, ne aplikace"*.
Pohyb je proto záměrně střídmý a řídí se třemi pravidly:

1. **Statický snímek stránky odpovídá PDF.** Animace mění výhradně `opacity` a `transform`,
   nikdy barvu plochy, tvar, radius ani typografii.
2. **Žádný parallax, žádný bounce, žádný animovaný gradient** — design systém je zakazuje jmenovitě.
3. **`prefers-reduced-motion: reduce` vypíná veškerý pohyb**, obsah zůstává v koncovém stavu.

Dva momenty při scrollu: zvýrazněné pasáže ve `#spolecnici` přecházejí z `--muted`
do `--green` (200 ms) a řádky prohlášení ve `#strategie` se odhalují podle pozice
scrollu (`animation-timeline: view()`, s fallbackem přes IntersectionObserver).

Dále: sémantické HTML s `lang="cs"`, jediné `h1`, viditelný focus, popisné alt texty,
kontrast dle WCAG AA. Mobilní menu má zámek scrollu, focus trap a zavření klávesou Esc.

Lighthouse (mobil), měřeno proti lokálnímu `python3 -m http.server`:

| Performance | Accessibility | Best Practices | SEO |
| ---: | ---: | ---: | ---: |
| 99 | 100 | 100 | 100 |

---

## Na co jsem narazil

- **Chybějící soubory v referenčním exportu.** `bmv-web.html` i `bmv-mobil-390.html` odkazují
  na `content.jsx` a `sections.jsx`, které ve sdílené složce nejsou. Veškeré texty jsem proto
  přepsal přímo z dodaných PDF (desktop i mobil), aby odpovídaly schválené předloze doslovně.
- **Rozbité cesty v tokenech.** `tokens/fonts.css` a `tokens/texture.css` odkazují na
  `../assets/`, které v dodané složce neexistuje. Fonty jsou ve skutečnosti v `05 Fonty`,
  textura v `04 Obrázky`. Opraveny pouze cesty, žádná hodnota.
- **Ořezy fotografií.** Referenční export je nese v třídách `.obj-top`, `.obj-bottom`
  a `.obj-center` (`object-position: top`, `bottom`, `center 70%`) — převzato.
- **Šířka zdrojových fotek.** `bmv-foto-03` a `bmv-foto-04` mají 1024 px, takže u nich
  není varianta 1280 px (bez zvětšování). Fallback je JPEG, ne PNG — u fotografií je menší
  a zadání požaduje jen „fallback“, ne konkrétní formát.
- **Kontrast v patičce.** `--muted` na `--rule` má 3,92 : 1, pod AA pro 12/14 px.
  Popisky, IČO doplněk a copyright v patičce proto používají `--green` (7,28 : 1).
  Jde o barvu z palety, ne o novou. `--muted` na `--bg` má 4,51 : 1 a zůstává.
- **E-mail a doména.** Klient je teprve dodá, v patičce proto nejsou.
- **Neúplné fonty v „05 Fonty“.** Geist byl rozdělený na latin / latin-ext přes
  `unicode-range`; Safari u variabilního řezu latin-ext nenasadí, takže ů, č, ř,
  š, ž padaly do systémového písma. Geist Mono latin-ext vůbec neobsahoval,
  takže „PŮSOBENÍ“ v navigaci míchalo dva řezy. Nahradil jsem je jedním
  oficiálním Geist VF subsetem (latin + latin-ext) na rodinu, pořád lokálně.

---

## Výkaz hodin

| Datum | Činnost | Hodin |
| --- | --- | --- |
| 1. 9. 2026 | Analýza zadání a podkladů, implementace onepage webu, kontrola proti PDF a Lighthouse (17:15–19:40) | 2,5 |
| | **Celkem** | **2,5** |
