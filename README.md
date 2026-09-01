# BMV strategy — onepage web

Statický jednostránkový web pro **BMV strategy s.r.o.** naprogramovaný podle dodaného designu
(`BMV strategy/01 Design/bmv-desktop-1440.pdf` a `bmv-mobil-390.pdf`).

---

## Jak to spustit

Web je čistě statický a nepotřebuje build server ani internetové připojení.

**Nejjednodušeji:** otevřít `index.html` v prohlížeči (dvojklik).

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
- **Geist a Geist Mono** hostované lokálně ve `woff2`, `font-display: swap`,
  oddělené subsety latin a latin-ext kvůli diakritice.

Vývojářské nástroje ve složce `tools/` (převod obrázků, generování OG, kontrola české
typografie) **nejsou součástí odevzdaného webu** — spouští se jednorázově při vývoji.

---

## Struktura

```
index.html              jediná stránka
assets/css/tokens.css   doslovné převzetí design-system/tokens/*.css
assets/css/layout.css   sazba sekcí podle PDF
assets/css/motion.css   veškerý pohyb, celý uvnitř @media (prefers-reduced-motion: no-preference)
assets/js/main.js       odhalování při scrollu, kotvy, mobilní menu
assets/fonts/           Geist 400–900 (latin, latin-ext) + Geist Mono
assets/img/             fotografie v AVIF/WebP/PNG, noise.png, og.png
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

Dále: sémantické HTML s `lang="cs"`, jediné `h1`, viditelný focus, popisné alt texty,
kontrast dle WCAG AA.

> Poznámka ke kontrastu: `--muted #73635B` na pozadí `--bg #F4E1D0` má poměr **4,50 : 1** —
> prochází AA pro běžný text přesně na hraně. Velikost ani barva sekundárního textu se proto
> nesmí měnit.

---

## Na co jsem narazil

*(průběžně doplňováno)*

- **Chybějící soubory v referenčním exportu.** `bmv-web.html` i `bmv-mobil-390.html` odkazují
  na `content.jsx` a `sections.jsx`, které ve sdílené složce nejsou. Veškeré texty jsem proto
  přepsal přímo z dodaných PDF (desktop i mobil), aby odpovídaly schválené předloze doslovně.
- **Rozbité cesty v tokenech.** `tokens/fonts.css` a `tokens/texture.css` odkazují na
  `../assets/`, které v dodané složce neexistuje. Fonty jsou ve skutečnosti v `05 Fonty`,
  textura v `04 Obrázky`. Opraveny pouze cesty, žádná hodnota.
- **Ořezy fotografií.** Referenční export je nese v třídách `.obj-top`, `.obj-bottom`
  a `.obj-center` (`object-position: top`, `bottom`, `center 70%`) — převzato.

---

## Výkaz hodin

| Datum | Činnost | Hodin |
| --- | --- | --- |
| 1. 9. 2026 | Analýza zadání, design systému a tokenů; extrakce textů a geometrie z obou PDF; kontrola dodaných assetů; návrh řešení | 0,5 |
| | **Celkem** | **0,5** |
