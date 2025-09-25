# Portfolio Randomizer

Portfolio Randomizer is a small web app that creates **portfolio websites on the fly**.  
Click a button, and you’ll get a random combination of layout, sections, styles, and effects.  
Every result is a little different: sometimes minimal, sometimes bold, always surprising.

The idea is simple: instead of starting with a blank page when starting a personal website, you can let the generator throw ideas at you. Shuffle the sections, try out new colors, move things around, and export a complete site once you’re happy.

## How it works

The generator picks from a set of ready-made components:

- Hero sections with random slogans and background images
- About & Features blocks with placeholder text
- Project cards and image galleries
- Testimonials, pricing plans, and a contact form

Each run uses different **themes** (colors, fonts, shadows, border radius) and **effects** (animations, highlights, hover styles). Text comes from the [Bacon Ipsum API](https://baconipsum.com/), images from [Picsum Photos](https://picsum.photos/).

Once the layout is generated you can:

- Reorder sections with **drag & drop**
- Delete blocks you don’t want
- Export the whole thing as a ZIP containing HTML, CSS, and images

## Motivation

I built this mostly for fun and as a way to explore:

- How far you can go with **vanilla JS and ES Modules**
- Randomized design (layouts, themes, effects)
- Small utilities like **JSZip** and **FileSaver** for exporting

It’s not meant to replace serious site builders, but it can be a neat playground for prototyping or simply getting inspired.

## Try it

👉 [Live demo on GitHub Pages](https://elplak.github.io/portfolio-randomizer/)

To run locally:

```bash
git clone https://github.com/elplak/portfolio-randomizer.git
cd portfolio-randomizer
# open index.html in your browser
```

## Technologies
- HTML, CSS, JavaScript (ES Modules)
- JSZip & FileSaver.js for exporting
