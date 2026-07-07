# Amir Pourmohammadi · Amir Tech Lab — Portfolio

A fast, static personal portfolio. No frameworks, no build step, no accounts
required to run it — just HTML, CSS, and a little vanilla JavaScript. It works
by opening `index.html` on your computer **and** when deployed to the web.

---

## 1. Preview it on your computer

The simplest way: double-click **`index.html`** to open it in your browser.

That's enough to see everything. (Two small things only work once the site is
deployed to the web: the **contact form** and the custom **404 page**. Both are
explained below.)

Want it to behave exactly like the live site while editing? Run a tiny local
server from this folder:

```bash
# Python 3 (already on most Macs/Linux)
python3 -m http.server 8000
```

Then visit <http://localhost:8000> in your browser.

---

## 2. What's in here

```
amir-portfolio/
├─ index.html              ← homepage (hero, projects, about, skills, contact)
├─ styles.css              ← all styling (colors live at the very top)
├─ script.js               ← menu, animations, contact form, image lightbox
├─ thank-you.html          ← shown after the contact form is sent
├─ 404.html                ← shown for broken links (once deployed)
├─ favicon.svg             ← the little site icon
├─ robots.txt / sitemap.xml← help search engines
├─ images/                 ← all photos  (see images/README.md)
├─ videos/                 ← demo clips  (see videos/README.md)
└─ projects/
   ├─ robot-tour-v2.html
   ├─ electric-vehicle-v2.html
   ├─ robot-tour-v1.html
   ├─ electric-vehicle-v1.html
   └─ project-template.html  ← copy this to add a new project
```

---

## 3. Edit the text

All text is plain HTML — open a file in any text editor and type over the
words. The most common edits:

- **Homepage** — headline, intro, about section, skills: edit `index.html`.
- **A project page** — edit the matching file in `projects/`.

### Finish the project pages

Each project page has clearly-marked spots waiting for your own words. Search a
file for **`TODO`** to find them — they appear two ways:

- visible placeholder text like *"TODO — add your own description here."*
- hidden notes in the code: `<!-- TODO: ... -->`

Fill in the real story for each section (the problem, why you built it, how you
tested it, what failed, what you changed, the result, and what's next). Also
check the **Tools, materials & software** table on each page and replace any
`TODO — add detail` values (for example the motor driver and power source).

> Tip: writing honestly about what went wrong and what you changed between v1
> and v2 is exactly what makes an engineering portfolio stand out.

---

## 4. Replace photos and videos

Put new files in `images/` or `videos/` and **keep the existing filenames** —
the pages will pick them up automatically. The full list of filenames is in
[`images/README.md`](images/README.md) and [`videos/README.md`](videos/README.md).

Phone photos are huge (often 4–6 MB). Shrink them so pages load fast. If you
have **ffmpeg** installed, this makes a web-friendly copy:

```bash
ffmpeg -i big-photo.jpg -vf "scale='min(1600,iw)':-2" -q:v 4 images/your-name.jpg
```

No ffmpeg? Any free online image resizer works — aim for about 1600px wide and
under ~400 KB.

### Add a brand-new project

1. Copy `projects/project-template.html` to `projects/your-new-project.html`.
2. Replace the `[SQUARE BRACKET]` placeholders and `TODO`s.
3. On `index.html`, copy one of the `<article class="card">` blocks inside
   `<div class="projects__grid">`, point its links at your new page, and update
   the image, title, and tags.

---

## 5. Change the colors (optional)

Open `styles.css`. The whole palette is defined at the very top under
`:root` as `--c-*` variables. Change those hex values and the entire site
re-themes. Keep one dominant color, one secondary, and use the coral accent
sparingly.

---

## 6. Put it online with GitHub + Netlify (free)

### a. Upload to GitHub

Your repository: <https://github.com/amirpourmohammaditech-ops/amir-portfolio>

Easiest (no command line): open the repo on GitHub → **Add file → Upload files**
→ drag in **everything inside this folder** (not the folder itself) → **Commit**.

Prefer the command line? From inside this folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/amirpourmohammaditech-ops/amir-portfolio.git
git push -u origin main
```

### b. Deploy with Netlify

1. Sign up at <https://www.netlify.com> (the free tier is plenty).
2. **Add new site → Import an existing project → GitHub**, then pick your repo.
3. Leave build command **empty** and publish directory as **`.`** (this is a
   plain static site — there's nothing to build).
4. Click **Deploy**. In under a minute you'll get a live URL like
   `https://your-name.netlify.app`.

### c. Turn on the contact form

The form is already set up for Netlify (it has `data-netlify="true"`). To make
sure submissions reach you:

1. After the first deploy, open your site's dashboard in Netlify.
2. Go to **Forms**. You should see a form named **`contact`** detected
   automatically.
3. Add a notification (**Forms → Settings → Form notifications**) so messages
   are emailed to **amirpourmohammadi.tech@gmail.com**.

**Test it:** open your live site, send yourself a message, and confirm it shows
up under **Forms** in Netlify and lands in your email.

> The form only works on the deployed Netlify site, not when opening the file
> locally — that's normal.

### d. Update the site later

Change a file, then upload it to GitHub again (or `git add` / `commit` /
`push`). Netlify redeploys automatically within a minute.

### e. After deploying — small cleanups

Once you know your real web address, update these placeholders (search each
file for `example.netlify.app`):

- `sitemap.xml` and `robots.txt` — swap in your real domain.
- `index.html` — the `og:url` meta tag near the top.

---

## 7. Connect a custom domain (optional, later)

If you buy a domain (e.g. `amirtechlab.com`), Netlify can use it:
**Site → Domain management → Add a domain**, then follow the steps. Netlify
provides free HTTPS automatically.

---

## Notes

- **No secrets or API keys** are used anywhere — nothing to configure or leak.
- The site loads fonts from Google Fonts when online and falls back to clean
  system fonts offline, so it always looks right.
- Built to a quality floor: responsive to mobile, keyboard-friendly with
  visible focus outlines, and it respects "reduce motion" settings.

Built through iteration — v1 → v2 → next.
