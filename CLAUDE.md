# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the marketing website for Elastic Mint, a bespoke software development company in Bristol. It's a static site built with [Eleventy (11ty)](https://www.11ty.dev/), deployed via GitHub Pages from the `/docs` folder on `master` (custom domain: www.elasticmint.com, see `CNAME`).

The site originated as a WordPress export but has since been converted to an Eleventy-templated static site. Many of the original WordPress assets (theme CSS/JS in `wp-content/themes/ElasticMint/`, media uploads in `wp-content/uploads/`) are still served as-is — only the HTML pages and chrome are now templated.

## Architecture

### Directory layout

- `/src/` — **source of truth** (what you edit). Eleventy input.
  - `index.njk`, `about.njk`, `services.njk`, `ai.njk`, `case-studies.njk`, `fractional-cto.njk`, `contact.njk`, `privacy-policy.njk`, `404.njk` — top-level pages.
  - `services/`, `case-studies/` — sub-pages, one `.njk` per page.
  - `_includes/` — shared layout/chrome:
    - `base.njk` — full HTML wrapper (head, scripts, body shell). Per-page data injected via frontmatter (title, description, og:*, schemaGraph, bodyClass, etc.).
    - `header.njk` — top bar + main menu.
    - `nav-mobile.njk` — secondary mobile nav.
    - `footer.njk` — site footer.
  - `_data/redirects.json` — URL redirect mapping (old path → new URL). **Intentionally empty (`[]`).** The legacy WordPress URLs are deliberately left to 404; the 404 page handles stale links.

    This was revisited in July 2026 after a Search Console audit showed 32 legacy URLs hard-404ing, plus 20 more sitting in "Crawled – currently not indexed" with pre-migration crawl dates. Restoring the redirects was built and tested on `feature/search_fixes`, then reverted by decision: the fix required 56 generated stub files in `/docs`, which wasn't a trade worth making for the amount of link equity involved. **Don't reinstate them without a reason** — and if the question comes up again, check **GSC → Links → Top linked pages** first to find out which legacy URLs actually carry inbound links. It's likely a handful, not 56.

    The honest trade being accepted: a 404 tells Google to drop the URL and discard any inbound link equity, where a redirect would pass it to the live page. If that equity ever proves to matter, the better delivery mechanism is real 301s via Cloudflare or a `_redirects` file on Cloudflare Pages / Netlify — not stub files. GitHub Pages can't serve a 301 from a static folder, which is the only reason the stub approach existed.
  - `redirects.njk` — Eleventy pagination template that emits one meta-refresh stub per `redirects.json` entry. Inactive while `redirects.json` is empty; kept so adding a redirect is just a JSON edit. Two things to know before using it:
    - It deliberately does *not* set `noindex`. That would tell Google to drop the source URL, defeating the point of the redirect. Meta refresh plus canonical is what consolidates signals onto the target.
    - **Watch for permalink collisions.** A `from` path matching a real page's permalink makes Eleventy write one over the other. `blog/index.html` is the live example: it was a redirect until `src/blog.njk` took `permalink: /blog/`.
- `/docs/` — Eleventy output, served by GitHub Pages. **Do not edit `.html` files in here directly — they're regenerated.** Static assets (`wp-content/`, `sitemap.xml`, `robots.txt`, `CNAME`) live here too and are served as-is.
- `.eleventy.js` — build config (input: `src`, output: `docs`).

### Key conventions

- All in-site URLs are **absolute root-relative** (`/about.html`, `/wp-content/themes/ElasticMint/style.css`). No relative `../` walking.
- Pages with `<canvas id="myCanvas">` (homepage, case studies) set `usesCanvas: true` in frontmatter; `base.njk` only loads paper.js for those pages.
- Icons are **inline SVG** (no Font Awesome dependency).

### Technology stack

- **Build**: Eleventy 3.x (Node)
- **Templates**: Nunjucks (`.njk`)
- **CSS**: theme stylesheet at `/docs/wp-content/themes/ElasticMint/style.css` (custom fonts: Intro, Rubik)
- **JS libraries** (loaded via CDN from `base.njk`):
  - jQuery 1.11.2 (legacy — required by theme's `all.js`)
  - SimpleBar 6.3.2 (custom scrollbars)
  - paper.js 0.12.11 (canvas pages only)
  - GSAP 3.6.0 (TimelineLite animations)
  - anime.js (theme-bundled at `/wp-content/themes/ElasticMint/js/anime.min.js`)
  - AOS 2.3.1 (scroll-triggered fade animations)
- **Theme JS**: `/docs/wp-content/themes/ElasticMint/js/all.js` (combined, minified). Calls `.bxSlider()` on `#values` and `.testers-make` — bxSlider isn't currently loaded, which throws and halts execution at that point. Known limitation.
- **Mobile breakpoints**: 1440px, 1080px, 960px, 740px, 640px, 500px

## Common development tasks

### Making content changes

```bash
# Install once
npm install

# Edit a page
$EDITOR src/about.njk          # or src/services/<page>.njk, src/case-studies/<slug>.njk, etc.

# Rebuild
npx eleventy

# Preview
# Use VS Code Live Server or `npx http-server ./docs` and open the page.
```

### Adding a new page

1. Create `src/<path>.njk` with frontmatter (`layout: base.njk`, `permalink: <path>.html`, plus `title`, `description`, `canonical`, `ogUrl`, `bodyClass`, etc.).
2. If the page should appear in the main menu, edit `src/_includes/header.njk` and `src/_includes/nav-mobile.njk`.
3. Add a corresponding entry to `docs/sitemap.xml`.
4. `npx eleventy` to build.

### Adding a redirect (old URL → new URL)

Add an entry to `src/_data/redirects.json`:
```json
{ "from": "old/path/index.html", "to": "/new-path.html" }
```
Run `npx eleventy`. A meta-refresh stub is generated at the `from` path.

Check two things before committing: the `to` target resolves to a file that actually exists in `/docs` (a redirect to a 404 is no better than a 404), and the `from` path doesn't collide with a real page's permalink.

Note that GitHub Pages can't serve true 301s from a static folder, so these are meta-refresh soft redirects. Google honours them, but they pass link equity less reliably than a 301. Putting a CDN in front of the site is the stronger fix if legacy equity matters.

### Editing shared chrome

- Header/menu: `src/_includes/header.njk` and `src/_includes/nav-mobile.njk`
- Footer: `src/_includes/footer.njk`
- HTML head, scripts: `src/_includes/base.njk`

Changes here propagate to every page on rebuild.

### Editing theme styles or vendor JS

- CSS: `docs/wp-content/themes/ElasticMint/style.css` (edited directly — not regenerated by Eleventy)
- JS: `docs/wp-content/themes/ElasticMint/js/all.js` (minified; edit with care)

## Important notes

- The site needs to be served from a web server root (custom domain via CNAME). Absolute `/wp-content/...` paths assume root-served deployment.
- Treat `/wp-content/` as the site's assets folder. The name is a legacy from the WordPress export — CSS, JS, fonts, theme images, and media uploads all live underneath it. Don't restructure it to a more conventional `/assets/` or `/static/` layout: hundreds of URL references across templates and embedded inside `schemaGraph` JSON strings would need updating, internal `url(...)` references in `style.css` would need fixing, and any inbound link to a media file (LinkedIn embeds, search-engine image cache, etc.) would break. The folder name is repo-internal noise; the URLs are stable and that matters more.
- Forms: contact page uses Calendly + mailto link. There's no server-side form handler.
- Google Analytics: GA4 (measurement ID `G-9D70PLKZQD`), embedded once in `base.njk` so every generated page gets it.
- Original audit-driven SEO fixes (sitemap, meta descriptions, title length, URL slugs) are all in place. Sitemap at `docs/sitemap.xml` lists all 22 canonical URLs.
- 404 page at `src/404.njk` builds to `/404.html`. GitHub Pages auto-serves it for any unfound URL with HTTP 404 status. Don't add it to the sitemap.
- `base.njk` honours a `noindex: true` frontmatter flag — the page emits `<meta name='robots' content='noindex, nofollow' />` instead of the default `index, follow`. Used by `404.njk`; available to any other page that needs it.
- The `feature/restructure_folders_pages` branch was where the WordPress → Eleventy migration happened (commits late April 2026). All historical context for *why* things are structured this way is in those commit messages.
