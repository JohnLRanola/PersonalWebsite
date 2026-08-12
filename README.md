# DistantPluto — Personal Portfolio

A space-themed personal portfolio built with [Astro](https://astro.build/). The website showcases my development projects, creative work, technical skills, and experience through an interactive and responsive interface.

## Features

* Space-themed animated background
* Randomly generated flickering star field
* Responsive desktop and mobile layouts
* Smooth scroll-based animations
* Header that responds to scroll direction
* Interactive project modals
* Embedded YouTube project videos
* Draggable animation cards
* Projects and technical skills sections
* LinkedIn and GitHub profile links
* Keyboard-accessible modal controls
* Static production output for straightforward deployment

## Built With

* [Astro](https://astro.build/)
* TypeScript
* JavaScript
* HTML
* CSS
* Astro Assets
* YouTube embeds

## Requirements

* [Node.js](https://nodejs.org/) 22.12.0 or newer
* npm

You can check your installed versions with:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JohnLRanola/PersonalWebsite.git
cd PersonalWebsite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:4321 in your browser.

## Available Commands

Run these commands from the root of the project:

| Command                   | Action                                |
| ------------------------- | ------------------------------------- |
| `npm install`             | Installs the project dependencies     |
| `npm run dev`             | Starts the local development server   |
| `npm run build`           | Creates a production build in `dist/` |
| `npm run preview`         | Previews the production build locally |
| `npm run astro -- --help` | Displays help for the Astro CLI       |

## Project Structure

```text
PersonalWebsite/
├── public/
│   ├── scripts/
│   │   └── welcome-scroll.js
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── distantplutoicon.png
│   │   ├── earthRotate.gif
│   │   └── background.svg
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       ├── welcome/
│       │   ├── animations.css
│       │   ├── background.css
│       │   ├── layout.css
│       │   ├── projects.css
│       │   ├── responsive.css
│       │   └── skills.css
│       └── welcome.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Main Sections

### Home

Introduces John Ranola and highlights an interest in combining creativity and technology through web development, software, and 3D design.

### Projects

Showcases featured creative and technical work, including:

* **Project Lilypad** — A community-driven game developed with Unreal Engine 5 in 30 days
* **Animations** — A collection of 3D animation projects created with Blender

Project details are displayed through interactive video modals.

### Skills

Presents experience across:

* Programming languages
* Web development
* Databases
* 3D and visual design
* Creative software
* Development tools
* Game development
* Content and storytelling
* Team collaboration

## Customization

### Update portfolio content

The main page content is located in:

```text
src/components/Welcome.astro
```

Edit this file to update your introduction, projects, skills, social links, or embedded videos.

### Update the page title and favicon

Page metadata and the favicon are configured in:

```text
src/layouts/Layout.astro
```

### Update the styling

The styles are separated by purpose inside:

```text
src/styles/welcome/
```

| File             | Purpose                                 |
| ---------------- | --------------------------------------- |
| `layout.css`     | General page and section layout         |
| `background.css` | Space background and star field         |
| `animations.css` | Animation and transition effects        |
| `projects.css`   | Project cards, modals, and video boards |
| `skills.css`     | Skills section styling                  |
| `responsive.css` | Mobile and responsive adjustments       |

### Update interactive behavior

Scroll animations, project modals, header visibility, and draggable animation cards are handled in:

```text
public/scripts/welcome-scroll.js
```

### Configure the production URL

Before deploying, replace the placeholder URL in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  trailingSlash: 'always'
});
```

Use the final public URL where the portfolio will be hosted.

## Production Build

Create an optimized production build with:

```bash
npm run build
```

Astro generates the production files in:

```text
dist/
```

Preview the generated website locally with:

```bash
npm run preview
```

## Deployment

Because this is a static Astro website, the generated `dist/` directory can be deployed to services such as:

* GitHub Pages
* Netlify
* Vercel
* Cloudflare Pages

Remember to update the `site` value in `astro.config.mjs` before deploying.

## Accessibility

The website includes:

* Semantic page sections
* Navigation labels
* Alternative text for important images
* Descriptive labels for icon links
* Escape-key support for closing modals
* Focus management when modals open
* Hidden decorative backgrounds for assistive technology

## Project Status

This portfolio is currently under development. Additional projects, content, and improvements may be added over time.

## Author

**John Ranola — DistantPluto**

* [GitHub](https://github.com/JohnLRanola)
* [LinkedIn](https://www.linkedin.com/in/john-ranola-387367328/)
