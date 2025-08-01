# Naive Static Page Generator

<p align="center">
  <img src="icon.png" alt="Naive static page generator icon">
</p>

A simple yet powerful static site generator built with Node.js and Handlebars that helps you maintain consistent layouts across multiple pages while keeping your code DRY (Don't Repeat Yourself).


## Background

In the past, to streamline my website development process, I often purchased well-designed HTML templates online.
However, I encountered a challenge when building product landing pages: most pages shared the same header and footer.
This posed a potential issue for future maintenance, as updating headers and footers across multiple static pages would
be time-consuming and labor-intensive.

To address this concern and reduce future maintenance work, I developed a simple yet effective generator. This tool
allows me to:

1. Maintain a single source for headers and footers
2. Automatically apply these common elements across multiple pages
3. Easily update all pages by modifying just one source file


## Features

- **Template-based generation**: Uses Handlebars templates for flexible page layouts
- **Reusable partials**: Maintain headers, footers, and other common elements in one place
- **Automatic title extraction**: Extract page titles from HTML comments
- **Asset copying**: Automatically copies CSS, JS, and other assets to the output directory
- **Watch mode**: Development mode with file watching for automatic rebuilds
- **Local development server**: Built-in HTTP server for testing your generated site
- **Flexible content wrapping**: Support for before/after content templates per folder

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone this repository:
```bash
git clone https://github.com/zhouhao/naive-static-page-generator-with-templates.git
cd naive-static-page-generator-with-templates
```

2. Install dependencies:
```bash
npm install
```

## Quick Start

1. **Development mode** (with file watching and local server):
```bash
npm run dev
```
This will start the generator in watch mode and serve your site at `http://localhost:9999`

2. **Build only**:
```bash
npm run build
```
This generates the static files in the `public/` directory

## Project Structure

```
src/
├── _assets/           # Static assets (CSS, JS, images)
│   ├── css/
│   └── js/
├── _partial/          # Handlebars partials
│   ├── head.handlebars    # <head> content
│   ├── header.handlebars  # Site header
│   └── footer.handlebars  # Site footer
├── layout.handlebars  # Main page layout template
├── index.html         # Homepage content
└── page/              # Example subfolder
    ├── _before.html   # Content inserted before page content
    ├── _after.html    # Content inserted after page content
    └── index.html     # Page content
```

## How It Works

### 1. Page Title Extraction
Add a title to any HTML file using an HTML comment on the first line:
```html
<!-- My Page Title -->
<div>
    Your page content here
</div>
```

### 2. Layout Template
The main `layout.handlebars` defines your page structure:
```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{#if title}}{{title}}{{else}}My Website{{/if}}</title>
    {{> head}}
</head>
<body>
    {{> header}}
    {{content}}
    {{> footer}}
</body>
</html>
```

### 3. Partials
Create reusable components in `src/_partial/`:
- `head.handlebars` - Meta tags, CSS links, etc.
- `header.handlebars` - Site navigation and header
- `footer.handlebars` - Site footer and scripts

### 4. Content Wrapping
Each folder can have optional `_before.html` and `_after.html` files that wrap around the main content of HTML files in that folder.

### 5. Asset Handling
All folders in `src/_assets/` are automatically copied to `public/` during the build process.

## Usage Examples

### Creating a New Page

1. Create an HTML file in `src/` or any subfolder:
```html
<!-- About Us -->
<div class="about-page">
    <h1>About Our Company</h1>
    <p>We are a leading provider of...</p>
</div>
```

2. Run the build process:
```bash
npm run build
```

3. The generated page will be available in `public/` with the full layout applied.

### Adding a New Section

1. Create a new folder in `src/` (e.g., `src/products/`)
2. Add `_before.html` and `_after.html` if you need section-specific wrapping
3. Add your HTML files to the folder
4. The generator will process all HTML files in the folder


## Dependencies

- **handlebars**: Template engine for generating HTML
- **fs-extra**: Enhanced file system operations
- **http-server**: Development server for local testing



## License

MIT

