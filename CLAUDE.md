# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static WordPress website that has been exported to HTML. The site belongs to Elastic Mint, a bespoke software development company in Bristol. The entire site is contained within the `/docs` folder.

## Architecture

### Directory Structure
- `/docs/` - Main website root containing all static HTML files
  - WordPress-style URL structure with individual folders for each page/post
  - Each page typically has its own `index.html` file
- `/docs/wp-content/` - WordPress assets directory
  - `/themes/ElasticMint/` - Custom theme assets
    - `style.css` - Main stylesheet
    - `/js/all.js` - Combined JavaScript (jQuery, bxSlider, anime.js, etc.)
    - `/images/` - Theme images
  - `/uploads/` - Media files organized by year/month
  - `/plugins/gravityforms/` - Form plugin assets

### Technology Stack
- Static HTML (exported from WordPress)
- jQuery-based JavaScript
- CSS with custom fonts (Intro, Rubik)
- Animation libraries: anime.js, Paper.js, GSAP (TimelineLite)
- Slider: bxSlider
- No build process or package management

## Common Development Tasks

Since this is a static site with no build process:

### Making Changes
- Edit HTML files directly in their respective directories
- CSS changes: `/docs/wp-content/themes/ElasticMint/style.css`
- JavaScript changes: `/docs/wp-content/themes/ElasticMint/js/all.js`

### Testing
- Open HTML files directly in a browser or use a local HTTP server
- Python: `python -m http.server 8000` (from `/docs` directory)
- Node.js: `npx http-server ./docs`

## Important Notes

- The site uses absolute paths for assets, so it needs to be served from a web server root
- Forms use Gravity Forms but won't function without backend processing
- The site includes Google Analytics tracking (UA-116651606-1)
- Mobile responsive with breakpoints at 1440px, 1080px, 960px, 740px, 640px, 500px