# BMV strategy — design systém

Značkový a designový systém pro **BMV strategy s.r.o.**, soukromou investiční a strategickou
společnost. Investuje vlastní kapitál tří společníků do průmyslové výroby, logistiky,
komerčních nemovitostí a technologických parků. Jediný digitální výstup je **jeden
jednostránkový web v češtině** (bmvstrategy.cz).

Vizuálně systém navazuje na sesterskou skupinu **KUMO** (kumogroup.cz) jako vzdálený
příbuzný: sdílí paletu, písmo Geist, radiusy a šumovou texturu, ale **nemá signální barvu
ani prodejní tón** — BMV strategy nic neprodává, jen popisuje, co dělá.

Sazební referencí je **výroční zpráva investičního holdingu**, nikdy SaaS landing page.

## Zdroje, ze kterých systém vznikl

Vše dodal klient jako soubory v `uploads/` (čtenář tohoto dokumentu k nim nemusí mít přístup):

| soubor | obsah |
| --- | --- |
| `uploads/brand.md` | závazná pravidla značky (barvy, písmo, rozměry, textura, logo, tón) |
| `uploads/texty-klient.md` | doslovné texty od Michala Motla + údaje do patičky ověřené v ARES |
| `uploads/bmv-logo-horizontalni.svg` | horizontální logotyp (679,7 × 95) |
| `uploads/bmv-logo-horizontalni-negativ.svg` | negativ pro tmavý podklad |
| `uploads/bmv-logo-vertikalni.svg` | vertikální logotyp (296,45 × 189,28) |
| `uploads/bmv-logo-vertikalni-negativ.svg` | negativ vertikálního logotypu |
| `uploads/bmv-favicon-negativ.svg` | negativ faviconu |
| `uploads/bmv-favicon.svg` | favicon |
| `uploads/geist-*.woff2` | Geist (variabilní 400–900) a Geist Mono |
| `uploads/noise.png` | originální šumová textura z repa skupiny KUMO (250 × 250, alfa) |

Žádný codebase ani Figma soubor nebyl k dispozici — systém je postavený čistě z těchto
pravidel a textů. Sesterský web kumogroup.cz byl zmíněn jako vizuální kontext, ale nebyl
importován; nic z něj není zkopírováno.

---

## CONTENT FUNDAMENTALS

**Texty se nevymýšlejí.** Veškerá copy pochází doslova z `uploads/texty-klient.md`.
Nepřepisovat, nezkracovat, nevytvářet nové claimy. Pokud text pro nějaké místo v designu
neexistuje, místo zůstane prázdné nebo se sekce vypustí.

- **Jazyk:** čeština včetně diakritiky. Jednopísmenné předložky s nezlomitelnou mezerou (`v&nbsp;oblasti`).
- **Osoba:** první osoba množného čísla („Investujeme", „Naším cílem"), střídavě se
  jménem společnosti ve třetí osobě („BMV strategy vyhledává a rozvíjí projekty").
  Nikdy „vy" — text nikoho neoslovuje, protože nikoho nezve k akci.
- **Casing:** věty normálním casingem. VERZÁLKY pouze v Geist Mono popiscích
  (`OBLASTI NAŠEHO PŮSOBENÍ`, `SÍDLO`, `IČO`). Nikdy verzálky v nadpisech.
- **Délka:** odstavce 2–4 věty, věcné, bez příslovcí zesilujících dojem.
- **Emoji:** nikdy. Ani v UI, ani v popiscích.
- **Interpunkce:** české uvozovky „…", spojovník vs. pomlčka podle úzu klienta
  (v textech se objevuje jak „–", tak „—" — ponechat, jak je).
- **Čísla:** jen skutečná a ověřitelná — IČO, adresa, spisová značka. **Nikdy AUM,
  počet let, objem investic, počet projektů.** Společnost vznikla v roce 2026 a taková
  čísla nemá; vymyslet je by bylo nepravdivé.
- **Tón:** popisný, doložitelný, bez superlativů. Vzor: „Naším cílem není pouze pasivní
  držení investic." — konstatování, nikoliv slib.
- **Nikdy:** výzva k akci („kontaktujte nás", „zjistit více"), tlačítko, formulář,
  slova jako „řešení", „inovativní", „lídr".

Příklad hlavního nadpisu (doslovně): *Investujeme vlastní kapitál do projektů s dlouhodobou hodnotou.*

---

## VISUAL FOUNDATIONS

### Barvy
```
--bg      #F4E1D0   papírový podklad stránky
--green   #1D453E   primární — text, nadpisy, logo
--green-d #14312C   tmavé plochy a pásy
--white   #FFFFFF   karty a plochy
--muted   #73635B   sekundární text a popisky
--rule    #E4D2C9   dělicí linky
```
Jediná primární barva je `--green`. **Nikdy oranžová, nikdy červená, nikdy druhá sytá
barva, nikdy gradient.** Signální barva by implikovala výzvu k akci. Poměr na stránce:
podklad `--bg` drží většinu, `--white` na kartách, `--green-d` na jednom až dvou pásech
a v patičce. Maximálně dvě podkladové barvy na jedné stránce.

### Písmo
Vždy **Geist** (fallback Inter, system-ui), **Geist Mono** jen na popisky verzálkami,
čísla a technické značení. Nadpisy **vždy váha 400** — bold neexistuje. Váha 600 je
pouze uvnitř logotypu. Stupnice 12 · 14 · 16 · 20 · 24 · 30 · 32 · 34 · 42 · 48, nic
mezi tím. Hlavní nadpis 48 px / 1,2 (tablet 38, mobil 30), perex 16 px / 1,7 s maximem
520 px, běžný text 16 px / 1,7 v `--muted`. Tracking nadpisů −0,01em, mono 0,08em.

### Rozměry a mřížka
Šířka obsahu 1512 px, gutter `clamp(20px, 4.2vw, 64px)`, spacing base 4 px,
vertikální rytmus sekce `clamp(64px, 7vw, 120px)`. Karty v mřížce
`repeat(auto-fit, minmax(420px, 1fr))` s mezerou 24 px.

### Tvarosloví
Radius **32 px** na všech plochách, kartách a médiích; **39 px** na pilulkových prvcích.
**Nikdy ostré rohy, nikdy 8 px.** **Nikdy stín** — `box-shadow` se v systému nevyskytuje.
Plochy se oddělují barvou nebo linkou 1 px v `--rule` (na tmavém
`rgba(244,225,208,.18)`). Žádné ochranné gradienty; text na fotografii se neumisťuje —
popisek jde pod snímek jako mono caption.

### Textura
Přes tmavé plochy, obrázková média a patičku **vždy jemný šum**: originální
`assets/noise.png` z repa KUMO, `background-size: 126px 126px`, `opacity: .5`.
Nosič je samostatná vrstva `<span class="bmv-noise-layer">` uvnitř kontejneru
s třídou `.bmv-noise` (pseudo-element se nevykresluje v náhledech a exportech). Je to podpis rodiny KUMO — bez šumu
vypadají tmavé plochy plocho.

### Rytmus sekcí
Rytmus dělá **střídání podkladů, nikoliv střídání odsazení** — vertikální rytmus zůstává
u všech sekcí `clamp(64px, 7vw, 120px)`. Pořadí na onepage webu:

| sekce | podklad |
| --- | --- |
| hero a o společnosti | `--bg` |
| čtyři pilíře | `--bg` s bílými kartami `--white` |
| naši společníci | `--bg` |
| společná strategie | celoplošný tmavý pás `--green-d` se šumem |
| patička | `--rule` #E4D2C9 se šumem |

Nikdy víc než dvě podkladové barvy na jedné obrazovce.

### Obrazový materiál
Fotografie **pouze skutečné z provozu** — výrobní hala, vozový park, areál, portréty
společníků. **Nikdy fotobanka**: žádné podání ruky, mrakodrapy, grafy výnosů, burzovní
a fondová klišé. Dokud skutečné snímky nejsou, rámec zůstává prázdný s mono popiskem
„Místo pro skutečnou fotografii z provozu". Barevné ladění snímků: teplé, tlumené,
dokumentární; přes snímek vždy šum.

### Interakce
Systém je téměř statický — je to sazba, ne aplikace.
- **Hover na odkazu:** podtržení se z `--rule` změní na `currentColor`, barva
  z `--green` na `--green-d`. Přechod 200 ms `ease`.
- **Hover na mono odkazu v hlavičce:** spodní linka 1 px v `currentColor`.
- **Press:** žádné zmenšování, žádný posun — jen barva.
- **Animace:** pouze `scroll-behavior: smooth` a krátké fade/color přechody 200 ms.
  Nikdy bounce, nikdy parallax, nikdy odpočítávané číslo, nikdy animovaný gradient.
- **Fixní prvky:** hlavička je `sticky` s podkladem `color-mix(in srgb, var(--bg) 88%, transparent)`
  a `backdrop-filter: blur(8px)` — jediné použití rozostření v systému. Průhlednost jinde ne.
- **Focus:** viditelný, výchozí prstenec prohlížeče je akceptovatelný; nikdy `outline: none`.

### Logo
Vždy dodané SVG z `assets/`. Na světlém podkladu zelená verze, na tmavém **vždy
negativ** — pro všechny tři varianty existuje dodaný negativní soubor
(`bmv-logo-horizontalni-negativ.svg`, `bmv-logo-vertikalni-negativ.svg`,
`bmv-favicon-negativ.svg`); nikdy se neinvertuje CSS filtrem. Ochranná zóna ze všech stran minimálně polovina výšky versálky,
minimální šířka 120 px. **Nikdy negenerovat vlastní značku ani logotyp přepsáním do textu.**

---

## ICONOGRAPHY

**Systém ikonografii nemá a záměrně ji nezavádí.** Brand výslovně zakazuje ikony
a piktogramy jako výplň sekcí. Nic z dodaných materiálů neobsahuje ikonovou sadu,
ikonový font ani sprite — jediné vektory jsou logotyp a favicon.

Co se používá místo ikon:
- **Číselné značení sekcí a karet** v Geist Mono (`01`–`04`) — nese hierarchii, kterou by
  jinak nesly ikony.
- **Mono popisky verzálkami** (`OBLASTI NAŠEHO PŮSOBENÍ`, `SÍDLO`, `IČO`).
- **Linky 1 px** jako strukturní prvek.

Pravidla: **nikdy emoji.** Unicode znaky jako ikony ne — výjimkou je pomlčka
a případně „↗" u externího odkazu, i to jen je-li nutné. Žádná CDN ikonová sada
(Lucide, Heroicons…) nebyla nasazena a nasazovat by se neměla; pokud by nová sekce
ikonu skutečně potřebovala, je to signál, že sekce je špatně napsaná.

**Substituce, které jsem musel udělat:**
- Žádná. `assets/noise.png` je originální soubor z repa skupiny KUMO (250 × 250 px
  s alfa kanálem), vykreslovaný na 126 × 126 px při opacity 0,5.
- Písma jsou originální dodané soubory, žádná substituce z Google Fonts nebyla potřeba.

---

## Komponenty

Zdroj nedefinoval komponentovou knihovnu (žádný codebase, žádná Figma), proto je
inventář odvozen z pravidel značky a z toho, co jednostránkový web skutečně potřebuje.
Standardní sada typu Button / Input / Switch / Toast **záměrně chybí** — brand zakazuje
tlačítka i formuláře, takže by šlo o komponenty, které nikdo nesmí použít.

| komponenta | skupina | k čemu |
| --- | --- | --- |
| `Logo` | `components/brand/` | logotyp z dodaných SVG, varianty horizontal / vertical / favicon, negativ |
| `Surface` | `components/core/` | plocha radius 32 px, 1 px linka, tmavá varianta se šumem |
| `Eyebrow` | `components/core/` | mono popisek verzálkami s číselným značením |
| `Pill` | `components/core/` | pilulkový popisek radius 39 px (nikdy tlačítko) |
| `Rule` | `components/core/` | dělicí linka 1 px, vodorovná i svislá |
| `TextLink` | `components/core/` | textový odkaz — jediná forma „akce" v systému |
| `Heading` | `components/typography/` | nadpis ze stupnice 20–48 px, váha vždy 400 |
| `Lead` | `components/typography/` | perex 16/1,7, max. 520 px |
| `Prose` | `components/typography/` | stoh odstavců pro delší doslovné texty |
| `Section` | `components/layout/` | sekce s obsahovou šířkou 1512 px, gutterem a rytmem |
| `AreaEntry` | `components/content/` | karta oblasti působení (číslo, název, odstavce) |
| `PartnerEntry` | `components/content/` | profil společníka s místem pro portrét |
| `FactRow` | `components/content/` | výpis ověřených údajů oddělený linkami |
| `MediaFrame` | `components/media/` | rámec fotografie se šumem a mono popiskem |
| `SiteHeader` | `components/navigation/` | sticky hlavička s logem a mono odkazy |
| `SiteFooter` | `components/navigation/` | patička na #E4D2C9 se šumem a údaji z ARES (varianta `tone="dark"`) |

### Intentional additions
- `Eyebrow`, `Pill`, `FactRow` — nahrazují zakázané prvky (ikony, tlačítka, metriky) tak,
  aby stránka měla čím strukturovat obsah.
- `MediaFrame` bez `src` — prázdný rámec je záměrná komponenta, aby nikdo nesáhl po fotobance.

---

## Index souborů

| cesta | co tam je |
| --- | --- |
| `styles.css` | jediný vstupní bod pro konzumenty — pouze `@import` řádky |
| `tokens/colors.css` | paleta a semantické aliasy |
| `tokens/typography.css` | stupnice velikostí, váhy, řádkování, měřítka |
| `tokens/spacing.css` | škála 4 px, obsahová šířka, gutter, rytmus sekcí |
| `tokens/shape.css` | radiusy, šířka linky, pravidla loga |
| `tokens/texture.css` | šum + utility `.bmv-noise` a `.bmv-noise-layer` |
| `tokens/fonts.css` | `@font-face` pro Geist a Geist Mono |
| `tokens/base.css` | reset, výchozí sazba, barvy odkazů |
| `assets/` | logotypy, favicon, `noise.png`, `fonts/` |
| `components/<skupina>/` | komponenty + `.d.ts` + `.prompt.md` + karta pro Design System tab |
| `guidelines/*.card.html` | specimen karty (Colors, Type, Spacing, Brand) |
| `ui_kits/web/` | rekonstrukce onepage webu — `index.html` + sekce v JSX + `README.md` |
| `thumbnail.html` | dlaždice systému |
| `SKILL.md` | manifest pro použití systému jako Agent Skill |

Slidy ani prezentační šablona nejsou součástí — žádná předloha nebyla dodána.
