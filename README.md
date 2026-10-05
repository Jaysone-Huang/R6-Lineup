# Lineup Index — Siege gadget lineups

A static website for browsing gadget lineups by **Map → Site → Operator**.
It's plain HTML, CSS and JavaScript, with no build step, framework or installs. It runs on GitHub Pages as-is.

---

## 1. Files

```
site/
├── index.html      Page structure (rarely edited)
├── styles.css      All styling: colors, fonts, layout
├── app.js          Site logic: navigation, filtering, lightbox, URLs
├── data.js         ← YOUR CONTENT: lineups, maps, sites, operators
├── images/         ← YOUR SCREENSHOTS
├── .nojekyll       Tells GitHub Pages to serve files as-is (keep it)
└── README.md       This file
```

Day to day you only touch **`data.js`** and **`images/`**.

---

## 2. How the site works

1. **Map** — pick from the left sidebar (or search). The number next to a map is its total lineup count.
2. **Site** — pick one of the map's bomb sites. Each card shows its floor and lineup count.
3. **Operator** — toggle **Attack / Defense**, then pick an operator.
   - **With lineups only** (on by default) hides operators with no lineups for that site.
   - Operators that have lineups are listed first and show a count.
4. **Screenshots** — every screenshot for that operator and site shows at once in a grid. Click one to open it full-screen. Use **← / →** to move between screenshots and **Esc** to close.

When you change map or site, the site automatically switches to an operator that has lineups there.

### Shareable links
The URL always reflects the current selection:

```
https://<user>.github.io/<repo>/#chalet/2f-master-bedroom/denari
                                 └ map ┘ └──── site ────┘ └ op ┘
```
**COPY LINK** copies it. Opening that link brings you straight to that view.

---

## 3. Adding lineups (plans)

A site can have **multiple plans** per operator. Each plan is a group of screenshots, shown under its own **PLAN 01 / PLAN 02** divider.

### Step 1 — Save screenshots
Name them `<operator>-<plan>.<shot>.webp` inside the site folder:

```
images/chalet/2f-master-bedroom/denari-1.1.webp   ← plan 1, shot 1
images/chalet/2f-master-bedroom/denari-1.2.webp   ← plan 1, shot 2
images/chalet/2f-master-bedroom/denari-2.1.webp   ← plan 2, shot 1
```

### Step 2 — Register them in `data.js`
Each number in the list = how many screenshots that plan has:

```js
window.LINEUPS = {
  chalet: {
    '2f-master-bedroom': { denari: [2, 1] },   // plan 1: 2 shots, plan 2: 1 shot
    '1f-bar':            { denari: [3] },      // one plan, 3 shots
  },
};
```

### Option — custom filenames / formats
```js
denari: [['stairs.webp', 'office.webp'], ['hall.jpg']]
```

### If an image doesn't show
The tile shows **"missing file"** plus the path it expected. Check:
- Folder and filename match exactly. **GitHub Pages is case-sensitive.**
- Default extension is `.webp`.
- The counts in `data.js` match the files.

---

## 4. Finding ids

All ids are lowercase with dashes, made automatically from the names:

| Thing    | Rule                                   | Examples |
|----------|----------------------------------------|----------|
| Map      | Name, lowercase, dashes                | `chalet`, `kafe-dostoyevsky`, `hereford-base` |
| Site     | Floor + **first room** of the site name | `2F · Master Bedroom / Office` → `2f-master-bedroom` |
| Operator | Name, accents removed                  | `Jäger` → `jager`, `Nøkk` → `nokk`, `Capitão` → `capitao` |

**Easiest way:** open the site, click the map, site and operator, then read the URL after `#`. When there are no lineups yet, the empty message also shows the folder path to use.

---

## 5. Editing maps, sites and operators

Everything is in `data.js`.

### Maps and sites — `window.MAP_DATA`
Each map is a list of `"Floor|Site name"` strings:

```js
'Chalet': ['2F|Master Bedroom / Office', '1F|Bar / Gaming Room', ...],
```

- **Add a map:** add a new line in the same format.
- **Rename a site:** edit the text. ⚠️ Changing the floor or the **first room name** changes the site id, so you'd need to rename that site's image folder and its key in `LINEUPS` too.
- Site names were written from memory. Please check them against the current game, especially Favela, Lair, Nighthaven Labs, Yacht, Hereford Base and Stadium Bravo (which uses stand-in names "Site A–D").

### Operators — `window.ATTACKERS` / `window.DEFENDERS`
Plain lists of names. Add new operators when they're released; the order here doesn't matter.

---

## 6. Changing the look

All colors are CSS variables at the top of `styles.css`:

```css
--bg:   #0c0d0f;               /* page background */
--red:  oklch(0.6 0.22 25);    /* accent (selected items, counts) */
--ink:  #e9e8e4;               /* main text */
```

Fonts (from Google Fonts, loaded in `index.html`):
- **Barlow Condensed** — headings, buttons
- **Barlow** — body text
- **JetBrains Mono** — small labels

The layout is responsive. Below 760px wide, the map sidebar becomes a horizontally scrolling row.

---

## 7. Publishing on GitHub Pages

1. Create a GitHub repo, e.g. `siege-lineups`.
2. Upload the **contents** of this `site/` folder to the repo root, so `index.html` sits at the top level. Include `.nojekyll`.
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. After a minute it's live at `https://<your-username>.github.io/siege-lineups/`.

To update: commit new images and the edited `data.js`. Pages redeploys automatically.

**Tips**
- Use WebP screenshots about 2000 px wide (around 100 to 300 KB each). To convert a PNG: `convert shot.png -resize 2000x -quality 82 shot.webp` (ImageMagick).
- GitHub repos should stay under ~1 GB. That's roughly a few thousand screenshots at the size above.

---

## 8. Previewing locally

- Double-click `index.html` — it works directly in the browser.
- Or run a local server in the folder (closer to how GitHub serves it):
  ```
  npx serve .
  # or
  python -m http.server 8000
  ```
  then open `http://localhost:8000`.

---

## 9. Quick checklist for a new lineup

- [ ] Screenshots saved as `images/<map>/<site>/<operator>-<plan>.<shot>.webp`
- [ ] Plan counts added in `data.js` → `LINEUPS`
- [ ] Opened locally to confirm it shows
- [ ] Committed and pushed to GitHub

---

*Fan-made tool. Not affiliated with or endorsed by Ubisoft.*
