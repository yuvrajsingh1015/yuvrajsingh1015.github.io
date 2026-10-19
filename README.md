# yuvrajsingh.de

Source code of my personal portfolio site, live at **[yuvrajsingh.de](https://yuvrajsingh.de)**.

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- Inter and JetBrains Mono, self-hosted with [Fontsource](https://fontsource.org) (no requests to Google Fonts)
- ESLint
- Deployed to GitHub Pages with GitHub Actions

## Features

- Dark and light theme, with the choice remembered
- Animated oscilloscope wave in the hero, drawn on a canvas
- Scroll-based reveal animations
- Contact form that validates input and opens the visitor's mail app (no backend)
- Responsive layout

## Project structure

```
src/
  data.js        all site content: profile, about, skills, projects
  App.jsx        page layout
  index.css      theme colours (CSS variables) and global styles
  components/    one file per section (Hero, About, Projects, Contact, ...)
public/          static files served as is (favicon, cv.pdf)
```

To change text or add a project, edit `src/data.js`.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # start the dev server
npm run lint      # check the code
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows`). The custom domain points to GitHub Pages via DNS.
