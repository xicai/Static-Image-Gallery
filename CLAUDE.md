# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based static image gallery application built with Vite. It features:
- Responsive masonry layout for image display
- Cloudinary integration for image upload and optimization
- HashRouter for GitHub Pages compatibility
- MCP browser tools integration for debugging

## Tech Stack

- **Frontend**: React 19.1.1 with React DOM 19.1.1
- **Build Tool**: Vite 7.1.2
- **Development**: ESLint 9.33.0, TypeScript types support
- **Package Manager**: npm with ES6 modules

## Common Commands

### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

### Debug Scripts
- `./debug.sh dev` - Start development server
- `./debug.sh build` - Build project
- `./debug.sh preview` - Preview build
- `./debug.sh lint` - Check code quality
- `./debug.sh status` - Show project status

## Architecture

### Data Structure
The gallery uses `public/images.json` as its data source, which contains:
- Image metadata (ID, URL, description, dimensions)
- Related image references
- Cloudinary-hosted images

### Key Files
- src/App.css
- src/App.jsx
- src/components/DetailPage.css
- src/components/DetailPage.jsx
- src/components/HomePage.css
- src/components/HomePage.jsx
- src/components/Uploader.css
- src/components/Uploader.jsx
- src/index.css
- src/main.jsx
- src/utils/cloudinary.js

### Component Structure
The project follows standard React component architecture with:
- ES6 module imports/exports
- CSS modules support
- Built-in support for React Hooks and Fast Refresh

## Development Notes

- The project uses modern React patterns with StrictMode enabled
- ESLint is configured to ignore unused variables starting with capital letters
- HashRouter is used instead of BrowserRouter for GitHub Pages compatibility
- Image optimization is handled via Cloudinary URL transformations in `src/utils/cloudinary.js`
- Upload workflow requires Cloudinary configuration in `src/components/Uploader.jsx`
- GitHub Pages deployment is configured via `.github/workflows/deploy.yml`
- Image data is static and should be updated via `public/images.json`

## MCP Browser Tools

This project is configured with MCP browser tools for enhanced debugging capabilities:

### Setup
- MCP server: `mcp-browser-tools` (installed globally)
- Configuration: `~/.config/claude/claude_desktop_config.json`

### Usage Examples
- "Open browser and navigate to http://localhost:5173/Static-Image-Gallery/#/"
- "Take a screenshot to check the masonry layout"
- "Test the upload functionality"
- "Check responsive design on mobile viewport"
- "Inspect element styles and layout"

### Available MCP Tools
- Browser automation and navigation
- Screenshot capture
- Element inspection
- JavaScript execution
- Console log monitoring
- Responsive testing

See `MCP_DEBUG.md` for detailed debugging guide.

## Deployment

1. Configure Cloudinary settings in Uploader.jsx
2. Update vite.config.js base path to match GitHub repository name
3. Push to main branch to trigger automatic deployment
4. Enable GitHub Pages in repository settings

### Live URL
- Production: https://xicai.github.io/Static-Image-Gallery/#/
- Local Development: http://localhost:5173/Static-Image-Gallery/#/

### Debugging Deployment Issues
- Use browser's developer tools to check for 404 errors
- Verify all asset paths include the repository subdirectory
- Check GitHub Actions build logs for deployment errors
- Use MCP browser tools to test live site functionality

## Auto-generated Info

- Project: Static-Image-Gallery
- Version: N/A
- Last updated: $(date)
- Git hook: Auto-generated on commit
